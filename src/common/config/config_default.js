var path = require('path');
var rootPath = path.join(path.dirname(require.main.filename),'..');

var config = {
    db: {
        acquireTimeout: 1000,
        connectionLimit: 10,
        host: 'example.org',
        user: 'root',
        password: '123456',
        database: 'lnyx'
    },
    session: {
        secret: 'example.org',
        resave: false,
        saveUninitialized: true
    },
    redis: {
        host: 'example.org',
        port: '6379',
        pass: '123456'
    },
    path: {
        root: rootPath,
        webroot:path.join(rootPath,'/www'),
        file: path.join(rootPath,'/www/file'),
        log: ''
    }

};


module.exports = config;