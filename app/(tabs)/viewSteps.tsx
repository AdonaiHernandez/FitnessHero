import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useSteps, initGoogleFit } from '../googleApi';

const ViewSteps: React.FC = () => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const steps = useSteps(authorized ? 5000 : undefined);
  const goal = 10000;
  const progress = Math.min((steps / goal) * 100, 100);

  useEffect(() => {
    const init = async () => {
      const auth = await initGoogleFit();
      setAuthorized(auth);
    };
    init();
  }, []);

  if (authorized === null) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={{ color: '#FFF', marginTop: 10 }}>Cargando Google Fit...</Text>
      </View>
    );
  }

  if (!authorized) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: '#FFF', fontSize: 18, padding: 20, textAlign: 'center' }}>
          Google Fit no está autorizado. Por favor, vuelve a la pantalla de inicio de sesión para conectar tu cuenta.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        <Text style={styles.title}>Pasos del Día</Text>

        <View style={styles.stepsBox}>
          <Text style={styles.stepsText}>{steps}</Text>
          <Text style={styles.label}>pasos</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.goalText}>Meta: {goal} pasos</Text>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
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

export default ViewSteps;
