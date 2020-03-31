require('http').createServer((request, response) => {
    response.statusCode = 200;
    response.statusMessage = 'ok';
    response.setHeader('content-type','text/html;charset=utf-8')
    response.setHeader('class','h51227');//自定义响应头
    // response.write('<h1>这是一个测试网页</h1>');
    response.end('test');
}).listen(8000, () => {
        console.log('server is running');
});
