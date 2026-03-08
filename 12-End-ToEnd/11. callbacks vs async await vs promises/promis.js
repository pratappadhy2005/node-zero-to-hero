const promise = new Promise((resolve, reject) => {
    if (false) {
        const person = {
            name: 'Pratap',
            age: 30
        }
        resolve(person);
    } else {
        const err = { "errorCode": 404, "errorMessage": "Not Found  " }
        reject('Promise rejected');
    }
});

promise.then(result => console.log(result));
promise.catch(err => console.error(err));
promise.finally(() => console.log("Promise settled"));


let p = Promise.resolve(100);
p.then(result => console.log(result));

let p1 = Promise.reject("Error");
p1.catch(err => console.error(err));
p1.finally(() => console.log("Promise settled"));

// Coverting normal method to promise
function asyncTask() {
    return Promise.resolve("Async Task is done");
}

asyncTask().then(result => console.log(result));

//Chaining multiple promises
asyncTask()
    .then(result => console.log(result))
    .then(() => console.log("Second then"))
    .catch(err => console.error(err))
    .finally(() => console.log("Promise settled"));

// Pain point in callbacks
const makeAPICall = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("This API is executed after " + time + " ms")
        }, time);
    })
}

//Multi API call
let multiAPICall = []
multiAPICall.push(makeAPICall(2000))
multiAPICall.push(makeAPICall(3000))
multiAPICall.push(makeAPICall(4000))

Promise.all(multiAPICall)
    .then(results => console.log(results))
    .catch(err => console.error(err))
    .finally(() => console.log("Promise settled"));

//Which promise is executed first
Promise.race(multiAPICall)
    .then(value => console.log(value))
    .catch(err => console.error(err))
    .finally(() => console.log("Promise settled"));