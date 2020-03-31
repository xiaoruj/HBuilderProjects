const http = require('http');
const qs = require('querystring');
http.createServer((request,response)=>{
    // response.end('ok?');
    let data = '';
    request.on('data',(chunk) => {
        data += chunk;
    });
    request.on('end', () => {
        console.log(data);
        let result = qs.parse(data);
        console.log(result);
        response.end('ok');
    });
}).listen(8000,()=>{
    console.log('server is running');
})
