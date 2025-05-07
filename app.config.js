import 'dotenv/config';

export default {
  expo: {
    name: "FitnessHero",
    slug: "FitnessHero",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      permissions: ["ACTIVITY_RECOGNITION"],
      package: "com.fitnessHero.app",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      "eas": {
        "projectId": "d9a73575-450a-421d-94bd-eb7c9159d677"
      },
      EXPO_PUBLIC_USER_ID: process.env.EXPO_PUBLIC_USER_ID,
      EXPO_PUBLIC_USER_ID_ENEMY: process.env.EXPO_PUBLIC_USER_ID_ENEMY,
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
      EXPO_PUBLIC_apiKey: process.env.EXPO_PUBLIC_apiKey,
      EXPO_PUBLIC_authDomain: process.env.EXPO_PUBLIC_authDomain,
      EXPO_PUBLIC_projectId: process.env.EXPO_PUBLIC_projectId,
      EXPO_PUBLIC_storageBucket: process.env.EXPO_PUBLIC_storageBucket,
      EXPO_PUBLIC_messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
      EXPO_PUBLIC_appId: process.env.EXPO_PUBLIC_appId
    }
  }
};
