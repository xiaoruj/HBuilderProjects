const express = require('express');
const app = express();
app.get('/server', (request, response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    response.statusCode = 404;
    response.send('Not Found');
});

app.listen(8000, ()=>{
    console.log('服务已经启动, 端口号 8000 监听中.....');
});