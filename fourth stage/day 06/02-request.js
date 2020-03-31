const http = require('http');
const urlTool = require('url');
const server = http.createServer((request,response)=>{
    // console.log(request.method);
    // console.log(request.url);//域名端口之后的url内容
    // console.log(request.httpVersion);
    // console.log(request.headers);
    // console.log(request.headers.host);
    // console.log(request.headers['cache-control']);
    // let url = request.url;
    // console.log(url);
    let res = urlTool.parse(request.url,true);
    console.log(res.pathname);
    console.log(res.query);
    response.end('test')
})
server.listen(8000,()=>{
    console.log('服务已启动');
})