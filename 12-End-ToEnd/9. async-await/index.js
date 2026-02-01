function delayFn(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncFn() {
    console.log('Start');
    await delayFn(200);
    console.log('after 2 seconds promise resolved');
    console.log('End');
}

//asyncFn();

async function divideFn(num1, num2) {
    try {
        if (num2 === 0) {
            throw 'Cannot divide by zero';
        }
        return num1 / num2;
    } catch (error) {
        throw error;
    }
}

async function asyncDivideFn() {
    try {
        console.log(await divideFn(10, 2));
    } catch (error) {
        console.error(error);
    }
    try {
        console.log(await divideFn(10, 0));
    } catch (error) {
        console.error(error);
    }
}


//asyncDivideFn();

console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");
