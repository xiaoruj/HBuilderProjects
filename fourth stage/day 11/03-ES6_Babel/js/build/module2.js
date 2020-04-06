'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
//统一暴露
var data = 'module2 data';

function fun1() {
    console.log('module2 fun1() ' + data);
}

function fun2() {
    console.log('module2 fun2() ' + data);
}

function foo() {
    console.log('module2 foo() ' + data);
}

exports.fun1 = fun1;
exports.fun2 = fun2;
exports.foo = foo;