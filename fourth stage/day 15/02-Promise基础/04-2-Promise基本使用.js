const fs = require('fs');
fs.readFile('./resource/1.html',(err, data)=>{
    if(err) throw err;
    console.log(data.toString());
});
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
        console.log(value.toString());
    },
    function (reason) {
        console.log(reason);
    },
);

p.then(
    function (value) {
       fs.writeFileSync('./resource/1-1.html', value);
    },
    function (reason) {
    },
)