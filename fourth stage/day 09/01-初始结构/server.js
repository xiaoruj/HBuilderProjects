const http = require('http');
const urlTool = require('url');
const path = require('path');
const fs = require('fs');
const server = http.createServer((request,response) => {
    let url = urlTool.parse(request.url).pathname;
    let filePath = path.resolve(__dirname, 'public' + url);
    fs.stat(filePath, (err, stats) =>{
        if (err){
            response.statusCode = 404;
            response.end('<h1>404 Not Found</h1>');
            return;
        }
        if(stats.isDirectory()){
             fs.readdir(filePath, (err, data) => {
                 if(err){
                     response.statusCode = 500;
                     response.end('<h1>500 Internal Error</h1>');
                     return;
                 }
                 response.setHeader('content-type','text/html;charst=utf-8');
                 let ul = '<ul>';
                 for (let i = 0; i <  data.length; i++){
                    ul += `<li>${data[i]}</li>`;
                 }
                 ul += '</ul>'
                 response.end(ul);
             })
        }
    })
    fs.readFile(filePath, (err, data) => {
        if(err) {

        }
        response.end(data);
    });



})
server.listen(8000, () => {
    console.log('服务已启动，端口8000监听中');
});