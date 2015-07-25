var UserModel = require('../models/user');

exports.isAdmin = function (req, res, next) {
    UserModel.findOne({ uid: "admin" }, function (err, admin) {
        if (err) {
            if (!config.production) {
                res.send(err);
            } else {
                res.status(404);
                res.end();
            }
        } else {
            if (admin !== null && admin.pwd === req.pwd) {
                next();
            } else {
                res.json({ Error: 'wrong password for admin' });
            }
        }
    });
};
exports.getUser = function (req, res) {
    res.json({'method': 'get'});
};
exports.postUser = function (req, res) {
    var user = req.body;
    var uid = user.uid;
    var pwd = user.pwd;
    UserModel.findOne({uid: uid}, function (err, u) {
        if(err) console.error(err);
        if( !u ) {
            return res.redirect('/');
        }
    })
};
exports.signup = function (req, res) {
    var _user = req.body.user;
    var user = new UserModel(_user);
    user.save();
    res.redirect('/');
};

exports.login = function (req, res) {
    var user = req.body;
    var uid = user.username;
    var pwd = user.pwd;
    UserModel.findOne({uid: uid}, function (err , u) {
        if (err) console.log(err);
        if(!u) {
            return res.redirect('/');
        }
        //u.comparePassword(pwd, function (err, isMatch) {
        //    if (err) console.log(err);
        //    if (isMatch ) {
        //        //req.session.user = u;
        //        console.log("login succeed!");
        //        return res.redirect('/right');
        //    } else {
        //        console.log("cant login");
        //        return res.redirect('/wrong');
        //    }
        //});
        if(u.isRight(pwd)) {
            req.session.user = u;
            console.log("login succeed!");
            return res.json({'username': uid});
        } else {
            console.log("cant login");
        }
    });
};
exports.logout = function (req, res) {
    delete req.session.user;
    res.redirect('/');
};
// middleware for user
exports.loginRequired = function(req, res, next) {
    var user = req.session.user;

    if (!user) {
        console.log("should login");
        return res.redirect('/login');
    }
    next();
};

exports.adminRequired = function(req, res, next) {
    var user = req.session.user;

    if (user !== 'admin') {
        return res.redirect('/login');
    }

    next();
};
