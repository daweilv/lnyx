cd ~/Projects/lnyx
rm -rf tmp
mkdir tmp
cd tmp
rm -rf *
cp -R ../bin ../doc ../node_modules ../src ../test ../tool ../view ../www ../app.js ../package.json .
tar zcvf deploy.tar.gz *
scp -P 9103 deploy.tar.gz root@dawei.lv:/home/service/lnyx
ssh -p 9103 root@dawei.lv