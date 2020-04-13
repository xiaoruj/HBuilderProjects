(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _m = require("./m1");

var _m2 = require("./m2");

//导入模块
console.log((0, _m.add)(1, 100));
console.log((0, _m2.minus)(100, 50));
var star = '古力娜扎';
console.log(star);
console.log(3 === 1 + 2);
},{"./m1":2,"./m2":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;

function add(a, b) {
  return a + b;
}
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minus = minus;

function minus(m, n) {
  return m - n;
}
},{}]},{},[1])