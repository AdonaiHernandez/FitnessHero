import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AvatarPreview from '@/components/avatarPreview';
import { crearReto } from './retoService';
import NotificadorDeRetos from './notificadorDeRetos';

export default function HomeScreen() {
  const router = useRouter();
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn !== 'true') {
        router.replace('/login');
      } else {
        setCheckingLogin(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (checkingLogin) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4B0082" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.avatarContainer} onPress={() => router.push('/avatar')}>
          {Platform.OS === 'web' ? (
            // En web solo mostramos el texto para que no crashee y podamos probar las cosas.
            <Text style={styles.avatarText}>Avatar</Text>
          ) : (
            // En móvil mostramos el AvatarPreview
            <AvatarPreview />
          )}
        </TouchableOpacity>
        <NotificadorDeRetos/>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/misChallenges')}>
            <Text style={styles.buttonText}>Challenges</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/viewSteps')}>
            <Text style={styles.buttonText}>Steps</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.button} onPress={crearReto}>
            <Text style={styles.buttonText}>Send challenge</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4B0082' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E6FFE6' },
  mainContent: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E6FFE6' },
  avatarText: { color: '#000', fontWeight: 'bold', fontSize: 20 },
  buttonsRow: { flexDirection: 'row', marginTop: 20 },
  button: { backgroundColor: '#6A0DAD', padding: 10, borderRadius: 10, marginHorizontal: 10, width: 180, height: 50, justifyContent: 'center' },
  avatarContainer: { padding: 5, borderRadius: 10, backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', textAlign: 'center', fontSize: 18 },
});
