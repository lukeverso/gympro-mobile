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
import { Notifications } from '../screens/Notifications';
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
import { TrainSheets } from '../screens/TrainSheets';

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
                              <Screen name='trainSheets' component={TrainSheets} />
                              <Screen name='profile' component={Profile} />
                              <Screen name='menu' component={Menu} />
                              <Screen name='notifications' component={Notifications} />
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
                              <Screen name='create' component={Create} />
                         </>
               }
          </Navigator>
     );
};