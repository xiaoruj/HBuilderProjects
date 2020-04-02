//
const ejs = require('ejs');
const fs =require('fs');

const arr = [
    {name: '杨博', age: 20},
    {name: '曹震', age: 20},
    {name: '福龙', age: 25},
    {name: '刘燕', age: 18},
    {name: '宝红', age: 20},
    {name: '佳怡', age: 21},
];
let title = '学员信息';
let username = 'xiaohigh';

//生成一个HTML表格 ejs 模板引擎
const table = fs.readFileSync('./table.html');

let html = ejs.render(table.toString(), {arr: arr, title: title, username: username});

console.log(html);
