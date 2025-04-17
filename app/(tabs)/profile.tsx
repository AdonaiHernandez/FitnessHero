import { View, Text, StyleSheet } from 'react-native';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        <Text style={styles.title}>Mi Perfil</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Nombre: JuanFit</Text>
          <Text style={styles.infoText}>Nivel: 5</Text>
          <Text style={styles.infoText}>Pasos totales: 85,000</Text>
        </View>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4B0082' },
  mainContent: { flex: 1, padding: 20, backgroundColor: '#E6FFE6', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4B0082', textAlign: 'center', marginBottom: 20 },
  infoBox: { backgroundColor: '#6A0DAD', borderRadius: 10, padding: 20 },
  infoText: { color: '#FFF', fontSize: 16, marginBottom: 10 },
});
