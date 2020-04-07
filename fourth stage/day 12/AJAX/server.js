const express = require('express');
const app = express();
app.get('/get_page', (request,response) =>{
    response.sendFile(__dirname + '/01-GET.html');
});
app.get('/get-server', (request,response) =>{
    response.send('服务器的数据');
});
app.get('/get-server-params', (request,response) =>{
    console.log(request.query.wd);
    response.send('我已经收到数据了');
});

app.get('/post-page',(request,response)=>{
    response.sendFile(__dirname + '/02-POST.html');
});
app.post('/post-server',(request,response)=>{
    let body = '';
    request.on('data', (chunk) =>{
        body += chunk;
    });
    request.on('end', () =>{
        console.log(body);
        console.log(request.headers);
        response.send('POST 请求的响应');
    })
});

app.get('/async-page',(request,response)=>{
    response.sendFile(__dirname + '/03-Async.html');
});
app.get('/async-server',(request,response)=>{
    response.send('HTTP响应');
});

app.get('/JSON-page',(request,response)=>{
    response.sendFile(__dirname + '/04-JSON.html');
});
app.get('/JSON-server',(request,response)=>{
    let obj = {
        "id": 1316,
        "hitokoto": "力所能及的帮助他人是我们做人的本分，刻意的那么做就超出了我们的能力范畴，说不定还会引来恶意的猜想。",
        "type": "e",
        "from": "胡说八道",
        "from_who": null,
        "creator": "宝宝洗头爱飘柔",
        "creator_uid": 898,
        "reviewer": 0,
        "uuid": "f41e8048-50d2-45ce-b07c-5a5aabaf3fc4",
        "created_at": "1512718665"
    };
    let data = JSON.stringify(obj);
    response.setHeader('content-type','application/json');
    response.end(data);


});
app.get('/IE-page', (request, response) => {
    response.sendFile(__dirname + '/05-IE缓存问题.html');
});

app.get('/IE-server', (request, response) => {
    response.end('IE server');
});






app.listen(8000, ()=>{
   console.log('服务已经启动，端口号8000监听中');
});