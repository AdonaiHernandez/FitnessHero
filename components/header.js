import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'react-native';

export default function Header() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      setLoggedIn(isLoggedIn === 'true');
    };
    checkLogin();
  }, []);

  const handlePress = () => {
    if (loggedIn) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={require('../assets/images/count.png')} style={styles.countImage} />
      </TouchableOpacity>
      <Text style={styles.username}>Usuario</Text>
      <View style={styles.coinsContainer}>
        <Text style={styles.coinsText}>120</Text>
        <Image source={require('../assets/images/coin.png')} style={styles.coinImage} />
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
  coinsText: { color: '#FFD700', fontSize: 18,},
  coinImage: { width: 24, height: 24 },
  countImage: { width: 28, height: 28 },
});
