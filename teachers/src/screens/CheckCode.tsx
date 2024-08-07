import { api } from '../lib/api';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface CheckCodeProps {
     email: string;
};

export function CheckCode() {
     const route = useRoute();

     const { email } = route.params as CheckCodeProps;
     const { goBack, navigate } = useNavigation();

     const [code, setCode] = useState('');
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     async function handleCodeCheck() {
          setError(false);
          setErrorMessage('');

          if (email === '') {
               setError(true);
               setErrorMessage('Insira um e-mail válido.');
               return;
          };

          try {
               const request = await api.post('/api/post/verify-code', { email, code });

               if (request.data.status === 'success') {
                    navigate('create', { email });
               } else {
                    setError(true);
                    setErrorMessage('Código incorreto.');
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
                    <TouchableOpacity onPress={() => goBack()}>
                         <Ionicons name='chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-2xl font-title'>
                         Digite o código{'\n'}
                         enviado para o e-mail{'\n'}
                         {email}
                    </Text>
                    <Text className='mt-8 font-title px-3'>
                         Código de verificação
                    </Text>
                    <TextInput
                         autoCapitalize='none'
                         keyboardType='number-pad'
                         maxLength={6}
                         placeholder='Código de verificação'
                         className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                         onChangeText={setCode}
                         value={code}
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
                    <TouchableOpacity
                         disabled={code.length !== 6}
                         activeOpacity={0.7}
                         onPress={handleCodeCheck}
                         className={`rounded py-3 justify-center items-center ${code.length !== 6 ? 'bg-gray-500' : 'bg-black'} flex-row space-x-3`}
                    >
                         <Text className='text-white text-base font-title'>Conferir código</Text>
                    </TouchableOpacity>
               </View>
          </View>
     );
};