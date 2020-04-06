"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.random = random;
function random(m, n) {
    return Math.ceil(Math.random() * (n - m + 1)) + m - 1;
};