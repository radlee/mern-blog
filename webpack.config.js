const path = require('path');

module.exports = {
  // other webpack configurations...

  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "fs": false
    }
  }
};