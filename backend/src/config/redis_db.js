const { createClient } = require('redis');
require('dotenv').config();
const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-15018.crce283.ap-south-1-2.ec2.cloud.redislabs.com',
        port: 15018
    }
});

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar


module.exports = client;

