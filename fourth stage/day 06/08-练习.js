const fs = require('fs');
const urlTool = require('url');
const path = require('path');
require('http').createServer((request,response)=>{
    let url = urlTool.parse(request.url).pathname;
    let filePath = path.resolve(__dirname, 'public' + url);
    fs.readFile(filePath, (err, data) => {
        if(err) {
            response.statusCode = 404;
            response.end('Not Found');
            return;
        }
        response.end(data);
    });
}).listen(8000, () => {console.log('server is running....')})



