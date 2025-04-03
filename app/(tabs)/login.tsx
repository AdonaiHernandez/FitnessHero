import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const router = useRouter();

  const handleLogin = () => {
    const correctUsername = 'usuario';
    const correctPassword = 'contraseña';
    router.push('/')

    if (username === correctUsername && password === correctPassword) {
      Alert.alert('Login exitoso');
      router.push('/explore')
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>FitnessHero</Text>
      </View>

      {/* Formulario */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#555"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#555"
        />

        {/* Botón de login */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        {/* Recuperar contraseña */}
        <TouchableOpacity onPress={() => router.push('/recuperarContrasena')} style={styles.link}>
          <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        {/* Registrarse */}
        <TouchableOpacity onPress={() => router.push('/register')} style={styles.link}>
          <Text style={styles.linkText}>¿No tienes cuenta? <Text style={styles.boldText}>Regístrate</Text></Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8FFE8', // Fondo verde claro
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    backgroundColor: '#4B0082', // Morado
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  loginButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    alignItems: 'center',
    marginTop: 5,
  },
  linkText: {
    color: '#4B0082',
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    backgroundColor: '#4B0082',
    height: 50, // Footer del mismo color que el header
  },
});

export default LoginScreen;
