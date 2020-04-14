
let path = require('path');
//导入 HTML 处理的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: ['./src/js/app.js','./src/index.html'],
	  // 输出配置
	  output: {
        // 输出文件名
        filename: 'js/built.js',
        //输出文件路径配置
        path: path.resolve(__dirname, './build'),
        publicPath: '/'
      },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            //针对 JS 文件进行语法检查
            {
                test: /\.js$/,                  //只检测js文件
                exclude: /node_modules/,        //排除node_modules文件夹
                enforce: "pre",                 //提前加载使用
                use: {
                    loader: "eslint-loader"		//使用eslint-loader解析
                }
            },
            //对 JS 语法进行转化
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            //对 图片 处理
            {
                    test: /\.(png|jpg|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,               		// 8kb以下的图片会base64处理
                            outputPath: 'images',           // 文件本地输出路径
                            name: '[hash:8].[ext]',         // 修改文件名称和后缀
                            esModule: false                 // 解决html-loader处理图片时， 															// src变为[object,Module]的问题

                        }
                    }
                },
             //对 HTML 文件处理
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            //对字体文件处理
            {
                test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,  // 处理字体文件
                loader: 'file-loader',
                options: {
                  outputPath: 'fonts',
                  name: '[hash:8].[ext]'
                }
            }

        ]
    },
    //配置插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // 设置要编译的 HTML 源文件路径
        })
    ],
     //3. 增加 devServer 配置
        devServer: {
            open: true, 	// 自动打开浏览器
            compress: true, // 启动gzip压缩
            port: 3000, 	// 端口号
            hot: true
        },
    //devtool 配置
    devtool:  'cheap-module-source-map',
};