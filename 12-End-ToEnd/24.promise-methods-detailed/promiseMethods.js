const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Promise 1 rejected');
    }, 2000);
})

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise 2 resolved');
    }, 2000);
})

const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise 3 resolved');
    }, 2000);
})

//All promises settled
Promise.allSettled([promise1, promise2, promise3])
    .then(results => console.log('All promises settled:', results))
    .catch(err => console.log('Promise allSettled rejected:', err));

//First rejected promise
Promise.all([promise1, promise2, promise3])
    .then(results => console.log('Promise all resolved:', results))
    .catch(err => console.log('Promise all rejected:', err));

//First resolved promise
Promise.any([promise1, promise2, promise3])
    .then(results => console.log('First resolved promise:', results))
    .catch(err => console.log('Promise any rejected:', err));

//First fulfilled (rejected or resolved) promise
Promise.race([promise1, promise2, promise3])
    .then(results => console.log('First fulfilled promise:', results))
    .catch(err => console.log('Promise race rejected:', err));  
