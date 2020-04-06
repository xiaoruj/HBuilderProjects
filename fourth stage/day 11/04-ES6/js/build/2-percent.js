'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.percent = percent;

var _random = require('./1-random');

function percent(num) {
    var n = (0, _random.random)(1, 100);
    if (n <= num) {
        return true;
    } else {
        return false;
    }
}