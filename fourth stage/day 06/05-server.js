const fs = require('fs');
require('http').createServer((request,response)=>{
    if(request.method.toUpperCase() === 'GET' && request.url === 'index.html'){
        fs.readFile(__dirname + 'public/index.html', (err, data) =>{
            if(err) {
                console.log(err);
                response.end('server error');
                return;
            }
            response.end(data);
        });
    }else if(request.method.toUpperCase() === 'GET' && request.url === 'css/app.css'){
        fs.readFile(__dirname + 'public/css/app.css', (err, data)=>{
            if(err) throw err;
            response.end(data);
        });
    }else if(request.method.toUpperCase() === 'GET' && request.url === 'js/app.js'){
        fs.readFile(__dirname + 'public/js/app.js', (err, data)=>{
            if(err) throw err;
            //成功的话将文件内容 返回给客户端
            response.end(data);
        });
    }else if(request.method.toUpperCase() === 'GET' && request.url === 'home.html'){
        fs.readFile(__dirname + 'public/home.html', (err, data)=>{
            if(err) throw err;
            response.end(data);
        });
    } else{
        response.end('static');
    }
}).listen(8000, () => {console.log('server is running....')})



