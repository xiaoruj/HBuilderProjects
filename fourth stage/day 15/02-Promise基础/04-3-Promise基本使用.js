const fs = require('fs');
// fs.readFile('./resource/1.html',(err, data)=>{
//     if(err) throw err;
//     fs.readFile('./resource/2.html', (err, data2) => {
//         if (err) throw err;
//         console.log(data + data2);
//     });
// });
let p = new Promise((resolve,reject)=>{
    fs.readFile('./resource/1.html', (err, data)=>{
        if(err){
            return reject(err);
        }
        resolve(data);
    });
});
p.then(
    function (value) {
        return new Promise((resolve, reject) => {
            fs.readFile('./resource/2.html', (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(value + data);
            });
        })
    },
    function (reason) {
    },
).then(
    function (value) {
       fs.readFile('./resource/3.html', (err, data) =>{
           console.log(value + data);
       });
    },
    function (reason) {
    },
)