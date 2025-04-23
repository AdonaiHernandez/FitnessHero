// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import { PermissionsAndroid, Platform } from 'react-native';

async function requestActivityPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 29) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
      {
        title: 'Permiso para actividad física',
        message: 'La app necesita acceder a tu actividad física para leer los pasos',
        buttonPositive: 'Aceptar',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}


export default function App() {
  const [authorized, setAuthorized] = useState(false);
  const [steps, setSteps] = useState(0);

  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
    ],
  };

  const checkFit = async () => {
    const permissionGranted = await requestActivityPermission();
    if (!permissionGranted) {
    console.log('Permiso de actividad no concedido');
    return;
    }
    GoogleFit.authorize(options)
      .then(authResult => {
        if (authResult.success) {
          setAuthorized(true);
          fetchSteps();
        } else {
          console.log('Auth failed', authResult.message);
        }
      })
      .catch(() => {
        console.log('Auth error');
      });
  };

  const fetchSteps = () => {
    const options = {
      startDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
      endDate: new Date().toISOString(),
    };

    GoogleFit.getDailyStepCountSamples(options)
      .then(res => {
        const stepsData = res.find(item => item.source === 'com.google.android.gms:estimated_steps');
        console.log("llegast a la respuesta",res);
        console.log("stepsData",stepsData);
        if (stepsData && stepsData.steps.length > 0) {
          const totalSteps = stepsData.steps[0].value;
          setSteps(totalSteps);
        } else {
          setSteps(0);
        }
      })
      .catch(err => {
        console.warn('Error getting steps', err);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>
        Google Fit autorizado: {authorized ? 'Sí' : 'No'}
      </Text>
      <Text style={{ color: 'white', fontSize: 18, marginBottom: 20 }}>
        PASOS (último día): {steps}
      </Text>
      <Button title="Conectar con Google Fit" onPress={checkFit} />
    </View>
  );
  
}
