//导入模块
import '@babel/polyfill';
import {add} from './m1';
import {cheng, chu} from './m2';
import minus from './m3';

console.log(add(1, 2));
console.log(minus(10, 5));
console.log(cheng(10, 20));
console.log(chu(10, 20));

//导入 JSON
import star from '../json/data';
console.log(star);

//导入Less文件
import '../css/app.less';
import '../css/home.less';

//ESlint 语法检查
// console.log(a);

//ESlint 环境检查
// window.star = 'abc';
// global.star = 'def';

//ESlint 全局变量声明
// console.log(age);

//ESlint 检测规则
// console.log(2 == 2);

//Eslint for 规则
// for (var i = 100; i > 0; i++) {
//
// }

//ES6 语法转换
let name = 'xiaoru';
let fn = () => {
    console.log('fn');
};

//JS 兼容性处理
new Promise((resolve, reject)=>{
    resolve('成功啦!!');
}).then(value=>{
    console.log(value);
}, reason=>{
    console.error(reason);
});
// let flag = true;
// console.log(222);

