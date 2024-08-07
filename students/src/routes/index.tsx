import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';

export function Routes() {
     return (
          <NavigationContainer>
               <AppRoutes />
               <StatusBar backgroundColor='#FFFFFF' style='auto' />
          </NavigationContainer>
     );
};