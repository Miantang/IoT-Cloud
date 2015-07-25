var express = require('express');
var app = express();
var path = require('path');
var config = require('./config');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views/jade'));
app.set('view engine', 'jade');

function defaultContentTypeMiddleware(req, res, next) {
    req.headers['content-type'] = req.headers['content-type'] || 'application/json';
    next();
}
app.use(defaultContentTypeMiddleware);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(session({
    secret: 'iot-cloud'
}));
app.use(express.static(path.join(__dirname, 'public')));

// 准备数据库
String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
};
if (config.mongo.toString().startWith('tingodb')) {
    var tungus = require('tungus');
}
var mongoose = require('mongoose');
mongoose.connect(config.mongo);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function callback() {
    console.log("Database open ok!!");
});

//UserModel
var UserModel = require('./models/user');
//如果没有Admin，会自动创建一个
UserModel.findOne({ uid: "admin" }, function (err, u) {
    if (u === null) {
        var admin = new UserModel();
        admin.uid = "admin";
        admin.pwd = "admin";
        admin.username = "管理员";
        admin.email = "admin@admin";
        admin.qq = "admin";
        admin.save();
    }
});

require('./routes')(app);

module.exports = app;