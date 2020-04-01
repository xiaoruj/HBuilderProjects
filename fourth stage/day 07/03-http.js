const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const server = http.createServer((request, response) => {
    if(request.method.toUpperCase() === 'GET' && request.url === '/login'){
        let loginHtml = fs.readFileSync('./login.html');
        response.end(loginHtml);
    }else if(request.method.toUpperCase() === 'POST' && request.url === '/login'){
        let body = '';
        request.on('data', (chunk) => {
            body +=chunk;
        });
        request.on('end', ()=>{
            let data = qs.parse(body);
            response.setHeader('content-type','text/html;charset=utf-8');
            if(data.email === '123@qq.com' && data.password === '123'){
                response.end('<h1>:) 恭喜您登录成功</h1>');
            }else{
                response.end('<script>alert("用户名或密码错误!!")</script>');
            }

            response.end('got it');
        });
    } else {
        response.end('test');
    }
});
server.listen(8000);