# TempURL App

A web application built with Python backend and Next.js frontend for URL management.

## Project Structure

- Backend: Python with Gunicorn and Flask/Django
- Frontend: Next.js with TypeScript and Tailwind CSS
- Server: Nginx as reverse proxy, Gunicorn as WSGI server

## Prerequisites

- Python 3.8+
- Node.js 18+ and npm/yarn
- Nginx
- Ubuntu/Debian-based system (for systemd service)

## Backend Setup

1. Clone the repository:
   ```
   git clone https://your-repository-url.git
   cd tempURLapp
   ```

2. Create and activate a virtual environment:
   ```
   python3 -m venv myprojectenv
   source myprojectenv/bin/activate
   ```

3. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Configure the application (update configuration files as needed).

5. Test the backend locally:
   ```
   python app.py
   ```

## Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install Node.js dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

## Server Configuration

### Systemd Service

The project includes a systemd service file for running the Python backend with Gunicorn. The service file is already configured:

```ini
[Unit]
Description=Gunicorn instance to serve myproject
After=network.target

[Service]
User=ahmad
Group=www-data
WorkingDirectory=/var/www/tempURLapp
Environment="PATH=/var/www/tempURLapp/myprojectenv/bin"
ExecStart=/var/www/tempURLapp/myprojectenv/bin/gunicorn --workers 3 --bind unix:myproject.sock -m 007 wsgi:app

[Install]
WantedBy=multi-user.target
```

To set up the systemd service:

1. Copy the service file to systemd directory:
   ```
   sudo cp server-setup/myproject.service /etc/systemd/system/
   ```

2. Enable and start the service:
   ```
   sudo systemctl enable myproject
   sudo systemctl start myproject
   ```

3. Check the status:
   ```
   sudo systemctl status myproject
   ```

### Nginx Configuration

The project includes Nginx virtual host configurations in the `server-setup` directory. To set them up:

1. Copy the Nginx configuration file:
   ```
   sudo cp server-setup/myproject-nginx /etc/nginx/sites-available/myproject
   ```

2. Create a symbolic link to enable the site:
   ```
   sudo ln -s /etc/nginx/sites-available/myproject /etc/nginx/sites-enabled/
   ```

3. Test the Nginx configuration:
   ```
   sudo nginx -t
   ```

4. Restart Nginx:
   ```
   sudo systemctl restart nginx
   ```

## Full Deployment Process

1. Set up the server environment (Python, Node.js, Nginx).
2. Clone the repository to `/var/www/tempURLapp`.
3. Set up the Python virtual environment and install dependencies.
4. Build the Next.js frontend for production.
5. Configure the systemd service for the backend.
6. Configure Nginx as a reverse proxy.
7. Set up SSL if needed (using Let's Encrypt/Certbot is recommended).
8. Start all services and verify functionality.

## Development

- Backend development:
  ```
  source myprojectenv/bin/activate
  python app.py
  ```

- Frontend development:
  ```
  cd frontend
  npm run dev
  ```

## Project Dependencies

### Backend
See requirements.txt for detailed Python dependencies.

### Frontend
- Next.js 15.0.3
- React 18.3.1
- TypeScript
- Tailwind CSS
- Radix UI components
- Framer Motion
- Chart.js via react-chartjs-2

## Troubleshooting

- Check Nginx logs at `/var/log/nginx/error.log`
- Check application logs using `sudo journalctl -u myproject`
- Ensure proper permissions for the socket file and application directories

## License

[Your License Here]

## Contributing

[Your Contribution Guidelines Here]

