#!/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
# Initialize log file
LOG_FILE="/var/www/tempURLapp/logs/filehandler.log"
DATE=$(date +"%Y-%m-%d %H:%M:%S")
touch $LOG_FILE

# Function to log messages
log() {
    echo "$DATE [${BASH_LINENO[0]}]: $1" >> $LOG_FILE
}

# Function to execute a command and log it
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

# Receive the filename from Python script
FILENAME=$1
log "Received filename $FILENAME"

# Check if the file already exists in sites-available and sites-enabled
if [ -f "/etc/nginx/sites-available/${FILENAME}" ]; then
    exec_and_log "sudo rm /etc/nginx/sites-available/${FILENAME}"
fi

if [ -L "/etc/nginx/sites-enabled/${FILENAME}" ]; then
    exec_and_log "sudo rm /etc/nginx/sites-enabled/${FILENAME}"
fi

exec_and_log "sudo chown ahmad:www-data /tmp/${FILENAME}"
exec_and_log "chmod 664 /tmp/${FILENAME}"
# Move the temporary file to the desired N

# Move the temporary file to the desired Nginx config directory
exec_and_log "sudo mv /tmp/${FILENAME} /etc/nginx/sites-available/${FILENAME}"

# Log the first 6 lines of the Nginx vhost
HEAD_CONTENT=$(head -n6 /etc/nginx/sites-available/${FILENAME})
log "First 6 lines of vhost:"
log "$HEAD_CONTENT"

# Validate the Nginx configuration
VALID=$(sudo nginx -t 2>&1)
log "Validating Nginx configuration: $VALID"

if [[ $VALID == *"syntax is ok"* ]]; then
    log "Nginx configuration is valid."

    # Create a symlink in sites-enabled directory
    exec_and_log "sudo ln -s /etc/nginx/sites-available/${FILENAME} /etc/nginx/sites-enabled/"

    # Reload Nginx to apply changes
    exec_and_log "sudo /usr/sbin/nginx -s reload"

    # Add two new lines at the end, without $1
    echo -e "\n\n#############---END---##################\n\n" >> $LOG_FILE
else
    log "Nginx config test failed. Symbolic link will not be created."
    echo -e "\n\n#############---END---##################\n\n" >> $LOG_FILE
    exit 1
fi

