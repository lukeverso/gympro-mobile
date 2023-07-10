import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Main } from '../screens/Main';
import { Login } from '../screens/Login';
import { InsertEmail } from '../screens/InsertEmail';
import { Create } from '../screens/Create';
import { NoPersonal } from '../screens/NoPersonal';
import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { TrainDetails } from '../screens/TrainDetails';
import { BeginTrain } from '../screens/BeginTrain';
import { FinishTrain } from '../screens/FinishTrain';
import { CurrentExercise } from '../screens/CurrentExercise';
import { Edit } from '../screens/Edit';
import { StudentEditMeasures } from '../screens/StudentEditMeasures';
import { Notifications } from '../screens/Notifications';
import { NoWorkout } from '../screens/NoWorkout';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
     return (
          <Navigator screenOptions={{ headerShown: false }}>
               <Screen name='edit' component={Edit} />
               <Screen name='profile' component={Profile} />
               <Screen name='finishTrain' component={FinishTrain} />
               <Screen name='beginTrain' component={BeginTrain} />
               <Screen name='trainDetails' component={TrainDetails} />
               <Screen name='notifications' component={Notifications} />
               <Screen name='noWorkout' component={NoWorkout} />
               <Screen name='home' component={Home} />
               <Screen name='noPersonal' component={NoPersonal} />
               <Screen name='create' component={Create} />
               <Screen name='main' component={Main} />
               <Screen name='login' component={Login} />
               <Screen name='insertEmail' component={InsertEmail} />
          </Navigator>
     );
};