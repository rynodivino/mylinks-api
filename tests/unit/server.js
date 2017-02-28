const mockery = require('mockery');
const request = require('supertest');
const t = require('tap');
const redisMock = require('../mocks/redisClient');

let app;

mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false
});
mockery.registerMock('redis', redisMock);

t.beforeEach((done)=>{
    app = require('../../server');
    done();
});

t.plan(2);

t.test('Existing user is returned.', function (tt) {
    request(app)
    .get('/owners/pma')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
        tt.error(err, 'No error');
        tt.same(res.body.msg, 'Success', 'Owner exists');
        tt.end();
    });
});

t.test('Non-existing user 401.', function (tt) {
    request(app)
    .get('/owners/batman')
    .expect('Content-Type', /json/)
    .expect(401)
    .end(function (err, res) {
        tt.error(err, 'No error');
        tt.same(res.body.msg, 'Owner does not exist.', 'Invalid owner.');
        tt.end();
    });
});
