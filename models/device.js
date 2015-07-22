var uuid = require('node-uuid');
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var Schema = mongoose.Schema;

var strLenValidator = [
    validate({
        validator: 'isLength',
        arguments: [1, 64],
        message: '×Ö·û´®³¤¶È·¶Î§ÊÇ[1, 64]'
    })
];
var DeviceSchema = new Schema({
    id: Number,
    type: { type: String },
    name : { type: String, required: true, validate: strLenValidator },
    value : { type: String, required: true, validate: strLenValidator },
    description : { type: String, required: true, validate: strLenValidator }
});

module.exports = mongoose.model('Device', DeviceSchema);