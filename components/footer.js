import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function Footer() {
  const router = useRouter();

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/ranking')}>
        <Image source={require('../assets/images/ranking.png')} style={styles.footerImage} />
        <Text style={styles.footerText}>Rankings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/index')}>
        <IconSymbol size={28} name="house.fill" color="#FFF" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/tienda')}>
        <Image source={require('../assets/images/gym-shop.png')} style={styles.footerImage} />
        <Text style={styles.footerText}>Tienda</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    alignItems: 'center' 
  },
  footerImage: { width: 28, height: 28 },
  footerText: { color: '#FFF', fontSize: 12, marginTop: 5, textAlign: 'center' },
});
