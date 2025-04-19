import React from 'react';
import { Asset } from 'expo-asset';
import { View, Image, StyleSheet  } from 'react-native';
import Viewer from '@/components/3dViewer';
import { GLView } from 'expo-gl';
import { loadAsync, Renderer, TextureLoader, THREE } from 'expo-three';
import {
    AmbientLight,
    Mesh,
    PerspectiveCamera,
    Group,
    Scene
} from 'three';

export default function minAvatar() {
  return (
    <View style={{ flex: 1 }}>
      <Viewer/>
    </View>
  );
}
