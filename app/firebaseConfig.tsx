// firebaseConfig.ts

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.EXPO_PUBLIC_apiKey,
  authDomain: Constants.expoConfig?.extra?.EXPO_PUBLIC_authDomain,
  projectId: Constants.expoConfig?.extra?.EXPO_PUBLIC_projectId,
  storageBucket: Constants.expoConfig?.extra?.EXPO_PUBLIC_storageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.EXPO_PUBLIC_messagingSenderId,
  appId: Constants.expoConfig?.extra?.EXPO_PUBLIC_appId,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
