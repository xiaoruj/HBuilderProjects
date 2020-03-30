const fs = require('fs');
const rs = fs.createReadStream('./file/刻意练习.mp3');
const ws = fs.createWriteStream('./file/法宝.mp3');
// rs.on('data',(chunk) => {
//     console.log(chunk.length);
// });
// rs.on('data',(chunk) => {
//     ws.write(chunk);
// });
// rs.on('data',(chunk) => {
//     console.log('读取流打开了');
// });
// rs.on('data',(chunk) => {
//     console.log('读取流关闭了');
// });
//
rs.pipe(ws);
