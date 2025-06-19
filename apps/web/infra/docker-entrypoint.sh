#!/bin/sh

# Substitute environment variables in nginx configuration
envsubst '${API_URL}' < /etc/nginx/nginx.conf > /tmp/nginx.conf

# Start nginx with the processed configuration
exec nginx -g 'daemon off;' -c /tmp/nginx.conf 