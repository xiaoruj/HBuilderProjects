let ejs = require('ejs');
// let people = ['geddy', 'neil', 'alex'];
// let html = ejs.render('<%= people.join(", "); %>', {people: people});
let title = '今天没有看见李易峰';
let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title><%= title %></title>
    </head>
    <body>

    </body>
    </html> `
let res = ejs.render(html, {title:title});
console.log(res);