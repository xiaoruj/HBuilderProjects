//引入http模块
const http = require('http');

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
        response.write(`
            <link rel="stylesheet" href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
            <style>
                h2{
                    color:#2a6;
                }
            </style>
            <div class="container">
                
                <div class="col-xs-6 col-xs-offset-3">
                    <h2>用户列表</h2>
                    <table  class="table table-bordered table-hover">
                        <tr><td>姓名</td><td>年龄</td></tr>
                        ${trs}
                    </table>
                </div>
            </div>
            
            <script>
                //获取所有的 tr 标签元素
                let trs = document.querySelectorAll('tr');
                
                //遍历
                for(let i=0;i<trs.length; i++){
                    if(i % 2 === 0){
                        trs[i].style.background = '#582';
                    }else{
                        trs[i].style.background = '#a85'; 
                    }
                }
            </script>
        `);

        response.end();
    } else {
        response.end('ok');
    }
});

//监听端口 启动服务
server.listen(8000, () => {
    console.log('服务已经启动 8000 端口监听中....');
});