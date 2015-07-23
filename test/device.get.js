var assert = require("assert"),
    request = require("supertest");
var app = require("../app");

//https://github.com/visionmedia/supertest
describe('Device', function () {
    describe('get /devices/1', function () {
        it('should return right value 0 or 1', function(done) {
            request(app)
                .get('/devices/1')
                .expect(function (res) {
                    console.log("    devices/1: ", (JSON.parse(res.body.value)));
                    var pattern = /[01]/g;
                    assert.equal(pattern.test(res.body.value), true);
                })
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });
    describe('get /devices/9 ', function () {
        it('should return value of a json', function(done) {
            request(app)
                .get('/devices/9')
                .expect(function (res) {
                    console.log("    devices/9: ", JSON.parse(res.body.value));
                })
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });
    describe('get /devices/1/value ', function () {
        it('should return value of a number', function(done) {
            request(app)
                .get('/devices/1/value')
                .expect(function (res) {
                    var pattern = /[01]/g;
                    assert.equal(pattern.test(res.body), true);
                })
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });
    describe('get /devices/9/value ', function () {
        it('should return value of a json', function(done) {
            request(app)
                .get('/devices/9/value')
                .expect(function (res) {
                    console.log("    devices/9/value: ", JSON.parse(res.body));
                })
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

});
