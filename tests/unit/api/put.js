'use strict';
const redisMock = require('../../mocks/redisClient').createClient();
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

t.plan(4);

t.test('put:getCallback 401 if no data.', function (tt) {
    tt.plan(3);
    req.body.id = null;
    const cb = put.getCallback(req, res, redisMock);
    cb(null, null);
    tt.ok(res.status.calledWith(401));
    tt.ok(json.calledWith({message:'Failed.  Link does not exist.' }));
    tt.ok(res.end.called);
});

t.test('put:getCallback 401 with bad data.', function (tt) {
    tt.plan(3);
    req.body.id = null;
    const cb = put.getCallback(req, res, redisMock);
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
    const cb = put.getCallback(req, res, redisMock);
    cb(null, JSON.stringify({
        id: 'mcdunnah',
        owner: 'you'
    }));
    tt.ok(res.status.calledWith(401));
    tt.ok(json.calledWith({message:'Failed.  Only owner can update this link.' }));
    tt.ok(res.end.called);
});

t.test('put:getCallback success.', function (tt) {
    const cb = put.getCallback(req, res, redisMock);
    cb(null, JSON.stringify({
        id: 'blah',
        owner: 'me'
    }));
    tt.ok(res.status.calledWith(200));
    tt.ok(json.calledWith({message:'Success' }));
    tt.ok(res.end.called);
    tt.end();
});
