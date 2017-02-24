const mockery = require('mockery');
const request = require('supertest');
const test = require('tap').test;
const redisMock = require('../mocks/redisClient');
/**
const redisMock = {
    createClient: () => {
        hgetall: (x, cb) => {
            cb(null, {"msg":"Success"});
        }
    }; }
};
*/

test('Correct users returned', function (t) {
    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
    });
    mockery.registerMock('redis', redisMock);
    const app = require('../../server');

    request(app)
    .get('/owner/pma')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
        t.error(err, 'No error');
        t.same(res.body.msg, 'Success', 'Owner exists');
        t.end();
    });
});

