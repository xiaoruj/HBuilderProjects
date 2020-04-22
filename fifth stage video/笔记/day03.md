# 过渡与动画

- vue 提供组件 transition，专门用来做过度效果
- 使用<transition name='xxx'>包含带动画的标签
- 定义 class 样式
  1. 指定过渡样式: transition
  2. 指定隐藏时的样式: opacity/其它
- css 样式
  .fade-enter-active: 进入过程, 指定进入的 transition
  .fade-leave-active: 离开过程, 指定离开的 transition
  .xxx-enter, .xxx-leave-to: 指定隐藏的样式

# 过滤器

    1.功能: 对要显示的数据进行特定格式化后再显示
    2.注意: 并没有改变原本的数据, 可是产生新的对应的数据
    3.编码
        - 定义过滤器
          - 全局过滤器：对所有vm生效Vue.filters
          - 局部过滤器: 只对当前vm生效
        - 使用过滤器    使用dateFormat过滤器对nowTime处理，最终显示的是过滤器的返回值 xx.format('xxx') 格式化时间

# 指令

## 常用内置指令

v:text : 当作纯文本
v-html : 将 value 作为 html 标签来解析
v-if : 如果为 true, 当前标签才会输出到页面
v-else: 如果为 false, 当前标签才会输出到页面
v-show : 通过控制 display 样式来控制显示/隐藏
v-for : 遍历数组/对象
v-on : 绑定事件监听, 一般简写为@
_ 监视具体的按键: @keyup.keyCode @keyup.enter
_ 停止事件的冒泡和阻止事件默认行为: @click.stop @click.prevent \* 隐含对象: $event
  v-bind : 强制绑定解析表达式, 可以省略v-bind
  v-model : 双向数据绑定 自动收集用户输入数据
  ref : 为某个元素注册一个唯一标识, vue对象通过$els 属性访问这个元素对象
v-cloak : 使用它防止闪现表达式, 与 css 配合: [v-cloak] { display: none }

## 常用属性

ref : 为某个元素注册一个唯一标识, vue 对象通过\$refs 属性访问这个元素对象
作用：能获取 DOM 元素
注意：一般能不用就不用，vue 不建议直接操作 DOM, 性能优化

# 面试题：为什么组件中的 data 必须是函数形式？

Vue 解析组件标签时，会找到组件的构造函数，创建组件实例对象，根据实例对象的内容进行显示
有三个组件标签，就会创建三个组件实例对象
此时，如果 data 使用的是对象形式，那么创建组件实例对象，进行数据代理，
三个组件实例对象代理的 data 数据是同一个对象。那么只要有一个变化，全都变（不 OK）

每个组件应该要单独使用自己的数据。所以 data 要使用函数。
那么创建组件实例对象，进行数据代理，会调用 data 函数得到新 data 对象从而进行数据代理
每一个组件实例对象得到的是新的对象，互不影响

# vue 警告

    [Vue warn]: Failed to resolve directive: upper-text
    Vue的警告：解析指令失败，upper-text

# 自定义指令

     定义v-upper-text指令，v-会自动补充
    "upper-text"(el, binding){}
    el 就是绑定指令的DOM元素
    binding 是一个对象，包含指令的所有信息

## 数据代理

当你定义 `new Vue({ data: { isShow: true } })` 时，当 Vue 内部解析时会对 data 中的数据进行数据代理
Vue 会自动给 vm（this/实例对象）添加一个直接 isShow 属性，并且设置该属性的 getter 和 setter `类似于~ Object.defineProperty(vm, 'isShow', { get() {}, set() {} })`
所以这些数据具备一些特点，本身是没有值的
当你读取 isShow 属性的值时，内部会自动调用 getter 方法并返回值出去（实际得到的是 getter 方法的返回值）
当你设置 isShow 属性的值时，内部会自动调用 setter 方法，更新值并更新模板页面

## 响应式数据

