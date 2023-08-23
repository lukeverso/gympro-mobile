import { Image, ScrollView, Text, TouchableOpacity, View, SafeAreaView, RefreshControl, ImageBackground, Linking, Platform } from 'react-native';
import { Octicons, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useContext, useState, useCallback } from 'react';
import { AuthContext } from '../contexts/auth';
import { api } from '../lib/api';
import { StatusBar } from 'expo-status-bar';

import home from '../assets/images/teacher.jpg';
import anamnesis from '../assets/images/anamnesis.png';
import measures from '../assets/images/measures.png';
import evolution from '../assets/images/evolution.png';
import QRCode from 'react-native-qrcode-svg';

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

interface TeacherProps {
     picture: string;
     email: string;
     name: string;
     telephone: string;
};

export function Home() {
     const { navigate } = useNavigation();

     const { user } = useContext(AuthContext);

     const [name, setName] = useState<string>('');
     const [sheet, setSheet] = useState<SheetProps | null>(null);
     const [teacher, setTeacher] = useState<TeacherProps | null>(null);

     async function getHomeData() {
          try {
               const request = await api.get(`/api/get/students/${user?.id}`);

               const activeSheet = request.data.sheets.find((sheet: SheetProps) => sheet.active === true);

               setName(request.data.name);
               setSheet(activeSheet);
               setTeacher(request.data.teacher);
          } catch (error) {
               console.log(error);
          };
     };

     useFocusEffect(useCallback(() => {
          getHomeData();
     }, []));

     const [refreshing, setRefreshing] = useState(false);

     const onRefresh = useCallback(() => {
          setRefreshing(true);

          getHomeData();

          setTimeout(() => {
               setRefreshing(false);
          }, 1000);
     }, []);

     return (
          <SafeAreaView className='flex-1 bg-white'>
               <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
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
                    <View className='pb-8 px-8'>
                         <Text className='mt-8 text-2xl font-title'>
                              Seu professor
                         </Text>
                         {
                              teacher ?
                                   <View className='space-y-1 mt-4 bg-gray-100 p-5 rounded-lg space-x-3 flex-row items-center'>
                                        {
                                             teacher?.picture !== null ?
                                                  <Image source={{ uri: teacher?.picture }} className='w-20 h-20 rounded-full' /> :
                                                  <View className='w-20 h-20 rounded-full items-center justify-center bg-white'>
                                                       <Octicons name='person' size={32} color='black' />
                                                  </View>
                                        }
                                        <View className='flex-1 space-y-1'>
                                             <Text className='font-title text-xl'>
                                                  {teacher?.name}
                                             </Text>
                                             <TouchableOpacity onPress={() => Linking.openURL(`mailto:${teacher?.email}`)}>
                                                  <Text className='font-text text-xs'>
                                                       {teacher?.email}
                                                  </Text>
                                             </TouchableOpacity>
                                             <TouchableOpacity onPress={() => {
                                                  const phoneNumber = Platform.OS === 'ios' ? `telprompt:${teacher?.telephone}` : `tel:${teacher?.telephone}`;
                                                  Linking.openURL(phoneNumber);
                                             }}>
                                                  <Text className='font-text text-xs'>
                                                       {teacher?.telephone}
                                                  </Text>
                                             </TouchableOpacity>
                                        </View>
                                   </View> :
                                   <View className='w-full flex-col items-center mt-8 space-y-5'>
                                        <View className='w-full flex-col items-center space-y-3'>
                                             <Feather name='alert-circle' size={24} color='black' />
                                             <Text className='font-title text-lg text-center leading-6'>
                                                  Você ainda não{'\n'}
                                                  possui um professor
                                             </Text>
                                        </View>
                                        <View className='mt-8 mx-auto'>
                                             <QRCode value={`${user?.id}`} size={150} />
                                        </View>
                                        <Text className='text-center mt-10 text-base font-text'>
                                             Peça para ele escanear o código{'\n'}
                                             acima ou informe seu e-mail{'\n'}
                                             para você ser adicionado{'\n'}
                                             como aluno.
                                        </Text>
                                   </View>
                         }
                         <View className='mt-8 flex-row justify-between items-center'>
                              <Text className='text-2xl font-title'>
                                   Sua ficha
                              </Text>
                              <TouchableOpacity activeOpacity={0.7}>
                                   <Text className='text-sm text-black font-title'>
                                        Ver todas
                                   </Text>
                              </TouchableOpacity>
                         </View>
                         {
                              sheet ?
                                   <ImageBackground source={home} className='mt-4 rounded-lg flex-row justify-between items-center overflow-hidden'>
                                        <View className='bg-black/50 px-5 py-5 flex-1'>
                                             <Text className='font-text text-base text-white'>
                                                  Objetivo: {sheet?.objective}{'\n'}
                                                  {sheet?.annotations ? `Anotações: ${sheet?.annotations}\n` : ''}
                                                  Início: {sheet?.startDate}{'\n'}
                                                  Término: {sheet?.endDate}
                                             </Text>
                                        </View>
                                   </ImageBackground> :
                                   <View className='w-full flex-col items-center mt-8 space-y-3'>
                                        <Feather name='alert-circle' size={24} color='black' />
                                        <Text className='font-title text-lg text-center leading-6'>
                                             Você ainda não possui{'\n'}
                                             uma ficha de treino
                                        </Text>
                                   </View>
                         }
                         <View className='mt-8 flex-row justify-between items-center'>
                              <Text className='text-2xl font-title'>
                                   Seus treinos
                              </Text>
                              <TouchableOpacity activeOpacity={0.7}>
                                   <Text className='text-sm text-black font-title'>
                                        Ver todas
                                   </Text>
                              </TouchableOpacity>
                         </View>
                         {
                              sheet ?
                                   sheet?.workouts?.map((workout: WorkoutsProps) => {
                                        return (
                                             <TouchableOpacity key={workout.id} onPress={() => navigate('trainDetails', { id: workout.id })} activeOpacity={0.7} className='mt-5 bg-gray-100 rounded flex-row justify-between items-center px-5 py-5'>
                                                  <View className='flex-row gap-3 items-center'>
                                                       <Text className='font-title text-base mb-1'>
                                                            {workout.focus} ({workout.type})
                                                       </Text>
                                                  </View>
                                                  <Ionicons name='ios-chevron-forward' size={24} color='black' />
                                             </TouchableOpacity>
                                        )
                                   }) :
                                   <View className='w-full flex-col items-center mt-4 space-y-3'>
                                        <Feather name="alert-circle" size={24} color="black" />
                                        <Text className='font-title text-lg text-center leading-6'>
                                             Você ainda não{'\n'}
                                             possui exercícios
                                        </Text>
                                   </View>
                         }
                         <Text className='text-2xl font-title mt-8'>
                              Outras funcionalidades
                         </Text>
                         <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row mt-4 space-x-4'>
                              <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('medicalHistory')}>
                                   <View className='w-64'>
                                        <Image source={anamnesis} className='h-40 w-64 rounded' />
                                        <View className='mt-3 px-4'>
                                             <View className='flex-row items-center space-x-1'>
                                                  <Text className='font-title text-lg'>Ficha de anamnese</Text>
                                             </View>
                                             <Text className='font-text text-base'>Preencha sua ficha junto a seu professor</Text>
                                        </View>
                                   </View>
                              </TouchableOpacity>
                              <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('measures')}>
                                   <View className='w-64'>
                                        <Image source={measures} className='h-40 w-64 rounded' />
                                        <View className='mt-3 px-4'>
                                             <View className='flex-row items-center space-x-1'>
                                                  <Text className='font-title text-lg'>Edite suas medidas</Text>
                                             </View>
                                             <Text className='font-text text-base'>Anote todas as medidas do seu corpo</Text>
                                        </View>
                                   </View>
                              </TouchableOpacity>
                              <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('evolution')}>
                                   <View className='w-64'>
                                        <Image source={evolution} className='h-40 w-64 rounded' />
                                        <View className='mt-3 px-4'>
                                             <View className='flex-row items-center space-x-1'>
                                                  <Text className='font-title text-lg'>Acompanhe sua evolução</Text>
                                             </View>
                                             <Text className='font-text text-base'>Saiba como está sua evolução corporal na academia</Text>
                                        </View>
                                   </View>
                              </TouchableOpacity>
                         </ScrollView>
                    </View>
                    <StatusBar style='dark' backgroundColor='#FFFFFF' />
               </ScrollView>
          </SafeAreaView>
     );
};