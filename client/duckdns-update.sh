#!/bin/bash

TOKEN="1379624c-9c8b-449b-b1bc-0a598c669928"
DOMAIN="empmanagementdemo.duckdns.org"

# Fetch the current IP address
IP=$(curl -s https://api.ipify.org)

# Update the DuckDNS domain with the current IP address
curl -s "https://www.duckdns.org/update?domains=$DOMAIN&token=$TOKEN&ip=$IP" > /dev/null 2>&1