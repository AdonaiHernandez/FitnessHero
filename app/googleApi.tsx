import { useEffect, useState } from 'react';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import { PermissionsAndroid, Platform } from 'react-native';

const options = {
  scopes: [Scopes.FITNESS_ACTIVITY_READ],
};

export async function requestActivityPermission() {
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

export async function authorizeGoogleFit(): Promise<boolean> {
  const permissionGranted = await requestActivityPermission();
  if (!permissionGranted) {
    console.log('Permiso de actividad no concedido');
    return false;
  }

  try {
    const authResult = await GoogleFit.authorize(options);
    if (authResult.success) {
      return true;
    } else {
      console.log('Auth failed:', authResult.message);
      return false;
    }
  } catch (error) {
    console.log('Auth error:', error);
    return false;
  }
}

export async function getSteps(): Promise<number> {
  const range = {
    startDate: new Date().setHours(0, 0, 0, 0),
    endDate: new Date().toISOString(),
  };

  try {
    const res = await GoogleFit.getDailyStepCountSamples({
      startDate: new Date(range.startDate).toISOString(),
      endDate: range.endDate,
    });

    const stepsData = res.find(item => item.source === 'com.google.android.gms:estimated_steps');
    if (stepsData && stepsData.steps.length > 0) {
      return stepsData.steps[0].value;
    }
    return 0;
  } catch (err) {
    console.warn('Error getting steps', err);
    return 0;
  }
}

export function useSteps(intervalMs = 5000) {
  const [steps, setSteps] = useState<number>(0);

  useEffect(() => {
    let mounted = true;

    const fetchSteps = async () => {
      const currentSteps = await getSteps();
      if (mounted) {
        setSteps(currentSteps);
      }
    };

    fetchSteps(); // First call
    const interval = setInterval(fetchSteps, intervalMs);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [intervalMs]);

  return steps;
}
