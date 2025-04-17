import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function ChallengesScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        <Text style={styles.title}>Mis Challenges</Text>
        <TouchableOpacity style={styles.challengeBox}>
          <Text style={styles.challengeText}>Reto Diario: 10,000 pasos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.challengeBox}>
          <Text style={styles.challengeText}>Reto con amigos: Caminar 5km</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4B0082' },
  mainContent: { flex: 1, padding: 20, backgroundColor: '#E6FFE6' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4B0082', textAlign: 'center', marginBottom: 20 },
  challengeBox: { backgroundColor: '#6A0DAD', padding: 15, borderRadius: 10, marginVertical: 10 },
  challengeText: { color: '#FFF', fontSize: 16, textAlign: 'center' },
});
