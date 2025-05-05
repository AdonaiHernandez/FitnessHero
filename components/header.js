import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Header() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('Usuario');
  const [coins, setCoins] = useState(0);

  const loadData = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    const storedUsername = await AsyncStorage.getItem('username');
    const storedCoins = await AsyncStorage.getItem('coins');
    
    if (isLoggedIn === 'true') {
      setLoggedIn(true);
      if (storedUsername) setUsername(storedUsername);
      if (storedCoins) setCoins(parseInt(storedCoins, 10));
      else setCoins(0);
    } else {
      // Si no está logueado, reinicia monedas y no muestra nombre de usuario
      setLoggedIn(false);
      setUsername('');
      setCoins(0);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const handlePress = () => {
    router.push(loggedIn ? '/profile' : '/login');
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={require('../assets/images/count.png')} style={styles.countImage} />
      </TouchableOpacity>
      {/* Mostrar nombre de usuario solo si está logueado */}
      {loggedIn && <Text style={styles.username}>{username}</Text>}
      <View style={styles.coinsContainer}>
        <Text style={styles.coinsText}>{coins} 🪙</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#4B0082',
  },
  username: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  coinsContainer: { flexDirection: 'row', alignItems: 'center' },
  coinsText: { color: '#FFD700', fontSize: 18 },
  countImage: { width: 40, height: 40 },
});
