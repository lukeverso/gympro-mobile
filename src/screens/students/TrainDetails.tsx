import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import example from '../../assets/exercise-example.png';

export function TrainDetails() {
     const { navigate } = useNavigation();

     return (
          <ScrollView>
               <View className='h-48 bg-black'>
                    <View className='mt-20 px-8'>
                         <View className='flex-row justify-between items-center'>
                              <TouchableOpacity>
                                   <Ionicons name='ios-chevron-back' size={24} color='white' />
                              </TouchableOpacity>
                              <View className='flex-row'>
                                   <TouchableOpacity onPress={() => navigate('notifications')} activeOpacity={0.8} className='px-3 py-3 items-center justify-center'>
                                        <Feather name='bell' size={24} color='white' />
                                   </TouchableOpacity>
                                   <TouchableOpacity onPress={() => navigate('menu')} activeOpacity={0.8} className='px-3 py-3 items-center justify-center ml-3'>
                                        <Feather name='menu' size={24} color='white' />
                                   </TouchableOpacity>
                              </View>
                         </View>
                         <View className='flex-row mt-4 items-center'>
                              <Text className='text-lg font-title text-white mr-3'>
                                   Treino do dia
                              </Text>
                              <Text className='text-xs font-text text-white'>
                                   Segunda, 3 de maio
                              </Text>
                         </View>
                    </View>
               </View>
               <View className='py-8 px-8'>
                    <View className='bg-gray-200 p-3 rounded'>
                         <Text className='font-title text-xl'>
                              Condicionamento físico
                         </Text>
                         <Text className='font-text text-xs'>
                              50 sessões{'\n'}
                              Ficha iniciada em 31/05/2023{'\n'}
                              Término em 04/08/2023
                         </Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ display: 'flex', gap: 12, marginTop: 20 }}>
                         <View className='bg-gray-200 p-5 rounded min-w-[300px] max-w-[300px]'>
                              <Text className='font-title text-xl'>Rosca direta com barra</Text>
                              <View className='mt-3 mb-3 p-10 bg-white rounded items-center justify-center'>
                                   <Image source={example} />
                              </View>
                              <View className='flex-row gap-3'>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='x' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>3</Text>
                                        <Text className='text-center font-text text-xs mt-1'>séries</Text>
                                   </View>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='repeat' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>21</Text>
                                        <Text className='text-center font-text text-xs mt-1'>repetições</Text>
                                   </View>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='clock' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>45s</Text>
                                        <Text className='text-center font-text text-xs mt-1'>descanso</Text>
                                   </View>
                              </View>
                              <View className='flex-row mt-3'>
                                   <Text className='text-xs font-title mr-2'>
                                        Observações:
                                   </Text>
                                   <Text className='text-xs flex-1'>
                                        7 repetições até a metade, 7 da metade pra cima e 7 repetições completas.
                                   </Text>
                              </View>
                         </View>
                         <View className='bg-gray-200 p-5 rounded min-w-[300px] max-w-[300px]'>
                              <Text className='font-title text-xl'>Rosca direta com barra</Text>
                              <View className='mt-3 mb-3 p-10 bg-white rounded items-center justify-center'>
                                   <Image source={example} />
                              </View>
                              <View className='flex-row gap-3'>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='x' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>3</Text>
                                        <Text className='text-center font-text text-xs mt-1'>séries</Text>
                                   </View>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='repeat' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>21</Text>
                                        <Text className='text-center font-text text-xs mt-1'>repetições</Text>
                                   </View>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='clock' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>45s</Text>
                                        <Text className='text-center font-text text-xs mt-1'>descanso</Text>
                                   </View>
                              </View>
                              <View className='flex-row mt-3'>
                                   <Text className='text-xs font-title mr-2'>
                                        Observações:
                                   </Text>
                                   <Text className='text-xs flex-1'>
                                        7 repetições até a metade, 7 da metade pra cima e 7 repetições completas.
                                   </Text>
                              </View>
                         </View>
                         <View className='bg-gray-200 p-5 rounded min-w-[300px] max-w-[300px]'>
                              <Text className='font-title text-xl'>Rosca direta com barra</Text>
                              <View className='mt-3 mb-3 p-10 bg-white rounded items-center justify-center'>
                                   <Image source={example} />
                              </View>
                              <View className='flex-row gap-3'>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='x' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>3</Text>
                                        <Text className='text-center font-text text-xs mt-1'>séries</Text>
                                   </View>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='repeat' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>21</Text>
                                        <Text className='text-center font-text text-xs mt-1'>repetições</Text>
                                   </View>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='clock' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>45s</Text>
                                        <Text className='text-center font-text text-xs mt-1'>descanso</Text>
                                   </View>
                              </View>
                              <View className='flex-row mt-3'>
                                   <Text className='text-xs font-title mr-2'>
                                        Observações:
                                   </Text>
                                   <Text className='text-xs flex-1'>
                                        7 repetições até a metade, 7 da metade pra cima e 7 repetições completas.
                                   </Text>
                              </View>
                         </View>
                         <View className='bg-gray-200 p-5 rounded min-w-[300px] max-w-[300px]'>
                              <Text className='font-title text-xl'>Rosca direta com barra</Text>
                              <View className='mt-3 mb-3 p-10 bg-white rounded items-center justify-center'>
                                   <Image source={example} />
                              </View>
                              <View className='flex-row gap-3'>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='x' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>3</Text>
                                        <Text className='text-center font-text text-xs mt-1'>séries</Text>
                                   </View>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='repeat' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>21</Text>
                                        <Text className='text-center font-text text-xs mt-1'>repetições</Text>
                                   </View>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='clock' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>45s</Text>
                                        <Text className='text-center font-text text-xs mt-1'>descanso</Text>
                                   </View>
                              </View>
                              <View className='flex-row mt-3'>
                                   <Text className='text-xs font-title mr-2'>
                                        Observações:
                                   </Text>
                                   <Text className='text-xs flex-1'>
                                        7 repetições até a metade, 7 da metade pra cima e 7 repetições completas.
                                   </Text>
                              </View>
                         </View>
                         <View className='bg-gray-200 p-5 rounded min-w-[300px] max-w-[300px]'>
                              <Text className='font-title text-xl'>Rosca direta com barra</Text>
                              <View className='mt-3 mb-3 p-10 bg-white rounded items-center justify-center'>
                                   <Image source={example} />
                              </View>
                              <View className='flex-row gap-3'>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='x' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>3</Text>
                                        <Text className='text-center font-text text-xs mt-1'>séries</Text>
                                   </View>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='repeat' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>21</Text>
                                        <Text className='text-center font-text text-xs mt-1'>repetições</Text>
                                   </View>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='clock' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>45s</Text>
                                        <Text className='text-center font-text text-xs mt-1'>descanso</Text>
                                   </View>
                              </View>
                              <View className='flex-row mt-3'>
                                   <Text className='text-xs font-title mr-2'>
                                        Observações:
                                   </Text>
                                   <Text className='text-xs flex-1'>
                                        7 repetições até a metade, 7 da metade pra cima e 7 repetições completas.
                                   </Text>
                              </View>
                         </View>
                         <View className='bg-gray-200 p-5 rounded min-w-[300px] max-w-[300px]'>
                              <Text className='font-title text-xl'>Rosca direta com barra</Text>
                              <View className='mt-3 mb-3 p-10 bg-white rounded items-center justify-center'>
                                   <Image source={example} />
                              </View>
                              <View className='flex-row gap-3'>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='x' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>3</Text>
                                        <Text className='text-center font-text text-xs mt-1'>séries</Text>
                                   </View>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='repeat' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>21</Text>
                                        <Text className='text-center font-text text-xs mt-1'>repetições</Text>
                                   </View>
                                   <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                                        <Feather name='clock' size={24} color='black' />
                                        <Text className='font-title text-xl mt-1'>45s</Text>
                                        <Text className='text-center font-text text-xs mt-1'>descanso</Text>
                                   </View>
                              </View>
                              <View className='flex-row mt-3'>
                                   <Text className='text-xs font-title mr-2'>
                                        Observações:
                                   </Text>
                                   <Text className='text-xs flex-1'>
                                        7 repetições até a metade, 7 da metade pra cima e 7 repetições completas.
                                   </Text>
                              </View>
                         </View>
                    </ScrollView>
                    <View className='flex mt-5'>
                         <TouchableOpacity onPress={() => navigate('trainDetails')} activeOpacity={0.8} className='py-3 bg-black flex-row items-center justify-center flex'>
                              <Text className='text-white text-base font-title mr-3'>Começar treino</Text>
                              <Feather name='check' size={24} color='white' />
                         </TouchableOpacity>
                    </View>
               </View>
          </ScrollView>
     );
};