import { api } from '../lib/api';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export function CheckEmail() {
     const { goBack, navigate } = useNavigation();

     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');
     const [email, setEmail] = useState('');

     async function handleEmailCheck() {
          setError(false);
          setErrorMessage('');

          if (email === '') {
               setError(true);
               setErrorMessage('Insira um e-mail válido.');
               return;
          };

          try {
               const request = await api.post('/api/post/teachers/verify-email', { email });

               if (request.data.status === 'success') {
                    navigate('checkCode', { email });
               } else {
                    setError(true);
                    setErrorMessage(request.data.message);
                    return;
               };
          } catch (error) {
               console.log(error);

               setError(true);
               setErrorMessage('Ocorreu um erro...');
          };
     };

     return (
          <View className='flex-1 bg-white px-8 items-center'>
               <View className='mt-20 mb-10 w-full'>
                    <View className='flex-row justify-between items-center'>
                         <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                              <Ionicons name='chevron-back' size={24} color='black' />
                         </TouchableOpacity>
                         <View className='items-center justify-center p-3'></View>
                    </View>
                    <Text className='mt-8 text-2xl font-title'>
                         Digite seu e-mail para{'\n'}
                         iniciar o processo
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
                    <TouchableOpacity onPress={handleEmailCheck} activeOpacity={0.7} className='rounded py-3 justify-center items-center bg-black flex-row space-x-3'>
                         <Text className='text-white text-base font-title'>Avançar</Text>
                    </TouchableOpacity>
               </View>
          </View>
     );
};