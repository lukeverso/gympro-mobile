import { Image, ScrollView, Text, TouchableOpacity, View, SafeAreaView, RefreshControl, ImageBackground } from 'react-native';
import { Octicons, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useContext, useState, useCallback } from 'react';
import { AuthContext } from '../contexts/auth';
import { api } from '../lib/api';
import { StatusBar } from 'expo-status-bar';

import home from '../assets/images/home.jpg';
import measures from '../assets/images/measures.png';
import evolution from '../assets/images/evolution.png';
import constructionImg from '../assets/images/construction.png';

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

     async function getHomeData() {
          try {
               const request = await api.get(`/students/${user?.id}`);

               if (request.data.response.teacher === null) {
                    navigate('noPersonal');
                    return;
               };

               if (request.data.response.sheets.length === 0) {
                    navigate('noWorkout');
                    return;
               };

               const activeSheet = request.data.response.sheets.find((sheet: SheetProps) => sheet.active === true);

               setName(request.data.response.name);
               setSheet(activeSheet);
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

          async function getData() {
               try {
                    const request = await api.get(`/students/${user?.id}`);

                    const activeSheet = request.data.response.sheets.find((sheet: SheetProps) => sheet.active === true);

                    setName(request.data.response.name);
                    setSheet(activeSheet);
               } catch (error) {
                    console.log(error);
               };
          };

          getData();

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
                    <View className='py-8 px-8'>
                         <View className='flex-row justify-between items-center'>
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
                                             Você não possui{'\n'}
                                             fichas de treino
                                        </Text>
                                        <Text className='font-text text-base text-center'>
                                             Converse com seu professor,{'\n'}
                                             para ele criar a ideal para você
                                        </Text>
                                   </View>
                         }
                         <Text className='mt-8 text-2xl font-title'>
                              Seus treinos
                         </Text>
                         {
                              sheet ?
                                   sheet?.workouts?.map((workout: WorkoutsProps) => {
                                        return (
                                             <TouchableOpacity key={workout.id} onPress={() => navigate('trainDetails', { id: workout.id })} activeOpacity={0.7} className='mt-5 bg-gray-100 rounded flex-row justify-between items-center px-5 py-5'>
                                                  <View className='flex-row gap-3 items-center'>
                                                       <Octicons name="dot-fill" size={24} color="black" />
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
                                        <Text className='font-text text-base text-center'>
                                             Converse com seu personal{'\n'}
                                             para que ele possa criar os exercícios{'\n'}
                                             de acordo com o seu objetivo.
                                        </Text>
                                        <Text className='text-center text-base font-text'>
                                             (Puxe a tela para atualizar os dados{'\n'}
                                             quando seu professor tiver adicionado{'\n'}
                                             seus exercícios.)
                                        </Text>
                                   </View>
                         }
                         <Text className='text-2xl font-title mt-8'>
                              Outras funcionalidades
                         </Text>
                         <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row mt-4 space-x-4'>
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
                         <Text className='text-2xl font-title mt-8'>
                              Sua semana
                         </Text>
                         <Image source={constructionImg} className='mt-8 w-full h-52 rounded' />
                         <Text className='mt-4 font-title text-xl text-center'>
                              Esta sessão está em{'\n'}
                              construção...
                         </Text>
                         <Text className='mt-4 font-text text-base text-center'>
                              Mas é rápido! Em breve ela{'\n'}
                              estará disponível para o seu uso!
                         </Text>
                    </View>
                    <StatusBar style='dark' backgroundColor='#FFFFFF' />
               </ScrollView>
          </SafeAreaView>
     );
};