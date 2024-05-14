module.exports = {
    // other webpack configuration...
    module: {
      rules: [
        {
          test: /\.html$/i,
          use: 'raw-loader'
        }
      ]
    }
  };