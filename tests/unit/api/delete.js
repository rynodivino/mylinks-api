const mockery = require('mockery');
const redisMock = require('../../mocks/redisClient');
const sinon = require('sinon');
const t = require('tap');

const redisClient = redisMock.createClient();
let del, json, req, res, stub;

t.beforeEach((done)=>{
    json = sinon.spy();
    stub = sinon.stub();
    stub.returns({json});
    req = {
        params: {
            id: 'blah',
            owner: 'me'
        }
    };
    res = {
        end: sinon.spy(),
        send: sinon.spy(),
        status: stub
    };
    del = require('../../../api/delete');
    done();
});

t.plan(6);

t.test('delete 400\'s is missing id.', function (tt) {
    tt.plan(2);
    req.params.id = null;
    del.del(req, res, redisClient);
    tt.ok(res.status.calledWith(400));
    tt.ok(json.calledWith({message:'Missing required parameters.' }));
});

t.test('delete 400\'s is missing owner.', function (tt) {
    tt.plan(2);
    req.params.owner = null;
    del.del(req, res, redisClient);
    tt.ok(res.status.calledWith(400));
    tt.ok(json.calledWith({message:'Missing required parameters.' }));
});

t.test('delete:del call getCallback and fetchLink if id and owner present.', function (tt) {
    tt.plan(2);
    del.del(req, res, redisClient);
    tt.ok(redisClient.get.called);
    tt.ok(redisClient.get.calledWith(req.params.id));
});

t.test('delete:getCallback 401 if no data.', function (tt) {
    tt.plan(2);
    const cb = del.getCallback(req, res, redisClient);
    cb(null, null);
    tt.ok(res.status.calledWith(401));
    tt.ok(json.calledWith({message:'Failed.  Link does not exist.'}));
});

t.test('delete:getCallback 401 if wrong owner.', function (tt) {
    tt.plan(2);
    const cb = del.getCallback(req, res, redisClient);
    cb(null, JSON.stringify({
        id: 'http://motherscratcher.com',
        owner: 'bill roberts'
    }));
    tt.ok(res.status.calledWith(401));
    tt.ok(json.calledWith({message:'Failed.  Only owner can delete this link.'}));
});

t.test('delete:getCallback 200 if successful.', function (tt) {
    tt.plan(2);
    const cb = del.getCallback(req, res, redisClient);
    cb(null, JSON.stringify({
        id: 'blah',
        owner: 'me'
    }));
    tt.ok(res.status.calledWith(200));
    tt.ok(json.calledWith({message:'Success'}));
});
