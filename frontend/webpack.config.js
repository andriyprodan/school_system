module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/env','@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime']
          },
        },
      },{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};