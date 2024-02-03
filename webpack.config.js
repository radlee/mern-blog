const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  // other webpack configurations...

  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "fs": false
    }
  },
  plugins: [
    // ... other plugins ...

    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};