let ejs = require('ejs');
//声明一个数组
// let people = ['geddy', 'neil', 'alex'];
//数据解析 渲染
// let html = ejs.render('<%= people.join(", "); %>', {people: people});

let title = '今天是礼拜四！！！';
let arr = ['曹震','宝红','杨晨','杨博'];

let html = require('fs').readFileSync('./users.html');

let res = ejs.render(html.toString(), {abc: title, arr: arr});

console.log(res);