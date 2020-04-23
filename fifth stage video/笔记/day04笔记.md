# webpack 的配置文件

开发环境：让代码在内存中编译运行即可，没有输出文件到本地
生产环境：输出打包后的资源文件到本地

## 1. 处理 js 资源

    babel 一个 JavaScript 编译器
    可以将ES6以上语法编译成ES5以下语法~，作用用来做JS兼容性处理

    - 下载依赖包（loader只需要下载不需要引入）
      npm i babel-loader @babel/core @babel/preset-env -D
    - 配置loader
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        include: [resolve('src')],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [],
          },
        },
      },

## 2. 处理 css 资源

      - 下载依赖包（loader只需要下载不需要引入）
        npm i style-loader css-loader -D
      - 配置loader
        {
          test: /\.css$/,
          include: [resolve("src")],
          use: [
            "style-loader",
            "css-loader",
          ],
        },

## 3. 处理图片资源

      - 下载依赖包（loader只需要下载不需要引入）
        npm i url-loader file-loader -D
      - 配置loader
        {
          test: /\.(png|gif|jpe?g|webp)$/,
          include: [resolve("src")],
          use: {
            loader: "url-loader",
            options: {
              limit: 10 * 1024,
              name: "static/media/[hash:10].[ext]",
            },
          },
        },

## 4. 处理 html 资源

    - 下载依赖包(plugins既需要下载也需要引入)
        npm i html-webpack-plugin -D
        const HtmlWebpackPlugin = require('html-webpack-plugin');

    - 配置plugin
        new HtmlWebpackPlugin({
          template: resolve("public/index.html"),
        })

## 5. 处理其他资源（字体图标~）

    - 下载依赖包
        npm i file-loader -D (之前处理图片资源时，已经下载过了，所以不需要重新下载)

    - 配置loader
        {
          exclude: [/\.js$/, /\.css$/, /\.html$/, /\.(png|gif|jpe?g|webp)$/, /\.vue$/],
          use: {
            loader: "file-loader",
            options: {
              name: "static/media/[hash:10].[ext]",
            },
          },
        },

## 6. 自动化

    概念：
      一旦修改源代码，会自动编译，接着自动刷新浏览器，从而看到最新的效果
      第一次使用时，自动打开浏览器访问
      （自动编译、自动刷新、自动打开浏览器等自动化任务）
    如果没有自动化，每次写完代码，都需要重新编译打包刷新
    有了自动化，自动编译打包刷新，我们开发者只需要看浏览器最新的结果就好了
    作用：提升开发效率

    - 下载依赖包
        npm i webpack-dev-server -D

    - 配置
        devServer: {
          contentBase: resolve("dist"),
          port: 9527,
          host: "localhost",
          compress: true,
          open: true,
          hot: true,
          quiet: true,
          clientLogLevel: "none",
        },

    - 启动指令
      webpack 一定会有输出资源（输出到配置文件output.path去），不能启用devServer配置
      webpack-dev-server 只在内存中编译打包，不会有任何输出，同时能启用devServer配置
    - 配置启动指令
      在package.json中配置启动指令
        "scripts": {
          "dev": "webpack-dev-server", // 代表启动开发环境指令
          "start": "npm run dev" // 为了简写，npm start
        }

## 7. devtool 开发调试工具

    source-map：提供构建后代码与源码映射关系文件

    所有代码（HTML/CSS/JS）经过webpack编译打包处理，
    默认情况下会将所有js以eval方式汇总在一个js文件（built.js）中，后面实际运行就是这个文件built.js
    一旦代码报错，正常情况下报错提示的是built.js代码错误，开发者不知道到底出了什么错误，不利于调试BUG

    浏览器支持 source-map 技术，在webpack打包时会生成一个built.js.map文件，这个文件就会将
    构建后代码和源码的关系记录起来（源代码在哪个文件第一行 对应 构建后代码第几行）
    如果构建后built.js代码出错了，浏览器会找到built.js.map文件，根据构建后错误位置，
    通过built.js.map文件， 就能追踪到源码的错误，从而浏览器提示源码的错误，方便调试

    - 配置
      devtool: "cheap-module-source-map", // 开发环境
      devtool: "source-map", // 生产环境

      source-map 提供完整代码映射（包括行和列）
      cheap-source-map 提供简版代码映射（只包含行，没有列）
      module-source-map 提供node_modules中代码映射
      cheap-module-source-map

