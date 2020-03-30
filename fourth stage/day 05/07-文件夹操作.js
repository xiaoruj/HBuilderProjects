const fs = require('fs');
// fs.mkdir('page',err =>{
//     if(err) throw err;
//     console.log('创建成功');
// })

// fs.readdir('C:/', (err,data) =>{
//     if(err) throw err;
//     console.log(data);
// })

fs.rmdir('page', err =>{
    if(err) throw err;
    console.log('删除成功');
});
