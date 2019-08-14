const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output:{
    path:path.join(__dirname, '../Flask/static'),
    filename: 'bundle.js',
    publicPath:'/'
  },
  devServer: {// redirect route to react page
    // acts like a CATCH-ALL
   historyApiFallback: true,
 },
  devServer:{
    contentBase:"dist",
    // overlay:true // this is to show the error in the window
  },
  module: {
    rules: [{
      test:/\.js$/,
      exclude: /node_modules/,
      use:{
        loader:'babel-loader'
      }
    },
    {
      test:/\.css$/,
      exclude: /node_modules/,
      use:[{
            loader:'style-loader'
          },
          {
            loader:'css-loader'
          }]
      },
      {
        test:/\.scss$/,
        exclude: /node_modules/,
        use:[{loader:'style-loader'},{loader:'css-loader'},{loader: 'sass-loader'}]
      },
      {
       test: /\.html$/,
       use:[
         {
           loader: "html-loader",
           options: {
             attrs:["img:src"]
           }
         }
       ]
      },
      {
        test:/\.(png|jpg|svg)$/,
        use:[
          {
            loader: "file-loader",
            options:{
              name: "img/[name].[ext]",
              publicPath: './static/assets'
            }
          }
        ]

      }

  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}

/*
file-loader : take and object of oprions
extract-loader: tells webpack to make a seperate file



if file-loader doesnt work could install
npm install url-loader --save-dev

{
  test: /\.(png|jpg)$/,
  loader: 'url-loader'
}
*/
