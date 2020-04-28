# SPA

    1)单页Web应用（single page web application，SPA）
    2)整个应用只有一个完整的页面
    3)点击页面中的链接不会刷新页面, 本身也不会向服务器发请求
    4)当点击路由链接时, 只会做页面的局部更新
    5)数据都需要通过ajax请求获取, 并在前端异步展现

# 路由

    一个路由就是一个映射(对应)关系(key:value),key为路由路径path, value可能是function/component

# 路由分类

- 后台路由: node 服务器端路由, value 是 function, 用来处理客户端提交的请求并返回一个响应数据
- 前台路由: 浏览器端路由, value 是 component, 当请求的是路由 path 时, 浏览器端没有发送 http 请求, 但界面会更新显示对应的组件

## 后台路由

- 注册路由
  app.get(path, function(req, res))
  router.get(path, function(req, res))
  当 node 接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据

## 前台路由

- 注册路由
  {
  path: '/about',
  component: About
  },
- 当浏览器的 path 变为/about 时, 当前路由组件就会变为 About 组件

## 路由组件的生命周期

当你从 A 组件切换到 B 组件，A 组件会被卸载（销毁）B 组件会被创建
当你从 B 组件切换回 A 组件，B 组件会被卸载（销毁）A 组件会被创建
当你从 C 组件切换到 C 组件，C 组件并不会被重新创建或卸载，而是复用之前 C 组件（仅仅更新了而已）

## 路由组件传参

1. params 参数
   - 传递参数
     <router-link to="/home/message/detail/1">xx</router-link>
   - 接受使用
     this.\$route.params.xxx
2. query 参数
   - 传递参数
     <router-link to="/home/message/detail?count=123">xx</router-link>
   - 接受使用
     this.\$route.query.xxx
3. 路由配置 props 传参
   - 传递参数
     <router-link to="/home/message/detail/1?count=123">xx</router-link>
   - routes 配置
     {
     path: "detail/:id",
     component: MessageDetail,
     props: (route) => {
     // 返回一个对象，这个对象中所有属性会以 props 方式传递给 MessageDetail 组件
     return {
     id: +route.params.id,
     count: +route.query.count,
     };
     },
     },
   - 路由组件声明接受
     props: {
     id: Number,
     count: Number
     }
   - 使用
     this.id / this.count
4. 路由组件 props 传参
   - 路由传参
     <router-view msg="123"></router-view>
   - 当前路由组件声明接受
     props: {msg: String,}
   - 使用
     this.msg
     <keep-alive>子组件</keep-alive>
     作用：缓存子组件
     props：
     include="home" 缓存 home 组件，其他组件不缓存
     exclude="home" 排除 home，其他组件都缓存

## 前端路由模式

1. hash

- 优点：兼容性极好
- 缺点：请求路径带#

2. history

   - 优点：请求路径没有#
   - 缺点：兼容性稍差（只能支持 IE10 以上）

3. 总结：开发中一般使用 history 模式

4. 问题

- hash 模式
  hash 模式刷新浏览器时，向服务器发送请求，请求地址 http://localhost:9527/
  服务器返回相应的响应，响应中就会包含 js 代码，js 代码解析时就会根据请求路径 /#/home/news
  加载指定路由组件进行显示
- history 模式
  history 模式刷新浏览器时，向服务器发送请求，请求地址 http://localhost:9527/home/news
  服务器并不能处理 /home/news 只能处理 /，所以找不到相应的后台路由处理，返回 404

  开发的解决方案：
  一旦访问开发服务器 404，就返回 index.html 给你
  （相当于请求所有开发服务器地址，都相当于请求 http://localhost:9527/）

  通过配置 webpack 来解决：historyApiFallback: true,

  此时产生了新的问题：built.js 和 bootstrap.css 访问路径出了问题

  根本原因：输出路径是相对路径 ./ 或 不写
  比如：当前项目路径：http://localhost:9527/home/news
  相对路径会以 http://localhost:9527/home （去掉最后一层路径）
  解决：将输出路径改成 / 开头，路径一定会以服务器根路径补充
  实际路径 http://localhost:9527/

  最终：
  index.html 需要将 href="./bootstrap.css" 改成 href="/bootstrap.css"
  webpack.config.js 需要 output 上增加 publicPath: '/'
