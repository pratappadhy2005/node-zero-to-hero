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

        // set key
        await client.set('test', 'hello world');
        console.log('Key set successfully');
        const value = await client.get('test');
        console.log('Value:', value);

        //delete key
        await client.del('test');
        console.log('Key deleted successfully');

        //check if key exists
        const updatedValue = await client.get('test');
        console.log('Updated Value:', updatedValue);

        //increment count
        await client.incr('count');
        console.log('Count incremented successfully');
        await client.set('count', 0);
        console.log('Count set successfully');
        const count = await client.incr('count');
        console.log('Count:', count);

    } catch (err) {
        console.error('Error deleting key:', err);
    } finally {
        await client.quit();
    }
}

testRedis();