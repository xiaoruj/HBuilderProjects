//ejs 直接解析模板
const ejs = require('ejs');

//数据
const arr = [
    {name: '1', age: 20},
    {name: '2', age: 20},
    {name: '3', age: 25},
    {name: '4', age: 18},
    {name: '5', age: 20},
    {name: '6', age: 21},
];
let title = '学员信息';

ejs.renderFile('./table.html', {arr: arr, title: title}, (err, data)=>{
    if(err) throw err;
    //没有错误的话 输出结果
    console.log(data);
});
