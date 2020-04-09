const request = require('request');

let url ='https://www.toutiao.com/api/pc/feed/?max_behot_time=1586331877&category=__all__&utm_source=toutiao&widen=1&tadrequire=true&as=A1A5FEF8BD88690&cp=5E8DF816D9004E1&_signature=8v1iXAAgEBA0qtvRBBs8xPL8I0AAKx7ZpJA12m5yTsIRyXo9YxYqEd33Gy70vE8aD7-e713twaHGhD8jEHWM1reQdvzV566qXz-CcCDRpZ-shco7wLe.cmuGKn8ho8Xkzy6';
const options = {
  url: url,
  headers: {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,la;q=0.7',
    'cache-control': 'max-age=0',
    'cookie': 'tt_webid=6812790631997195789; s_v_web_id=verify_k8pa9nqj_4a4HqpdQ_QfcL_4DHU_9YaK_TiA2MP4cRvAD; WEATHER_CITY=%E5%8C%97%E4%BA%AC; tt_webid=6812790631997195789; csrftoken=ee22c5e349fbdc56a68be26ec7da60a4; ttcid=b35b09a1107d406cab974837f8da0e1a14; SLARDAR_WEB_ID=0a39477f-d83d-46ac-b811-45387cfe0803; __tasessionId=4fv0xoy9n1586332479582; tt_scid=Z5o7yeRKb-Wutz2k8x8LADz.cZSinX.GCkRjc7O0Nu6Y9qsLjkpGhDYyia9yck-p74dd'
  }
};
request(options, callback);
function callback(error, response, body) {
  const express = require('express');
  const app = express();
  app.get('/page', (request,response)=>{
    response.sendFile(__dirname + '/toutiao.html');
  });
  app.get('/server', (request, response) => {
    let str = JSON.stringify(body);
    response.send(str);
  })
  app.listen(8000, () => {
    console.log('服务已经启动, 端口号 8000 监听中.....');
  });
}