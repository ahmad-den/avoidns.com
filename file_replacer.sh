#!/bin/bash

# Define paths and log file
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
LOG_FILE="/var/www/tempURLapp/logs/replacer.log"
DATE=$(date +"%Y-%m-%d %H:%M:%S")
touch $LOG_FILE

# Function to log messages
log() {
    echo "$DATE [${BASH_LINENO[0]}]: $1" >> $LOG_FILE
}

# Function to execute a command and log its result
exec_and_log() {
    log "Executing: $1"
    eval $1
    if [ $? -eq 0 ]; then
        log "Command succeeded."
    else
        log "Command failed."
        exit 1
    fi
}

# Add two new lines and print #########---$1---##########
echo -e "\n\n#############---$1---##################\n\n" >> $LOG_FILE

# Validate input argument
if [ "$#" -ne 1 ]; then
  log "Usage: $0 <nginx-config-file-name>"
  exit 1
fi

NGINX_CONFIG_FILE="/etc/nginx/sites-available/$1"
TEMP_FILE="/tmp/$1"

# Check if Nginx config file exists
if [ ! -f "$NGINX_CONFIG_FILE" ]; then
  log "Nginx config file '$NGINX_CONFIG_FILE' doesn't exist."
  exit 1
fi

# Check if the temporary file with the new domain exists
if [ ! -f "$TEMP_FILE" ]; then
  log "Temp file '$TEMP_FILE' doesn't exist."
  exit 1
fi

# Read the new domain from the temp file
NEW_DOMAIN=$(cat $TEMP_FILE)

# Update Nginx config with the new domain
exec_and_log "sudo sed -i 's/\(set \$domain_main \)\".*\";/\1\"$NEW_DOMAIN\";/' $NGINX_CONFIG_FILE"

# Reload Nginx to apply changes
exec_and_log "sudo /usr/sbin/nginx -s reload"

log "Nginx configuration updated and reloaded."

# Add two new lines at the end
echo -e "\n\n#############---END---##################\n\n" >> $LOG_FILE

