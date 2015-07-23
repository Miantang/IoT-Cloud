var express = require('express');
var config = require('../config');

var DevicesRouter = express.Router();
var UserModel = require('../models/user');
var DeviceModel = require('../models/device');

String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
};
//是否认证的U-ApiKey
function isAuthenticated(req, res, next) {
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
}

DevicesRouter.route('/devices')
    .get(function (req, res) {
        res.json({'method': 'get'});
})
    .post(function (req, res) {
        var device = new DeviceModel(req.body);
        device.save(function (err, ndv) {
            if(err) {
                if(!config.production) {
                    res.send(err);
                } else {
                    res.status(404);
                    res.end();
                }
            } else {
                res.json({'method': 'post'});
            }
        })
});

DevicesRouter.route('/devices/:id')
    .post(function (req, res) {
        if(config.mongo.toString().startWith('tingodb')) {
            DeviceModel.findOne({ id: req.params.id }, function (err, dv) {
                if(err) return console.error('DeviceModel Error: ' + err);
                for(var key in req.body) {
                    console.log('key: ' + key + 'value: '+ req.body[key]);
                }
                if(req.body.type === 'switch') {
                    dv.value = req.param('value');
                    console.log("dv.value: " + dv.value);
                } else {
                    //var value = JSON.parse(req.body.value);
                    //res.send(value);
                }
                dv.save(function (err) {
                    if(err) {
                        if(!config.production) {
                            res.send(err);
                        } else {
                            res.status(404);
                            res.end();
                        }
                    } else {
                        res.end();
                    }
                });
            });
        }
})
    .get(function (req, res) {
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
                    delete obj._id;
                    delete obj.__v;
                    res.json(obj);
                } else {
                    res.end();
                }
            }
        })
});
module.exports = DevicesRouter;