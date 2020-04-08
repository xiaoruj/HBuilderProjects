const express = require('express');

const app = express();

app.get('/jsonp-server', (request, response)=>{
    let str = '这是服务器的一个数据';
    let json = {
        name: 'xiaoru',
        age: 30
    };
    let jsonStr = JSON.stringify(json);
    response.end(`run('${jsonStr}')`)
});

app.listen(8000, ()=>{
    console.log('服务已经启动, 端口号 8000 监听中.....');
});