const http = require('http');
const server = http.createServer((request,response)=>{
    response.setHeader('Content-type','text/html;charset=utf-8');
    response.end('会乱码吗?');
})
server.listen(80,()=>{
    console.log('服务已启动，端口号80');
})