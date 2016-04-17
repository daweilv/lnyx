var config = {
    db: {
        acquireTimeout: 1000,
        connectionLimit: 10,
        host: 'example.org',
        user: 'bob',
        password: 'secret',
        database: 'db1'
    },
    session: {
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    },
    redis: {
        host: 'example.org',
        port: '6379',
        pass: 'password'

    }

};


module.exports = config;