1. 什么是响应式数据？
   数据一旦发生变化，会自动更新页面/数据
   （页面输入数据发生变化，会自动更新 JS 中 data 数据 / data 数据发生变化，会自动更新页面）

2. 哪些数据是响应式数据？
   Vue 中 data 中所有数据都是响应式数据
   分为两种情况探讨：
   数组数据：内部也会 setter 监视，但是会有例外：
   this.persons[0] = { id: 7, name: "jack" };
   解决： this.persons.splice(0, 1, { id: 7, name: "jack" });
   对象数据/其他类型数据：内部都会给属性添加 setter 进行监视，值一旦发生变 化，即会更新值也会触发页面的更新

3. 响应式和非响应式
   响应式数据
   data 中的所有数据（data 对象，data 函数返回的对象）
   通过 vm.$set() / Vue.set() 设置的属性数据
   非响应式数据   
      手动给vm添加属性  
        this.msg2 = xxx
      手动通过 . 方式给data数据添加额外的属性（得使用vm.$set()解决）
   this.person.age = 18

# webpack JavaScript 应用程序的静态模块打包工具

1. 概念

- 入口文件
  指示以哪个文件开始打包
  注意：以入口文件为起点，构建依赖关系图，将所有依赖的文件全部打包进来
- 输出 output
  打包后资源输出到哪里去
- 加载器 loader
  webpack 工具本身只能打包 js、json 资源，其他资源打包不了
  需要借助 loader 解析其他资源，webpack 才能打包这些其他资源
- 插件 plugins
  执行更加强大的任务（相对 loader 来讲）
- 模式 mode
  开发模式 development
  生产模式 production
  相同点：都能解析 ES6 模块化
  不同点：production 多一个压缩 JS 代码

2. 使用
   npm init 初始化文件
   npm i webpack webpack-cli -D 下载依赖包
   定义 webpack 配置文件 webpack.config.js
   所有 JS 构建工具都是基于 NODEJS 工作的，所以模块化默认使用 commonjs
   使用 commonjs 模块化语法向外暴露一个配置对象（属性名固定的对象）
   开发环境：让代码在内存中编译运行即可，没有输出文件到本地
   生产环境：输出打包后的资源文件到本地
   项目根目录 包含整个项目的最近的目录（package.json 文件所在的目录）

- 处理 js 资源
  - 下载依赖包（loader 只需要下载不需要引入）
    npm i babel-loader @babel/core @babel/preset-env -D
    - 配置 loader
      {
      test: /\.js\$/, 对 js 文件生效
      // exclude: /node_modules/, 排除 node_modules 文件，其他文件都检查
      include: [resolve('src')], 包含 src 下面的文件，只检查包含的文件，而其他文件不检查
      use: {
      loader: "babel-loader",
      options: {
      presets: ["@babel/preset-env"],
      plugins: [],
      },
      },
      }
- 处理 css 资源
  - 下载依赖包（loader 只需要下载不需要引入）
    npm i style-loader css-loader -D
  - 配置 loader
    {
    test: /\.css\$/,
    include: [resolve("src")],
    use: [
    "style-loader",动态创建 style 标签，将 js 中 css 字符串添加，插入 head 中显示
    "css-loader",将 css 编译成 js 字符串，以 commonjs 规则插入到 js 文件中
    ],
    },
- 处理图片资源
  - 下载依赖包（loader 只需要下载不需要引入）
    npm i url-loader file-loader -D
  - 配置 loader  
     {
    test: /\.(png|gif|jpe?g|webp)\$/,
    include: [resolve("src")],
    use: {
    loader: "url-loader",
    options: {
    limit: 10 \* 1024,
    name: "static/media/[hash:10].[ext]",
    },
    },
    },

# base64:

    1. 一种图片的优化手段（只针对小图片做优化）
    2. 将图片编译成base64编码的字符串
    优点：随着html文件加载一起加载，不需要额外发送请求（减少请求数量，降低服务器压力）
    缺点：体积会变得更大
