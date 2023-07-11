import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import example from '../assets/exercise-example.png';

export function TrainDetails() {
     const { goBack } = useNavigation();

     return (
          <ScrollView className='flex-1 bg-white'>
               <View className='mt-20 px-8 pb-10'>
                    <TouchableOpacity onPress={() => goBack()} activeOpacity={0.7}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-3xl font-title'>
                         Informações do treino
                    </Text>
                    <Text className='mt-8 text-2xl font-title'>
                         Bíceps e peito
                    </Text>
                    <Text className='text-lg font-text'>
                         Exercícios
                    </Text>
                    <View className='mt-8 px-5 py-5 bg-gray-300 rounded space-y-5'>
                         <Text className='font-title text-xl'>
                              Rosca direta com barra
                         </Text>
                         <View className='flex-row space-x-3'>
                              <View className='bg-white flex-1 rounded px-3 py-5 justify-center items-center'>
                                   <Feather name='x' size={24} color='black' />
                                   <Text className='font-title text-2xl mt-2'>3</Text>
                                   <Text className='font-text text-xs'>séries</Text>
                              </View>
                              <View className='bg-white flex-1 rounded px-3 py-5 justify-center items-center'>
                                   <Feather name='repeat' size={24} color='black' />
                                   <Text className='font-title text-2xl mt-2'>21</Text>
                                   <Text className='font-text text-xs'>repetições</Text>
                              </View>
                         </View>
                         <View className='flex-row space-x-3'>
                              <View className='bg-white flex-1 rounded px-3 py-5 justify-center items-center'>
                                   <MaterialCommunityIcons name='weight' size={24} color='black' />
                                   <Text className='font-title text-2xl mt-2'>10 kg</Text>
                                   <Text className='font-text text-xs'>de carga</Text>
                              </View>
                              <View className='bg-white flex-1 rounded px-3 py-5 justify-center items-center'>
                                   <Feather name='clock' size={24} color='black' />
                                   <Text className='font-title text-2xl mt-2'>45s</Text>
                                   <Text className='font-text text-xs'>de descanso</Text>
                              </View>
                         </View>
                         <View className='flex-row space-x-3'>
                              <Text className='font-title'>Observações:</Text>
                              <Text className='font-text flex-1'>7 repetições até a metade, 7 da metade pra cima e 7 repetições completas.</Text>
                         </View>
                    </View>
                    <View className='flex mt-8'>
                         <TouchableOpacity activeOpacity={0.7} className='py-3 bg-black flex-row items-center justify-center flex'>
                              <Text className='text-white text-base font-title mr-3'>Começar treino</Text>
                              <Feather name='check' size={24} color='white' />
                         </TouchableOpacity>
                    </View>
               </View>
          </ScrollView>
     );
};