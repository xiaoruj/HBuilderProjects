const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyPlugin = require("copy-webpack-plugin");

function resolve(relative) {
  return path.resolve(__dirname, relative);
}

module.exports = {
  entry: "./src/index.js",
  output: {
    path: undefined, //目录
    filename: "built.js", //文件名
  },
  // 加载器
  module: {
    rules: [
      {
        test: /\.js$/, //对js文件生效
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
        test: /\.css$/,
        include: [resolve("src")],
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|gif|jpg?g|webp)$/,
        include: [resolve("src")],
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024,
            name: "static/media/[hash:10].[ext]",
          },
        },
      },
      {
        exclude: [
          /\.js$/,
          /\.css$/,
          /\.html$/,
          /\.(png|gif|jpe?g|webp)$/,
          /\.vue$/,
        ],
        use: {
          loader: "file-loader",
          options: {
            name: "static/media/[hash:10].[ext]",
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve("public/index.html"),
    }),
    new VueLoaderPlugin(),
    new CopyPlugin([
      {
        from: resolve("public"),
        to: resolve("dist"),
        ignore: ["index.html"],
      },
    ]),
  ],
  mode: "development",
  devServer: {
    contentBase: resolve("dist"),
    port: 9527,
    host: "localhost",
    compress: true,
    open: true,
    hot: true,
    // quiet: true,
    clientLogLevel: "none",
  },
  devtool: "cheap-module-source-map",
  resolve: {
    alias: {
      "@": resolve("src"),
      "@comps": resolve("src/components"),
    },
    extensions: [".js", ".vue", ".json"],
  },
};
