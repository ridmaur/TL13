var path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
 entry: './index.js', 
 output: {
   path: path.resolve(__dirname, 'dist'),
   filename: 'bundle.js'
 },
externals: {
    'request' : "require('request')",
    'aws-sdk' : "require('aws-sdk')"
  },
plugins: [
      new webpack.NormalModuleReplacementPlugin(
        /node_modules\/alexa-sdk\/lib\/DynamoAttributesHelper.js/,
        '../../../PatchedDynamoAttributesHelper.js'
      ),
     new UglifyJSPlugin({
        uglifyOptions: {
            warnings: true,
            mangle: false,
            compress: false,
            output: {
                comments: false,
                beautify: true
            }
        },        
        sourceMap: false
     })   
   ],    
target: 'node'
};
