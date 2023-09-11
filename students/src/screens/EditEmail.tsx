import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { api } from '../lib/api';

export function EditEmail() {
     const { goBack, navigate } = useNavigation();

     const [success, setSuccess] = useState(false);
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [email, setEmail] = useState('');

     const { user } = useContext(AuthContext);

     async function getEmail() {
          setError(false);
          setErrorMessage('');

          try {
               const request = await api.get(`/api/get/students/${user?.id}/email`);

               setEmail(request.data.email);
          } catch (error) {
               console.log(error);

               setError(true);
               setErrorMessage('Ocorreu um erro...');
          };
     };

     useEffect(() => {
          getEmail();
     }, []);

     async function handleEmailEditing() {
          setError(false);
          setErrorMessage('');

          if (email === '') {
               setError(true);
               setErrorMessage('Insira seu e-mail.');
               return;
          };

          try {
               const request = await api.patch(`/api/put/students/${user?.id}/email`, { email });

               if (request.data.status === 'success') {
                    Keyboard.dismiss();
                    setSuccess(true);
               } else {
                    setError(true);
                    setErrorMessage(request.data.message || 'Ocorreu um erro');
                    return;
               };
          } catch (error) {
               setError(true);
               setErrorMessage('Confira os dados inseridos.');
               return;
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
                                   O e-mail foi editado com sucesso.
                              </Text>
                              <TouchableOpacity onPress={() => navigate('edit')} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Okay
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               <View className='flex-1 bg-white px-8 items-center'>
                    <View className='mt-20 mb-10 w-full'>
                         <TouchableOpacity onPress={() => goBack()}>
                              <Ionicons name='ios-chevron-back' size={24} color='black' />
                         </TouchableOpacity>
                         <Text className='mt-8 text-2xl font-title'>
                              Edite seu e-mail
                         </Text>
                         <Text className='mt-8 font-title px-3'>
                              E-mail
                         </Text>
                         <TextInput
                              autoCapitalize='none'
                              keyboardType='email-address'
                              placeholder='E-mail'
                              className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                              onChangeText={setEmail}
                              value={email}
                         />
                    </View>
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
                         <TouchableOpacity onPress={handleEmailEditing} activeOpacity={0.7} className='rounded py-3 justify-center items-center bg-black flex-row space-x-3'>
                              <Text className='text-white text-base font-title'>Atualizar</Text>
                         </TouchableOpacity>
                    </View>
               </View>
          </>
     );
};