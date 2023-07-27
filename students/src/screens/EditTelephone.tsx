import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { api } from '../lib/api';
import { MaskedTextInput } from 'react-native-mask-text';

export function EditTelephone() {
     const { goBack, navigate } = useNavigation();

     const [success, setSuccess] = useState(false);
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [telephone, setTelephone] = useState('');

     const { user } = useContext(AuthContext);

     async function getTelephone() {
          setError(false);
          setErrorMessage('');

          try {
               const request = await api.get(`/students/${user?.id}/telephone`);

               setTelephone(request.data.student.telephone);
          } catch (error) {
               console.log(error);

               setError(true);
               setErrorMessage('Ocorreu um erro...');
          };
     };

     useEffect(() => {
          getTelephone();
     }, []);

     async function handleTelephoneEditing() {
          setError(false);
          setErrorMessage('');

          if (telephone === '') {
               setError(true);
               setErrorMessage('Insira seu e-mail.');
               return;
          };

          try {
               const request = await api.patch(`/students/${user?.id}/telephone`, { telephone });

               if (request.data.status === 'success') {
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
                                   O telefone foi editado com sucesso.
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
                              Edite seu telefone
                         </Text>
                         <Text className='mt-8 font-title px-3'>
                              Telefone
                         </Text>
                         <MaskedTextInput
                              autoFocus
                              mask='(99) 99999-9999'
                              autoCapitalize='none'
                              keyboardType='number-pad'
                              placeholder='Telefone'
                              className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                              onChangeText={setTelephone}
                              value={telephone}
                         />
                    </View>
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
                         <TouchableOpacity onPress={handleTelephoneEditing} activeOpacity={0.7} className='rounded py-3 justify-center items-center bg-black flex-row space-x-3'>
                              <Text className='text-white text-base font-title'>Atualizar</Text>
                         </TouchableOpacity>
                    </View>
               </View>
          </>
     );
};