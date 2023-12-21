#!/bin/bash

# Exit script on any error
set -e

# Remove package-lock.json, node_modules, and dist directory
echo "Cleaning up the project directory..."
rm -f package-lock.json
rm -rf node_modules
rm -rf public/dist

# List files in the directory (for confirmation)
ls

# Display the contents of .env file
echo "Contents of .env file:"
cat .env

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Install sharp (without saving it as a dependency)
echo "Installing sharp..."
npm install sharp

# Build the project in development mode
echo "Building the project..."
npm run build:dev


# Don't forget to run with
# npm run start

# Enable permissions to be able to execute the script
# chmod +x setup_project.sh

# Command to run the script on the root project folder
# ./setup_project.sh
