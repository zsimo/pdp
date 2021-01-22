/**var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
        devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                use: 'raw-loader',
            },
        ],
    },


    resolve: {
        modules: ['node_modules', __dirname]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ]
};
*/




"use strict";

var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var paths = {
    src: path.resolve(__dirname, "src"),
    pages: path.resolve(__dirname, "src", "pages"),
    public: path.resolve(__dirname, "public")
};

const PAGES = fs.readdirSync(paths.pages, {
    withFileTypes: true,
}).filter(function (dirent) {
    return dirent.isDirectory();
}).map(function (dirent) {
    return dirent.name;
});


var entry = {};
PAGES.forEach(function (page) {
    entry[page] = [
        path.resolve(paths.pages, page, "index.js"),
        path.resolve(paths.pages, page, "style", "index.scss"),
    ];
});




module.exports = function (env) {

    const IS_PROD = (env && env.production) ? true : false;
    const MODE = IS_PROD ? "production" : "development";

    var htmlWebpackPluginCollection = PAGES.map(function (page) {

        var filename;
        if (page === "index") {
            filename = path.resolve(paths.public, "index.html");
        } else {
            filename = path.resolve(paths.public, page, "index.html");
        }
        
        return new HtmlWebpackPlugin({
            template: path.resolve(paths.src, "pages", page, "html.ejs"),
            chunks: [page],
            filename: filename
        });
    
    });

    var optimization = {};
    if (IS_PROD) {
        optimization.minimize = true;
    }
    
    return {
        mode: MODE,
        entry: entry,
        output: {
            path: paths.public,
            filename: "[name]_[contenthash].js"
        },
        devtool: false,
        optimization: optimization,
        devServer: {
            contentBase: paths.public,
            compress: true,
            port: 9000
        },

        module: {
            
            rules: [
                {
                    test: /\.html$/i,
                    use: 'raw-loader',
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.scss$/,
                    use: [
                      MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                    ]
                  },
            ]
        
        },


        resolve: {
            modules: ['node_modules', __dirname]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name]_[contenthash].css"
            })
        ].concat(htmlWebpackPluginCollection)
    }
};