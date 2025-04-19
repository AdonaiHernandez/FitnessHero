import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '@/components/header';
import Footer from '@/components/footer';

const ViewSteps: React.FC = () => {


  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        <Text style={styles.title}>Mi Avatar</Text>

        
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#E6FFE6',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 30,
    textAlign: 'center',
  },
  stepsBox: {
    backgroundColor: '#6A0DAD',
    padding: 30,
    borderRadius: 20,
    marginBottom: 30,
    alignItems: 'center',
    width: '80%',
  },
  stepsText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
  },
  label: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 5,
  },
  progressContainer: {
    width: '80%',
    height: 14,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2e8b57',
  },
  goalText: {
    fontSize: 16,
    color: '#4B0082',
    marginTop: 5,
  },
});

export default ViewSteps;
