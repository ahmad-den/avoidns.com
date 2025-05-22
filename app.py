from flask import Flask, request, jsonify
import logging
import os
import random
import string
import subprocess
import requests
from urllib.parse import urlparse

# Configuration constants
TEMP_DIR = '/tmp/'
FILE_HANDLER_SCRIPT = '/var/www/tempURLapp/file_handler.sh'
FILE_REPLACER_SCRIPT = '/var/www/tempURLapp/file_replacer.sh'

app = Flask(__name__)
app.logger.setLevel(logging.INFO)
app.config['SECRET_KEY'] = 'mst34WfgLjhf@3rfgMcxSjhbzErghZTyuiu'

def validate_input(data):
    domain = data.get('domain', '').strip().rstrip('/')
    server_ip = data.get('serverIp', '').strip()
    if not domain or not server_ip:
        app.logger.warning(f"Validation failed: Domain or Server IP missing.")
        return None, None, jsonify({'error': 'Domain and Server IP are required'}), 400
    return domain, server_ip, None, None

def prepare_domain_url(domain):
    if not domain.startswith(('http://', 'https://')):
        domain = 'http://' + domain
    try:
        response = requests.head(domain, allow_redirects=True, timeout=10)
        final_url_actual = response.url
        parsed_final_url = urlparse(final_url_actual)
        cleaned_final_url = parsed_final_url.netloc + parsed_final_url.path.rstrip('/')
        domain_part = parsed_final_url.netloc.split(".")[0][:6]
        app.logger.info(f"Successfully prepared domain {domain}. Cleaned URL: {cleaned_final_url}")
        return cleaned_final_url, domain_part, None
    except requests.exceptions.RequestException as e:
        app.logger.error(f"Error resolving domain {domain}: {e}")
        parsed_original_url = urlparse(domain)
        cleaned_final_url = parsed_original_url.netloc + parsed_original_url.path.rstrip('/')
        domain_part = parsed_original_url.netloc.split(".")[0][:6]
        # Log the fallback action
        app.logger.info(f"Falling back to original domain parts for {domain} after error. Cleaned URL: {cleaned_final_url}")
        return cleaned_final_url, domain_part, None

def generate_nginx_config(cleaned_final_url, final_url, server_ip):
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
    return vhost_content

def save_temp_config(filename, content, temp_dir):
    temp_filepath = os.path.join(temp_dir, filename)
    try:
        with open(temp_filepath, 'w') as file:
            file.write(content)
        app.logger.info(f"Successfully saved config to {temp_filepath}")
        return True, None
    except (IOError, OSError) as e:
        app.logger.error(f"Error saving temp config {temp_filepath}: {e}")
        return False, str(e)

def run_shell_script(script_path, *args):
    command = [script_path] + list(args)
    app.logger.info(f"Executing command: {' '.join(command)}")
    try:
        result = subprocess.run(command, capture_output=True, text=True, check=False)
        if result.returncode == 0:
            app.logger.info(f"Script {script_path} executed successfully.")
            return True, None
        else:
            error_message = f"Error executing script {script_path} with args {args}. Stderr: {result.stderr.strip()}"
            app.logger.error(error_message)
            return False, result.stderr.strip()
    except Exception as e:
        app.logger.error(f"Failed to run script {script_path}: {e}")
        return False, str(e)

def handle_redirect_check(generated_temp_url, vhost_filename, temp_dir, replacer_script_path):
    try:
        check_response = requests.head(generated_temp_url, allow_redirects=False, timeout=10)
        # requests.codes.is_redirect is not available, so we list common redirect codes.
        # Common redirect codes: 301, 302, 303, 307, 308.
        # The original code only checked for 301, but we can be more comprehensive.
        if check_response.status_code in [301, 302, 303, 307, 308]:
            after_redirect_url = check_response.headers.get('Location')
            if after_redirect_url is None:
                app.logger.error(f"Redirect status for {generated_temp_url} with no Location header.")
                return False, "Redirect status with no Location header"
            
            app.logger.info(f"Redirect detected for {generated_temp_url}. New location: {after_redirect_url}")
            parsed_redirect_url = urlparse(after_redirect_url)
            cleaned_url = parsed_redirect_url.netloc.rstrip('/')
            # As per instruction, keeping the replace logic for http/https
            cleaned_url = cleaned_url.replace("https://", "").replace("http://", "")

            success, save_error_msg = save_temp_config(vhost_filename, cleaned_url, temp_dir)
            if not success:
                return False, save_error_msg
            
            return run_shell_script(replacer_script_path, vhost_filename)
        else:
            app.logger.info(f"No redirect for {generated_temp_url}.")
            return True, None
            
    except requests.exceptions.RequestException as e:
        app.logger.error(f"Error checking redirect for {generated_temp_url}: {e}")
        return False, str(e)
    except Exception as e: # Catch any other unexpected errors
        app.logger.error(f"Unexpected error in handle_redirect_check for {generated_temp_url}: {e}")
        return False, f"Unexpected error: {str(e)}"

