#!/bin/bash
cd /home/ubuntu/shelp/shelp-server
authbind --deep pm2 start app.js
