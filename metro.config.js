// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Agrega 'html' a las extensiones de assets
config.resolver.assetExts.push('html');
config.resolver.assetExts.push('glb');

module.exports = config;