import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/auth';
import { useNavigation } from '@react-navigation/native';

import { Main } from '../screens/Main';
import { Login } from '../screens/Login';
import { CheckEmail } from '../screens/CheckEmail';
import { Create } from '../screens/Create';
import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { TrainDetails } from '../screens/TrainDetails';
import { BeginTrain } from '../screens/BeginTrain';
import { FinishTrain } from '../screens/FinishTrain';
import { CurrentExercise } from '../screens/CurrentExercise';
import { Edit } from '../screens/Edit';
import { Measures } from '../screens/Measures';
import { Notifications } from '../screens/Notifications';
import { Menu } from '../screens/Menu';
import { EditName } from '../screens/EditName';
import { EditEmail } from '../screens/EditEmail';
import { EditTelephone } from '../screens/EditTelephone';
import { EditAddress } from '../screens/EditAddress';
import { Evolution } from '../screens/Evolution';
import { CheckCode } from '../screens/CheckCode';
import { ChangePicture } from '../screens/ChangePicture';
import { MedicalHistory } from '../screens/MedicalHistory';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
     const { user } = useContext(AuthContext);

     const navigation = useNavigation(); // Obtenha a instância de navegação

     // Função para lidar com o evento de foco da tela
     const handleScreenFocus = (event: any) => {
          console.log(`Navigated to screen: ${event.target}`);
     };

     useEffect(() => {
          // Adicione um ouvinte de eventos de foco quando o componente é montado
          navigation.addListener('focus', handleScreenFocus);

          // Limpe o ouvinte de eventos quando o componente é desmontado
          return () => {
               navigation.removeListener('focus', handleScreenFocus);
          };
     }, [navigation]);

     return (
          <Navigator screenOptions={{ headerShown: false }}>
               {
                    user ?
                         <>
                              <Screen name='home' component={Home} />
                              <Screen name='profile' component={Profile} />
                              <Screen name='finishTrain' component={FinishTrain} />
                              <Screen name='beginTrain' component={BeginTrain} />
                              <Screen name='medicalHistory' component={MedicalHistory} />
                              <Screen name='currentExercise' component={CurrentExercise} />
                              <Screen name='trainDetails' component={TrainDetails} />
                              <Screen name='menu' component={Menu} />
                              <Screen name='notifications' component={Notifications} />
                              <Screen name='edit' component={Edit} />
                              <Screen name='editName' component={EditName} />
                              <Screen name='editEmail' component={EditEmail} />
                              <Screen name='editTelephone' component={EditTelephone} />
                              <Screen name='editAddress' component={EditAddress} />
                              <Screen name='measures' component={Measures} />
                              <Screen name='evolution' component={Evolution} />
                              <Screen name='changePicture' component={ChangePicture} />
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