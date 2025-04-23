import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '@/components/header';
import Footer from '@/components/footer';
import React from 'react';

const rankings = [
  { id: '1', name: 'Tú', steps: 12000 },
  { id: '2', name: 'Ana', steps: 10500 },
  { id: '3', name: 'Carlos', steps: 9800 },
];

export default function RankingScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        <Text style={styles.title}>Ranking de Pasos</Text>
        <FlatList
          data={rankings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.name}: {item.steps} pasos</Text>
            </View>
          )}
        />
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4B0082' },
  mainContent: { flex: 1, padding: 20, backgroundColor: '#E6FFE6' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#4B0082', textAlign: 'center' },
  item: { backgroundColor: '#6A0DAD', padding: 15, borderRadius: 10, marginBottom: 10 },
  itemText: { color: '#FFF', fontSize: 16, textAlign: 'center' },
});
