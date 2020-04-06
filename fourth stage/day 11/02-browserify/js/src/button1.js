const $ = require('jquery');
const rand = require('./random');

$('button').eq(0).click(function(){
    $('body').css('background',`rgb(${rand(0,255)},${rand(0,255)},${rand(0,255)})`);
});