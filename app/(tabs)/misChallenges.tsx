import React, {useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

type Challenge = {
  id: number;
  title: string;
  description: string;
  reward: number;
  type: 'daily' | 'friend'; // Tipo de reto
};

const challengesData: Challenge[] = [
  { id: 1, title: 'Camina 5000 pasos', description: 'Alcanza 5000 pasos en un día', reward: 5, type: 'daily' },
  { id: 2, title: 'Desafío de yoga', description: 'Haz 20 minutos de yoga', reward: 8, type: 'daily' },
  { id: 3, title: 'Trote ligero', description: 'Corre 2 kilómetros', reward: 6, type: 'daily' },
  { id: 4, title: 'Eduardo', description: 'Hacer más flexiones en un día', reward: 10, type: 'friend' },
  { id: 5, title: 'Jose', description: 'Beber más agua en un día', reward: 7, type: 'friend' },
];
const router = useRouter();

const ChallengesScreen = () => {
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [coins, setCoins] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        const storedCompleted = await AsyncStorage.getItem('completedChallenges');
        const storedCoins = await AsyncStorage.getItem('coins');
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
  
        if (storedCompleted) setCompletedChallenges(JSON.parse(storedCompleted));
        if (storedCoins) setCoins(parseInt(storedCoins, 10));
        setIsLoggedIn(loggedIn === 'true');
      };
  
      loadData();
    }, [])
  );
  const completeChallenge = async (challenge: Challenge) => {
    if (completedChallenges.includes(challenge.id)) return;

    const updated = [...completedChallenges, challenge.id];
    const newCoins = coins + challenge.reward;

    setCompletedChallenges(updated);
    setCoins(newCoins);

    await AsyncStorage.setItem('completedChallenges', JSON.stringify(updated));
    await AsyncStorage.setItem('coins', newCoins.toString());
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.loginMessage}>Por favor, inicie sesión para ver los retos.</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const remainingChallenges = challengesData.filter(
    challenge => !completedChallenges.includes(challenge.id)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Retos disponibles</Text>
      <Text style={styles.coins}>💰 Monedas: {coins}</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
        <TouchableOpacity
          style={[styles.completeButton, { backgroundColor: '#32CD32', flex: 1, marginRight: 5 }]}
          onPress={() => router.push('/crearRetoAmigo')}
        >
          <Text style={styles.buttonText}>👥 Crear reto</Text>
        </TouchableOpacity>

        {/* Botón para reiniciar retos, para probar administrador(descomentar para ello)*/}
        {/* 
        <TouchableOpacity
          style={[styles.completeButton, { backgroundColor: 'orange', flex: 1, marginLeft: 5 }]}
          onPress={async () => {
          await AsyncStorage.setItem('completedChallenges', JSON.stringify([]));
          await AsyncStorage.setItem('coins', '0');
          setCompletedChallenges([]);
          setCoins(0);
          }}
        >
          <Text style={styles.buttonText}>🔁 Reiniciar retos</Text>
        </TouchableOpacity> 
        */}

      </View>

      {remainingChallenges.length === 0 ? (
        <Text style={styles.allCompleted}>🎉 ¡Todos los retos han sido completados!</Text>
      ) : (
        <FlatList
          data={remainingChallenges}
          keyExtractor={item => item.id.toString()}
          numColumns={2} // Para mostrar dos columnas
          renderItem={({ item }) => (
            <View style={styles.challengeCard}>
              <Text style={styles.challengeTitle}>{item.title}</Text>
              <Text style={styles.challengeDescription}>{item.description}</Text>
              <Text style={styles.challengeReward}>🏅 Recompensa: {item.reward} monedas</Text>
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => completeChallenge(item)}
              >
                <Text style={styles.buttonText}>Completar reto</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8FFE8',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#4B0082',
  },
  coins: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  allCompleted: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 'bold',
    color: 'green',
  },
  challengeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 10,
    flex: 0.45, // Para que ocupen el 45% del ancho
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  challengeDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  challengeReward: {
    fontSize: 14,
    color: '#4B0082',
    marginBottom: 10,
  },
  completeButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 'bold',
    color: 'red',
  },
  loginButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
});

export default ChallengesScreen;
