console.log("start operation");

function asyncTask(cb) {
    console.log("Operation is running");
    setTimeout(() => {
        cb()
    }, 2000);
}

asyncTask(() => {
    console.log(name)
})
const name = "Pratap"
console.log("end operation");