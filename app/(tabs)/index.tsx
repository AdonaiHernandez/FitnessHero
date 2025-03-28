import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const username = 'Usuario'; // Temporal, se cambiará cuando haya autenticación
  const coins = 120;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push('/profile')}>
        <Image source={require('../../assets/images/count.png')} style={styles.footerImage} />
        </TouchableOpacity>
        <Text style={styles.username}>{username}</Text>
        <View style={styles.coinsContainer}>
          <Text style={styles.coinsText}>{coins}</Text>
          <Image source={require('../../assets/images/coin.png')} style={styles.coinImage} />
        </View>
      </View>
      
      {/* Main Content */}
      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Text style={styles.avatarText}>Avatar</Text>
        </TouchableOpacity>
        
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Challenges</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Steps</Text></TouchableOpacity>
        </View>
      </View>
      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Image source={require('../../assets/images/ranking.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Rankings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <IconSymbol size={28} name="house.fill" color="#FFF" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Image source={require('../../assets/images/gym-shop.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Tienda</Text>
        </TouchableOpacity>
      </View>
  </View>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4B0082' },
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
  coinsText: { color: '#FFD700', fontSize: 18, marginRight: 5 },
  mainContent: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E6FFE6' },
  avatarContainer: { width: 200, height: 150, borderRadius: 50, backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#000', fontWeight: 'bold', fontSize: 20 },
  buttonsRow: { flexDirection: 'row', marginTop: 20 },
  button: { backgroundColor: '#6A0DAD', padding: 10, borderRadius: 10, marginHorizontal: 10, width: 150, height: 50, justifyContent: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', textAlign: 'center', fontSize: 18 },
  coinImage: { width: 24, height: 24 },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    padding: 16, 
    backgroundColor: '#4B0082', 
    position: 'absolute', 
    bottom: 0, 
    width: '100%' 
  },
  footerItem: { 
    alignItems: 'center' // Asegura que la imagen y el texto estén centrados 
  },
  footerImage: { width: 28, height: 28 },
  footerText: { color: '#FFF', fontSize: 12, marginTop: 5, textAlign: 'center' }, // Agregado margen superior
});
