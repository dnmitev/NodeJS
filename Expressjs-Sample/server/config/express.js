var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
//    busboy = require('connect-busboy'),
    passport = require('passport'),
    favicon = require('serve-favicon'),
    multer = require('multer'),
    methodOverride = require('method-override');

module.exports = function (app, config) {
    // view engine -> Jade -> config
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');

    // favicon config
    app.use(favicon(config.rootPath + '/public/img/favicon.png'));

    // cookie handler config
    app.use(cookieParser());

    // body parser config
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(methodOverride('X-HTTP-Method-Override'));

    // encrypting sessions
    app.use(session({
        secret: 'magic unicorns',
        resave: true,
        saveUninitialized: true
    }));

    // file uploading
    //app.use(busboy({immediate: false}));
    app.use(multer({dest: __dirname + '../../../public/user-images'}));

    // passport config
    app.use(passport.initialize());
    app.use(passport.session());

    // static files config
    app.use(express.static(config.rootPath + '/public'));

    // error handling
    app.use(function (req, res, next) {
        if (req.session.error) {
            var msg = req.session.error;
            req.session.error = undefined;
            app.locals.errorMessage = msg;
        } else {
            app.locals.errorMessage = undefined;
        }

        next();
    });

    app.use(function(req, res, next) {
        if (req.user) {
            app.locals.currentUser = req.user;
        }

        next();
    });
};
