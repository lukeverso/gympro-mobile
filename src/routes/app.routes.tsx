import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

import { Main } from '../screens/Main';
import { Login } from '../screens/Login';
import { CheckEmail } from '../screens/CheckEmail';
import { Create } from '../screens/Create';
import { NoPersonal } from '../screens/NoPersonal';
import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { TrainDetails } from '../screens/TrainDetails';
import { BeginTrain } from '../screens/BeginTrain';
import { FinishTrain } from '../screens/FinishTrain';
import { CurrentExercise } from '../screens/CurrentExercise';
import { Edit } from '../screens/Edit';
import { Measures } from '../screens/Measures';
import { Notifications } from '../screens/Notifications';
import { NoWorkout } from '../screens/NoWorkout';
import { Menu } from '../screens/Menu';
import { EditName } from '../screens/EditName';
import { EditEmail } from '../screens/EditEmail';
import { EditTelephone } from '../screens/EditTelephone';
import { EditAddress } from '../screens/EditAddress';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
     const { user } = useContext(AuthContext);

     return (
          <Navigator screenOptions={{ headerShown: false }}>
               {
                    user ?
                         <>
                              <Screen name='home' component={Home} />
                              <Screen name='noPersonal' component={NoPersonal} />
                              <Screen name='noWorkout' component={NoWorkout} />
                              <Screen name='profile' component={Profile} />
                              <Screen name='finishTrain' component={FinishTrain} />
                              <Screen name='beginTrain' component={BeginTrain} />
                              <Screen name='trainDetails' component={TrainDetails} />
                              <Screen name='menu' component={Menu} />
                              <Screen name='notifications' component={Notifications} />
                              <Screen name='edit' component={Edit} />
                              <Screen name='editName' component={EditName} />
                              <Screen name='editEmail' component={EditEmail} />
                              <Screen name='editTelephone' component={EditTelephone} />
                              <Screen name='editAddress' component={EditAddress} />
                              <Screen name='measures' component={Measures} />
                         </> :
                         <>
                              <Screen name='main' component={Main} />
                              <Screen name='login' component={Login} />
                              <Screen name='checkEmail' component={CheckEmail} />
                              <Screen name='create' component={Create} />
                         </>
               }
          </Navigator>
     );
};