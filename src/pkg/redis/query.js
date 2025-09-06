const {redis} = require('./config');

const saveHash = (key, field, data) => {
    return new Promise((resolve, reject) => {
        data = typeof data === 'string' ? data : JSON.stringify(data);
        redis.hset(key, field, data, (err, result) => {
            if (err) return reject(err)
            return resolve(result)
        });
    })
}

const saveKey = (key, data, js = true) => {
    return new Promise((resolve, reject) => {
        let d = data;
        try {
            d = (typeof data === 'string' || !js) ? data : JSON.stringify(data);
        } catch (err) {
            d = data;
        }
        
        redis.set(key, d, (err, result) => {
            if (err) return reject(err)
            return resolve(result)
        });
    })
}

const saveKeyString = (key, data, js = true) => {
    return new Promise((resolve, reject) => {redis.set(key, data, (err, result) => {
            if (err) return reject(err)
            return resolve(result)
        });
    })
}

const setExpire = (key, data, exp = 86400) => {
    return new Promise((resolve, reject) => {
        data = (typeof data === 'string') ? data : JSON.stringify(data);
        redis.setex(key, exp, data, (err, result) => {
            if (err) return reject(err)
            return resolve(result)
        });
    })
}

const getKey = (key) => {
    return new Promise((resolve, reject) => {
        redis.get(key, (err, result) => {
            if (err) return reject(err)
            if (!result) resolve(null)
            try {
                const v = (typeof result === 'string') ? JSON.parse(result) : result;
                return resolve(v);
            } catch (err) {
                return resolve(result)
            }
        });
    })
}

const getKeyString = (key) => {
    return new Promise((resolve, reject) => {
        redis.get(key, (err, result) => {
            if (err) return reject(err)
            if (!result) resolve(null)
            return resolve(result)
        });
    })
}

const getHash = async(key) => {
    return new Promise((resolve, reject) => {
        redis.hvals(key, (err, arr) => {
            if (err) return reject(err)
            if (!arr.length) return resolve([])
            const x = arr.map(it => {
                return JSON.parse(it)
            })
            return resolve(x)
        });
    });
}

const getHashField = async(key, field, isObj = true) => {
    return new Promise((resolve, reject) => {
        redis.hget(key, field, (err, data) => {
            if (err) return reject(err)
            if (!data) return resolve(null);
            const v = (typeof data === 'string' && isObj) ? JSON.parse(data) : data;
            return resolve(v);
        });
    });
}

const checkHashField = async(key, field) => {
    return new Promise((resolve, reject) => {
        redis.hexists(key, field, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    });
}

const del = (key) => {
    return new Promise((resolve, reject) => {
        redis.del(key, (err, data) => {
            if (err) return reject(err)
            return resolve(data);
        });
    });
}

const hashDel = (key, field) => {
    return new Promise((resolve, reject) => {
        redis.hdel(key, field, (err, data) => {
            if (err) return reject(err)
            return resolve(data);
        });
    });
}

const sAdd = (key, data) => {
    return new Promise((resolve, reject) => {
        redis.sadd(key, data, (err, result) => {
            if (err) return reject(err)
            return resolve(result)
        });
    })
}

const removeSadd = (key, data) => {
    return new Promise((resolve, reject) => {
        redis.srem(key, data, (err, result) => {
            if (err) return reject(err)
            return resolve(result)
        });
    })
}

const sMembers = (key) => {
    return new Promise((resolve, reject) => {
        redis.smembers(key, (err, result) => {
            if (err) return reject(err);
            return resolve(result || []);
        });
    });
};

module.exports = {
    saveHash,
    getHash,
    getHashField,
    del,
    saveKey,
    getKey,
    setExpire,
    saveKeyString,
    getKeyString,
    sAdd,
    removeSadd,
    checkHashField,
    hashDel,
    sMembers
}