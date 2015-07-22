var mongoose = require('mongoose');
var DeviceModel = require('../models/device');
var config = require('../config');
var tungus = require('tungus');

// 准备数据库
String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
};
//if (config.mongo.toString().startWith('tingodb')) {
//    var tungus = require('tungus');
//}
mongoose.connect(config.mongo, function (err) {
    if (err) return console.error('Mongo connection ' + err);
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function callback() {
    console.log("Database open ok!!");
});

DeviceModel.findOne({id: 1}, function (err, dv) {
    if (dv === null) {
        var device = new DeviceModel({
            id: 1,
            type: 'switch',
            name: 'led1',
            value: '0',
            description: '照明灯'
        });
        device.save();
    }
});