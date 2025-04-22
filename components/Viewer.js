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
      const asset = Asset.fromModule(require('../assets/models/MALE.glb'));
      await asset.downloadAsync();
      const fileUri = asset.localUri || asset.uri;

      

      // Leer el archivo .glb como Base64
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Construir el HTML con el modelo y los scripts necesarios
      setHtml(`
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>body { margin: 0; overflow: hidden; }</style>
            <script src="https://cdn.jsdelivr.net/npm/three@0.124.0/build/three.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/three@0.124.0/examples/js/loaders/GLTFLoader.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/three@0.124.0/examples/js/loaders/TextureLoader.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/three@0.124.0/examples/js/controls/OrbitControls.js"></script>
          </head>
          <body>
            <canvas id="canvas" style="width:100vw;height:100vh;"></canvas>
            <script>
             
              let textura_camiseta_roja = null;
              
              const binary = atob("${base64}");
              const bytes = new Uint8Array(binary.length);
              for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
              }
              let model = null;
              const blob = new Blob([bytes], { type: 'model/gltf-binary' });
              const url = URL.createObjectURL(blob);

              const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), alpha: true, antialias: true });
              renderer.setSize(window.innerWidth, window.innerHeight);
              renderer.setClearColor(0xE6FFE6);
              const scene = new THREE.Scene();
              const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
              camera.position.set(0, 1.5, 3);

              const controls = new THREE.OrbitControls(camera, renderer.domElement);
              controls.enableDamping = true;

              const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
              scene.add(light);

              const loader = new THREE.GLTFLoader();
              let mixer;
              const clock = new THREE.Clock();

              loader.load(url, function (gltf) {
                model = gltf.scene;
                model.scale.set(0.014, 0.014, 0.014); // Escala más pequeña
                model.position.set(0, -1, 0); // Ajuste en la posición
                scene.add(model);

                const walkClip = gltf.animations.find((clip) => true);
                if (walkClip) {
                  mixer = new THREE.AnimationMixer(model);
                  const action = mixer.clipAction(walkClip);
                  action.play();
                }

                animate();
              });

              function animate() {
                requestAnimationFrame(animate);
                const delta = clock.getDelta();
                if (mixer) mixer.update(delta);
                controls.update();
                renderer.render(scene, camera);
              }

              document.addEventListener('message', function(event) {
                const data = JSON.parse(event.data);
                if (data.action === 'color') {
                  changeModelColor(data.part, data.color);
                }
              });

              function changeModelColor(partName, color) {
                //alert("Color: " + partName);
                const pelo = model.getObjectByName("Male_hair");
                //alert( textura_camiseta_roja.toString());

                try{
              const loader = new THREE.TextureLoader();
              loader.load("https://raw.githubusercontent.com/AdonaiHernandez/FitnessHero/refs/heads/webview/assets/images/"+color, (texture) => {
                  textura_camiseta_roja = texture;
                  model.traverse(function (child) {
                  if (child.isMesh && child.name === 'Male_tshirt') {
                    child.material.map = textura_camiseta_roja;
                    child.material.needsUpdate = true;
                  }
                });
                }, null, (e) => {
                  alert(e.statusText);
                  })
              } catch(e) { alert(e) }
                
                
                
              }
            </script>
          </body>
        </html>
      `);
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
