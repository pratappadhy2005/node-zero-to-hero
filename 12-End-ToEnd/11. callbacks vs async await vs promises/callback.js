function asyncTask(cb) {
    console.log("Operation is running");
    setTimeout(() => {
        cb(null, "Pratap")
    }, 2000);
}

function makeAPICall() {
    setTimeout(() => {
        console.log("This is a async task execution")
    }, 0);
}

makeAPICall(() => {
    makeAPICall(() => {
        asyncTask(() => {
            console.log("Async task is done")
            asyncTask(() => {
                console.log("Another Async task is done")
            })
        })
    })
})