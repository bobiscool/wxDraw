const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    entry: ["./src/index.js"],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "wxdraw.js"
    },
    module: {
        rules: [
            {
                test: "/\.js$/",
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['env', {
                            targets: {
                                uglify: 2,
                            }
                        }],
                        plugins: ['transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: [
        //   new MinifyPlugin()
    ]
}