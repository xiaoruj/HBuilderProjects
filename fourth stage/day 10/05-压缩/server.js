const http = require('http');
const urlTool = require('url');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const mimes = require('./mimes/mimes');
const zlib = require('zlib');
const server = http.createServer((request, response) => {
    let url = urlTool.parse(request.url).pathname;
    let filePath = path.resolve(__dirname, 'public' + url);
    fs.stat(filePath, (err, stats) => {
        if (err) {
            response.statusCode = 404;
            response.end('<h1>404 Not Found</h1>');
            return;
        }
        if (stats.isDirectory()) {
            fs.readdir(filePath, (err, data) => {
                if (err) {
                    response.statusCode = 500;
                    response.end('<h1>500 Internal Error</h1>');
                    return;
                }
                response.setHeader('content-type', 'text/html;charset=utf-8');
                let templateFilePath = path.resolve(__dirname, 'views/directory.html');
                ejs.renderFile(templateFilePath, {data: data, url: url}, (err, data) => {
                    if (err) {
                        response.statusCode = 500;
                        response.end('<h1>500 Internal Error</h1>');
                        return;
                    }
                    response.end(data);
                });
            });
        } else {
            // css  =>  text/css
            const suffix = url.split('.').pop();
            if (mimes[suffix] === undefined) {
                response.setHeader('content-type', 'text/plain; charset=utf-8');
            } else {
                response.setHeader('content-type', mimes[suffix]);
            }

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    response.statusCode = 500;
                    response.end('<h1>Interval server Error</h1>')
                    return;
                }
                let encoding = request.headers['accept-encoding'];// undefined
                // console.log(encoding); //gzip, deflate, br
                if(encoding === undefined){
                    response.end(data);
                    return;
                }
                if (encoding.indexOf('gzip') !== -1) {
                    response.setHeader('content-encoding', 'gzip');
                    zlib.gzip(data, (err, result) => {
                        if (err) {
                            response.statusCode = 500;
                            response.end('<h1>Interval server Error</h1>')
                            return;
                        }
                        response.end(result);
                    });
                }
                if (encoding.indexOf('deflate') !== -1) {
                    response.setHeader('content-encoding', 'deflate');
                    zlib.deflate(data, (err, result) => {
                        if (err) {
                            response.statusCode = 500;
                            response.end('<h1>Interval server Error</h1>')
                            return;
                        }
                        response.end(result);
                    });
                }
                if (encoding.indexOf('br') !== -1) {
                    response.setHeader('content-encoding', 'br');
                    zlib.brotliCompress(data, (err, result) => {
                        if (err) {
                            response.statusCode = 500;
                            response.end('<h1>Interval server Error</h1>')
                            return;
                        }
                        response.end(result);
                    });
                }
            });
        }
    });


});

server.listen(8000, () => {
    console.log('服务已经启动， 端口 8000 监听中.....');
});