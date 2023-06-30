# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the client code
COPY . .

# Build the React app
RUN npm run build

# Install curl in the Docker image
RUN apk add --no-cache curl

# Update the duckdns-update.sh script
RUN echo '#!/bin/bash' > /duckdns-update.sh \
    && echo '' >> /duckdns-update.sh \
    && echo 'TOKEN="fc7305bf-ba96-473d-9274-9b3ab7a83341"' >> /duckdns-update.sh \
    && echo 'DOMAIN="employeesmanagement.duckdns.org"' >> /duckdns-update.sh \
    && echo '' >> /duckdns-update.sh \
    && echo '# Fetch the current IP address' >> /duckdns-update.sh \
    && echo 'IP=$(curl -s https://api.ipify.org)' >> /duckdns-update.sh \
    && echo '' >> /duckdns-update.sh \
    && echo '# Update the DuckDNS domain with the current IP address' >> /duckdns-update.sh \
    && echo 'curl -s "https://www.duckdns.org/update?domains=$DOMAIN&token=$TOKEN&ip=$IP" > /dev/null 2>&1' >> /duckdns-update.sh

# Set execute permissions for the DuckDNS update script
RUN chmod +x /duckdns-update.sh

# Add a cron job to periodically run the DuckDNS update script
RUN echo "*/5 * * * * /duckdns-update.sh > /dev/null 2>&1" > /etc/crontabs/root

# Expose the production port
EXPOSE 3000

# Start the client and cron daemon
CMD sh -c "npm start & crond -f -d 8"