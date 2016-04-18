cd /Users/lvdw/work/lnyx
rm -rf tmp
mkdir tmp
cd tmp
rm -rf *
cp -R ../logic ../public ../node_modules ../routes ../tools ../views ../app.js ../package.json .
tar zcvf deploy.tar.gz *
scp -i ~/Documents/lnyx.pem deploy.tar.gz ubuntu@dawei.lv:/home/ubuntu/service/lnyx
ssh -i ~/Documents/lnyx.pem ubuntu@dawei.lv