function asyncTask(cb) {
    console.log("Operation is running");
    setTimeout(() => {
        cb(null, "Pratap")
    }, 2000);
}

asyncTask((err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})