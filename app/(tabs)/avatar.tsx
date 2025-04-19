import React from 'react';
import { View, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { loadAsync, Renderer, TextureLoader, THREE } from 'expo-three';
import {
    AmbientLight,
    Mesh,
    PerspectiveCamera,
    Group,
    Scene
} from 'three';

const Avatar: React.FC = () => {
    console.log("Avatar");
    const [isLoading, setIsLoading] = React.useState(true);
    const cameraRef = React.useRef<THREE.Camera>();
    const modelRef = React.useRef<Group>();
    const timeoutRef = React.useRef<number>();

    const modelName = "model1";
    const scale = 1;

    React.useEffect(() => {
        // Clear the animation loop when the component unmounts
        return () => clearTimeout(timeoutRef.current);
    }, []);

    const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
        console.log("context create");
        // removes the warning EXGL: gl.pixelStorei() doesn't support this parameter yet!
        const pixelStorei = gl.pixelStorei.bind(gl);
        gl.pixelStorei = function (...args) {
            const [parameter] = args;
            switch (parameter) {
                case gl.UNPACK_FLIP_Y_WEBGL:
                    return pixelStorei(...args);
            }
        };

        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
        const clearColor = 0xffffff;

        // Create a WebGLRenderer without a DOM element
        const renderer = new Renderer({
            gl,
            clearColor,
            width: width,
            height: height,
        });

        const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
        camera.position.set(2, 3, 2);
        camera.updateProjectionMatrix();
        cameraRef.current = camera;


        const scene = new Scene();

        // light up the scene
        const ambientLight = new AmbientLight(0xffffff, 2);
        scene.add(ambientLight);


        // load OBJ model
        const assets: any = {
            obj: `${process.env.EXPO_PUBLIC_API_URL}/assets/objects/${modelName}/${modelName}.obj`,
            mtl: `${process.env.EXPO_PUBLIC_API_URL}/assets/objects/${modelName}/${modelName}.mtl`,
            // add the textures
            textures: {
                color: `${process.env.EXPO_PUBLIC_API_URL}/assets/objects/${modelName}/textures/color.jpg`,
                normal: `${process.env.EXPO_PUBLIC_API_URL}/assets/objects/${modelName}/textures/normal.jpg`,
                occlusion: `${process.env.EXPO_PUBLIC_API_URL}/assets/objects/${modelName}/textures/occlusion.jpg`
            }
        };

        try {
            if (Platform.OS !== 'web') {
                // First load any textures
                const textureLoader = new TextureLoader();

                // Load all textures first
                const loadedTextures = {
                    color: await textureLoader.loadAsync(assets.textures.color),
                    normal: await textureLoader.loadAsync(assets.textures.normal),
                    occlusion: await textureLoader.loadAsync(assets.textures.occlusion)
                };
                // Then load the model
                console.log("Loading model");
                const object = await loadAsync(
                    [assets.obj, assets.mtl],
                    // @ts-ignore
                    null,
                    (name) => {
                        // This function helps resolve texture paths referenced in MTL
                        if (name.includes('color.jpg')) return assets.textures.color;
                        if (name.includes('normal.jpg')) return assets.textures.normal;
                        if (name.includes('occlusion.jpg')) return assets.textures.occlusion;
                        return null;
                    }
                    // (name: any) => model[name]
                ).catch((err) => {
                    console.log(err);
                });

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

                // Position the object in view
                object.scale.set(scale, scale, scale); // Scale the object
                object.position.set(0, 0, 0); // Center the object

                scene.add(object);
                modelRef.current = object;

                // Adjust camera to look at center of object
                const box = new THREE.Box3().setFromObject(object);
                const center = box.getCenter(new THREE.Vector3());
                camera.lookAt(center);
            }
        } catch (err) {
            console.log('Error loading model:', err);
            return;
        }

        // Setup an animation loop
        const render = () => {
            if (isLoading) {
                setIsLoading(false);
            }

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
    };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        <Text style={styles.title}>Mi Avatar</Text>

        <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
            {isLoading && <LoadingView />}
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#E6FFE6',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 30,
    textAlign: 'center',
  },
  stepsBox: {
    backgroundColor: '#6A0DAD',
    padding: 30,
    borderRadius: 20,
    marginBottom: 30,
    alignItems: 'center',
    width: '80%',
  },
  stepsText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
  },
  label: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 5,
  },
  progressContainer: {
    width: '80%',
    height: 14,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2e8b57',
  },
  goalText: {
    fontSize: 16,
    color: '#4B0082',
    marginTop: 5,
  },
});

export default Avatar;
const LoadingView = () => {
    return (
        <View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
            }}
        >
            <ActivityIndicator />
            <Text>Loading...</Text>
        </View>
    );
};
