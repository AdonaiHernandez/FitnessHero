// /src/components/viewSteps.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '@/components/header';
import Footer from '@/components/footer';

const ViewSteps: React.FC = () => {
  const steps = 5320; // Este es un valor fijo de ejemplo, lo puedes cambiar

  return (
    <View style={styles.container}>
      <Header/>
      <Text style={styles.title}>Pasos del Día</Text>
      <View style={styles.counterContainer}>
        <Text style={styles.steps}>{steps}</Text>
        <Text style={styles.subtitle}>pasos</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${(steps / 10000) * 100}%` }]} />
      </View>
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  steps: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2e8b57',
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginLeft: 5,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2e8b57',
    borderRadius: 5,
  },
});

export default ViewSteps;
