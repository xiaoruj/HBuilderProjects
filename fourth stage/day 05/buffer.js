//创建一个buffer
let buf_1 = Buffer.alloc(10);
let buf_2 = Buffer.allocUnsafe(10);
let buf_3 = Buffer.from('iloveyou');
// console.log(buf_1);
// console.log(buf_2);
// console.log(buf_3);

//读取
console.log(buf_3[0]);
console.log(buf_3.toString());

//设置
buf_3[0] = 65;//A
buf_3[0] = 97;//a
buf_3[0] = 48;//0
console.log(buf_3.toString());

//溢出 高位截短
buf_3[0] = 365;
console.log(buf_3.toString());

let buf_4 = Buffer.from('春夜喜雨');
console.log(buf_4);
console.log(buf_4.toString());
let str = '\u5403';
console.log(str);