// 准备数据库
String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
};
var config = require('../config');
if (config.mongo.toString().startWith('tingodb')) {
    var tungus = require('tungus');
}
var mongoose = require('mongoose');
var DeviceModel = require('../models/device');
var UserModel = require('../models/user');

mongoose.connect(config.mongo, function (err) {
    if (err) return console.error('Mongo connection ' + err);
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function callback() {
    console.log("Database open ok!!");
});
//创建一个管理员
UserModel.findOne({ uid: "admin" }, function (err, u) {
    if (u === null) {
        var admin = new UserModel({
            uid: 'admin',
            pwd: 'admin',
            username: 'admin',
            email: 'admin@admin',
            qq: 'admin'
        });
        admin.save();
    }
});
//初始化设备列表
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
DeviceModel.findOne({id: 2}, function (err, dv) {
    if (dv === null) {
        var device = new DeviceModel({
            id: 2,
            type: 'switch',
            name: 'curtain',
            value: '0',
            description: '窗帘'
        });
        device.save();
    }
});
DeviceModel.findOne({id: 3}, function (err, dv) {
    if (dv === null) {
        var device = new DeviceModel({
            id: 3,
            type: 'switch',
            name: 'screen',
            value: '0',
            description: '幕布'
        });
        device.save();
    }
});
DeviceModel.findOne({id: 4}, function (err, dv) {
    if (dv === null) {
        var device = new DeviceModel({
            id: 4,
            type: 'switch',
            name: 'tap_water',
            value: '0',
            description: '自来水'
        });
        device.save();
    }
});
DeviceModel.findOne({id: 5}, function (err, dv) {
    if (dv === null) {
        var device = new DeviceModel({
            id: 5,
            type: 'switch',
            name: 'projector',
            value: '0',
            description: '投影仪'
        });
        device.save();
    }
});
DeviceModel.findOne({id: 6}, function (err, dv) {
    if (dv === null) {
        var device = new DeviceModel({
            id: 6,
            type: 'step',
            name: 'camera',
            value: '0',
            description: '摄像机'
        });
        device.save();
    }
});
DeviceModel.findOne({id: 7}, function (err, dv) {
    if (dv === null) {
        var device = new DeviceModel({
            id: 7,
            type: 'step',
            name: 'led2',
            value: '{"switch":0,"controller":"0"}',
            description: 'LED灯带'
        });
        device.save();
    }
});
DeviceModel.findOne({id: 8}, function (err, dv) {
    if (dv === null) {
        var device = new DeviceModel({
            id: 8,
            type: 'step',
            name: 'air',
            value: '{"switch":0,"controller":"0"}',
            description: '空调'
        });
        device.save();
    }
});
DeviceModel.findOne({id: 9}, function (err, dv) {
    if (dv === null) {
        var device = new DeviceModel({
            id: 9,
            type: 'step',
            name: 'tv',
            value: '{"switch":0,"controller":"0"}',
            description: '电视'
        });
        device.save();
    }
});
DeviceModel.findOne({id: 10}, function (err, dv) {
    if (dv === null) {
        var device = new DeviceModel({
            id: 10,
            type: 'step',
            name: 'access',
            value: '{"switch":0,"controller":"0"}',
            description: '门禁'
        });
        device.save();
    }
});
DeviceModel.findOne({id: 11}, function (err, dv) {
    if (dv === null) {
        var device = new DeviceModel({
            id: 11,
            type: 'step',
            name: 'gas',
            value: '{"switch":0,"controller":"0"}',
            description: '燃气控制'
        });
        device.save();
    }
});
DeviceModel.findOne({id: 12}, function (err, dv) {
    if (dv === null) {
        var device = new DeviceModel({
            id: 12,
            type: 'step',
            name: 'volume',
            value: '{"switch":0,"controller":"0"}',
            description: '音量控制'
        });
        device.save();
    }
});

mongoose.disconnect();