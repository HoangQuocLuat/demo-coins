const redis = require('redis');
const redisConfig = require('../../config/redis')
const redisCache = redis.createClient(redisConfig);
redisCache.on('connect', () => {
    console.log('[redisCacheConnected]');
});
redisCache.on('reconnecting', () => {
    console.log('[redisCacheReconnecting]');
});
redisCache.on('error', (err) => {
    console.log('[redisCacheError]', err);
});

module.exports = {
    redis: redisCache
}