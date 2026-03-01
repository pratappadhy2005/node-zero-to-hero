console.log("start operation");

function sleep(miliseconds) {
    let start = new Date().getTime();
    console.log("Operation started at " + start);
    while (new Date().getTime() - start < miliseconds) {
        console.log("Operation is in progress" + (new Date().getTime() - start));
    }
    console.log("Operation completed at " + new Date().getTime());
}

sleep(2000);

console.log("Do comething else")