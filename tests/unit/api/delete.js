const redisMock = require('../../mocks/redisClient');
const sinon = require('sinon');
const t = require('tap');

let del, json, req, res, stub;

t.beforeEach((done)=>{
    json = sinon.spy();
    stub = sinon.stub();
    stub.returns({json});
    req = {
        body: {
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

t.plan(2);

t.test('delete 400\'s is missing id.', function (tt) {
    tt.plan(3);
    req.body.id = null;
    del(req, res, redisMock);
    tt.ok(res.status.calledWith(400));
    tt.ok(json.calledWith({message:'Missing required parameters.' }));
    tt.ok(res.end.called);
});

t.test('delete 400\'s is missing owner.', function (tt) {
    tt.plan(3);
    req.body.owner = null;
    del(req, res, redisMock);
    tt.ok(res.status.calledWith(400));
    tt.ok(json.calledWith({message:'Missing required parameters.' }));
    tt.ok(res.end.called);
});
