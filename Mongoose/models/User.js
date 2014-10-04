var mongoose = require('mongoose'),
    User;

module.exports.init = function () {
    var userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

    User = mongoose.model('User', userSchema);
};

