console.log(process.argv[2]);
console.log(process.argv[3]);

console.log(clear);

process.argv.foreach(item => {
    console.log(item);
})

function foo() {
    bar()
}

function bar() {
    console.trace()
}

foo()