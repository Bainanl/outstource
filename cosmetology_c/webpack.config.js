const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
    entry: path.join(__dirname, 'src/main.js'),
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            {
                test: /\.png|jpe?g|gif|webp|svg$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 4kb
                    }
                }
            }

        ],
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    mode: "development"
}