import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Octicons, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth';

import measures from '../assets/images/measures.png';
import { api } from '../lib/api';

interface WorkoutsProps {
     active: boolean;
     focus: string;
     id: string;
     type: string;
};

interface SheetProps {
     active: boolean;
     annotations: string;
     endDate: string;
     id: string;
     objective: string;
     startDate: string;
     workouts: WorkoutsProps[];
};

export function Home() {
     const { navigate } = useNavigation();

     const { user } = useContext(AuthContext);

     const [name, setName] = useState<string>('');
     const [sheet, setSheet] = useState<SheetProps | null>(null);

     useEffect(() => {
          async function getHomeData() {
               const request = await api.get(`/me/${user?.id}`);
               const activeSheet = request.data.response.sheets.find((sheet: SheetProps) => sheet.active === true);
               setName(request.data.response.name);
               setSheet(activeSheet);
          };

          getHomeData();
     }, []);

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
                         {name}
                    </Text>
               </View>
               <View className='py-8 px-8'>
                    <View className='flex-row justify-between items-center'>
                         <Text className='text-2xl font-title'>
                              Sua ficha
                         </Text>
                         <TouchableOpacity activeOpacity={0.7}>
                              <Text className='text-sm text-blue-600 font-title'>
                                   Ver todas
                              </Text>
                         </TouchableOpacity>
                    </View>
                    <View className='mt-4 bg-gray-200 rounded flex-row justify-between items-center px-5 py-5'>
                         <Text className='font-text text-base'>
                              Objetivo: {sheet?.objective}{'\n'}
                              {sheet?.annotations ? `Anotações: ${sheet.annotations}` : ''}
                              Início: {sheet?.startDate}{'\n'}
                              Término: {sheet?.endDate}
                         </Text>
                    </View>
                    <Text className='mt-8 text-2xl font-title'>
                         Seus treinos
                    </Text>
                    {
                         sheet?.workouts?.map((workout: WorkoutsProps) => {
                              return (
                                   <TouchableOpacity key={workout.id} onPress={() => navigate('trainDetails', { id: workout.id })} activeOpacity={0.7} className='mt-4 bg-gray-200 rounded flex-row justify-between items-center px-5 py-5'>
                                        <View className='flex-row gap-3 items-center'>
                                             <Octicons name="dot-fill" size={24} color="black" />
                                             <Text className='font-title text-base mb-1'>
                                                  {workout.focus} ({workout.type})
                                             </Text>
                                        </View>
                                        <Ionicons name='ios-chevron-forward' size={24} color='black' />
                                   </TouchableOpacity>
                              )
                         })
                    }
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
                         <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('measures')}>
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
                         </TouchableOpacity>
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