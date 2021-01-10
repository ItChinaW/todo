async function async1() {
    console.log("async1 start");
    await console.log(2);
    console.log("async1 end");
}


console.log(async1())
console.log(1);
