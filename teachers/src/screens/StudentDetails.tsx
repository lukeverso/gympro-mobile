import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, Ionicons, Octicons } from '@expo/vector-icons';

interface StudentDetailsProps {
     id: string;
};

interface ExerciseProps {
     id: string;
     focus: string;
     type: string;
};

interface WorkoutProps {
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

export default function StudentDetails() {
     const { goBack, navigate } = useNavigation();

     const route = useRoute();

     const { id } = route.params as StudentDetailsProps;

     const [reload, setReload] = useState<boolean>(false);

     const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false);
     const [openInactivateModal, setOpenInactivateModal] = useState<boolean>(false);

     const [student, setStudent] = useState<StudentProps | null>(null);

     async function getDetails() {
          try {
               const request = await api.get(`/students/details/${id}`);

               setStudent(request.data);
          } catch (error) {
               console.log(error);
          };
     };

     useEffect(() => {
          getDetails();
     }, [reload]);

     async function handleStudentInactivation() {
          try {
               await api.patch(`/students/${id}/status`);

               setReload(true);
               setOpenInactivateModal(false);
          } catch (error) {
               console.log(error);
          };
     };

     return (
          <>
               {
                    openRemoveModal &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5'>
                              <AntDesign name='close' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Deseja remover este aluno?
                              </Text>
                              <TouchableOpacity activeOpacity={0.7} className='w-full -mb-5 h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
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
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5'>
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
               <ScrollView className='flex-1 bg-white px-8'>
                    <View className='mt-20 mb-10 w-full'>
                         <TouchableOpacity onPress={goBack}>
                              <Ionicons name='ios-chevron-back' size={24} color='black' />
                         </TouchableOpacity>
                         <Text className='mt-8 text-2xl font-title'>
                              Seu aluno
                         </Text>
                         <View className='mt-4 bg-gray-100 flex-row p-5 justify-between rounded-lg'>
                              <View className='space-y-1'>
                                   <Text className='font-title text-xl'>{student?.name}</Text>
                                   <Text className='font-text text-sm'>{student?.age} anos • Aluno {student?.status === true ? 'ativo' : 'inativo'}</Text>
                                   <Text className='font-text text-sm'>{student?.email}</Text>
                                   <Text className='font-text text-sm'>{student?.telephone}</Text>
                              </View>
                              <TouchableOpacity onPress={() => setOpenRemoveModal(true)} activeOpacity={0.7}>
                                   <AntDesign name='close' size={24} color='black' />
                              </TouchableOpacity>
                         </View>
                         <View className='mt-8 flex-row justify-between items-center'>
                              <Text className='text-2xl font-title'>
                                   Fichas de treino
                              </Text>
                              <TouchableOpacity activeOpacity={0.7}>
                                   <Text className='text-sm text-black font-title'>
                                        Criar nova
                                   </Text>
                              </TouchableOpacity>
                         </View>
                         {
                              student?.sheets[0]?.workouts ?
                                   student?.sheets[0]?.workouts?.map((workout) => {
                                        return (
                                             <TouchableOpacity key={workout.id} activeOpacity={0.7} className='mt-5 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'>
                                                  <View className='flex-row gap-3 items-center'>
                                                       <Octicons name='dot-fill' size={24} color='black' />
                                                       <Text className='font-title text-base mb-1'>
                                                            {workout.focus} ({workout.type})
                                                       </Text>
                                                  </View>
                                                  <Ionicons name='ios-chevron-forward' size={24} color='black' />
                                             </TouchableOpacity>
                                        )
                                   }) :
                                   <View className='w-full flex-col items-center mt-8 space-y-3'>
                                        <Feather name='alert-circle' size={24} color='black' />
                                        <Text className='font-title text-lg text-center leading-6'>
                                             Este aluno não possui{'\n'}
                                             fichas de treino
                                        </Text>
                                        <Text className='font-text text-base text-center'>
                                             Para criar uma ficha,{'\n'}
                                             clique em "Criar nova" acima
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
                    </View>
               </ScrollView>
          </>
     );
};