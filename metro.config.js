const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 👇 Esto es lo importante
config.resolver.assetExts.push('obj','mtl', 'gltf', 'bin');

module.exports = config;