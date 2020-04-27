/*
  webpack的配置文件

  所有JS构建工具都是基于NODEJS工作的，所以模块化默认使用commonjs

  使用commonjs模块化语法向外暴露一个配置对象（属性名固定的对象）

  里面配置不能写错，一旦写错单词就会报错（代码写完检查一遍~）

  开发环境：让代码在内存中编译运行即可，没有输出文件到本地
  生产环境：输出打包后的资源文件到本地

  1. 处理js资源
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
   
  2. 处理css资源
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

  3. 处理图片资源
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
              esModule: false
            },
          },
        },

  4. 处理html资源
    - 下载依赖包(plugins既需要下载也需要引入)
        npm i html-webpack-plugin -D
        const HtmlWebpackPlugin = require('html-webpack-plugin');

    - 配置plugin
        new HtmlWebpackPlugin({
          template: resolve("public/index.html"),
        })

  5. 处理其他资源（字体图标~）
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

  6. 自动化
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
  
  7. devtool 开发调试工具
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

   8. 进行vue配置（让webpack能够解析vue资源）
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

   9. 打包public下面的静态资源
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

    10. 配置路径别名
      resolve: {
        alias: {
          vue$: "vue/dist/vue.esm.js",
          "@": resolve("src"),
          "@comps": resolve("src/components"),
        },
      },
  
    11. 自动补全文件扩展名
      resolve: {
        extensions: [".js", ".vue", ".json"],
      }
*/
// Nodejs的模块 path 专门用来处理文件路径
const path = require("path");
// 引入插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyPlugin = require("copy-webpack-plugin");
/**
 * 封装一个处理绝对路径的方法
 * @param {String} relative 相对路径
 * @return {String} 基于项目根目录的绝对路径
 */
function resolve(relative) {
  // __dirname 代表当前文件所在的文件夹绝对路径
  // __dirname 其实就是项目根目录
  return path.resolve(__dirname, relative);
}

