import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import background from '../../assets/background.jpg';
import GymPro from '../../assets/GymPro.svg';

export function Main() {
     const { navigate } = useNavigation();

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
                    <TouchableOpacity onPress={() => navigate('role')} activeOpacity={0.7} className='py-3 bg-white flex-row items-center justify-center'>
                         <Text className='text-base font-title mr-3'>
                              Entrar no app
                         </Text>
                         <AntDesign name='arrowright' size={24} color='black' />
                    </TouchableOpacity>
               </View>
               <StatusBar style='light' />
          </ImageBackground>
     );
};