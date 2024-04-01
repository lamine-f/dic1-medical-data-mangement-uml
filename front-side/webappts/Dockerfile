# Use an official Debian-based image as the base image
FROM debian:bullseye-slim

# Install Apache and other necessary packages
RUN apt-get update && \
    apt-get install -y apache2 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


COPY config/vh.conf /etc/apache2/sites-available
COPY build /var/www/html

RUN a2enmod rewrite
RUN a2ensite vh


# Expose port 80 for Apache
EXPOSE 80

# Start Apache as a foreground process
CMD ["apache2ctl", "-D", "FOREGROUND"]
