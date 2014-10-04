var mongoose = require('mongoose'),
    Message;

module.exports.init = function () {
    var messageSchema = new mongoose.Schema({
        from : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        to : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: {
            type: String
        }
    });

    Message = mongoose.model('Message',messageSchema);
};
