cd /Users/lvdw/work/lnyx
echo "cd /Users/lvdw/work/lnyx"
rm -rf tmp
echo "rm -rf tmp"
mkdir tmp
echo "mkdir tmp"
cd tmp
echo "cd tmp"
rm -rf *
echo "rm -rf *"
cp -R  ../bin ../doc ../node_modules ../public ../routes ../views ../app.js ../package.json .
echo "cp -R  ../bin ../node_modules ../public ../routes ../views ../app.js ../package.json ."
tar zcvf deploy.tar.gz *
echo "tar zcvf deploy.tar.gz *"
scp -i ~/Documents/lnyx.pem deploy.tar.gz ubuntu@dawei.lv:/home/ubuntu/service/lnyx
echo "scp -i ~/Documents/lnyx.pem deploy.tar.gz ubuntu@dawei.lv:/home/ubuntu/service/lnyx"