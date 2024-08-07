import { api } from '../lib/api';
import { useEffect, useState } from 'react';
import { MaskedTextInput } from 'react-native-mask-text';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';

interface CreateSheetProps {
     id: string;
};

export function CreateSheet() {
     const route = useRoute();
     
     const { id } = route.params as CreateSheetProps;
     const { goBack, navigate } = useNavigation();

     const [error, setError] = useState(false);
     const [success, setSuccess] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [objective, setObjective] = useState<string>('');
     const [startDate, setStartDate] = useState<string>('');
     const [endDate, setEndDate] = useState<string>('');
     const [annotations, setAnnotations] = useState<string>('');

     useEffect(() => {
          const today: Date = new Date();
          const yyyy: number = today.getFullYear();
          let mm: number | string = today.getMonth() + 1;
          let dd: number | string = today.getDate();

          if (dd < 10) dd = '0' + dd;
          if (mm < 10) mm = '0' + mm;

          const formattedDate: string = dd + '/' + mm + '/' + yyyy;
          setStartDate(formattedDate);
     }, []);

     async function handleSheetCreation() {
          setError(false);
          setErrorMessage('');

          const startParts = startDate.split('/');
          const endParts = endDate.split('/');
          const startDateObject = new Date(`${startParts[2]}-${startParts[1]}-${startParts[0]}`);
          const endDateObject = new Date(`${endParts[2]}-${endParts[1]}-${endParts[0]}`);

          if (endDateObject < startDateObject) {
               setError(true);
               setErrorMessage('A data de término não pode ser anterior à data de início.');
               return;
          };

          try {
               const request = await api.post(`/api/post/sheets/${id}/create`, {
                    objective, startDate, endDate, annotations
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
                                   Ficha de treino criada com sucesso!
                              </Text>
                              <TouchableOpacity onPress={() => navigate('studentDetails', { id })} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
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
                              Criar ficha de treino
                         </Text>
                         <Text className='mt-1 font-text text-base'>
                              Criar uma nova ficha de treino irá desativar quaisquer outras que existam
                         </Text>
                         <View className='flex-1'>
                              <Text className='mt-8 font-title px-3'>
                                   Objetivo
                              </Text>
                              <TextInput
                                   keyboardType='default'
                                   placeholder='Objetivo'
                                   className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                   onChangeText={setObjective}
                                   value={objective}
                              />
                         </View>
                         <View className='flex-row mt-2 space-x-6'>
                              <View className='flex-1'>
                                   <Text className='mt-8 font-title px-3'>
                                        Data de início
                                   </Text>
                                   <MaskedTextInput
                                        mask='99/99/9999'
                                        keyboardType='number-pad'
                                        placeholder='Data de início'
                                        autoCapitalize='none'
                                        className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                        onChangeText={setStartDate}
                                        value={startDate}
                                   />
                              </View>
                              <View className='flex-1'>
                                   <Text className='mt-8 font-title px-3'>
                                        Data de fim
                                   </Text>
                                   <MaskedTextInput
                                        mask='99/99/9999'
                                        keyboardType='number-pad'
                                        placeholder='Data de fim'
                                        className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                        onChangeText={setEndDate}
                                        value={endDate}
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
                         <TouchableOpacity onPress={handleSheetCreation} activeOpacity={0.7} className='rounded py-3 justify-center items-center bg-black flex-row space-x-3'>
                              <Text className='text-white text-base font-title'>Criar ficha</Text>
                         </TouchableOpacity>
                    </View>
               </KeyboardAvoidingView>
          </>
     );
};