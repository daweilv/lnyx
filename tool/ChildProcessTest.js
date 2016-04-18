var path = require('path');
const spawn = require('child_process').spawn;
const tail = spawn('tail', ['-f', path.join(__dirname,'../test.log')]);

tail.stdout.on('data', function(buffer){
    var aaa = buffer.toString('UTF-8');
    console.info(aaa);
});

tail.stderr.on('data', function(buffer) {
    console.error(buffer.toString('UTF-8'));
});

tail.on('close', function(buffer) {
    console.info(buffer.toString('UTF-8'));
});