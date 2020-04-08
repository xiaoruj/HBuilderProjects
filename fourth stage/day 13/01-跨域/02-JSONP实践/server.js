const express = require('express');
const app = express();
app.get('/server', (request, response)=>{
    let fnName = request.query.callback;
    response.send(`${fnName}('今天没有看李易峰')`);
});
app.listen(8000, ()=>{
    console.log('服务已经启动, 端口号 8000 监听中.....');
});