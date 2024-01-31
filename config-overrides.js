// config-overrides.js
const path = require('path');

module.exports = function override(config, env) {
  // Add your webpack configurations here
  config.resolve = {
    ...config.resolve,
    fallback: {
      http: require.resolve('stream-http'),
    },
  };

  return config;
};
