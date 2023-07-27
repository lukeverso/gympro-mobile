import { View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, Feather, Ionicons, Octicons } from '@expo/vector-icons';
import { AuthContext } from '../contexts/auth';

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
     active: boolean;
     annotations: string;
     objective: string;
     endDate: string;
     startDate: string;
     workouts: ExerciseProps[];
};

interface StudentProps {
     id: string;
     age: number;
     birthdate: string;
     email: string;
     name: string;
     status: boolean;
     telephone: string;
     sheets: WorkoutProps[];
};

export function StudentDetails() {
     const { goBack, navigate } = useNavigation();
     const navigation = useNavigation();

     const route = useRoute();

     const { id } = route.params as StudentDetailsProps;

     const { user } = useContext(AuthContext);

     const [success, setSuccess] = useState(false);
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [reload, setReload] = useState<boolean>(false);

     const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false);
     const [openInactivateModal, setOpenInactivateModal] = useState<boolean>(false);

     const [student, setStudent] = useState<StudentProps | null>(null);

     async function getDetails() {
          try {
               const request = await api.get(`/students/${id}/details`);

               setStudent(request.data);
          } catch (error) {
               console.log(error);
          };
     };

     useEffect(() => {
          getDetails();
     }, [reload]);

     useEffect(() => {
          navigation.addListener('focus', () => {
               getDetails();
          });
     }, []);

     async function handleStudentInactivation() {
          try {
               await api.patch(`/students/${id}/status`);

               setReload(true);
               setOpenInactivateModal(false);
               setReload(false);
          } catch (error) {
               console.log(error);
          };
     };

     async function handleStudentRemoval() {
          try {
               const request = await api.post(`/teachers/${user?.id}/delete/${id}`);

               if (request.data.status === 'success') {
                    setOpenRemoveModal(false);
                    setSuccess(true);
               };
          } catch (error) {
               console.log(error);

               setError(true);
               setErrorMessage('Ocorreu um erro. Tente novamente.');
          };
     };

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
               <ScrollView className='flex-1 bg-white px-8'>
                    <View className='mt-20 mb-10 w-full'>
                         <View className='flex-row justify-between items-center'>
                              <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                                   <Ionicons name='ios-chevron-back' size={24} color='black' />
                              </TouchableOpacity>
                              <View className='items-center justify-center p-3'></View>
                         </View>
                         <Text className='mt-8 text-2xl font-title'>
                              Seu aluno
                         </Text>
                         <View className='space-y-1 mt-4 bg-gray-100 p-5 rounded-lg flex-row items-center justify-between'>
                              <View className='w-20 h-20 rounded-full items-center justify-center bg-white'>
                                   <Octicons name='person' size={32} color='black' />
                              </View>
                              <View>
                                   <Text className='font-title text-xl'>{student?.name}</Text>
                                   <Text className='font-text text-sm'>{student?.age} anos • Aluno {student?.status === true ? 'ativo' : 'inativo'}</Text>
                                   <Text className='font-text text-sm'>{student?.email}</Text>
                                   <Text className='font-text text-sm'>{student?.telephone}</Text>
                              </View>
                         </View>
                         <View className='mt-8 flex-row justify-between items-center'>
                              <Text className='text-2xl font-title'>
                                   Ficha de treino
                              </Text>
                              <TouchableOpacity activeOpacity={0.7}>
                                   <Text className='text-sm text-black font-title'>
                                        Criar nova
                                   </Text>
                              </TouchableOpacity>
                         </View>
                         {
                              student?.sheets[0] && student.sheets[0].active === true ?
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
                                                  Exercícios
                                             </Text>
                                             <TouchableOpacity activeOpacity={0.7}>
                                                  <Text className='text-sm text-black font-title'>
                                                       Criar novo
                                                  </Text>
                                             </TouchableOpacity>
                                        </View>
                                        {
                                             student?.sheets[0]?.workouts.length !== 0 ?
                                                  student?.sheets[0]?.workouts?.map((workout) => {
                                                       return (
                                                            <TouchableOpacity key={workout.id} onPress={() => navigate('trainSheets', { id: workout.id })} activeOpacity={0.7} className='mt-5 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'>
                                                                 <Text className='font-title text-base mb-1'>
                                                                      {workout.focus} ({workout.type})
                                                                 </Text>
                                                                 <Ionicons name='ios-chevron-forward' size={24} color='black' />
                                                            </TouchableOpacity>
                                                       )
                                                  }) :
                                                  <View className='w-full flex-col items-center mt-8 space-y-3'>
                                                       <Feather name='alert-circle' size={24} color='black' />
                                                       <Text className='font-title text-lg text-center leading-6'>
                                                            Este aluno não{'\n'}
                                                            possui exercícios
                                                       </Text>
                                                       <Text className='font-text text-base text-center'>
                                                            Para criar um exercício,{'\n'}
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
                         <TouchableOpacity onPress={() => navigate('measures', { id: student?.id })} activeOpacity={0.7} className='mt-4 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'>
                              <View className='flex-row gap-3 items-center'>
                                   <Feather name='edit-3' size={24} color='black' />
                                   <Text className='font-title text-base mb-1'>
                                        Editar medidas
                                   </Text>
                              </View>
                              <Ionicons name='ios-chevron-forward' size={24} color='black' />
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => setOpenInactivateModal(true)} activeOpacity={0.7} className='mt-4 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'>
                              <View className='flex-row gap-3 items-center'>
                                   <Feather name='power' size={24} color='black' />
                                   <Text className='font-title text-base mb-1'>
                                        {student?.status === true ? 'Inativar' : 'Ativar'} aluno
                                   </Text>
                              </View>
                              <Ionicons name='ios-chevron-forward' size={24} color='black' />
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => setOpenRemoveModal(true)} activeOpacity={0.7} className='mt-4 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'>
                              <View className='flex-row gap-3 items-center'>
                                   <Feather name='trash-2' size={24} color='black' />
                                   <Text className='font-title text-base mb-1'>
                                        Remover aluno
                                   </Text>
                              </View>
                              <Ionicons name='ios-chevron-forward' size={24} color='black' />
                         </TouchableOpacity>
                    </View>
               </ScrollView>
          </>
     );
};