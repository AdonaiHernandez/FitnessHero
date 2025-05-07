import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db } from './firebaseConfig';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

const USER_ID = process.env.EXPO_PUBLIC_USER_ID;

export default function PantallaReto() {
  const { retoId } = useLocalSearchParams();
  const router = useRouter();

  const [ganador, setGanador] = useState<string | null>(null);
  const [yaPresiono, setYaPresiono] = useState(false);
  const [resultadoMostrado, setResultadoMostrado] = useState(false);

  useEffect(() => {
    if (!retoId) return;

    const retoRef = doc(db, 'retos', retoId as string);

    const unsubscribe = onSnapshot(retoRef, (docSnap) => {
      const data = docSnap.data();
      if (data?.ganador && !ganador) {
        setGanador(data.ganador);

        if (data.ganador === USER_ID) {
          manejarVictoria(data.ganador);
        } else {
          manejarDerrota(data.ganador);
        }
      }
    });

    return () => unsubscribe();
  }, [retoId]);

  const manejarVictoria = (ganadorId: string) => {
    if (resultadoMostrado) return;
    setResultadoMostrado(true);

    // Aquí podrás añadir puntos, experiencia, etc.
    console.log('✅ Ganaste. Puedes sumar XP o puntos aquí.');

    Alert.alert('🎉 ¡Ganaste!', 'Fuiste el más rápido', [
      { text: 'Volver al inicio', onPress: () => router.replace('/') },
    ]);
  };

  const manejarDerrota = (ganadorId: string) => {
    if (resultadoMostrado) return;
    setResultadoMostrado(true);

    // Aquí podrás restar puntos o aplicar penalizaciones si quieres
    console.log('❌ Perdiste. Puedes restar puntos aquí.');

    Alert.alert('😞 Perdiste', `Ganó ${ganadorId}`, [
      { text: 'Volver al inicio', onPress: () => router.replace('/') },
    ]);
  };

  const presionarBoton = async () => {
    if (yaPresiono || ganador) return;
    setYaPresiono(true);
    const retoRef = doc(db, 'retos', retoId as string);
    
    try {
      await updateDoc(retoRef, { ganador: USER_ID });
      // El onSnapshot se encargará de mostrar el resultado
    } catch (err) {
      console.error('Error al declarar ganador:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚡ Reto de Rapidez</Text>

      {!ganador && (
        <Button title="¡Presiona rápido!" onPress={presionarBoton} />
      )}

      {ganador && (
        <Text style={styles.winnerText}>
          {ganador === USER_ID ? '✅ ¡Ganaste tú!' : `❌ El ganador fue ${ganador}`}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 22, marginBottom: 20, fontWeight: 'bold' },
  winnerText: { fontSize: 20, marginTop: 30 },
});
