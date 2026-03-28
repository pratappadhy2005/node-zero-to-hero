const redis = require('redis');

const client = redis.createClient(
    {
        host: 'localhost',
        port: 6379,
    }
);

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis Error:', err);
});

async function testRedis() {
    try {
        await client.connect();
        await client.set('test', 'hello world');
        console.log('Key set successfully');
        const value = await client.get('test');
        console.log('Value:', value);
    } catch (err) {
        console.error('Error setting key:', err);
    } finally {
        await client.quit();
    }
}

testRedis();