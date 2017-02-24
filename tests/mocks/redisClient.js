module.exports = {
    createClient: () => {
        return {
            del: ()=>{
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
                }
            },
            hdel: ()=>{
                cb(null, true); 
            },
            hset: ()=>{},
            set: ()=>{}
        }
    }
};
