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

async function dataStructure() {
    try {
        await client.connect();

        // String  -> SET, GET, MSET, MGET
        await client.set("user.name", "Pratap");
        console.log("User Name Set");
        const uName = await client.get("user.name");
        console.log("User Name:", uName);

        await client.mSet({ "user.name": "Pratap", "user.age": "30" });
        console.log("User Name and Age Set");
        const [userName, userAge] = await client.mGet(["user.name", "user.age"]);
        console.log("User:", { userName, userAge });

        // lists -> LPUSH, RPUSH, LPOP, RPOP, LANGE
        await client.lPush("notes", ["Note 1", "Note 2", "Note 3"]);
        console.log("User Name List Pushed");
        const userList = await client.lRange("notes", 0, -1);
        console.log("User List:", userList);

        // Pop an element from the left end of the list
        const leftPopped = await client.lPop("notes");
        console.log("Left Popped:", leftPopped);

        // Pop an element from the right end of the list
        const rightPopped = await client.rPop("notes");
        console.log("Right Popped:", rightPopped);

        // Get the updated list after popping
        const updatedList = await client.lRange("notes", 0, -1);
        console.log("Updated List:", updatedList);

        // sets -> SADD, SMEMBERS, SREM, SCARD
        await client.sAdd("supernotes", ["Note 4", "Note 5", "Note 6"]);
        console.log("User Name Set Added");
        const setList = await client.sMembers("supernotes");
        console.log("User Set:", setList);

        // Remove an element from the set
        await client.sRem("supernotes", "Note 5");
        console.log("Note 5 Removed");

        // Get the updated set after removing
        const updatedSet = await client.sCard("supernotes");
        console.log("Updated Set:", updatedSet);

    } catch (err) {
        console.error('Error connecting to Redis:', err);
    } finally {
        await client.quit();
    }
}

dataStructure();
