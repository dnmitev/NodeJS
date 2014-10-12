var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption')    ,
    dateTimeFormat = require('../../utilities/date-time-format');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        require: '{PATH} is required',
        unique: true
    },
    firstName: { type: String },
    lastName: { type: String },
    photo: { type: String },
    registerDate: { type: Date, default: Date.now },
    salt: { type: String },
    hashPass: { type: String },
    roles: [String]
});


userSchema.path('username').validate(function (value) {
    return value.length > 5;
}, 'Invalid Username');

userSchema.method({
    authenticate: function (password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        }

        return false;
    }
});

var User = mongoose.model('User', userSchema);

function seed() {
    User.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

//       User.remove({}, function(err) {
//           console.log('collection removed')
//       });

        if (collection.length === 0) {
            var salt,
                hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'zdravo papura');

            User.create({
                username: '4i4odan4o',
                salt: salt,
                hashPass: hashedPwd,
                firstName: "Dancho",
                lastName: "Tarikatov",
                roles: ['admin']
            });

            console.log(dateTimeFormat.formattedDate() + ' --> Users added to database...');
        }
    });
}
console.log(dateTimeFormat.formattedDate() + " --> User Model Loaded");
module.exports = {
    seed: seed
};
