import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['isLoggedIn', 'username', 'coins']);
    Alert.alert('Has cerrado sesión');
    router.push('/login');
  };  

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        <Text style={styles.title}>Mi Perfil</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Nombre: JuanFit</Text>
          <Text style={styles.infoText}>Nivel: 5</Text>
          <Text style={styles.infoText}>Pasos totales: 85,000</Text>
        </View>

        {/* Botón para cerrar sesión */}
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
