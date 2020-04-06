//统一暴露
let data = 'module2 data'

function fun1() {
    console.log('module2 fun1() ' + data);
}

function fun2() {
    console.log('module2 fun2() ' + data);
}

function foo() {
    console.log('module2 foo() ' + data);
}

export {fun1, fun2, foo}
