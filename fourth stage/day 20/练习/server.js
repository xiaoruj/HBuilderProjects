//引入
const express = require('express');
const news = require('./data');
const app = express();
app.get('./', (request, response)=>{
    response.send('ok');
});
app.get('./news', (request, response)=>{
    let dataStr = JSON.stringify(news);
    response.setHeader('content-type','application/json;charset=utf-8');
    response.setHeader('Access-Control-Allow-Origin','*');
    response.end(dataStr);
});
app.listen(8000, ()=>{
    console.log('服务已启动')
})