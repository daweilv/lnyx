cd /home/service
pkill -f ./lnyx/bin/www
PORT=80 NODE_ENV=production nohup node ./lnyx/bin/www > `date +%Y%m%d_%H%M%S`.log &