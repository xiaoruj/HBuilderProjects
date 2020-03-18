
//    1. 选择第一个div
//     $('div:first').css('background','pink');
//    2. 选择最后一个class为box的元素
//     $('.box:last').css('background','pink');
//    3. 选择所有class属性不为box的div
//     $('div:not(.box)').css('background','pink');
//    4. 选择第二个和第三个li元素
//     $('li:eq(1),li:eq(2)').css('background','pink');
//         $('li:lt(3):gt(0)').css('background','pink');
//    5. 选择内容为BBBBB的li
//     $('li:contains(BBBBB)').css('background','pink')
//    6. 选择隐藏的li
//     $('li:hidden').show(1000);
//    7. 选择有title属性的li元素
//     $('li[title]').css('background','pink');
//    8. 选择所有属性title为hello的li元素
//     $('li[title=hello]').css('background','pink');
//      9.选择所有有title属性且title属性不为hello的
//     $('li[title]:not([title=hello])').css('background','pink')
    $('li[title][title!=hello]').css('background','pink')