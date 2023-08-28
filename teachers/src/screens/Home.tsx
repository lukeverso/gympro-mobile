import { ScrollView, Text, TouchableOpacity, View, SafeAreaView, RefreshControl, Button, Image } from 'react-native';
import { Entypo, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../contexts/auth';
import { api } from '../lib/api';
import { StatusBar } from 'expo-status-bar';

import notifications from '../assets/images/notifications.png';

interface StudentsProps {
     id: string;
     name: string;
     birthdate: string;
     age: number;
};

export function Home() {
     const { navigate } = useNavigation();

     const { user } = useContext(AuthContext);

     const [name, setName] = useState<string>('');
     const [students, setStudents] = useState<StudentsProps[] | null>(null);

     async function getData() {
          try {
               const request = await api.get(`/api/get/teachers/${user?.id}`);

               setName(request.data.name);
               setStudents(request.data.students);
          } catch (error) {
               console.log(error);
          };
     };

     useFocusEffect(useCallback(() => {
          getData();
     }, []));

     const [refreshing, setRefreshing] = useState(false);

     const onRefresh = useCallback(() => {
          setRefreshing(true);

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
                              <TouchableOpacity onPress={() => navigate('menu')} activeOpacity={0.7} className='items-center justify-center py-3'>
                                   <Feather name='menu' size={24} color='black' />
                              </TouchableOpacity>
                              <View className='items-center justify-center p-3'></View>
                         </View>
                         <Text className='text-3xl font-title text-black mt-8'>
                              Bem-vindo,{'\n'}
                              {name}
                         </Text>
                    </View>
                    <View className='py-8 px-8'>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-2xl font-title'>
                                   Seus alunos
                              </Text>
                              {
                                   students && students.length > 0 &&
                                   <TouchableOpacity onPress={() => navigate('studentList')} activeOpacity={0.7}>
                                        <Text className='text-sm text-black font-title'>
                                             Ver todos
                                        </Text>
                                   </TouchableOpacity>
                              }
                         </View>
                         {
                              students && students.length > 0 ?
                                   <>
                                        <TouchableOpacity onPress={() => navigate('studentList')} activeOpacity={0.7} className='mt-5 bg-gray-100 rounded-lg flex-row space-x-3 items-center px-5 py-3'>
                                             <Feather name='search' size={24} color='black' />
                                             <Text className='text-sm text-black font-title'>
                                                  Pesquisar seus alunos
                                             </Text>
                                        </TouchableOpacity>
                                        <Text className='mt-5 text-sm text-black font-title'>
                                             Adicionados recentemente
                                        </Text>
                                   </> :
                                   <View className='w-full flex-col items-center mt-8 space-y-3'>
                                        <Feather name='alert-circle' size={24} color='black' />
                                        <Text className='font-title text-lg text-center leading-6'>
                                             Você não{'\n'}
                                             possui alunos
                                        </Text>
                                        <Text className='font-text text-base text-center'>
                                             Para adicionar um aluno,{'\n'}
                                             use a sessão 'Pesquisar{'\n'}
                                             aluno' abaixo
                                        </Text>
                                   </View>
                         }
                         {
                              students?.map((student: StudentsProps) => {
                                   return (
                                        <TouchableOpacity onPress={() => navigate('studentDetails', { id: student?.id })} key={student.id} activeOpacity={0.7} className='mt-5 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'>
                                             <View className='flex-row space-x-2 items-center'>
                                                  <Text className='font-title text-base mb-1'>
                                                       {student.name}
                                                  </Text>
                                                  <Text className='font-text text-xs'>
                                                       {student.age} anos
                                                  </Text>
                                             </View>
                                             <Ionicons name='ios-chevron-forward' size={24} color='black' />
                                        </TouchableOpacity>
                                   )
                              })
                         }
                         <Text className='text-2xl font-title mt-8'>
                              Pesquisar aluno
                         </Text>
                         <View className='flex-row space-x-5 justify-between mt-5'>
                              <TouchableOpacity onPress={() => navigate('findByEmail')} activeOpacity={0.7} className='flex-1 bg-gray-100 rounded-lg flex-row space-x-3 items-center px-5 py-3'>
                                   <Feather name='search' size={24} color='black' />
                                   <Text className='text-sm text-black font-title'>
                                        Adicionar aluno por e-mail
                                   </Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => navigate('scanCode')} activeOpacity={0.7} className='bg-black rounded-full items-center justify-center px-3'>
                                   <MaterialCommunityIcons name='qrcode-scan' size={24} color='white' />
                              </TouchableOpacity>
                         </View>
                         <Text className='text-2xl font-title mt-8'>
                              Outras funcionalidades
                         </Text>
                         <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row mt-4 space-x-4'>
                              <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('multipleNotifications')}>
                                   <View className='w-64'>
                                        <Image source={notifications} className='h-40 w-64 rounded' />
                                        <View className='mt-3 px-4'>
                                             <View className='flex-row items-center space-x-1'>
                                                  <Text className='font-title text-lg'>Notificações</Text>
                                             </View>
                                             <Text className='font-text text-base'>Envie notificações a todos os seus alunos</Text>
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