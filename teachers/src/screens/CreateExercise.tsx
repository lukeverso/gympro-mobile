import { api } from '../lib/api';
import { useState } from 'react';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';

interface CreateExerciseProps {
     studentId: string;
     workoutId: string;
};

export function CreateExercise() {
     const route = useRoute();
     
     const { studentId, workoutId } = route.params as CreateExerciseProps;
     const { goBack, navigate } = useNavigation();


     const [error, setError] = useState(false);
     const [success, setSuccess] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [name, setName] = useState<string>('');
     const [series, setSeries] = useState<string>('');
     const [repetitions, setRepetitions] = useState<string>('');
     const [restTime, setRestTime] = useState<string>('');
     const [weight, setWeight] = useState<string>('');
     const [annotations, setAnnotations] = useState<string>('');

     async function handleExerciseCreation() {
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
               const request = await api.post(`/api/post/exercises/${workoutId}/create`, {
                    name, series, repetitions, restTime, weight, annotations
               });

               if (request.data.status === 'success') {
                    Keyboard.dismiss();
                    setSuccess(true);
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
                    success &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='check' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Exercício criado com sucesso!
                              </Text>
                              <TouchableOpacity onPress={() => navigate('workoutDetails', { studentId: studentId, workoutId: workoutId })} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Okay
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               <KeyboardAvoidingView className={error ? 'flex-1 w-full px-8 pb-32 items-center bg-white' : 'flex-1 w-full px-8 pb-16 items-center bg-white'} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView showsVerticalScrollIndicator={false} className='mt-20 mb-10 w-full flex-1'>
                         <View className='flex-row justify-between items-center'>
                              <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                                   <Ionicons name='chevron-back' size={24} color='black' />
                              </TouchableOpacity>
                              <View className='items-center justify-center p-3'></View>
                         </View>
                         <Text className='mt-8 text-2xl font-title'>
                              Criar exercício
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
                              <View className='flex-row justify-center items-center space-x-5 py-3 px-4 bg-red-400 rounded'>
                                   <AntDesign name='warning' size={24} color='white' />
                                   <Text className='font-text text-white text-base'>
                                        {errorMessage}
                                   </Text>
                              </View>
                         }
                         <TouchableOpacity onPress={handleExerciseCreation} activeOpacity={0.7} className='rounded py-3 justify-center items-center bg-black flex-row space-x-3'>
                              <Text className='text-white text-base font-title'>Criar exercício</Text>
                         </TouchableOpacity>
                    </View>
               </KeyboardAvoidingView>
          </>
     );
};