import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from '../screens/Main';
import { Login } from '../screens/Login';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
     return (
          <Navigator screenOptions={{ headerShown: false }}>
               <Screen name='main' component={Main} />
               <Screen name='login' component={Login} />
          </Navigator>
     );
};