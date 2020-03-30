const fs = require('fs');
//移动
// fs.rename('./index.html','./file/index.html',(err) => {
//     if(err) throw err;
//     console.log('移动成功');
// });
//重命名
// fs.rename('./file/home.css','./file/app.css',(err) => {
//     if(err) throw err;
//     console.log('重命名成功');
// });

fs.renameSync('./file/home.html','./file/logo.png');
