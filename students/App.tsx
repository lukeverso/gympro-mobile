import { Routes } from './src/routes';
import AuthProvider from './src/contexts/auth';

import { useFonts } from 'expo-font';
import { useEffect } from 'react';

export default function App() {
     const [fontsLoaded, error] = useFonts({
          'RoobertMedium': require('./src/assets/fonts/Roobert-Medium.otf'),
          'RoobertBold': require('./src/assets/fonts/Roobert-Bold.otf'),
          'RoobertHeavy': require('./src/assets/fonts/Roobert-Heavy.otf')
     });

     useEffect(() => {
          if (error) throw error;
     }, [error]);

     if (!fontsLoaded) return null;

     return (
          <AuthProvider>
               <Routes />
          </AuthProvider>
     );
};