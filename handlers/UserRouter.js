var express = require('express');
var UserRouter = express.Router();

UserRouter.route('/user')
    .get(function (req, res) {
        res.json({'method': 'get'});
})
    .post(function (req, res) {
        res.json({'you': 'me'});
});

module.exports = UserRouter;