cd ~/Projects/lnyx
mkdir -p release
timestamp=`date +%Y%m%d_%H%M%S`
tar zcvf ./release/release_${timestamp}.tar.gz bin src view www ./app.js ./package.json
scp -P 9103 ./release/release_${timestamp}.tar.gz root@jshey.com:/home/download
ssh -p 9103 root@jshey.com