const fs = require('fs');
//调入方法写入文件 在当前文件夹下创建并写入
// fs.writeFile('./index.html','老爸回家了',{flag: 'a'}, function(err){
//     // if(err){
//     //     console.log(err);
//     //     return;
//     // }
//     // console.log('写入成功');
//     if (err) throw err;
//     console.log('写入成功');
// });

// fs.writeFile('./file/home.css','*{margin:0px;padding:0px;}', function(err){
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log('写入',Date.now());
// });

//同步写入
fs.writeFileSync('./file/app.js','console.log("这是一个测试")'+Date.now());
console.log('结束',Date.now());