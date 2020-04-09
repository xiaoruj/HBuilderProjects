const express = require('express');
const cities = require('./cities');
const app = express();
app.get('/', (request, response)=>{
    response.send('ok');
});
app.get('/city-page', (request, response)=>{
    response.sendFile(__dirname + '/city.html');
});
app.get('/get-province', (request, response)=>{
    let provinces = Object.keys(cities);
    let str = JSON.stringify(provinces);
    response.setHeader('content-type','application/json;')
    response.end(str);
});
app.get('/get-city', (request, response)=>{
    let sheng = request.query.sheng;
    let city = Object.keys(cities[sheng])
    let str = JSON.stringify(city);
    response.setHeader('content-type','application/json');
    response.end(str);
});
app.get('/get-xian', (request, response)=>{
    let sheng = request.query.sheng;
    let city = request.query.city;
    let xian = cities[sheng][city];
    let str = JSON.stringify(xian);
    response.setHeader('content-type','application/json');
    response.end(str);
});
app.listen(8000, ()=>{
    console.log('服务已经启动, 端口号 8000 监听中.....');
});