import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const CrearRetoAmigo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const router = useRouter();

  const handleCreateChallenge = () => {
    //DE PRUEBA, TODO
    if (!title || !description || !reward) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    Alert.alert('¡Reto creado!', `Reto para un amigo: ${title}`, [
      { text: 'OK', onPress: () => router.back() },
    ]);
    setTitle('');
    setDescription('');
    setReward('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Crear reto para un amigo</Text>

      <TextInput
        style={styles.input}
        placeholder="Título del reto"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Recompensa (número)"
        value={reward}
        onChangeText={setReward}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.createButton} onPress={handleCreateChallenge}>
        <Text style={styles.buttonText}>✅ Crear reto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CrearRetoAmigo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8FFE8',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4B0082',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
