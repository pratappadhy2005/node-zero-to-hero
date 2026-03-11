//NodeJS basics
const fs = require('fs');
const crypto = require('crypto');

// timers -> pending callbacks -> idle, prepare -> poll -> check -> close
console.log('1. script start');

setTimeout(() => {
    console.log('2. Settimeout 0 seconds callback (macro task)');
}, 0);

setTimeout(() => {
    console.log('3. Settimeout 0 seconds callback (macro task)');
}, 0);


setImmediate(() => {
    console.log('4. SetImmediate callback (check)');
});

Promise.resolve().then(() => {
    console.log('5. Promise callback (microtask queue)');
});

process.nextTick(() => {
    console.log('6. nextTick callback (microtask queue)');
});

fs.readFile(__filename, () => {
    console.log('7. fs.readFile callback (I/O callback)');
});

crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
    console.log('8. crypto.pbkdf2 callback (CPU intensive task)');
});

console.log('9. script end');