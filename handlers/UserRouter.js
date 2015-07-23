var express = require('express');
var config = require('../config');
var UserModel = require('../models/user');
var UserRouter = express.Router();

function isAdmin(req, res, next) {
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
}

UserRouter.route('/user')
    .get(function (req, res) {
        res.json({'method': 'get'});
})
    .post(function (req, res) {
        var _user = req.body;
        var name = 
});

UserRouter.route('/user/signup')
    .post(function (req, res) {
        var _user = req.body.user;
        var user = new UserModel(_user);
        user.save();
        res.redirect('/');
    });

module.exports = UserRouter;
