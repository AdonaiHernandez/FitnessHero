import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { SafeAreaView } from 'react-native';
import ThreeScene from '@/components/ThreeScene';

export default function HomeScreen() {
  return (
  <SafeAreaView style={{ flex: 1 }}>
    <ThreeScene />
  </SafeAreaView>
  );
}
