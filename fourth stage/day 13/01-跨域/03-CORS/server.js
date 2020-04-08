const express = require('express');
const app = express();
app.get('/server', (request, response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send('ok');
});

app.listen(8000, ()=>{
    console.log('服务已经启动, 端口号 8000 监听中.....');
});