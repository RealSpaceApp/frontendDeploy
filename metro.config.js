const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    assetExts: [
      ...defaultConfig.resolver.assetExts,
      'svg', 'png', 'jpg', 'jpeg', 'gif', 'ttf', 'woff', 'woff2', 'eot'
    ],
  },
};
