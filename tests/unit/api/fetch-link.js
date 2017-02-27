'use strict';
module.exports = (client, id, cb) => {
    if (client && id && cb) {
        return client.get(id, cb);
    }
};

const fetch = require('../../../api/fetch-link');
const t = require('tap');
const sinon = require('sinon');
const client = {
    get: sinon.spy()
};


t.plan(4);

t.test('Client is required', (tt) => {
    tt.plan(1);
    fetch(null, 'hi', 'cb'); 
    tt.ok(client.get.notCalled);
});

t.test('Id is required', (tt) => {
    tt.plan(1);
    fetch(client, null, 'cb'); 
    tt.ok(client.get.notCalled);
});

t.test('cb is required', (tt) => {
    tt.plan(1);
    fetch(client, 'id', null); 
    tt.ok(client.get.notCalled);
});

t.test('fetches correctly if params provided', (tt) => {
    tt.plan(1);
    fetch(client, 'id', 'cb'); 
    tt.ok(client.get.called);
});
