//引入http模块
const http = require('http');
const fs = require('fs');
//
const server = http.createServer((request, response) => {
    //判断路径和请求的方法
    if (request.method.toUpperCase() === 'GET' && request.url === '/users') {
        //设置字符集
        response.setHeader('content-type', 'text/html;charset=utf-8');
        //用户信息数组
        const arr = [
            {name: '李易峰', age: 33},
            {name: '杨紫', age: 28},
            {name: '张一山', age: 25},
            {name: '杨幂', age: 34},
            {name: '刘诗诗', age: 33},
            {name: '吴奇隆', age: 50},
        ];
        //遍历数组 拼接 tr td 的字符串
        let trs = '';
        for (let i = 0; i < arr.length; i++) {
            trs += `<tr><td>${arr[i].name}</td><td>${arr[i].age}</td></tr>`;
        }

        //返回表格
        let data = fs.readFileSync('./users.html');

        response.end(data);
    } else {
        response.end('ok');
    }
});

//监听端口 启动服务
server.listen(8000, () => {
    console.log('服务已经启动 8000 端口监听中....');
});