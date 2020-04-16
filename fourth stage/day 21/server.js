const express = require('express');
const app = express();
app.get('/basic', (request, response)=>{
    response.sendFile(__dirname + '/01-axios基本使用.html');
});

app.get('/other-use', (request, response)=>{
    response.sendFile(__dirname + '/02-axios其他使用.html');
});

app.get('/json-server', (request, response) => {
    response.sendFile(__dirname + '/03-1-axios与json-server通讯.html');
});

app.get('/articles', (request, response) => {
    response.sendFile(__dirname + '/03-2文章管理.html');
});

//创建服务的接口
app.all('/server', (request, response)=>{
    response.send('服务器的数据!');
});