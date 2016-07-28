cd /home/service
pkill -f ./lnyx/bin/www
nohup PORT=80 NODE_ENV=production node ./bin/www > `date +%Y%m%d_%H%M%S`.log &