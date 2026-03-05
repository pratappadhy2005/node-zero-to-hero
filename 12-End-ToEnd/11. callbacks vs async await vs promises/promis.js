const promise = new Promise((resolve, reject) => {
    if (true) {
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