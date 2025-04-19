import React, {useRef} from 'react';
import { View, Image, StyleSheet  } from 'react-native';
import { GLView } from 'expo-gl';
import { loadAsync, Renderer, TextureLoader, THREE } from 'expo-three';
import {
    AmbientLight,
    Mesh,
    PerspectiveCamera,
    Group,
    Scene
} from 'three';

export default function Viewer() {
    const modelName  = "model1";
    const modelRef = useRef();
    const cameraRef = useRef();
    const timeoutRef = useRef();
  return (
    <View style={{ flex: 1 }}>
      <GLView
        style={{ flex: 1 }}
        onContextCreate={async (gl) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 2;

        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);

        const ambientLight = new AmbientLight(0xff0000, 2);
        scene.add(ambientLight);
  

        const object = await loadAsync(
            [require('../assets/objects/model1/model1.obj'), require('../assets/objects/model1/model1.mtl')],
            null,
            imageName => {
                return {
                  'diffuse.jpg': require('../assets/objects/model1/model1.png'),
                }[imageName]
            }
        )
        console.log(object);
          object.traverse((child: any) => {
                if (child instanceof Mesh) {
                    const material = child.material;
                    if (material) {
                        // Apply textures based on their intended use
                        material.map = loadedTextures.color;
                        material.normalMap = loadedTextures.normal;
                        material.aoMap = loadedTextures.occlusion;
                        material.needsUpdate = true;
                    }
                }
            });
            const scale  = 0.1
        // Position the object in view
        object.scale.set(scale, scale, scale); // Scale the object
        object.position.set(0, 0, 0); // Center the object

        scene.add(object);
        modelRef.current = object;

        // Adjust camera to look at center of object
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        camera.lookAt(center);
        const render = () => {

        timeoutRef.current = requestAnimationFrame(render);
        if (modelRef.current) {

            // rotating to the right slightly
            modelRef.current.rotation.y += 0.004;
        }
        if (cameraRef.current && scene) {
            renderer.render(scene, camera);
        }
        gl.endFrameEXP();
    };
    render();
        }}
      />
    </View>
  );
}
