import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Main } from '../screens/Main';
import { Login } from '../screens/Login';
import { Create } from '../screens/Create';
import { InsertEmail } from '../screens/InsertEmail';
import { InsertData } from '../screens/InsertData';
import { NoPersonal } from '../screens/students/NoPersonal';
import { StudentHome } from '../screens/students/StudentHome';
import { StudentProfile } from '../screens/students/StudentProfile';
import { TrainDetails } from '../screens/students/TrainDetails';
import { BeginTrain } from '../screens/students/BeginTrain';
import { FinishTrain } from '../screens/students/FinishTrain';
import { CurrentExercise } from '../screens/students/CurrentExercise';
import { StudentEditData } from '../screens/students/StudentEditData';
import { StudentEditMeasures } from '../screens/students/StudentEditMeasures';
import { Notifications } from '../screens/Notifications';
import { FAQ } from '../screens/FAQ';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
     return (
          <Navigator screenOptions={{ headerShown: false }}>
               <Screen name='faq' component={FAQ} />
               <Screen name='main' component={Main} />
               <Screen name='login' component={Login} />
               <Screen name='create' component={Create} />
               <Screen name='insertEmail' component={InsertEmail} />
               <Screen name='insertData' component={InsertData} />
               <Screen name='noPersonal' component={NoPersonal} />
               <Screen name='studentHome' component={StudentHome} />
               <Screen name='studentProfile' component={StudentProfile} />
               <Screen name='trainDetails' component={TrainDetails} />
               <Screen name='beginTrain' component={BeginTrain} />
               <Screen name='finishTrain' component={FinishTrain} />
               <Screen name='currentExercise' component={CurrentExercise} />
               <Screen name='studentEditData' component={StudentEditData} />
               <Screen name='studentEditMeasures' component={StudentEditMeasures} />
               <Screen name='notifications' component={Notifications} />
          </Navigator>
     );
};