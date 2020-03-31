const fs = require('fs');
require('http').createServer((request,response)=>{
    if(request.method.toUpperCase() === 'GET' && request.url === '/index.html'){
        fs.readFile(__dirname + '/public/index.html', (err, data) =>{
            if(err) {
                console.log(err);
                response.end('server error');
                return;
            }
            response.end(data);
        });
    }else{
        response.end('static');
    }
}).listen(8000, () => {console.log('server is running....')})



