// StoreScreen.tsx
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const items = [
  { id: '1', name: 'Gafas deportivas', price: 15, image: require('@/assets/images/gym-shop.png') },
  { id: '2', name: 'Camiseta técnica', price: 10, image: require('@/assets/images/gym-shop.png') },
  { id: '3', name: 'Zapatos especiales', price: 20, image: require('@/assets/images/gym-shop.png') },
  { id: '4', name: 'Guantes de entrenamiento', price: 8, image: require('@/assets/images/gym-shop.png') },
  { id: '5', name: 'Cinturón lumbar', price: 12, image: require('@/assets/images/gym-shop.png') },
  { id: '6', name: 'Mochila fitness', price: 18, image: require('@/assets/images/gym-shop.png') },
];

export default function StoreScreen() {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const fetchCoins = async () => {
      const savedCoins = await AsyncStorage.getItem('coins');
      if (savedCoins) setCoins(parseInt(savedCoins));
    };
    fetchCoins();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        <Text style={styles.title}>Tienda de Accesorios</Text>
        <FlatList
          data={items}
          numColumns={2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text
                style={[
                  styles.itemPrice,
                  item.price > coins && styles.notEnough,
                ]}
              >
                {item.price} 🪙
              </Text>
            </View>
          )}
        />
      </View>
      <Footer />
    </View>
  );
}

const cardWidth = (Dimensions.get('window').width - 60) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4B0082' },
  mainContent: { flex: 1, padding: 20, backgroundColor: '#E6FFE6' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4B0082',
    textAlign: 'center',
  },
  grid: { gap: 15 },
  row: { justifyContent: 'space-between', marginBottom: 20 },
  card: {
    backgroundColor: '#6A0DAD',
    borderRadius: 12,
    padding: 10,
    width: cardWidth,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  itemPrice: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 14,
  },
  notEnough: {
    color: '#FF4D4D',
  },
});
