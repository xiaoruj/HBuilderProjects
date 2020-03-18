/*
 扩展jQuery的工具方法 : $.extend(object)
   min(a, b) : 返回较小的值
   max(c, d) : 返回较大的值
   leftTrim() : 去掉字符串左边的空格
   rightTrim() : 去掉字符串右边的空格
 */

//正则
/*
 ^   匹配字符串开始
 \s  匹配空格
 +   匹配一次或者多次
 $   匹配字符串的末尾
 */
// min(a, b) : 返回较小的值
// max(c, d) : 返回较大的值
// leftTrim() : 去掉字符串左边的空格
// rightTrim() : 去掉字符串右边的空格
$.extend({
   min:function (a,b) {
        return a > b ? b : a;
   },
    max:function (a,b) {
      return a > b ? a : b;
    },
    leftTrim:function (str) {
        return str.replace(/^\s+/,'');
    },
    rightTrim:function (str) {
        return str.replace(/\s+$/,'')
    }
});


/*  2. 给jQuery对象 添加3个功能方法:
 * checkAll() : 全选
 * unCheckAll() : 全不选
 * reverseCheck() : 反选
 * */
$.fn.extend({
   checkAll:function () {
        this.prop('checked',true)
    },
    unCheckAll:function () {
      this.prop('checked',false);
    },
    reverseCheck:function () {
      this.each(function () {
        this.checked = !this.checked;
      })
    }
});