# Handle OPTIONS preflight request
@app.route('/api/generate-route', methods=['OPTIONS'])
def handle_options():
    return '', 204

@app.route('/api/generate-route', methods=['POST'])
def generate_route():
    try:
        try:
            data = request.get_json()
            if data is None: # Handle cases where request body is not valid JSON
                app.logger.error("Invalid JSON input: data is None")
                return jsonify({'error': 'Invalid JSON input', 'success': False}), 400
        except Exception as e: # Catch any exception during get_json()
            app.logger.error(f"Error getting JSON data: {e}")
            return jsonify({'error': 'Failed to parse JSON data', 'success': False}), 400
        
        app.logger.info(f"Received request for /api/generate-route with data: {data}")

        domain, server_ip, error_response, error_code = validate_input(data)
        if error_response is not None:
            return error_response, error_code
        app.logger.info(f"Validation successful for domain: {domain}, IP: {server_ip}")

        cleaned_final_url, domain_part, prep_error = prepare_domain_url(domain)
        if prep_error is not None:
            # Error already logged in prepare_domain_url if it's a RequestException
            # or if it's the fallback case.
            return jsonify({'error': f'Error preparing domain: {prep_error}', 'success': False}), 500
        app.logger.info(f"Prepared domain: {cleaned_final_url}, domain part: {domain_part}")

        random_str = ''.join(random.choice(string.ascii_lowercase) for _ in range(6))
        vhost_filename = f'{random_str}-{domain_part}.avoidns.com'
        app.logger.info(f"Generated vhost filename: {vhost_filename}")

        nginx_config_content = generate_nginx_config(cleaned_final_url, vhost_filename, server_ip)

        save_success, save_error = save_temp_config(vhost_filename, nginx_config_content, TEMP_DIR)
        if not save_success:
            # Error already logged in save_temp_config
            return jsonify({'error': f'Failed to save temp config: {save_error}', 'success': False}), 500
        app.logger.info(f"Temporary Nginx config saved to {os.path.join(TEMP_DIR, vhost_filename)}")

        app.logger.info(f"Executing file_handler.sh for {vhost_filename}")
        script_success, script_error = run_shell_script(FILE_HANDLER_SCRIPT, vhost_filename)
        app.logger.info(f"file_handler.sh executed for {vhost_filename}. Success: {script_success}")
        if not script_success:
            # Error already logged in run_shell_script
            return jsonify({'error': f'File handler script failed: {script_error}', 'success': False}), 500

        final_url_to_check = f"https://{vhost_filename}"
        app.logger.info(f"Performing redirect check for {final_url_to_check}")
        redirect_check_success, redirect_error = handle_redirect_check(final_url_to_check, vhost_filename, TEMP_DIR, FILE_REPLACER_SCRIPT)
        app.logger.info(f"Redirect check/handling for {final_url_to_check} completed. Success: {redirect_check_success}")
        if not redirect_check_success:
            # Error already logged in handle_redirect_check
            return jsonify({'error': f'Redirect check/handling failed: {redirect_error}', 'success': False}), 500
        
        response_payload = {
            'generatedUrl': final_url_to_check,
            'originalDomain': f'https://{cleaned_final_url}',
            'success': True
        }
        app.logger.info(f"Successfully generated route for {vhost_filename}. Response: {response_payload}")
        return jsonify(response_payload), 200

    except Exception as e:
        app.logger.error(f"An unexpected error occurred in generate_route: {e}")
        return jsonify({'error': str(e), 'success': False}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
