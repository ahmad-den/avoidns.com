#!/bin/bash

# Path to Nginx 'sites-available' and 'sites-enabled' directories
SITES_AVAILABLE="/etc/nginx/sites-available"
SITES_ENABLED="/etc/nginx/sites-enabled"

# Initialize log file
LOG_FILE="/var/www/tempURLapp/logs/filehandler_remove.log"
DATE=$(date +"%Y-%m-%d %H:%M:%S")
touch $LOG_FILE

# Function to log messages
log() {
    echo "$DATE [${BASH_LINENO[0]}]: $1" >> $LOG_FILE
}

# Flag file to check if Nginx needs to be reloaded
RELOAD_FLAG_FILE="/tmp/reload_nginx.flag"
rm -f $RELOAD_FLAG_FILE  # Clear the flag file initially

# Find and remove vhost files older than 60 minutes
ACTION_TAKEN=false
find $SITES_AVAILABLE -type f -mmin +60 | grep -vE "tempurl-main-vhost|default-wildcard-host" | while read -r file; do
    filename=$(basename "$file")
    log "Found old vhost file: $filename"

    if [ "$ACTION_TAKEN" = false ]; then
        echo -e "\n\n#############---START---##################\n\n" >> $LOG_FILE
        ACTION_TAKEN=true
    fi

    # Remove from sites-available and set flag if successful
    if sudo rm -f $SITES_AVAILABLE/$filename; then
        echo "This file $filename removed" >> $LOG_FILE
        touch $RELOAD_FLAG_FILE  # Set the flag
    fi

    # Remove symbolic link from sites-enabled
    sudo rm -f $SITES_ENABLED/$filename
done

# Reload Nginx if the flag file exists
if [ -f "$RELOAD_FLAG_FILE" ]; then
    if sudo /usr/sbin/nginx -s reload; then
        echo "Nginx reloaded" >> $LOG_FILE
        echo -e "\n\n#############---END---##################\n\n" >> $LOG_FILE
    else
        log "Failed to reload Nginx"
    fi
    rm -f $RELOAD_FLAG_FILE  # Clear the flag file
fi

