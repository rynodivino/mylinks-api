const redisMock = require('../../mocks/redisClient');
const sinon = require('sinon');
const t = require('tap');

/**
 *
'use strict';

module.exports = (req, res, redisClient) => {
    if (!req.body.id || !req.body.owner) {
        res.status(400).json({
            message: 'Missing required parameters.'
        });
    }
    redisClient.get(req.body.id, (err, data) => {
        if (data) {
            const link = JSON.parse(data);
            if (link.owner === req.body.owner) {
                // need to async or promis these nested callbacks.
                redisClient.del(link.id, (err, reply) => {
                    if (reply !== undefined) {
                        redisClient.hdel(req.body.owner, req.body.id, (err, reply) => {
                            if (reply !== undefined) {
                                res.status(200).json({msg: 'Success'});
                            }
                        });
                    }
                });
                // delete owner hash as well.
            } else {
                res.status(401).json({
                    msg: 'Failed.  Only owner can delete this link.'
                });
            }
        } else {
            res.status(401).json({
                msg: 'Failed.  Link does not exist.'
            });
        }
    }); 
};
*/

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
