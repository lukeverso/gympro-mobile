import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Octicons, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth';

import measures from '../assets/images/measures.png';

export function Home() {
     const { navigate } = useNavigation();

     const { user, logout } = useContext(AuthContext);
     const [workout, setWorkout] = useState();

     return (
          <ScrollView>
               <View className='mt-20 px-8'>
                    <View className='flex-row justify-between items-center'>
                         <TouchableOpacity onPress={() => navigate('menu')} activeOpacity={0.7} className='items-center justify-center'>
                              <Feather name='menu' size={24} color='black' />
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => navigate('notifications')} activeOpacity={0.7} className='items-center justify-center'>
                              <Feather name='bell' size={24} color='black' />
                         </TouchableOpacity>
                    </View>
                    <Text className='text-3xl font-title text-black mt-8'>
                         Bem-vindo,{'\n'}
                         {user?.name}
                    </Text>
               </View>
               <View className='py-8 px-8'>
                    <Text className='text-2xl font-title'>
                         Sua ficha
                    </Text>
                    <View className='mt-4 bg-gray-200 rounded flex-row justify-between items-center px-5 py-5'>
                         <Text className='font-text text-base'>
                              Objetivo: condicionamento físico{'\n'}
                              Sessões: 50 sessões{'\n'}
                              Início: 31/05/2023{'\n'}
                              Término: 04/08/2023
                         </Text>
                    </View>
                    <Text className='mt-8 text-2xl font-title'>
                         Seus treinos
                    </Text>
                    <TouchableOpacity activeOpacity={0.7} className='mt-4 bg-gray-200 rounded flex-row justify-between items-center px-5 py-5'>
                         <View className='flex-row gap-3 items-center'>
                              <Octicons name="dot-fill" size={24} color="black" />
                              <Text className='font-title text-base mb-1'>
                                   Bíceps e peito
                              </Text>
                         </View>
                         <Ionicons name='ios-chevron-forward' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} className='mt-5 bg-gray-200 rounded flex-row justify-between items-center px-5 py-5'>
                         <View className='flex-row gap-3 items-center'>
                              <Octicons name="dot-fill" size={24} color="black" />
                              <Text className='font-title text-base mb-1'>
                                   Tríceps e costa
                              </Text>
                         </View>
                         <Ionicons name='ios-chevron-forward' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} className='mt-5 bg-gray-200 rounded flex-row justify-between items-center px-5 py-5'>
                         <View className='flex-row gap-3 items-center'>
                              <Octicons name="dot-fill" size={24} color="black" />
                              <Text className='font-title text-base mb-1'>
                                   Membros inferiores
                              </Text>
                         </View>
                         <Ionicons name='ios-chevron-forward' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='text-2xl font-title mt-8'>
                         Sua semana
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row space-x-4 mt-4'>
                         <View className='px-10 py-5 bg-gray-200 rounded flex-1 items-center justify-center space-y-1'>
                              <Feather name='repeat' size={24} color='black' />
                              <Text className='font-title text-2xl'>
                                   4
                              </Text>
                              <Text className='font-text text-sm text-center'>
                                   dias{'\n'}
                                   consecutivos
                              </Text>
                         </View>
                         <View className='px-10 py-5 bg-gray-200 rounded flex-1 items-center justify-center space-y-1'>
                              <Feather name='trending-up' size={24} color='black' />
                              <Text className='font-title text-2xl'>
                                   27
                              </Text>
                              <Text className='font-text text-sm text-center'>
                                   exercícios{'\n'}
                                   em sequência
                              </Text>
                         </View>
                         <View className='px-10 py-5 bg-gray-200 rounded flex-1 items-center justify-center space-y-1'>
                              <Feather name='trending-up' size={24} color='black' />
                              <Text className='font-title text-2xl'>
                                   27
                              </Text>
                              <Text className='font-text text-sm text-center'>
                                   exercícios{'\n'}
                                   em sequência
                              </Text>
                         </View>
                    </ScrollView>
                    <Text className='text-2xl font-title mt-8'>
                         Outras funcionalidades
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row mt-4 space-x-4'>
                         <View className='w-64'>
                              <Image source={measures} className='h-40 w-64 rounded' />
                              <View className='mt-3 px-6 space-y-2'>
                                   <View className='flex-row items-center space-x-1'>
                                        <Text className='font-title text-lg'>Edite suas medidas</Text>
                                        <Feather name="arrow-right" size={24} color="black" />
                                   </View>
                                   <Text className='font-text text-base'>Anote todas as medidas do seu corpo</Text>
                              </View>
                         </View>
                         <View className='w-64'>
                              <Image source={measures} className='h-40 w-64 rounded' />
                              <View className='mt-3 px-6 space-y-2'>
                                   <View className='flex-row items-center space-x-1'>
                                        <Text className='font-title text-lg'>Edite suas medidas</Text>
                                        <Feather name="arrow-right" size={24} color="black" />
                                   </View>
                                   <Text className='font-text text-base'>Anote todas as medidas do seu corpo</Text>
                              </View>
                         </View>
                    </ScrollView>
               </View>
          </ScrollView>
     );
};