var UserModel = require('../models/user');
var DeviceModel = require('../models/device');
var config = require('../config');
//是否认证的U-ApiKey
exports.isAuthenticated = function (req, res, next) {
    var userkey = req.get('U-ApiKey');
    UserModel.findOne({ ukey: userkey }, function (err, u) {
        if (u !== null) {
            req.ukey = userkey;
            next();
        } else {
            res.status(412);
            res.end();
        }
    });
};
exports.getAllDevices = function (req, res) {
    DeviceModel.find({}, function (err, devices) {
        res.json(devices);
    });
};

exports.updateDevice = function (req, res) {
    var value;
    if(req.body.type === 'switch') {
        value = req.param('value');
    } else if(req.body.type === 'step') {
        var reqSwitch = req.body.switch;
        var controller = req.body.controller;
        value = JSON.stringify({"switch": reqSwitch, "controller": controller});
    } else {
        res.send('post type error!');
        res.end();
        return console.error('DeviceRouter Post Type Error! ');
    }
    DeviceModel.findOneAndUpdate({id: req.params.id}, {$set: {value: value}}, function (err, dv) {
        if(err) {
            if(!config.production) {
                res.send(err);
            } else {
                res.status(404);
                res.end();
            }
        } else {
            res.send('post success!');
            res.end();
        }
    });
};
exports.getDevice = function (req, res) {
    DeviceModel.findOne({ id: req.params.id}, function (err, dv) {
        if(err) {
            if (!config.production) {
                res.send(err);
            } else {
                res.status(404);
                res.end();
            }
        } else {
            if(dv !== null) {
                var obj = dv.toObject();
                delete obj._id;
                delete obj.__v;
                res.json(obj);
            } else {
                res.end();
            }
        }
    })
};
exports.getDeviceValue = function (req, res) {
    DeviceModel.findOne({id: req.params.id}, function (err, dv) {
        if(err) {
            if (!config.production) {
                res.send(err);
            } else {
                res.status(404);
                res.end();
            }
        } else {
            if(dv !== null) {
                var obj = dv.toObject();
                res.send(obj.value);
            } else {
                res.end();
            }
        }
    })
};