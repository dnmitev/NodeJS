var encryption = require('../../utilities/encryption'),
    users = require("../../repositories").user,
    uploading = require('../../utilities/uploading'),
    CONTROLLER_NAME = 'users';

module.exports = {
    name: CONTROLLER_NAME,
    createItem: function (req, res) {
        var newUserData = req.body;
        newUserData.registerDate = new Date();
        var errors = [];

        // Validate username and password
        if (newUserData.username.length < 6) {
            errors.push('Username must be at least 6 symbols!');
        }

        if (newUserData.password.length < 6) {
            errors.push('Password must be at least 6 symbols!');
        }

        if (newUserData.password !== newUserData.confirmPassword) {
            errors.push('Passwords do not match!');
        }

        if (errors.length > 0) {
            req.session.error = errors;
            res.redirect('/register');
        } else {
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, req.body.password);

            users.createItem(newUserData, function (err, user) {
                if (err) {
                    req.session.error = "Error occured: " + err;
                    res.redirect('/register');
                } else {
                    res.redirect('/login');
                }
            });
        }
    },
    updateItem: function (req, res) {
        if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
            var updatedUserData = req.body;

            if (req.files.photo !== undefined) {
                updatedUserData.photo = req.files.photo.name;
                uploading.moveFile();
            }

            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, updatedUserData.password);
            }

            users.updateItem(updatedUserData, function (err) {
                if (err) {
                    req.session.error = "Error occured: " + err;
                    res.redirect('/profile');
                } else {
                    res.redirect('/profile');
                }
            });
        } else {
            req.session.error = "You don't have permissions";
            res.redirect('/');
        }
    },
    deleteItem: function (req, res) {
        users.deleteItem(req.params.id, function (err) {
            if (err) {
                req.session.error = "Error occured: " + err;
                res.redirect('/admin-panel');
            } else {
                res.redirect('/admin-panel');
            }
        });
    },
    pages: {
        register: function (req, res) {
            if (req.user) {
                res.redirect('/');
            } else {
                res.render(CONTROLLER_NAME + '/register');
            }
        },
        login: function (req, res) {
            if (req.user) {
                res.redirect('/');
            } else {
                res.render(CONTROLLER_NAME + '/login')
            }
        },
        profile: function (req, res) {

            res.render(CONTROLLER_NAME + '/profile', {currentUser: req.user});
        },
        editProfile: function (req, res) {
            res.render(CONTROLLER_NAME + '/edit-profile', {currentUser: req.user});
        }
    }
};