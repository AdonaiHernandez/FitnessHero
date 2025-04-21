import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Viewer from '@/components/Viewer';
import Footer from '@/components/footer';

export default function StoreScreen() {
  return (
    <View style={styles.container}>
      <Viewer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4B0082' },
  mainContent: { flex: 1, padding: 20, backgroundColor: '#E6FFE6' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#4B0082', textAlign: 'center' },
  item: { backgroundColor: '#6A0DAD', padding: 15, borderRadius: 10, marginVertical: 10 },
  itemText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
});
