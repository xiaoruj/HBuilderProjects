const http = require('http');
const urlTool = require('url');
const path = require('path');
const fs = require('fs');

const server = http.createServer((request, response) => {
    let url = urlTool.parse(request.url).pathname;
    let filePath = path.resolve(__dirname, 'public' + url);
    fs.stat(filePath, (err, stats) =>{
        if(err) {
            response.statusCode = 404;
            response.end('<h1>404 Not Found</h1>');
            return;
        }
    });

    fs.readFile(filePath, (err, data) => {
        if(err) {

        }
        response.end(data);
    });
});

server.listen(8000, ()=>{
    console.log('服务已经启动， 端口 8000 监听中.....');
});