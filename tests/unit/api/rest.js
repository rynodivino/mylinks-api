const mockery = require('mockery');
const tap = require('tap');
const test = tap.test;
const redisMock = {
    createClient: () => { return {}; }
};


test('Ryan is a sucker', (t) => {
    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
    });
    mockery.registerMock('redis', redisMock);
    let rest = require('../../../api/rest');

    t.plan(3);
    t.ok(rest.del);
    t.ok(rest.post);
    t.ok(rest.put);
});
