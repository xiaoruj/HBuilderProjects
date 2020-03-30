const fs = require('fs');
//创建文件夹images css js和文件index.html
// fs.mkdirSync('./page');
// fs.mkdirSync('./page/images');
// fs.mkdirSync('./page/css');
// fs.mkdirSync('./page/js');
// fs.mkdirSync('./page/index.html');
//
fs.mkdir('./page-2', function (err) {
    if (err) throw err;
    console.log('page-2 文件夹创建成功');

    fs.mkdir('./page-2/images', function (err) {
        if (err) throw err;
        console.log('page-2/images 文件夹创建成功');
    });

    fs.mkdir('./page-2/css', function (err) {
        if (err) throw err;
        console.log('page-2/css 文件夹创建成功');
    });

    fs.mkdir('./page-2/js', function (err) {
        if (err) throw err;
        console.log('page-2/js 文件夹创建成功');
    });

    fs.writeFile('./page-2/index.html', '', (err) => {
        if (err) throw err;
        console.log('page-2/index.html 文件创建成功');
    });
});