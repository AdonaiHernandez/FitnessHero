import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber/native';
import { View } from 'react-native';
import { GLView } from 'expo-gl';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const RotatingBox = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default function ThreeScene() {
  return (
    <View style={{ flex: 1 }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <RotatingBox />
      </Canvas>
    </View>
  );
}
