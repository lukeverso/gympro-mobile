import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import workout from '../assets/workout.png';

export function NoWorkout() {
     const { goBack } = useNavigation();

     return (
          <View className='flex-1 bg-white'>
               <View className='mt-20 px-8'>
                    <TouchableOpacity onPress={() => goBack()}>
                         <Feather name='x' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='text-center mt-8 text-2xl font-title'>
                         Oops!{'\n'}
                         Você ainda não possui{'\n'}
                         uma ficha de treino...
                    </Text>
                    <View className='mt-8 mx-auto'>
                         <Image source={workout} />
                    </View>
                    <Text className='text-center mt-10 text-lg font-text'>
                         Converse com seu professor{'\n'}
                         para ele criar a ficha ideal{'\n'}
                         para você.
                    </Text>
               </View>
          </View>
     );
};