import {percent} from './2-percent';
import $ from 'jquery';

$('button').eq(0).click(function(){
    let res = percent(30);
    if(res){
        alert('恭喜您中奖啦!!');
    }else{
        alert('再接再厉!!');
    }
});