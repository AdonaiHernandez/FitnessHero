import React, { useEffect, useState, useRef } from 'react';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Viewer() {
  const [html, setHtml] = useState('');
  const webViewRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState("red");
  const bodyParts = {
    "shorts": "Male_shorts",
    "tshirt": "Male_tshirt"
  }
  const colors = {
    "red": "rojo.jpg",
    "blue": "0x0000ff",
    "green": "verde.jpg"
  }
  const enviarMensaje = (part, color) => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({ action: 'color', part: bodyParts[part], color: colors[color] }));
    }
  };

  useEffect(() => {
    const prepare = async () => {
      // Cargar el modelo GLB desde el directorio de assets
      /*const asset = Asset.fromModule(require('../assets/models/MALE.glb'));
      await asset.downloadAsync();
      const fileUri = asset.localUri || asset.uri;

      

      // Leer el archivo .glb como Base64
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });*/

      const asset = Asset.fromModule(require('../assets/webviews/viewer3d.html'));
      await asset.downloadAsync();
      const fileUri = asset.localUri || asset.uri;
      const htmlContent = await FileSystem.readAsStringAsync(fileUri);

      // Construir el HTML con el modelo y los scripts necesarios
      setHtml(
        htmlContent
      );
    };

    prepare();
  }, []);

  return (
    <View style={styles.container}>
      {html ? (
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html }}
          javaScriptEnabled
          domStorageEnabled
          style={{ flex: null, height: '100%' }}
        />
      ) : null}
      <View style={{flex: 1}}>
      <Text>Tshirt Color</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => {
          enviarMensaje("shorts",itemValue);
          // Aquí puedes llamar a tu función para cambiar la textura:
          // setHairTexture(itemValue);
        }}
      >
        <Picker.Item label="Red" value="red" />
        <Picker.Item label="Green" value="green" />
      </Picker>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
