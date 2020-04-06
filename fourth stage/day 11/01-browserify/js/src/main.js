let module1 = require('./module1')
let module2 = require('./module2')
let module3 = require('./module3')

let uniq = require('uniq')

module1.foo()
module2()
module3.foo()
module3.bar()

console.log(uniq([1, 3, 1, 4, 3]))