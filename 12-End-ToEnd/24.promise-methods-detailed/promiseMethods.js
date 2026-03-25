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

Promise.allSettled([promise1, promise2, promise3])
    .then(results => console.log(results))
    .catch(err => console.log('Promise all rejected:', err));