import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, Feather, Ionicons, Octicons } from '@expo/vector-icons';
import { AuthContext } from '../contexts/auth';
import { MaskedTextInput } from 'react-native-mask-text';
import { api } from '../lib/api';

interface CreateSheetProps {
     id: string;
};

export default function CreateSheet() {
     const { goBack, navigate } = useNavigation();

     const route = useRoute();

     const { id } = route.params as CreateSheetProps;

     const [success, setSuccess] = useState(false);
     const [error, setError] = useState(false);
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
          try {
               const request = await api.post(`/sheets/${id}`, {
                    objective, startDate, endDate, annotations
               });

               if (request.data.status === 'success') {
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
                                   <Ionicons name='ios-chevron-back' size={24} color='black' />
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
                                   autoFocus
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
                              <View className='flex-row justify-center items-center space-x-3 py-3 bg-red-400 rounded-full'>
                                   <AntDesign name='warning' size={24} color='white' />
                                   <Text className='text-white text-base'>
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