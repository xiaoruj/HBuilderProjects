const fs = require('fs');
// fs.readFile('./file/home.html',(err, data) =>{
//     if(err) throw err;
//     console.log(data.toString());
// })

//同步API
const data = fs.readFileSync('./file/home.html');
console.log(data.toString());
