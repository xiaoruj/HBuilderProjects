const fs = require('fs');
const path = require('path');
// fs.readFile(__dirname + '/file/index.html', (err, data)=>{
//     if(err) throw err;
//     console.log(data.toString());
// });

let res = path.resolve(__dirname,'file/index.html');
console.log(res);
console.log(__dirname + '/file/index.html');