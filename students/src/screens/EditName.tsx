import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { api } from '../lib/api';

export function EditName() {
     const { goBack, navigate } = useNavigation();

     const [success, setSuccess] = useState(false);
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [name, setName] = useState('');
     const [surname, setSurname] = useState('');

     const { user } = useContext(AuthContext);

     async function getName() {
          setError(false);
          setErrorMessage('');

          try {
               const request = await api.get(`/api/get/students/${user?.id}/name`);

               setName(request.data.student.name.split(' ')[0]);
               setSurname(request.data.student.name.split(' ')[1]);
          } catch (error) {
               console.log(error);

               setError(true);
               setErrorMessage('Ocorreu um erro...');
          };
     };

     useEffect(() => {
          getName();
     }, []);

     async function handleNameEditing() {
          setError(false);
          setErrorMessage('');

          if (name === '') {
               setError(true);
               setErrorMessage('Insira seu nome.');
               return;
          };

          if (surname === '') {
               setError(true);
               setErrorMessage('Insira seu sobrenome.');
               return;
          };

          try {
               const request = await api.patch(`/api/put/students/${user?.id}/name`, { name, surname });

               if (request.data.status === 'success') {
                    setSuccess(true);
               } else {
                    setError(true);
                    setErrorMessage(request.data.message);
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
                                   O nome foi editado com sucesso.
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
                              Edite seu nome
                         </Text>
                         <View className='flex-row space-x-6'>
                              <View className='flex-1'>
                                   <Text className='mt-8 font-title px-3'>
                                        Nome
                                   </Text>
                                   <TextInput
                                        keyboardType='default'
                                        placeholder='Nome'
                                        className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                        onChangeText={setName}
                                        value={name}
                                   />
                              </View>
                              <View className='flex-1'>
                                   <Text className='mt-8 font-title px-3'>
                                        Sobrenome
                                   </Text>
                                   <TextInput
                                        keyboardType='default'
                                        placeholder='Sobrenome'
                                        className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                        onChangeText={setSurname}
                                        value={surname}
                                   />
                              </View>
                         </View>
                    </View>
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
                         <TouchableOpacity onPress={handleNameEditing} activeOpacity={0.7} className='rounded py-3 justify-center items-center bg-black flex-row space-x-3'>
                              <Text className='text-white text-base font-title'>Atualizar</Text>
                         </TouchableOpacity>
                    </View>
               </View>
          </>
     );
};