/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */


// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

module.exports = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      sourceExts: ['jsx', 'js', 'ts'],
    },
  };
