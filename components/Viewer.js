import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Viewer() {
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        source={{
          html: `
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>body { margin: 0; }</style>
                <script src="https://cdn.jsdelivr.net/npm/three@0.124.0/build/three.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/three@0.124.0/examples/js/loaders/GLTFLoader.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/three@0.124.0/examples/js/controls/OrbitControls.js"></script>

              </head>
              <body>
                <canvas id="canvas" style="width:100vw;height:100vh;"></canvas>
                <script>
                  const canvas = document.getElementById('canvas');
                  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
                  renderer.setSize(window.innerWidth, window.innerHeight);

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

                  loader.load('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb', function (gltf) {
                    const model = gltf.scene;
                    model.scale.set(0.01, 0.01, 0.01);
                    scene.add(model);

                    if (gltf.animations && gltf.animations.length > 0) {
                      mixer = new THREE.AnimationMixer(model);
                      gltf.animations.forEach((clip) => {
                        if (clip.name == "Walk")
                        mixer.clipAction(clip).play();
                      });
                    }

                    animate();
                  }, undefined, function (error) {
                    document.body.innerHTML += '<p>Error: ' + error + '</p>';
                  });

                  function animate() {
                    requestAnimationFrame(animate);
                    const delta = clock.getDelta();
                    if (mixer) mixer.update(delta);
                    renderer.render(scene, camera);
                    controls.update();
                  }
                </script>
              </body>
            </html>
          `
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
