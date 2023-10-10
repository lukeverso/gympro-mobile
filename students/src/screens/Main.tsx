import { useContext } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

import GymPro from '../assets/GymPro.svg';
import background from '../assets/images/background.jpg';

export function Main() {
     const { navigate } = useNavigation();
     const { isStudentAuthorized } = useContext(AuthContext);

     if (isStudentAuthorized) navigate('home');

     return (
          <ImageBackground source={background} className='flex-1'>
               <View className='absolute bottom-12 left-8 space-y-8'>
                    <GymPro />
                    <Text className='text-white text-4xl leading-9 font-main'>
                         Alcance seu{'\n'}
                         melhor com{'\n'}
                         praticidade{'\n'}
                         e eficiência
                    </Text>
                    <TouchableOpacity onPress={() => navigate('login')} activeOpacity={0.7} className='py-3 bg-white flex-row items-center justify-center rounded space-x-2'>
                         <Text className='text-base font-title mb-1'>
                              Entrar no app
                         </Text>
                         <AntDesign name='arrowright' size={24} color='black' />
                    </TouchableOpacity>
               </View>
          </ImageBackground>
     );
};