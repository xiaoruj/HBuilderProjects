'use strict';

var _percent = require('./2-percent');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)('button').eq(0).click(function () {
    var res = (0, _percent.percent)(30);
    //
    if (res) {
        alert('恭喜您中奖啦!!');
    } else {
        alert('再接再厉!!');
    }
});