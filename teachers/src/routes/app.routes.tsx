import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

import { Main } from '../screens/Main';
import { Login } from '../screens/Login';
import { CheckEmail } from '../screens/CheckEmail';
import { Create } from '../screens/Create';
import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { Edit } from '../screens/Edit';
import { Measures } from '../screens/Measures';
import { MultipleNotifications } from '../screens/MultipleNotifications';
import { Menu } from '../screens/Menu';
import { EditName } from '../screens/EditName';
import { EditEmail } from '../screens/EditEmail';
import { EditTelephone } from '../screens/EditTelephone';
import { EditAddress } from '../screens/EditAddress';
import { Evolution } from '../screens/Evolution';
import { ScanCode } from '../screens/ScanCode';
import { StudentDetails } from '../screens/StudentDetails';
import { StudentList } from '../screens/StudentList';
import { FindByEmail } from '../screens/FindByEmail';
import { WorkoutDetails } from '../screens/WorkoutDetails';
import { CreateSheet } from '../screens/CreateSheet';
import { ChangePicture } from '../screens/ChangePicture';
import { CreateWorkout } from '../screens/CreateWorkout';
import { ExerciseDetails } from '../screens/ExerciseDetails';
import { CreateExercise } from '../screens/CreateExercise';
import { CheckCode } from '../screens/CheckCode';
import { SingleNotification } from '../screens/SingleNotification';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
     const { user } = useContext(AuthContext);

     return (
          <Navigator screenOptions={{ headerShown: false }}>
               {
                    user ?
                         <>
                              <Screen name='home' component={Home} />
                              <Screen name='scanCode' component={ScanCode} />
                              <Screen name='studentList' component={StudentList} />
                              <Screen name='findByEmail' component={FindByEmail} />
                              <Screen name='studentDetails' component={StudentDetails} />
                              <Screen name='createSheet' component={CreateSheet} />
                              <Screen name='createWorkout' component={CreateWorkout} />
                              <Screen name='createExercise' component={CreateExercise} />
                              <Screen name='workoutDetails' component={WorkoutDetails} />
                              <Screen name='exerciseDetails' component={ExerciseDetails} />
                              <Screen name='profile' component={Profile} />
                              <Screen name='menu' component={Menu} />
                              <Screen name='changePicture' component={ChangePicture} />
                              <Screen name='singleNotification' component={SingleNotification} />
                              <Screen name='multipleNotifications' component={MultipleNotifications} />
                              <Screen name='edit' component={Edit} />
                              <Screen name='editName' component={EditName} />
                              <Screen name='editEmail' component={EditEmail} />
                              <Screen name='editTelephone' component={EditTelephone} />
                              <Screen name='editAddress' component={EditAddress} />
                              <Screen name='measures' component={Measures} />
                              <Screen name='evolution' component={Evolution} />
                         </> :
                         <>
                              <Screen name='main' component={Main} />
                              <Screen name='login' component={Login} />
                              <Screen name='checkEmail' component={CheckEmail} />
                              <Screen name='checkCode' component={CheckCode} />
                              <Screen name='create' component={Create} />
                         </>
               }
          </Navigator>
     );
};