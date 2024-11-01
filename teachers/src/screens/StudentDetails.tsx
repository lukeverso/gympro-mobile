import { api } from '../lib/api';
import { AuthContext } from '../contexts/auth';
import { useContext, useState, useCallback } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image, Linking, Platform, Keyboard, ActivityIndicator } from 'react-native';

import home from '../assets/images/home.jpg';

interface StudentDetailsProps {
     id: string;
};

interface ExerciseProps {
     id: string;
     focus: string;
     type: string;
};

interface WorkoutProps {
     id: string;
     active: boolean;
     annotations: string;
     objective: string;
     endDate: string;
     startDate: string;
     workouts: ExerciseProps[];
};

interface StudentProps {
     id: string;
     picture: string;
     age: number;
     birthdate: string;
     email: string;
     name: string;
     status: boolean;
     telephone: string;
     sheets: WorkoutProps[];
};

export function StudentDetails() {
     const route = useRoute();

     const { goBack, navigate } = useNavigation();
     const { teacher } = useContext(AuthContext);
     const { id } = route.params as StudentDetailsProps;

     const [success, setSuccess] = useState<boolean>(false);
     const [loading, setLoading] = useState<boolean>(false);

     const [reload, setReload] = useState<boolean>(false);
     const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false);
     const [openInactivateModal, setOpenInactivateModal] = useState<boolean>(false);
     const [student, setStudent] = useState<StudentProps | null>(null);

     async function getDetails() {
          setLoading(true);

          try {
               const request = await api.get(`/api/get/students/${id}/details`);

               setStudent(request.data);

               setLoading(false);
          } catch (error) {
               console.log(error);
          };
     };

     async function handleStudentInactivation() {
          try {
               await api.patch(`/api/put/students/${id}/status`);

               setReload(true);
               setOpenInactivateModal(false);
               setReload(false);
          } catch (error) {
               console.log(error);
          };
     };

     async function handleStudentRemoval() {
          try {
               const request = await api.patch(`/api/put/teachers/${teacher}/delete/${id}`);

               if (request.data.status === 'success') {
                    setOpenRemoveModal(false);
                    Keyboard.dismiss();
                    setSuccess(true);
               };
          } catch (error: any) {
               if (error.response) {
                    console.log('Status de erro:', error.response.status);
                    console.log('Dados do erro:', error.response.data);
               } else if (error.request) {
                    console.log('Erro de solicitação:', error.request);
               } else {
                    console.log('Erro de configuração:', error.message);
               }
          };
     };

     useFocusEffect(useCallback(() => {
          getDetails();
     }, [reload]));

     return (
          <>
               {
                    openRemoveModal &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <AntDesign name='close' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Deseja remover este aluno?
                              </Text>
                              <TouchableOpacity onPress={handleStudentRemoval} activeOpacity={0.7} className='w-full -mb-5 h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Sim
                                   </Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => setOpenRemoveModal(false)} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Não
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               {
                    openInactivateModal &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='power' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Deseja {student?.status === true ? 'inativar' : 'ativar'} este aluno?
                              </Text>
                              <TouchableOpacity onPress={handleStudentInactivation} activeOpacity={0.7} className='w-full -mb-5 h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Sim
                                   </Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => setOpenInactivateModal(false)} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Não
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               {
                    success &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='check' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Aluno removido com sucesso.
                              </Text>
                              <TouchableOpacity onPress={() => navigate('home')} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Okay
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               <ScrollView showsVerticalScrollIndicator={false} className='flex-1 bg-white px-8'>
                    <View className='mt-20 mb-10 w-full'>
                         <View className='flex-row justify-between items-center'>
                              <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                                   <Ionicons name='chevron-back' size={24} color='black' />
                              </TouchableOpacity>
                              <View className='items-center justify-center p-3'></View>
                         </View>
                         <Text className='mt-8 text-2xl font-title'>
                              Seu aluno
                         </Text>
                         <View className='mt-8 space-y-3 flex-col items-center'>
                              {
                                   loading ?
                                        <ActivityIndicator size='large' color='#000000' /> :
                                        <>
                                             {
                                                  student?.picture !== null ?
                                                       <Image source={{ uri: student?.picture }} className='w-32 h-32 rounded-full' /> :
                                                       <View className='w-32 h-32 rounded-full items-center justify-center bg-gray-100'>
                                                            <Octicons name='person' size={32} color='black' />
                                                       </View>
                                             }
                                             <View className='items-center mt-4 space-y-1'>
                                                  <Text className='font-title text-2xl text-black'>
                                                       {student?.name}
                                                  </Text>
                                                  <Text className='font-text text-base text-black'>
                                                       {student?.age} anos • Aluno {student?.status === true ? 'ativo' : 'inativo'}
                                                  </Text>
                                                  <TouchableOpacity onPress={() => Linking.openURL(`mailto:${student?.email}`)}>
                                                       <Text className='font-text text-base text-black'>
                                                            {student?.email}
                                                       </Text>
                                                  </TouchableOpacity>
                                                  <TouchableOpacity onPress={() => {
                                                       const phoneNumber = Platform.OS === 'ios' ? `telprompt:${student?.telephone}` : `tel:${student?.telephone}`;
                                                       Linking.openURL(phoneNumber);
                                                  }}>
                                                       <Text className='font-text text-base text-black'>
                                                            {student?.telephone}
                                                       </Text>
                                                  </TouchableOpacity>
                                             </View>
                                        </>
                              }
                         </View>
                         <View className='mt-8 flex-row justify-between items-center'>
                              <Text className='text-2xl font-title'>
                                   Ficha de treino
                              </Text>
                              <TouchableOpacity onPress={() => navigate('createSheet', { id: student?.id })} activeOpacity={0.7}>
                                   <Text className='text-sm text-black font-title'>
                                        Criar nova
                                   </Text>
                              </TouchableOpacity>
                         </View>
                         {
                              loading ?
                                   <ActivityIndicator className='mt-8' size='large' color='#000000' /> :
                                   student?.sheets[0] ?
                                        <>
                                             <ImageBackground source={home} className='mt-4 rounded-lg flex-row justify-between items-center overflow-hidden'>
                                                  <View className='bg-black/50 px-5 py-5 flex-1'>
                                                       <Text className='font-text text-base text-white'>
                                                            Objetivo: {student.sheets[0].objective}{'\n'}
                                                            {student.sheets[0]?.annotations ? `Anotações: ${student.sheets[0].annotations}\n` : ''}
                                                            Início: {student.sheets[0].startDate}{'\n'}
                                                            Término: {student.sheets[0].endDate}
                                                       </Text>
                                                  </View>
                                             </ImageBackground>
                                             <View className='mt-8 flex-row justify-between items-center'>
                                                  <Text className='text-2xl font-title'>
                                                       Treinos
                                                  </Text>
                                                  <TouchableOpacity onPress={() => navigate('createWorkout', { id: student.sheets[0].id })} activeOpacity={0.7}>
                                                       <Text className='text-sm text-black font-title'>
                                                            Criar novo
                                                       </Text>
                                                  </TouchableOpacity>
                                             </View>
                                             {
                                                  student?.sheets[0]?.workouts.length !== 0 ?
                                                       student?.sheets[0]?.workouts?.map((workout) => {
                                                            return (
                                                                 <TouchableOpacity key={workout.id} onPress={() => navigate('workoutDetails', { studentId: student.id, workoutId: workout.id })} activeOpacity={0.7} className='mt-5 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'>
                                                                      <Text className='font-title text-base mb-1'>
                                                                           {workout.focus} ({workout.type})
                                                                      </Text>
                                                                      <Ionicons name='chevron-forward' size={24} color='black' />
                                                                 </TouchableOpacity>
                                                            )
                                                       }) :
                                                       <View className='w-full flex-col items-center mt-8 space-y-3'>
                                                            <Feather name='alert-circle' size={24} color='black' />
                                                            <Text className='font-title text-lg text-center leading-6'>
                                                                 Este aluno não{'\n'}
                                                                 possui treinos
                                                            </Text>
                                                            <Text className='font-text text-base text-center'>
                                                                 Para criar um treino,{'\n'}
                                                                 clique em 'Criar novo' acima
                                                            </Text>
                                                       </View>
                                             }
                                        </> :
                                        <View className='w-full flex-col items-center mt-8 space-y-3'>
                                             <Feather name='alert-circle' size={24} color='black' />
                                             <Text className='font-title text-lg text-center leading-6'>
                                                  Este aluno não possui{'\n'}
                                                  fichas de treino
                                             </Text>
                                             <Text className='font-text text-base text-center'>
                                                  Para criar uma ficha,{'\n'}
                                                  clique em 'Criar nova' acima
                                             </Text>
                                        </View>
                         }
                         <Text className='mt-8 text-2xl font-title'>
                              Opções gerais
                         </Text>
                         <TouchableOpacity onPress={() => navigate('medicalHistory', { id: student?.id })} activeOpacity={0.7} className='mt-4 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'>
                              <View className='flex-row gap-3 items-center'>
                                   <Feather name='file-text' size={24} color='black' />
                                   <Text className='font-title text-base mb-1'>
                                        Ver ficha de anamnese
                                   </Text>
                              </View>
                              <Ionicons name='chevron-forward' size={24} color='black' />
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => navigate('measures', { id: student?.id })} activeOpacity={0.7} className='mt-4 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'>
                              <View className='flex-row gap-3 items-center'>
                                   <Feather name='edit-3' size={24} color='black' />
                                   <Text className='font-title text-base mb-1'>
                                        Editar medidas
                                   </Text>
                              </View>
                              <Ionicons name='chevron-forward' size={24} color='black' />
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => navigate('singleNotification', { id: student?.id })} activeOpacity={0.7} className='mt-4 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'>
                              <View className='flex-row gap-3 items-center'>
                                   <MaterialCommunityIcons name='bell-plus-outline' size={24} color='black' />
                                   <Text className='font-title text-base mb-1'>
                                        Criar notificação
                                   </Text>
                              </View>
                              <Ionicons name='chevron-forward' size={24} color='black' />
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => setOpenInactivateModal(true)} activeOpacity={0.7} className='mt-4 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'>
                              <View className='flex-row gap-3 items-center'>
                                   <Feather name='power' size={24} color='black' />
                                   <Text className='font-title text-base mb-1'>
                                        {student?.status === true ? 'Inativar' : 'Ativar'} aluno
                                   </Text>
                              </View>
                              <Ionicons name='chevron-forward' size={24} color='black' />
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => setOpenRemoveModal(true)} activeOpacity={0.7} className='mt-4 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'>
                              <View className='flex-row gap-3 items-center'>
                                   <Feather name='trash-2' size={24} color='black' />
                                   <Text className='font-title text-base mb-1'>
                                        Remover aluno
                                   </Text>
                              </View>
                              <Ionicons name='chevron-forward' size={24} color='black' />
                         </TouchableOpacity>
                    </View>
               </ScrollView>
          </>
     );
};