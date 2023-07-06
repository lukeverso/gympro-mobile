import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import background from '../assets/background.png';
import GymPro from '../assets/GymPro.svg';

export function Main() {
     const { navigate } = useNavigation();

     return (
          <ImageBackground source={background} className='flex-1'>
               <View className='absolute bottom-12 left-8 flex gap-8'>
                    <GymPro />
                    <Text className='text-white text-4xl leading-9 font-main'>
                         Alcance seu{'\n'}
                         melhor com{'\n'}
                         praticidade{'\n'}
                         e eficiência
                    </Text>
                    <TouchableOpacity onPress={() => navigate('login', { redirectButton: 'login' })} activeOpacity={0.8} className='py-3 bg-white flex-row items-center justify-center'>
                         <Text className='text-base font-title mr-3'>
                              Entrar no app
                         </Text>
                         <AntDesign name='arrowright' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('create', { redirectButton: 'create' })} activeOpacity={0.8} className='py-3 bg-white flex-row items-center justify-center'>
                         <Text className='text-base font-title mr-3'>Criar conta</Text>
                         <Ionicons name='ios-person-add' size={24} color='black' />
                    </TouchableOpacity>
               </View>
          </ImageBackground>
     );
};