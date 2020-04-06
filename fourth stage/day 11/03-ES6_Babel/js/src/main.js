import {foo, bar} from './module1'
import {DATA_ARR} from './module1'
import {fun1, fun2} from './module2'
import person from './module3'
import {foo as m2foo} from './module2';

import $ from 'jquery';

$('body').css('background', 'rgb(12,56,88)');

foo()
bar()
console.log(DATA_ARR);
fun1()
fun2()
m2foo();

person.setName('JACK');
console.log(person.name);