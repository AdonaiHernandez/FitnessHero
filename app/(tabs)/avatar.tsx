import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Viewer from '@/components/Viewer';
import Footer from '@/components/footer';
import Header from '@/components/header';
import React from 'react';


export default function Avatar() {
  return (
    <View style={styles.container}>
      <Header />
            <View style={styles.mainContent}>
              <Text style={styles.title}>Avatar</Text>
              <Viewer/>
            </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4B0082' },
  mainContent: { flex: 1, padding: 20, backgroundColor: '#E6FFE6' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#4B0082', textAlign: 'center' },
  item: { backgroundColor: '#6A0DAD', padding: 15, borderRadius: 10, marginVertical: 10 },
  itemText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }
});
