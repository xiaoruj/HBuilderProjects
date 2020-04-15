//引入
const express = require('express');
const app = express();
app.get('/page', (request, response)=>{
    response.sendFile(__dirname + '/ajax.html');
});
app.all('./server', (request, response)=>{
    if(request.method === 'POST'){
        let body = '';
        request.on('data', chunk =>{
            body += chunk;
        });

        request.on('end', ()=>{
            console.log(body);
            response.send('响应的数据');
        });
    }

    if(request.method === 'GET'){
        response.send('响应的数据');
    }
});
app.listen(8000, ()=>{
    console.log('服务已启动')
})