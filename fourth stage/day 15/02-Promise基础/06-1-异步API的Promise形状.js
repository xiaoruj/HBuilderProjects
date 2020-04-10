const fs = require('fs');
function mineReadFile(path){
    return new Promise((resolve, reject)=>{
        fs.readFile(path, (err,data)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(data);
        })
    });
}
let p = mineReadFile('./resource/23.html');
p.then(
    value =>{
        console.log(value.toString());
    },
    reason =>{
        console.log(reason);
    }
);