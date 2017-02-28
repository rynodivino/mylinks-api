module.exports = {
    createClient: () => {
        return {
            del: (key, cb)=>{
                cb(null, true); 
            },
            get: ()=>{},
            het: ()=>{},
            hgetall: (o, cb) => {
                if (o === 'pma') {
                    cb(null, {
                        data:{},
                        msg: 'Success'
                    });
                } else {
                    cb();
                }
            },
            hdel: (hash, key, cb)=>{
                cb(null, true); 
            },
            hset: ()=>{},
            set: (k,v)=>{}
        };
    }
};
