import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import start from '../assets/images/start.png';

export function BeginTrain() {
     const { goBack, navigate } = useNavigation();

     const route = useRoute();

     return (
          <View className='flex-1 bg-white'>
               <View className='py-20 px-8 flex-1 justify-between'>
                    <View className='flex-row justify-between items-center'>
                         <TouchableOpacity onPress={goBack} activeOpacity={0.7} className='items-center justify-center px-2 py-2'>
                              <Feather name='x' size={24} color='black' />
                         </TouchableOpacity>
                         <View className='items-center justify-center p-3'></View>
                    </View>
                    <View className='gap-10 items-center'>
                         <Text className='font-title text-3xl text-center'>
                              Bora{'\n'}
                              começar!
                         </Text>
                         <Image source={start} />
                         <Text className='font-text text-base text-center'>
                              Lembre-se de aquecer o corpo{'\n'}
                              e se hidratar durante o treino!
                         </Text>
                    </View>
                    <View className='flex mt-5'>
                         <TouchableOpacity onPress={() => navigate('currentExercise')} activeOpacity={0.7} className='rounded py-3 bg-black flex-row items-center justify-center flex'>
                              <Text className='text-white text-base font-title mr-3'>Iniciar treino</Text>
                              <Feather name='check' size={24} color='white' />
                         </TouchableOpacity>
                    </View>
               </View>
          </View>
     );
};