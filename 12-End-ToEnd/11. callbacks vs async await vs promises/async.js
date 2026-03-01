console.log("start operation");

function sleep(miliseconds) {
    console.log("Operation is running");
    setTimeout(() => {
        console.log("Operation is done");
    }, miliseconds);
}

sleep(2000);

console.log("Do comething else")