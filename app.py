from flask import Flask, request, jsonify
import os
import random
import string
import subprocess
import requests
from urllib.parse import urlparse

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mst34WfgLjhf@3rfgMcxSjhbzErghZTyuiu'

# Handle OPTIONS preflight request
@app.route('/api/generate-route', methods=['OPTIONS'])
def handle_options():
    return '', 204

@app.route('/api/generate-route', methods=['POST'])
def generate_route():
    try:
        data = request.get_json()
        domain = data.get('domain', '').strip().rstrip('/')
        server_ip = data.get('serverIp', '').strip()

        if not domain or not server_ip:
            return jsonify({
                'error': 'Domain and Server IP are required'
            }), 400

        # Ensure domain has http/https prefix
        if not domain.startswith(('http://', 'https://')):
            domain = 'http://' + domain

        try:
            response = requests.head(domain, allow_redirects=True, timeout=10)
            final_url_actual = response.url
            parsed_final_url = urlparse(final_url_actual)
            cleaned_final_url = parsed_final_url.netloc + parsed_final_url.path.rstrip('/')
            domain_part = parsed_final_url.netloc.split(".")[0][:6]
        except requests.exceptions.RequestException as e:
            parsed_final_url = urlparse(domain)
            cleaned_final_url = parsed_final_url.netloc + parsed_final_url.path.rstrip('/')
            domain_part = parsed_final_url.netloc.split(".")[0][:6]

        # Generate random string for subdomain
        random_str = ''.join(random.choice(string.ascii_lowercase) for _ in range(6))
        final_url = f'{random_str}-{domain_part}.avoidns.com'

        vhost_content = f"""
        server {{
            set $domain_main "{cleaned_final_url}";
            set $domain_tmp "{final_url}";
            set $ip {server_ip};
            server_name {final_url};

            location / {{
                add_header X-Robots-Tag "noindex, nofollow";
                proxy_set_header X-Real-IP         $remote_addr;
                proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;

                proxy_set_header Accept-Encoding "";
                sub_filter_types *;
                sub_filter_once off;
                sub_filter $domain_main $domain_tmp;
                sub_filter www.$domain_main $domain_tmp;
                proxy_set_header Host $domain_main;
                proxy_pass https://$ip;
                proxy_redirect https://$domain_main https://$domain_tmp;
            }}

            listen 443 ssl;
            ssl_certificate /etc/nginx/ssl/avoidns.com.crt;
            ssl_certificate_key /etc/nginx/ssl/avoidns.com.key;
            ssl_dhparam /etc/ssl/certs/dhparam.pem;
            ssl_session_timeout    60m;
        }}
        server {{
            if ($host = {final_url}) {{
                return 301 https://$host$request_uri;
            }}

            server_name {final_url};
            listen 80;
            return 404;
        }}
        """

        # Save vhost configuration
        vhost_filename = final_url
        temp_filepath = f'/tmp/{vhost_filename}'

        with open(temp_filepath, 'w') as file:
            file.write(vhost_content)

        # Execute the file handler script
        subprocess.run(['/var/www/tempURLapp/file_handler.sh', vhost_filename])

        # Check the generated URL
        final_url_to_check = f"https://{final_url}"
        check_response = requests.head(final_url_to_check, allow_redirects=False)

        if check_response.status_code == 301:
            after_redirect_url = check_response.headers['Location']
            cleaned_url = urlparse(after_redirect_url).netloc.rstrip('/')
            cleaned_url = cleaned_url.replace("https://", "").replace("http://", "")

            with open(temp_filepath, 'w') as file:
                file.write(cleaned_url)

            subprocess.run(['/var/www/tempURLapp/file_replacer.sh', vhost_filename])

        # Return response exactly matching the curl example
        return jsonify({
            'generatedUrl': f'https://{final_url}',
            'originalDomain': f'https://{cleaned_final_url}',
            'success': True
        })

    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
