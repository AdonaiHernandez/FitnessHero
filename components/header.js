// header.tsx
import React from 'react';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
    setLoggedIn(isLoggedIn === 'true');
    if (storedUsername) setUsername(storedUsername);
    if (storedCoins) setCoins(parseInt(storedCoins));
    else setCoins(0);
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
      <Text style={styles.username}>{username}</Text>
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
    padding: 25,
    backgroundColor: '#4B0082',
    marginTop: 25,
    marginLeft: 35,
  },
  username: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  coinsContainer: { flexDirection: 'row', alignItems: 'center' },
  coinsText: { color: '#FFD700', fontSize: 18 },
  countImage: { width: 28, height: 28 },
});
