var uuid = require('node-uuid');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var Schema = mongoose.Schema;

var strLenValidator = [
    validate({
        validator: 'isLength',
        arguments: [1, 64],
        message: '字符串长度范围是[1, 64]'
    })
];

var UserSchema = new Schema({
    uid: { type: String, required: true, validate: strLenValidator, unique: true },
    pwd: { type: String, required: true , validate: strLenValidator },
    username: { type: String, required: true , validate: strLenValidator },
    email: { type: String, required: true , validate: strLenValidator },
    qq: { type: String, required: true , validate: strLenValidator },
    ukey: { type: String, unique: true }
});

UserSchema.methods = {
    comparePassword: function (_pwd, cb) {
      bcrypt.compare(_pwd, this.pwd, function (err, isMatch) {
          if (err) return cb(err);
          cb(null, isMatch);
      });
    },
    isRight: function (_pwd) {
        if(_pwd === this.pwd) {
            return true;
        } else {
            return false;
        }
    }
};
UserSchema.pre('save', function (next) {
    var user = this;
    user.ukey = uuid.v4();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.pwd, salt, function (err, hash) {
            if (err) return next(err);
            user.pwd = hash;
        });
    });
    next();
});
module.exports = mongoose.model('User', UserSchema);