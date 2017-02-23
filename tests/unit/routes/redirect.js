const redirect = require('../../../routes/redirect');
const sinon = require('sinon'); 
const test = require('tap').test;

test('Test redirect route', (t) => {
    test('Test redirect success', (tt) => {
        let req = {
            link : {
                url: 'http://catdog.com'
            }
        };
        let res = {
            end: sinon.spy(),
            redirect: sinon.spy(),
            send: sinon.spy()
        };
        tt.plan(3);
        redirect(req, res);
        tt.ok(res.end.called);
        tt.ok(res.redirect.called);
        tt.notOk(res.send.called);
    });

    test('Test redirect miss.', (tt) => {
        tt.plan(3);
        const req = {};
        const res = {
            end: sinon.spy(),
            redirect: sinon.spy(),
            send: sinon.spy()
        };
        redirect(req, res);
        tt.ok(res.end.called);
        tt.notOk(res.redirect.called);
        tt.ok(res.send.called);
    });

    test('Test redirect miss (no id).', (tt) => {
        tt.plan(3);
        const req = {
            url: 'http://whatever.com' 
        };
        const res = {
            end: sinon.spy(),
            redirect: sinon.spy(),
            send: sinon.spy()
        };
        redirect(req, res);
        tt.ok(res.end.called);
        tt.notOk(res.redirect.called);
        tt.ok(res.send.called);
    });

    test('Test redirect miss (no url).', (tt) => {
        tt.plan(3);
        const req = {
            link: {
                id: 'tkp' 
            }
        };
        const res = {
            end: sinon.spy(),
            redirect: sinon.spy(),
            send: sinon.spy()
        };
        redirect(req, res);
        tt.ok(res.end.called);
        tt.notOk(res.redirect.called);
        tt.ok(res.send.called);
    });

    t.end();
});

