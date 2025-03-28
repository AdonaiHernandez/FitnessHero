import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Header/>
      {/* Contenido principal */}
      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Text style={styles.avatarText}>Avatar</Text>
        </TouchableOpacity>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Challenges</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/viewSteps')}>
            <Text style={styles.buttonText}>Steps</Text>
            </TouchableOpacity>
        </View>
      </View>
      <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4B0082' },
  mainContent: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E6FFE6' },
  avatarContainer: { width: 200, height: 150, borderRadius: 50, backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#000', fontWeight: 'bold', fontSize: 20 },
  buttonsRow: { flexDirection: 'row', marginTop: 20 },
  button: { backgroundColor: '#6A0DAD', padding: 10, borderRadius: 10, marginHorizontal: 10, width: 150, height: 50, justifyContent: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', textAlign: 'center', fontSize: 18 },
});

