const path = require("path");

function resolve(relative){
    return path.resolve(__dirname, reative);
}

module.exports = {
    entry: "./src/index.js",
    output: {
        path: undefined,//目录
        filename: "built.js",//文件名
    },
    // 加载器
    module:{
        rules:[
            {
                test:/\.js$/,//对js文件生效
                include: [resolve("src")],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [],
                    },
                },
            },
            {
                test:/\.css$/,
                include: [resolve("src")],
                use: [
                    "style-loader",
                    "css-loader",
                ] ,
            },
            {
                test:/\.(png|gif|jpg?g|webp)$/,
                include: [resolve("src")],
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10 * 1024,
                        name: "static/media/[hash:10].[ext]",
                    },
                },
            },
        ],
    },
    plugins: [],
    mode: "development",
}