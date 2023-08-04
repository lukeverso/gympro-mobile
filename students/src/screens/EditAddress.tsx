import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { api } from '../lib/api';
import { MaskedTextInput } from 'react-native-mask-text';

export function EditAddress() {
     const { goBack, navigate } = useNavigation();

     const [success, setSuccess] = useState(false);
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [code, setCode] = useState('');
     const [street, setStreet] = useState('');
     const [number, setNumber] = useState('');
     const [complement, setComplement] = useState('');
     const [city, setCity] = useState('');
     const [state, setState] = useState('');
     const [district, setDistrict] = useState('');

     async function fetchData() {
          setError(false);
          setErrorMessage('');

          if (code.length === 9) {
               try {
                    const request = await api.get('https://viacep.com.br/ws/' + code + '/json');

                    if (request.data.erro === true) {
                         setError(true);
                         setErrorMessage('CEP inválido.');

                         setStreet('');
                         setDistrict('');
                         setCity('');
                         setState('');

                         return;
                    };

                    setStreet(request.data.logradouro);
                    setDistrict(request.data.bairro);
                    setCity(request.data.localidade);
                    setState(request.data.uf);
               } catch (error) {
                    console.log(error);

                    setError(true);
                    setErrorMessage('Ocorreu um erro...');
               };
          };
     };

     useEffect(() => {
          fetchData();
     }, [code]);

     const { user } = useContext(AuthContext);

     async function getAddress() {
          setError(false);
          setErrorMessage('');

          try {
               const request = await api.get(`/students/${user?.id}/address`);

               setCode(request.data.student.code);
               setNumber(request.data.student.number);
               setComplement(request.data.student.complement);
          } catch (error) {
               console.log(error);

               setError(true);
               setErrorMessage('Ocorreu um erro...');
          };
     };

     useEffect(() => {
          getAddress();
     }, []);

     async function handleAddressEditing() {
          setError(false);
          setErrorMessage('');

          if (code === '') {
               setError(true);
               setErrorMessage('Insira seu CEP.');
               return;
          };

          if (street === '') {
               setError(true);
               setErrorMessage('Insira seu endereço.');
               return;
          };

          if (number === '') {
               setError(true);
               setErrorMessage('Insira seu número.');
               return;
          };

          if (district === '') {
               setError(true);
               setErrorMessage('Insira seu país.');
               return;
          };

          if (city === '') {
               setError(true);
               setErrorMessage('Insira sua cidade.');
               return;
          };

          if (state === '') {
               setError(true);
               setErrorMessage('Insira seu estado.');
               return;
          };

          try {
               const address = {
                    code,
                    street,
                    number,
                    district,
                    city,
                    state
               };

               const request = await api.patch(`/students/${user?.id}/address`, { address });

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
                                   O endereço foi editado com sucesso.{'\n'}
                              </Text>
                              <TouchableOpacity onPress={() => navigate('edit')} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Okay
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               <KeyboardAvoidingView className={error ? 'flex-1 w-full px-8 pb-28 items-center bg-white' : 'flex-1 w-full px-8 pb-16 items-center bg-white'} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView showsVerticalScrollIndicator={false} className='mt-20 mb-10 w-full flex-1'>
                         <TouchableOpacity onPress={goBack}>
                              <Ionicons name='ios-chevron-back' size={24} color='black' />
                         </TouchableOpacity>
                         <Text className='mt-8 text-2xl font-title'>
                              Edite seu endereço
                         </Text>
                         <Text className='mt-8 font-title px-3'>
                              CEP
                         </Text>
                         <MaskedTextInput
                              mask='99999-999'
                              autoCapitalize='none'
                              keyboardType='number-pad'
                              placeholder='CEP'
                              className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                              onChangeText={setCode}
                              value={code}
                         />
                         <Text className='mt-8 font-title px-3'>
                              Endereço
                         </Text>
                         <TextInput
                              autoCapitalize='none'
                              keyboardType='default'
                              placeholder='Endereço'
                              className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                              onChangeText={setStreet}
                              value={street}
                         />
                         <View className='flex-row mt-2 space-x-6'>
                              <View className='flex-1'>
                                   <Text className='mt-8 font-title px-3'>
                                        Número
                                   </Text>
                                   <TextInput
                                        keyboardType='number-pad'
                                        placeholder='Número'
                                        autoCapitalize='none'
                                        className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                        onChangeText={setNumber}
                                        value={number}
                                   />
                              </View>
                              <View className='flex-1'>
                                   <Text className='mt-8 font-title px-3'>
                                        Complemento
                                   </Text>
                                   <TextInput
                                        keyboardType='default'
                                        placeholder='Complemento'
                                        className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                        onChangeText={setComplement}
                                        value={complement}
                                   />
                              </View>
                         </View>
                         <View className='flex-row mt-2 space-x-3'>
                              <View className='flex-1'>
                                   <Text className='mt-8 font-title px-3'>
                                        Bairro
                                   </Text>
                                   <TextInput
                                        keyboardType='default'
                                        placeholder='Bairro'
                                        className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                        onChangeText={setDistrict}
                                        value={district}
                                   />
                              </View>
                              <View className='flex-1'>
                                   <Text className='mt-8 font-title px-3'>
                                        Cidade
                                   </Text>
                                   <TextInput
                                        keyboardType='default'
                                        placeholder='Cidade'
                                        className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                        onChangeText={setCity}
                                        value={city}
                                   />
                              </View>
                              <View className='flex-1'>
                                   <Text className='mt-8 font-title px-3'>
                                        Estado
                                   </Text>
                                   <TextInput
                                        autoCapitalize='characters'
                                        maxLength={2}
                                        keyboardType='default'
                                        placeholder='Estado'
                                        className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                        onChangeText={setState}
                                        value={state}
                                   />
                              </View>
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
                         <TouchableOpacity onPress={handleAddressEditing} activeOpacity={0.7} className='rounded py-3 justify-center items-center bg-black flex-row space-x-3'>
                              <Text className='text-white text-base font-title'>Atualizar</Text>
                         </TouchableOpacity>
                    </View>
               </KeyboardAvoidingView>
          </>
     );
};