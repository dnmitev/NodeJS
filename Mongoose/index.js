var db = require('./config/mongoose');

// initialize the DB with the connection
db.init();

db.registerUser({
    username: 'dinko',
    password: 'bagajnik'
});

db.registerUser({
    username: 'bat georgi',
    password: 'jigula'
});

db.sendMessage({
    from: 'dinko',
    to: 'bat georgi',
    text: 'bat georgi, zadushaaam saaaa'
});

db.getMessages({
    with: 'dinko',
    and: 'bat georgi'
});

