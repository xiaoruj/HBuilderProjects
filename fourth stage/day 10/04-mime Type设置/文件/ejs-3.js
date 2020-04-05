//ejs 直接解析模板
const ejs = require('ejs');

//数据
const arr = [
    {name: '杨紫', age: 20},
    {name: '李易峰', age: 20},
    {name: '杨幂', age: 25},
    {name: '刘诗诗', age: 18},
    {name: '杨洋', age: 20},
    {name: '张一山', age: 21},
];
let title = '学员信息';

ejs.renderFile('./table.html', {arr: arr, title: title}, (err, data)=>{
    if(err) throw err;
    //没有错误的话 输出结果
    console.log(data);
});
