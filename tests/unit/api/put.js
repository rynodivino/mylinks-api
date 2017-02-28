'use strict';
const redisMock = require('../../mocks/redisClient');
const redisClient = redisMock.createClient();
const sinon = require('sinon');
const t = require('tap');

let json, put, req, res, stub;

t.beforeEach((done)=>{
    json = sinon.spy();
    stub = sinon.stub();
    stub.returns({json});
    req = {
        body: {
            id: 'blah',
            owner: 'me'
        },
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
    put = require('../../../api/put');
    done();
});

t.plan(7);

t.test('put:getCallback 401 if no data.', function (tt) {
    tt.plan(3);
    req.body.id = null;
    const cb = put.getCallback(req, res, redisClient);
    cb(null, null);
    tt.ok(res.status.calledWith(401));
    tt.ok(json.calledWith({message:'Failed.  Link does not exist.' }));
    tt.ok(res.end.called);
});

t.test('put:getCallback 401 with bad data.', function (tt) {
    tt.plan(3);
    req.body.id = null;
    const cb = put.getCallback(req, res, redisClient);
    cb(null, JSON.stringify({
        el: 'barto'
    }));
    tt.ok(res.status.calledWith(401));
    tt.ok(json.calledWith({message:'Failed.  Only owner can update this link.' }));
    tt.ok(res.end.called);
});

t.test('put:getCallback not owner.', function (tt) {
    tt.plan(3);
    req.body.id = null;
    const cb = put.getCallback(req, res, redisClient);
    cb(null, JSON.stringify({
        id: 'mcdunnah',
        owner: 'you'
    }));
    tt.ok(res.status.calledWith(401));
    tt.ok(json.calledWith({message:'Failed.  Only owner can update this link.' }));
    tt.ok(res.end.called);
});

t.test('put:getCallback success.', function (tt) {
    const cb = put.getCallback(req, res, redisClient);
    cb(null, JSON.stringify({
        id: 'blah',
        owner: 'me'
    }));
    tt.ok(res.status.calledWith(200));
    tt.ok(json.calledWith({message:'Success' }));
    tt.ok(res.end.called);
    tt.end();
});

t.test('put:put missing id.', function (tt) {
    req.params.id = null;
    put.put(req, res, redisMock);
    tt.plan(2);
    tt.ok(res.status.calledWith(401));
    tt.ok(json.calledWith({message:'Missing required parameters.'}));
});

t.test('put:put missing owner.', function (tt) {
    req.params.owner = null;
    put.put(req, res, redisMock);
    tt.plan(2);
    tt.ok(res.status.calledWith(401));
    tt.ok(json.calledWith({message:'Missing required parameters.'}));
});

t.test('put:put success.', function (tt) {
    put.put(req, res, redisClient);
    tt.plan(2);
    tt.ok(redisClient.get.called);
    tt.ok(redisClient.get.calledWith(req.params.id));
});
