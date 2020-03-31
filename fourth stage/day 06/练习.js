require('http').createServer((request, response) => {
    //返回一个表格
    //设置响应头
    response.setHeader('content-type','text/html;charset=utf-8');
    response.write(`
        <table border="1">
            <tr><td>姓名</td><td>年龄</td></tr>
            <tr><td>迪丽热巴</td><td>28</td></tr>
            <tr><td>古力娜扎</td><td>28</td></tr>
            <tr><td>马尔扎哈</td><td>25</td></tr>
        </table>
    `);
    response.end();

}).listen(8000, () => {
    console.log('server is running....');
});