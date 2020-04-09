const express = require('express');
const qs = require('querystring');
const users = require('./users');
const app = express();
app.get('/register', (request, response)=>{
    response.sendFile(__dirname + '/register.html');
});
app.post('/check-username', (request, response)=>{
    let body = '';
    request.on('data', (chunk)=>{
        body += chunk;
    });
    request.on('end', ()=>{
        let data = qs.parse(body);
        let username = data.username;
        for(let i=0;i<users.length;i++){
            if(username === users[i].username){
                response.end('0');
                return;
            }
        }
        response.end('1');
    });
});
app.post('/register', (request, response)=>{
    response.send('ok');
});
app.listen(8000, ()=>{
    console.log('服务已经启动, 端口号 8000 监听中.....');
});