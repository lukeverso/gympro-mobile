import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { api } from '../lib/api';

export function CheckEmail() {
     const [email, setEmail] = useState('');
     const [errorMessage, setErrorMessage] = useState('');
     const [error, setError] = useState(false);

     const { goBack, navigate } = useNavigation();

     async function handleEmailCheck() {
          setError(false);
          setErrorMessage('');

          if (email === '') {
               setError(true);
               setErrorMessage('Insira um e-mail válido.');
               return;
          };

          console.log(typeof email);

          const request = await api.post(`/students/verify-email?email=${email}`);

          if (request.data.status === 'success') {
               navigate('create', { email });
          } else {
               setError(true);
               setErrorMessage(request.data.message);
               return;
          }
     };

     return (
          <View className='flex-1 bg-white'>
               <View className='mt-20 px-8'>
                    <TouchableOpacity onPress={() => goBack()}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-2xl font-title'>
                         Digite seu e-mail para{'\n'}
                         iniciar o processo
                    </Text>
                    <Text className='mt-8 font-title px-3'>
                         E-mail
                    </Text>
                    <TextInput
                         autoFocus
                         autoCapitalize='none'
                         keyboardType='email-address'
                         placeholder='E-mail'
                         className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                         onChangeText={setEmail}
                         value={email}
                    />
                    <View className={error ? 'mt-8 flex-row justify-between' : 'mt-8 flex-row justify-end'}>
                         {
                              error &&
                              <View className='flex-row items-center py-3 px-5 bg-red-400 rounded-full'>
                                   <AntDesign name='warning' size={24} color='white' />
                                   <Text className='text-white text-base ml-3'>
                                        {errorMessage}
                                   </Text>
                              </View>
                         }
                         <TouchableOpacity onPress={handleEmailCheck} activeOpacity={0.7} className='px-3 py-3 items-center justify-center bg-black rounded-full'>
                              <AntDesign name='arrowright' size={24} color='white' />
                         </TouchableOpacity>
                    </View>
               </View>
          </View>
     );
};