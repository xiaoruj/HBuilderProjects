const express = require('express');
const app = express();
app.get('/', (request,response) =>{
    response.end('hello express');
});
app.get('/admin', (request, response)=>{
    response.end('admin page');
});
app.get('/home', (request, response)=>{
    response.sendFile(__dirname + '/home.html');
});




app.listen(8000, ()=>{
   console.log('服务已经启动，端口号8000监听中');
});