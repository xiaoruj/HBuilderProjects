#class 绑定:class='xxx'

- xxx 是字符串形式，一般用于类名不确定时。
- xxx 是对象形式，一般用于类名确定。
- xxx 是数组形式，一般用于多个确定动态类名。
  #style 绑定 :style="{}"
- Vue 的 style 语法: 是一个对象形式，里面所有属性名都采用小驼峰命名法

##条件渲染指令
#v-if v-else
v-if 和 v-else 是一体，配合使用 - 当 v-if 是 true 时，就会显示，而 v-else 就隐藏 - 当 v-if 是 false 时，就会隐藏，而 v-else 就显示 - 当属性值是 true 时，往往可以省略不写
#v-if 和 v-show 的区别
作用：都能实现 DOM 元素切换显示
v-if 在内存中干掉标签对象来实现隐藏，重新显示时会重新创建
DOM 树中只有要显示的 DOM 元素，没有隐藏的
v-show 通过样式 display 来控制显示和隐藏的，显示标签没有样式，隐藏标签会加上 display: none
DOM 树种所有 DOM 元素都有，只是隐藏的 DOM 元素有一个隐藏样式而已

#如果将来要频繁切换样式显示，用哪个性能好？
v-show 性能好，
因为 v-if 要进行更多 DOM 操作：删除 DOM 元素，重新创建新的 DOM 元素,而 v-show 只要切换 style 样式即可

##列表渲染
v-for / key
遍历的每一项元素需要有一个唯一的 key 属性：值有 id 用 id，没有 id 考虑使用 index

##数组方法

#filter 长度变值不变
返回一个新数组，不会对原数组产生任何影响（不会修改原数组）
特点：新数组长度往往比原数组更少，但里面的值和原来的一定一样
如：将数组小于 10 的数全部干掉
#map 长度不变值变
返回一个新数组，不会对原数组产生任何影响（不会修改原数组）
特点：新数组长度和原数组一定一样，但里面的值往往会发生变化
如：将数组每项值加 10
#reduce 长度和值都变
arr.reduce((previousValue, currentValue) => {}, initValue)
如果希望 reduce 方法返回值是 number 类型，initValue 往往初始化为 0
如果希望 reduce 方法返回值是 object 类型，initValue 往往初始化为 {}
如果希望 reduce 方法返回值是 array 类型，initValue 往往初始化为 []
如果希望 reduce 方法返回值是 string 类型，initValue 往往初始化为 '' ##事件处理 #绑定监听

1. 如果函数不需要其他参数，或者只需要 event 参数用第一种
2. 如果函数不需要 event 参数，只需要其他参数，用第二种
3. 如果函数既需要 event 参数，也需要其他参数，用三种
4. 如果事件回调函数只有一条语句，建议用第四种
   v-on:click="fun" 默认会传入 event 参数
   v-on:click="fun('hello' 123, 456)" 默认是没有参数的, 为了传入其他参数
   v-on:click="fun('hello', \$event)" 需要 event 参数，也需要其他参数
   @click=""

#事件修饰符
事件阶段
事件捕获 由外向内
目标阶段 目标元素
事件冒泡 由内向外
.prevent : 阻止事件的默认行为 event.preventDefault()
.stop : 停止事件冒泡 event.stopPropagation()

#按键修饰符
.keycode : 操作的是某个 keycode 值的健
.enter : 操作的是 enter 键

#表单输入绑定
使用 v-model(双向数据绑定)自动收集数据

##生命周期（面试）

- Vue 实例对象的生命周期函数：
  Vue 的实例从创建到更新到死亡经历的回调函数
  这是函数由 vue 内部自己调用
- 初始化渲染阶段（new Vue()产生，只会执行 1 次）
  beforeCreate()
  注意：不能创建 vm 之前触发的，此时已经创建了 vm
  在实现数据代理和监听之前调用的~
  所以：不能访问 data/methods 数据
  created()
  在实现数据代理和监听之后调用的，可以访问所有数据了。
  beforeMount()
  在页面挂载（渲染）之前触发
  mounted()
  在页面挂载（渲染）之后触发
- 更新阶段（当 data 数据发生变化，就会自动更新, 触发 n 次）
  beforeUpdate()
  在更新之前触发此时 data 数据已经更新完毕，但是页面没有更新
  updated()
  在更新之后触发，data 数据更新完毕，页面也更新完毕
- 销毁/死亡阶段( this/vm.\$destroy()触发，触发 1 次 )
  beforeDestroy() 在销毁之前调用
  destroyed() 在销毁之后调用

##重要生命周期函数（开发工作中常用）  
 created / mounted()
发送 AJAX 请求、设置定时器等一次性任务
created 速度更快一点点~
beforeDestroy()
做一些收尾工作：取消 AJAX 请求，清除定时器等

#内存泄漏

- 有一个数据占用了一片内存，但是没有实际用途。没有释放。DOM 事件、定时器、意外全局变量等 #内存溢出
- 预期使用的内存，超过了实际内存。 超出了
  当调用 this.\$destroy();
  会自动解绑事件，所以没有 DOM 事件的内存泄漏
  数据都是在 data 或 methods 中，一般也没有全局变量
  但是定时器不会清除，所以需要手动清除定时器
