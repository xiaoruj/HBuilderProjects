const fs = require('fs');
const ws = fs.createWriteStream('./file/home.html', {flags: 'a'});
ws.write('李易峰\r\n');
ws.write('我在北京等你\r\n');
ws.write('老炮\r\n');
ws.write('麻雀\r\n');
ws.write('怦然星动\r\n');
setTimeout(function(){
    ws.write('古剑奇谭');
    ws.close();
},1000);
ws.on('open',function(){
    console.log('写入流创建了！！！');
});
ws.on('open',function(){
    console.log('写入流关闭了!!');
});