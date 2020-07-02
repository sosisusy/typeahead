const path = require("path")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let MinifyList = {}

if (process.env.NODE_ENV == "production") {
    MinifyList = {
        "typeahead.min": ["./src/sass/Typeahead.scss", "./src/index.ts"],
    }
}

module.exports = {
    mode: process.env.NODE_ENV == "production" ? "production" : "development",
    devtool: "source-map",
    entry: {
        "typeahead": ["./src/sass/Typeahead.scss", "./src/index.ts"],
        ...MinifyList
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
            test: /\.min\.[tj]s$/
        })],
    },
    module: {
        rules: [
            {
                test: /\.m?[tj]s$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.m?ts$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'ts-loader',
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.s[ac]ss$/,
                exclude: /(node_modules|bower_components)/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
    ],
    resolve: {
        extensions: [".js", ".ts"],
        alias: {
            "~": path.resolve(__dirname, "src"),
        }
    }
}