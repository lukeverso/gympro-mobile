import { Routes } from './src/routes';
import AuthProvider from './src/contexts/auth';

import { useFonts } from 'expo-font';

export default function App() {
     const [fontsLoaded] = useFonts({
          'RoobertMedium': require('./src/assets/fonts/Roobert-Medium.otf'),
          'RoobertBold': require('./src/assets/fonts/Roobert-Bold.otf'),
          'RoobertHeavy': require('./src/assets/fonts/Roobert-Heavy.otf')
     });

     if (!fontsLoaded) return null;

     return (
          <AuthProvider>
               <Routes />
          </AuthProvider>
     );
}