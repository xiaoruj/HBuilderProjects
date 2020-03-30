const fs = require('fs');
// fs.stat('./file/app.js', (err, stats) => {
//     if(err) throw err;
//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
// });
fs.stat('./file', (err, stats) => {
    if(err) throw err;
    console.log(stats.isFile());
    console.log(stats.isDirectory());
});