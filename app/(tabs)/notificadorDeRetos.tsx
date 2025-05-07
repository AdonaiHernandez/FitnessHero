import React, { useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { verificarRetosPendientes, verificarRetosAceptados, aceptarReto, rechazarReto } from './retoService';
import { router } from 'expo-router';

const USER_ID = process.env.EXPO_PUBLIC_USER_ID;

let intervalId: NodeJS.Timeout | null = null;

export const startCheckingInterval = () => {
  if (intervalId) return;

  intervalId = setInterval(async () => {
    // 1. Verifica si el usuario ha recibido un reto pendiente
    const pendientes = await verificarRetosPendientes();
    if (pendientes.length > 0) {
      stopCheckingInterval();

      const reto = pendientes[0];
      Alert.alert(
        '¡Nuevo reto recibido!',
        `De: ${reto.fromUserId}\nDescripción: ${reto.descripcion}`,
        [
          {
            text: 'Aceptar',
            onPress: () => aceptarReto(reto.id),
          },
          {
            text: 'Rechazar',
            style: 'cancel',
            onPress: () => {
              rechazarReto(reto.id);
              startCheckingInterval(); // reiniciar tras rechazar
            },
          },
        ],
        { cancelable: false }
      );

      return; // evitar que se siga ejecutando el resto
    }

    // 2. Verifica si alguno de sus retos fue aceptado
    const aceptados = await verificarRetosAceptados();
    if (aceptados.length > 0) {
      stopCheckingInterval();

      const retoAceptado = aceptados[0];
      const retoId = retoAceptado.id;
      router.push({
        pathname: '/pantallaReto',
        params: { retoId },
      });
    }

  }, 5000);
};

// función exportada para detener el intervalo
export const stopCheckingInterval = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

// componente visual
export default function NotificadorDeRetos() {
  useEffect(() => {
    startCheckingInterval();

    return () => stopCheckingInterval();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🕓 Esperando retos para {USER_ID}...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eef6ff',
    padding: 12,
    marginVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#aad4ff',
    alignItems: 'center',
  },
  text: {
    color: '#0366d6',
    fontWeight: '600',
  },
});
