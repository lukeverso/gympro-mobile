import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { api } from '../lib/api';

import home from '../assets/images/home.jpg';

interface WorkoutDetailsProps {
     studentId: string;
     workoutId: string;
};

interface WorkoutProps {
     active: boolean;
     exercises: ExerciseProps[];
     focus: string;
     id: string;
     type: string;
};

interface ExerciseProps {
     annotations: string | null;
     id: string;
     name: string;
     repetitions: number;
     restTime: number;
     series: number;
     weight: string;
};

export function WorkoutDetails() {
     const { goBack, navigate } = useNavigation();

     const route = useRoute();

     const { studentId, workoutId } = route.params as WorkoutDetailsProps;

     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [deleteSuccess, setDeleteSuccess] = useState(false);
     const [workoutDeleteModal, setWorkoutDeleteModal] = useState(false);

     const [workout, setWorkout] = useState<WorkoutProps | null>(null);

     async function getData() {
          try {
               const request = await api.get(`/workouts/${workoutId}`);

               setWorkout(request.data[0]);
          } catch (error) {
               console.log(error);
          };
     };

     useFocusEffect(useCallback(() => {
          getData();
     }, []));

     async function handleWorkoutDelete() {
          setError(false);
          setErrorMessage('');

          try {
               const request = await api.delete(`/workouts/${workoutId}/delete`);

               if (request.data.status === 'success') {
                    setWorkoutDeleteModal(false);

                    setDeleteSuccess(true);
               } else {
                    setError(true);
                    setErrorMessage('Ocorreu um erro...');
               };
          } catch (error) {
               console.log(error);

               setError(true);
               setErrorMessage('Ocorreu um erro...');
          };
     };

     return (
          <>
               {
                    deleteSuccess &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='check' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Treino excluído com sucesso
                              </Text>
                              <TouchableOpacity onPress={() => navigate('studentDetails', { id: studentId })} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Okay
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               {
                    workoutDeleteModal &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='trash-2' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Deseja excluir este treino?
                              </Text>
                              <TouchableOpacity onPress={handleWorkoutDelete} activeOpacity={0.7} className='w-full -mb-5 h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Sim
                                   </Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => setWorkoutDeleteModal(false)} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Não
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               <SafeAreaView className='flex-1 bg-white'>
                    <ScrollView>
                         <View className='mt-20 px-8'>
                              <View className='flex-row justify-between items-center'>
                                   <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                                        <Ionicons name='ios-chevron-back' size={24} color='black' />
                                   </TouchableOpacity>
                                   <TouchableOpacity activeOpacity={0.7} onPress={() => setWorkoutDeleteModal(true)} className='items-center justify-center py-3'>
                                        <Feather name='trash-2' size={24} color='black' />
                                   </TouchableOpacity>
                              </View>
                              <Text className='mt-8 text-2xl font-title'>
                                   Detalhes do treino
                              </Text>
                              <ImageBackground source={home} className='mt-4 rounded-lg flex-row justify-between items-center overflow-hidden'>
                                   <View className='bg-black/50 px-5 py-5 flex-1'>
                                        <Text className='font-title text-lg text-white'>
                                             {workout?.focus} ({workout?.type})
                                        </Text>
                                   </View>
                              </ImageBackground>
                              <View className='mt-8 flex-row justify-between items-center'>
                                   <Text className='text-2xl font-title'>
                                        Exercícios
                                   </Text>
                                   <TouchableOpacity onPress={() => navigate('createExercise', { id: workout?.id })} activeOpacity={0.7}>
                                        <Text className='text-sm text-black font-title'>
                                             Criar novo
                                        </Text>
                                   </TouchableOpacity>
                              </View>
                              {
                                   workout?.exercises && workout?.exercises.length > 0 ?
                                        workout.exercises.map((exercise) => {
                                             return (
                                                  <TouchableOpacity key={exercise.id} onPress={() => navigate('exerciseDetails', { exerciseId: exercise.id, studentId: studentId, workoutId: workout.id })} activeOpacity={0.7} className='mt-5 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'>
                                                       <Text className='font-title text-base mb-1'>
                                                            {exercise.name}
                                                       </Text>
                                                       <Ionicons name='ios-chevron-forward' size={24} color='black' />
                                                  </TouchableOpacity>
                                             )
                                        }) :
                                        <View className='w-full flex-col items-center mt-8 space-y-3'>
                                             <Feather name='alert-circle' size={24} color='black' />
                                             <Text className='font-title text-lg text-center leading-6'>
                                                  Este treino não{'\n'}
                                                  possui exercícios
                                             </Text>
                                             <Text className='font-text text-base text-center'>
                                                  Para criar um exercício,{'\n'}
                                                  clique em 'Criar novo' acima
                                             </Text>
                                        </View>
                              }
                         </View>
                    </ScrollView>
               </SafeAreaView>
          </>
     );
};