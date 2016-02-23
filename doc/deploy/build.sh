cd /Users/lvdw/work/lnyx
rm -rf tmp
mkdir tmp
cd tmp
rm -rf *
cp -R  ../bin ../doc ../node_modules ../public ../routes ../views ../app.js ../package.json .
tar zcvf deploy.tar.gz *
scp -i ~/Documents/lnyx.pem deploy.tar.gz ubuntu@dawei.lv:/home/ubuntu/service/lnyx