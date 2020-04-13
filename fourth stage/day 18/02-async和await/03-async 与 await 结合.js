const fs = require('fs');
const util require('util');
const readFile = util.promisify(fs.readFile);
//callback 形式 回调函数
// fs.readFile('./resource/1.html', (err, data) => {
//     fs.readFile('./resource/2.html', (err, data2) => {
//         console.log(data + data2);
//     })
// })

//promise 形式
// new Promise((resolve, reject) => {
//     fs.readFile('./resource/1.html', (err, data) => {
//         resolve(data);
//     });
// }).then(value => {
//     return new Promise((resolve, reject) => {
//         fs.readFile('./resource/2.html', (err, data) => {
//             resolve(value + data);
//         });
//     });
// }).then(value => {
//     return new Promise((resolve, reject) => {
//         fs.readFile('./resource/3.html', (err,data) => {
//             console.log(value + data);
//         });
//     });
// });

async function main() {
    try {
        let one = await readFile('./resoure/11.html');
        let two = await readFile('./resoure/2.html');
        let three = await readFile('./resoure/3.html');
        console.log(one + two + three);
    } catch (e) {
        console.log(e.message);
    }
}
main();