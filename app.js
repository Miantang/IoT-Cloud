var express = require('express');
var config = require('./config');

// ׼�����ݿ�
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
//���û��Admin�����Զ�����һ��
UserModel.findOne({ uid: "admin" }, function (err, u) {
    if (u === null) {
        var admin = new UserModel();
        admin.uid = "admin";
        admin.pwd = "admin";
        admin.username = "����Ա";
        admin.email = "admin@admin";
        admin.qq = "admin";
        admin.save();
    }
});
//����express
var app = express();

app.set('port', process.env.PORT || 3001);

var UserRouter = require('./handlers/UserRouter');
var DeviceRouter = require('./handlers/DeviceRouter');
app.use(UserRouter);
app.use(DeviceRouter);
app.get('/', function(req, res) {
    res.send('home');
});

module.exports = app;