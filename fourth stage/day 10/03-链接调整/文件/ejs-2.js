//
const ejs = require('ejs');
const fs =require('fs');

const arr = [
    {name: '杨紫', age: 20},
    {name: '李易峰', age: 20},
    {name: '杨幂', age: 25},
    {name: '刘诗诗', age: 18},
    {name: '杨洋', age: 20},
    {name: '张一山', age: 21},
];
let title = '学员信息';
let username = 'xiaoruj';

const table = fs.readFileSync('./table.html');

let html = ejs.render(table.toString(), {arr: arr, title: title, username: username});

console.log(html);
