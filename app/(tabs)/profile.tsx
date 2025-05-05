import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ProgressBar } from 'react-native-paper';

export default function ProfileScreen() {
  const router = useRouter();
  const [xp, setXP] = useState<number>(0);
  const [steps, setSteps] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      const storedXP = await AsyncStorage.getItem('xp');
      const storedSteps = await AsyncStorage.getItem('totalSteps');
      if (storedXP) setXP(parseInt(storedXP, 10));
      if (storedSteps) setSteps(parseInt(storedSteps, 10));
    };
    loadData();
  }, []);

  const level = Math.floor(0.1 * Math.sqrt(xp));
  const xpToNextLevel = Math.pow((level + 1) / 0.1, 2);
  const xpInLevel = xp - Math.pow(level / 0.1, 2);
  const xpNeeded = xpToNextLevel - Math.pow(level / 0.1, 2);
  const progress = xpInLevel / xpNeeded;

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['isLoggedIn', 'username', 'coins', 'xp']);
    Alert.alert('Has cerrado sesión');
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        <Text style={styles.title}>Mi Perfil</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Nombre: JuanFit</Text>
          <Text style={styles.infoText}>
            Nivel: {level} (XP: {xp} / {Math.round(xpToNextLevel)})
          </Text>
          <ProgressBar
            progress={Math.min(progress, 1)}
            color="#00FF99"
            style={{ height: 10, borderRadius: 5, marginBottom: 10 }}
          />
          <Text style={styles.infoText}>Pasos totales: {steps.toLocaleString()}</Text>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4B0082' },
  mainContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6FFE6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#6A0DAD',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginBottom: 30,
  },
  infoText: { color: '#FFF', fontSize: 16, marginBottom: 10 },
  logoutButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