module.exports = {
  // 入口
  entry: "./src/index.js",
  // 输出
  output: {
    path: undefined, // 输出的目录
    filename: "built.js", // 输出文件名
  },
  // 加载器
  module: {
    rules: [
      {
        // 解析vue文件
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/, // 规则对哪些文件生效
        // exclude: /node_modules/, // 排除node_modules文件，其他文件都检查
        include: [resolve("src")], // 包含src下面的文件，只检查包含的文件，而其他文件不检查
        // use: {}, 如果只要使用一个loader 用{}
        // use: []  如果要使用多个loader 用[]
        use: {
          // 需要下载
          loader: "babel-loader",
          options: {
            // 配置对象
            presets: [
              // 预设，babel要干什么活
              [
                "@babel/preset-env",
                {
                  // 配置按需加载
                  useBuiltIns: "usage",
                  corejs: { version: 3 },
                  targets: {
                    // 兼容性
                    ie: 9,
                    chrome: 60,
                    firefox: 50,
                    edge: 17,
                    safari: 11,
                  },
                },
              ],
            ],
            plugins: [], // 插件
          },
        },
      },
      {
        test: /\.css$/,
        include: [resolve("src")],
        use: [
          // 执行顺序：从下到上 / 从右到左
          // 动态创建style标签，将js中css字符串添加，插入head中显示
          // "style-loader",

          // 它会应用到普通的 `.css` 文件
          // 以及 `.vue` 文件中的 `<style>` 块
          "vue-style-loader",
          // 将css编译成js字符串，以commonjs规则插入到js文件中
          "css-loader",
        ],
      },
      {
        test: /\.(png|gif|jpe?g|webp)$/,
        include: [resolve("src")],
        use: {
          loader: "url-loader",
          options: {
            /*
              大小小于10kb以下的图片会被base64处理
              base64:
                1. 一种图片的优化手段（只针对小图片做优化）
                2. 将图片编译成base64编码的字符串
                  优点：随着html文件加载一起加载，不需要额外发送请求（减少请求数量，降低服务器压力）
                  缺点：体积会变得更大
            */
            limit: 10 * 1024,
            /*
              对输出文件进行重命名
              [hash:10] hash（根据文件生成唯一id值）取10位
              [ext] 使用原来文件扩展名
            */
            name: "static/media/[hash:10].[ext]",
            /*
              默认情况下 url-loader 对图片解析时ES6模块化
              ES6模块化识别不了 [object module]
              关闭ES6模块化，使用commonjs模块化就能识别了~
            */
            esModule: false,
          },
        },
      },
      {
        // test: //,  // 不写test，代表匹配所有文件
        exclude: [
          /\.js$/,
          /\.css$/,
          /\.html$/,
          /\.(png|gif|jpe?g|webp)$/,
          /\.vue$/,
        ],
        use: {
          // 作用：将文件加载，原封不动输出出去(只修改名称)
          // 能处理所有类型文件
          loader: "file-loader",
          options: {
            name: "static/media/[hash:10].[ext]",
          },
        },
      },
    ],
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      // 配置对象
      // 以 public/index.html 文件为模板，创建基于这个文件的新HTML文件
      // 新HTML文件会自动引入webpack打包生成JS/CSS
      template: resolve("public/index.html"),
    }),
    // 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
    // 例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
    new VueLoaderPlugin(),
    // 复制文件
    new CopyPlugin([
      {
        from: resolve("public"), // 将public下面的所有文件复制
        to: resolve("dist"), // 复制到dist目录下去
        ignore: ["index.html"], // 复制时忽略index.html文件（这个文件已经被HtmlWebpackPlugin处理了）
      },
    ]),
  ],
  // 模式
  mode: "development",
  // 自动化，开发服务器
  devServer: {
    // contentBase: resolve('build'), // 开发服务器将哪个目录的资源暴露出去
    contentBase: resolve("dist"), // 开发服务器将哪个目录的资源暴露出去
    port: 9527, // 服务器端口号
    host: "localhost", // 服务器域名,
    // 启动gzip压缩（一种资源压缩格式gzip，这种压缩格式）
    // 这种压缩格式浏览器可以识别，所以可以自动解压（反观zip文件浏览器是不识别，也不能解压的）
    // 资源会在服务器先进行gzip压缩，文件体积就更小，传输速度就更快。性能更好
    compress: true,
    open: true, // 自动打开浏览器
    // 热模块替换（Hot Module Replacement）
    // 正常没有HMR功能，一旦有一个文件发生变化，整个页面会全部重新渲染
    //（假设我有10000个文件，因为其中一个文件变化，导致所有文件全部重新编译加载更新，性能很差）
    // HMR功能：一旦有一个文件发生变化，只会更新这变化的文件，其他文件默认使用之前缓存，速度快，性能好
    // html文件在将来开发时只有一个，所以不需要HMR功能
    // css文件，因为使用style-loader处理，默认使用HMR功能
    // js文件，默认是没有使用HMR（即使开启了HMR，也需要手动写其他代码才可以使用）
    hot: true,
    // 如果webpack配置出错了，将 quiet: true 关掉，这样就会提示错误~
    quiet: true, // 启用静默模式，在终端不打印多余信息
    clientLogLevel: "none", // 在浏览器控制台不打印多余内容

    // 启用代理服务器
    proxy: {
      /*
        一旦请求发送到代理服务器上，就会自动将请求转发到目标服务器上
        问题：
          如果将来服务器可能有多个，目标服务器地址就有多个
          当前配置只能访问一个服务器
      */
      // '/': 'http://localhost:3000'

      /*
        一旦请求是以 /api 开头，就会将请求自动转发到目标服务器上
        但是访问地址是 http://localhost:3000/api/xxx
        问题：访问地址多一个 /api，导致请求 404
      */
      // '/api': 'http://localhost:3000',
      // '/xxx': 'http://localhost:xxxx'

      "/api": {
        target: "http://localhost:3000", // 目标服务器地址
        pathRewrite: {
          // 重写请求地址
          "^/api": "", // 将/api重写为''(去掉请求地址的/api)
        },
        changeOrigin: true, // 即使是一个跨域请求也支持
      },
    },
  },
  devtool: "cheap-module-source-map", // 开发环境
  // devtool: "source-map", // 生产环境
  resolve: {
    // 帮助webpack解析模块（打包的资源）
    alias: {
      // 配置文件路径别名
      // 当你路径写 vue 实际上代表的路径 vue/dist/vue.esm.js
      // xxx$ 真正写路径时 $ 可以省略不写~
      // 'vue$': "vue/dist/vue.esm.js",
      "@": resolve("src"),
      "@comps": resolve("src/components"),
    },
    // 解析模块路径时，如果没有文件扩展名，会按照数组顺序自动补全文件扩展名
    // 自动补全文件扩展名
    extensions: [".js", ".vue", ".json"],
  },
};
