import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Header() {
  const router = useRouter();
  const username = 'Usuario'; // Temporal, se cambiará cuando haya autenticación
  const coins = 120;

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push('/profile')}>
      <Image source={require('../assets/images/count.png')} style={styles.countImage} />
      </TouchableOpacity>
      <Text style={styles.username}>{username}</Text>
      <View style={styles.coinsContainer}>
        <Text style={styles.coinsText}>{coins}</Text>
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

