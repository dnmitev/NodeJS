var mongoose = require('mongoose'),
    User,
    Message;

module.exports.init = function () {
    mongoose.connect('localhost:27017/chat-db');
    var db = mongoose.connection;

    db.once('open', function (err) {
        if (err) {
            console.log('DB ERROR: ' + err);
        }

        console.log('Mongo Database is running....');
    });

    db.on("error", function (error) {
        console.log(error);
    });

    // calling the init() function initiliazises the DB models
    require('../models/User').init();
    require('../models/Message').init();

    User = mongoose.model('User');
    Message = mongoose.model('Message');
};

// Register new user
module.exports.registerUser = function (userData) {
    var newUser = new User({
        username: userData.username,
        password: userData.password
    });

    newUser.save(function (error, user) {
        if (error) {
            console.log('REGISTER NEW USER ERROR: ' + error);
        } else {
            console.log(user);
        }
    })
};

// send new message
module.exports.sendMessage = function (msgData) {
    User.findOne({username: msgData.from}, function (error, sender) {
        if (error) {
            console.log('MESSAGE SENDER ERRROR: ' + error);
        } else {
            console.log('SENDER: ' + sender);
            User.findOne({username: msgData.to}, function (error, receiver) {
                if (error) {
                    console.log('MESSAGE RECEIVER ERRROR: ' + error);
                } else {
                    var newMessage = new Message({
                        from: sender,
                        to: receiver,
                        text: msgData.text
                    });

                    newMessage.save(function (error, message) {
                        if (error) {
                            console.log('CREATE NEW MESSAGE ERROR: ' + error);
                        } else {
                            console.log(message.from + ' said to ' + message.to + ' : ' + message.text);
                        }
                    });
                }
            })
        }
    })
};

// get all messages with a query
module.exports.getMessages = function (queryData) {
    User.findOne({username: queryData.with}, function (error, sender) {
        if (error) {
            console.log('FIND MESSAGE BY SENDER ERROR: ' + error);
        } else {
            User.findOne({username: queryData.and}, function (error, receiver) {
                if (error) {
                    console.log('FIND MESSAGE BY RECEIVER ERROR: ' + error);
                } else {
                    Message.find({})
                           .where('from').equals(sender._id)
                           .where('to').equals(receiver._id)
                           .exec(function (error, result) {
                               if (error) {
                                   console.log('GET MESSAGE ERROR: ' + error);
                               } else {
                                   console.log(result);
                               }
                           })
                }
            })
        }
    })
};