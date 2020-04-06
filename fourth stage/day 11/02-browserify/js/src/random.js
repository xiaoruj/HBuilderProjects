module.exports = function(m,n){
    return Math.ceil(Math.random() * (n-m+1)) + m-1;
};