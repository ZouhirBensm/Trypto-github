#!/bin/sh

# clear
# echo "HELLO WORLD"

npm install -D webpack-cli
npx webpack &
sleep 20
npm run server

# "start": "sh exec.sh"