import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

export default function AvatarPreview() {
  const [html, setHtml] = useState('');
  const webViewRef = useRef(null);

  useEffect(() => {
    const loadHtml = async () => {
      const asset = Asset.fromModule(require('../assets/webviews/viewer3d.html'));
      await asset.downloadAsync();
      const fileUri = asset.localUri || asset.uri;
      const htmlContent = await FileSystem.readAsStringAsync(fileUri);
      setHtml(htmlContent);
    };
    loadHtml();
  }, []);

  if (!html) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color="#6A0DAD" />
      </View>
    );
  }

  return (
    <View style={styles.previewContainer}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
        style={styles.webView}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    width: 120,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#D9D9D9',
  },
  webView: {
    width: '100%',
    height: '100%',
  },
  loader: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
