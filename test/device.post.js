var assert = require("assert"),
    request = require("supertest");
var app = require("../app");

describe('Device', function () {
    describe('post /devices/1', function () {
        it('should post right value 0 or 1', function(done) {
            request(app)
                .post('/devices/1')
                .set('Content-Type', 'application/json')
                .send("{\"type\":\"switch\",\"value\":1}")
                .end(done);

        });
    });
    //describe('post /devices/9 ', function () {
    //    it('should post value of a json', function(done) {
    //        request(app)
    //            .post('/devices/9');
    //
    //    });
    //})

});