## 8. 进行 vue 配置（让 webpack 能够解析 vue 资源）

    https://vue-loader.vuejs.org/zh/guide/#vue-cli

        - 下载
          npm install -D vue-loader vue-template-compiler
            vue-loader 处理vue文件
            vue-template-compiler 编译vue组件模板代码

        - 配置

          const VueLoaderPlugin = require('vue-loader/lib/plugin')

          module.exports = {
            module: {
              rules: [
                // ... 其它规则
                {
                  test: /\.vue$/,
                  loader: 'vue-loader'
                },
                {
                  test: /\.css$/,
                  use: [
                    'vue-style-loader',
                    'css-loader'
                  ]
                }
              ]
            },
            plugins: [
              // 请确保引入这个插件！
              new VueLoaderPlugin()
            ]
          }

## 9. 打包 public 下面的静态资源

        https://www.npmjs.com/package/copy-webpack-plugin

        - 下载
          npm install copy-webpack-plugin --save-dev
        - 引入
          const CopyPlugin = require('copy-webpack-plugin');
        - 配置
          new CopyPlugin([
            {
              from: resolve('public'),
              to: resolve('dist'),
              ignore: ['index.html']
            },
          ]),

## 10. 配置路径别名

      resolve: {
        alias: {
          vue$: "vue/dist/vue.esm.js",
          "@": resolve("src"),
          "@comps": resolve("src/components"),
        },
      },

## 11. 自动补全文件扩展名

      resolve: {
        extensions: [".js", ".vue", ".json"],
      }

# vue

vue 项目默认有一个 App.vue 组件
这个组件：应用主组件/根组件
组件里面有三个标签： - template 模板页面：里面写模板代码,注意：必须有且只有一个根标签 - script 组件配置对象：里面写 js 代码 - style 模板样式（组件样式）：里面写 css 代码
模板：
<template>里面写 html
<HelloWorld /> 单标签（常用）
<HelloWorld></HelloWorld> 双标签
</template>

<script>里面写 js
export default {}
</script>
<style scoped>里面写 css
scoped 让样式只在当前组件生效（类似于作用域）</style>

# 组件

1.
Vue.component("Hello", Hello);全局注册一个组件
new Vue({
render: (h) => h(App),
}).$mount("#app");
2.
new Vue({
   components: {
     App,
   },
   template: "<App />", 
 }).$mount("#app");
上面写法是下面的简写，下面没办法直接使用，会报错：

    原因：当前使用Vue的版本是运行时版本（vue.runtime.esm.js）, 这个版本没有编译器
    没有编译器就不能解析template，所以报错
    解决：
      1. 使用render方法去对 template 进行预解析 (推荐使用，体积更小)
      （内部使用 vue-template-compiler 去编译template）
      2. 使用带编译器的vue版本 （体积更大）

devtool: "cheap-module-source-map", // 开发环境
devtool: "source-map", // 生产环境

# 路径名

'vue\$': "vue/dist/vue.esm.js",当你路径写 vue 实际上代表的路径 vue/dist/vue.esm.js

# 扩展名

extensions: [".js", ".vue", ".json"],
解析模块路径时，如果没有文件扩展名，会按照数组顺序自动补全文件扩展名

# 静默模式

如果 webpack 配置出错了，将 quiet:true 关掉，这样就会提示错误
quiet: true, 启用静默模式，在终端不打印多余信息

# render 方法

    render: function(createElement) {

自动注册 App 组件，并返回要渲染的 App 组件实例对象，最终会渲染到页面 el 元素上
return createElement(App);
},
