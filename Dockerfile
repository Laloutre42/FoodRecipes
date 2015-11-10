# Set nginx base image
FROM nginx

# File Author / Maintainer
MAINTAINER Arnaud Zdziobeck <laloutre42@gmail.com>

# Copy custom configuration file from the current directory
COPY ngninx_conf/nginx.conf /etc/nginx/nginx.conf

# Copy "dist" content to "html"
COPY dist /usr/share/nginx/html