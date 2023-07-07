import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Main } from '../screens/common/Main';
import { Role } from '../screens/common/Role';
import { Login } from '../screens/common/Login';
import { Create } from '../screens/Create';
import { InsertEmail } from '../screens/InsertEmail';
import { InsertData } from '../screens/InsertData';
import { NoPersonal } from '../screens/NoPersonal';
import { StudentHome } from '../screens/StudentHome';
import { StudentProfile } from '../screens/StudentProfile';
import { TrainDetails } from '../screens/TrainDetails';
import { BeginTrain } from '../screens/BeginTrain';
import { FinishTrain } from '../screens/FinishTrain';
import { CurrentExercise } from '../screens/CurrentExercise';
import { StudentEditData } from '../screens/StudentEditData';
import { StudentEditMeasures } from '../screens/StudentEditMeasures';
import { Notifications } from '../screens/Notifications';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
     return (
          <Navigator screenOptions={{ headerShown: false }}>
               <Screen name='main' component={Main} />
               <Screen name='role' component={Role} />
               <Screen name='login' component={Login} />
          </Navigator>
     );
};