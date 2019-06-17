const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        "monaco-editor": './src/monaco-editor.js',
        "monaco-element": './src/monaco-element.js'
    },
    resolve: {
        alias: {
            'monaco-editor': 'monaco-editor/esm/vs/editor/editor.api.js'
        }
    },
    output: {
        globalObject: 'self',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new MonacoWebpackPlugin({
            languages: ['html', 'css', 'scss', 'json', 'javascript', 'typescript']
        }),
        new UglifyJSPlugin(),
    ],
};