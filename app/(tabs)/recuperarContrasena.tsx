import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const RecoverPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleRecoverPassword = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    router.push("/login")
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico.');
    } else if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Formato de correo electrónico inválido.');
    } else {
      // Lógica para enviar la solicitud de recuperación (puede ser un llamado a una API)
      Alert.alert('Recuperación de contraseña', 'Te hemos enviado un correo para restablecer tu contraseña.');
      router.push('/login');  // Regresar a la pantalla de login
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
        <Text style={styles.title}>Recuperar Contraseña</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#555"
        />

        {/* Botón de recuperación */}
        <TouchableOpacity style={styles.loginButton} onPress={handleRecoverPassword}>
          <Text style={styles.loginButtonText}>Enviar solicitud</Text>
        </TouchableOpacity>

        {/* Volver al login */}
        <TouchableOpacity onPress={() => router.push('/login')} style={styles.link}>
          <Text style={styles.linkText}>¿Recuerdas tu contraseña? <Text style={styles.boldText}>Inicia sesión</Text></Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 20,
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
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
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

export default RecoverPasswordScreen;
