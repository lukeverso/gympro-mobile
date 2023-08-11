import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { api } from '../lib/api';

interface ExerciseDetailsProps {
     exerciseId: string;
     studentId: string;
     workoutId: string;
};

interface ExerciseProps {
     id: string;
     annotations: string;
     name: string;
     repetitions: string;
     restTime: string;
     series: string;
     weight: string;
};

export function ExerciseDetails() {
     const { goBack, navigate } = useNavigation();

     const route = useRoute();

     const { exerciseId, studentId, workoutId } = route.params as ExerciseDetailsProps;

     const [editSuccess, setEditSuccess] = useState(false);
     const [deleteSuccess, setDeleteSuccess] = useState(false);
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [name, setName] = useState<string>('');
     const [series, setSeries] = useState<string>('');
     const [repetitions, setRepetitions] = useState<string>('');
     const [restTime, setRestTime] = useState<string>('');
     const [weight, setWeight] = useState<string>('');
     const [annotations, setAnnotations] = useState<string>('');

     const [exerciseDeleteModal, setExerciseDeleteModal] = useState<boolean>(false);

     async function getData() {
          try {
               const request = await api.get(`/api/get/exercises/${exerciseId}`);

               setName((request.data as ExerciseProps).name);
               setSeries((request.data as ExerciseProps).series);
               setRepetitions((request.data as ExerciseProps).repetitions);
               setRestTime((request.data as ExerciseProps).restTime);
               setWeight((request.data as ExerciseProps).weight);
               setAnnotations((request.data as ExerciseProps).annotations);
          } catch (error) {
               console.log(error);
          };
     };

     useFocusEffect(useCallback(() => {
          getData();
     }, []));

     async function handleExerciseDelete() {
          setError(false);
          setErrorMessage('');

          try {
               const request = await api.delete(`/api/delete/exercises/${exerciseId}`);

               if (request.data.status === 'success') {
                    setExerciseDeleteModal(false);

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

     async function handleExerciseEditing() {
          setError(false);
          setErrorMessage('');

          if (name === '') {
               setError(true);
               setErrorMessage('O nome é obrigatório.');
               return;
          };

          if (series === '') {
               setError(true);
               setErrorMessage('As séries são obrigatórias.');
               return;
          };

          if (repetitions === '') {
               setError(true);
               setErrorMessage('As repetições são obrigatórias.');
               return;
          };

          if (restTime === '') {
               setError(true);
               setErrorMessage('O tempo de descanso é obrigatório.');
               return;
          };

          try {
               const request = await api.post(`/api/post/exercises/${exerciseId}/edit`, {
                    name, series, repetitions, restTime, weight, annotations
               });

               if (request.data.status === 'success') {
                    setEditSuccess(true);
               } else {
                    setError(true);
                    setErrorMessage(request.data.message);
                    return;
               };
          } catch (error) {
               console.log(error);
          };
     };

     return (
          <>
               {
                    editSuccess &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='check' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Exercício editado com sucesso
                              </Text>
                              <TouchableOpacity onPress={() => navigate('workoutDetails', { studentId: studentId, workoutId: workoutId })} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Okay
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               {
                    deleteSuccess &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='check' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Exercício excluído com sucesso
                              </Text>
                              <TouchableOpacity onPress={() => navigate('workoutDetails', { studentId: studentId, workoutId: workoutId })} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Okay
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               {
                    exerciseDeleteModal &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='trash-2' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Deseja excluir este exercício?
                              </Text>
                              <TouchableOpacity onPress={handleExerciseDelete} activeOpacity={0.7} className='w-full -mb-5 h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Sim
                                   </Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => setExerciseDeleteModal(false)} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Não
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               <KeyboardAvoidingView className={error ? 'flex-1 w-full px-8 pb-32 items-center bg-white' : 'flex-1 w-full px-8 pb-16 items-center bg-white'} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView showsVerticalScrollIndicator={false} className='mt-20 mb-10 w-full flex-1'>
                         <View className='flex-row justify-between items-center'>
                              <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                                   <Ionicons name='ios-chevron-back' size={24} color='black' />
                              </TouchableOpacity>
                              <TouchableOpacity activeOpacity={0.7} onPress={() => setExerciseDeleteModal(true)} className='items-center justify-center py-3'>
                                   <Feather name='trash-2' size={24} color='black' />
                              </TouchableOpacity>
                         </View>
                         <Text className='mt-8 text-2xl font-title'>
                              {name}
                         </Text>
                         <View className='flex-1'>
                              <Text className='mt-8 font-title px-3'>
                                   Nome do exercício
                              </Text>
                              <TextInput
                                   keyboardType='default'
                                   placeholder='Nome do exercício'
                                   className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                   onChangeText={setName}
                                   value={name}
                              />
                         </View>
                         <View className='flex-row mt-2 space-x-6'>
                              <View className='flex-1'>
                                   <Text className='mt-8 font-title px-3'>
                                        Séries
                                   </Text>
                                   <TextInput
                                        keyboardType='number-pad'
                                        placeholder='Séries'
                                        className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                        onChangeText={setSeries}
                                        value={series}
                                   />
                              </View>
                              <View className='flex-1'>
                                   <Text className='mt-8 font-title px-3'>
                                        Repetições
                                   </Text>
                                   <TextInput
                                        keyboardType='number-pad'
                                        placeholder='Repetições'
                                        className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                        onChangeText={setRepetitions}
                                        value={repetitions}
                                   />
                              </View>
                         </View>
                         <View className='flex-row mt-2 space-x-6'>
                              <View className='flex-1'>
                                   <Text className='mt-8 font-title px-3'>
                                        Tempo de descanso
                                   </Text>
                                   <TextInput
                                        keyboardType='number-pad'
                                        placeholder='(em segundos)'
                                        className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                        onChangeText={setRestTime}
                                        value={restTime}
                                   />
                              </View>
                              <View className='flex-1'>
                                   <Text className='mt-8 font-title px-3'>
                                        Peso (opcional)
                                   </Text>
                                   <TextInput
                                        keyboardType='number-pad'
                                        placeholder='Peso (opcional)'
                                        className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                        onChangeText={setWeight}
                                        value={weight}
                                   />
                              </View>
                         </View>
                         <View className='flex-1'>
                              <Text className='mt-8 font-title px-3'>
                                   Observações (opcional)
                              </Text>
                              <TextInput
                                   multiline
                                   keyboardType='default'
                                   placeholder='Observações (opcional)'
                                   className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                   onChangeText={setAnnotations}
                                   value={annotations}
                              />
                         </View>
                    </ScrollView>
                    <View className='absolute bottom-8 w-full space-y-5'>
                         {
                              error &&
                              <View className='flex-row justify-center items-center space-x-3 py-3 bg-red-400 rounded-full'>
                                   <AntDesign name='warning' size={24} color='white' />
                                   <Text className='font-text text-white text-base'>
                                        {errorMessage}
                                   </Text>
                              </View>
                         }
                         <TouchableOpacity onPress={handleExerciseEditing} activeOpacity={0.7} className='rounded py-3 justify-center items-center bg-black flex-row space-x-3'>
                              <Text className='text-white text-base font-title'>Editar exercício</Text>
                         </TouchableOpacity>
                    </View>
               </KeyboardAvoidingView>
          </>
     );
};