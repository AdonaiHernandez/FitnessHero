// StoreScreen.tsx
import { View, Text, StyleSheet, FlatList, Image, Dimensions, SafeAreaView } from 'react-native';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

const items = [
  { id: '1', name: 'Gafas deportivas', price: 15, image: require('@/assets/images/sport-glasses.png') },
  { id: '2', name: 'Camiseta técnica', price: 10, image: require('@/assets/images/sport-shirt.png') },
  { id: '3', name: 'Zapatos especiales', price: 20, image: require('@/assets/images/sport-shoes.png') },
  { id: '4', name: 'Guantes de entrenamiento', price: 8, image: require('@/assets/images/sport-gloves.png') },
  { id: '5', name: 'Boina', price: 12, image: require('@/assets/images/boina.png') },
  { id: '6', name: 'Mochila fitness', price: 18, image: require('@/assets/images/sport-bag.png') },
];

export default function StoreScreen() {
  const [coins, setCoins] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const fetchCoins = async () => {
        const savedCoins = await AsyncStorage.getItem('coins');
        if (savedCoins) setCoins(parseInt(savedCoins));
      };
      fetchCoins();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        <Text style={styles.title}>Tienda de Accesorios</Text>
        <FlatList
          data={items}
          numColumns={2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
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
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 60) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
  },
  mainContent: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5FF',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4B0082',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: cardWidth,
    backgroundColor: '#6A0DAD',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    maxWidth: '25%',
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  notEnough: {
    color: '#FF4D4D',
  },
});
