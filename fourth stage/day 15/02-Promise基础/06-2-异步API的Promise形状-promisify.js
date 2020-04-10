const fs = require('fs');
const util = require('util');
let mYreadFile = util.promisify(fs.readFile);
// mYreadFile('./resource/1.html')
//     .then(value=>{
//         console.log(value.toString());
//     }, reason=>{
//         console.error(reason);
//     });

let mYreadDir = util.promisify(fs.readdir);

mYreadDir('./abc').then(value=>{
    console.log(value);
}, reason=>{
    console.log(reason);
})
