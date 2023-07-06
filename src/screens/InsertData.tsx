import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { MaskedTextInput } from 'react-native-mask-text';
import { api } from '../lib/api';

interface InsertDataProps {
     email: string;
     status: string;

     name: string;
     username: string;
     password: string;
     passwordRepeat: string;
     birthdate: number;
     telephone: number;
     street: string;
     number: number;
     complement: string;
     city: string;
     state: string;
     country: string;
};

export function InsertData() {
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [name, setName] = useState('');
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [passwordRepeat, setPasswordRepeat] = useState('');
     const [birthdate, setBirthdate] = useState('');
     const [telephone, setTelephone] = useState('');
     const [street, setStreet] = useState('');
     const [number, setNumber] = useState('');
     const [complement, setComplement] = useState('');
     const [city, setCity] = useState('');
     const [state, setState] = useState('');
     const [country, setCountry] = useState('');

     const { goBack, navigate } = useNavigation();

     const route = useRoute();

     const { email, status } = route.params as InsertDataProps;

     async function handleDataInsertion() {
          setError(false);
          setErrorMessage('');

          if (!name || name === '') {
               setError(true);
               setErrorMessage('Insira seu nome.');
               return;
          };

          if (!username || username === '') {
               setError(true);
               setErrorMessage('Insira seu nome de usuário.');
               return;
          };

          if (!password || password === '') {
               setError(true);
               setErrorMessage('Insira sua senha.');
               return;
          };

          if (!passwordRepeat || passwordRepeat === '') {
               setError(true);
               setErrorMessage('Insira sua senha novamente.');
               return;
          };

          if (password !== passwordRepeat) {
               setError(true);
               setErrorMessage('As senhas diferem.');
               return;
          };

          if (!birthdate || birthdate === '') {
               setError(true);
               setErrorMessage('Insira a data de nascimento.');
               return;
          };

          if (!telephone || telephone === '') {
               setError(true);
               setErrorMessage('Insira o telefone.');
               return;
          };

          if (!street || street === '') {
               setError(true);
               setErrorMessage('Insira o endereço.');
               return;
          };

          if (!number || number === '') {
               setError(true);
               setErrorMessage('Insira o número.');
               return;
          };

          if (!city || city === '') {
               setError(true);
               setErrorMessage('Insira a cidade.');
               return;
          };

          if (!state || state === '') {
               setError(true);
               setErrorMessage('Insira o estado.');
               return;
          };

          if (!country || country === '') {
               setError(true);
               setErrorMessage('Insira o país.');
               return;
          };

          const body = {
               name,
               username,
               password,
               passwordRepeat,
               birthdate,
               telephone,
               street,
               number,
               complement,
               city,
               state,
               country
          };

          try {
               const response = await api.post(`/${status}`, body);
               
               console.log(response.data);
          } catch (error: any) {
               console.log(error);
               if (error.response && error.response.data && error.response.data.status === 'error.') {
                    setError(true);
                    setErrorMessage(error.response.data.message);
               } else {
                    setError(true);
                    setErrorMessage('Erro na requisição.');
               }
          };
     };

     return (
          <View className='flex-1 bg-white'>
               <ScrollView className='mt-20 px-8'>
                    <TouchableOpacity onPress={() => goBack()}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-2xl font-title'>
                         Preencha seus dados abaixo
                    </Text>
                    <TextInput
                         keyboardType='email-address'
                         placeholder='E-mail'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                         value={email}
                         editable={false}
                    />
                    <TextInput
                         keyboardType='default'
                         placeholder='Nome completo'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                         value={name}
                         onChangeText={setName}
                    />
                    <TextInput
                         keyboardType='default'
                         placeholder='Nome de usuário'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                         value={username}
                         onChangeText={setUsername}
                    />
                    <TextInput
                         secureTextEntry
                         autoCapitalize='none'
                         placeholder='Senha'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                         value={password}
                         onChangeText={setPassword}
                    />
                    <TextInput
                         secureTextEntry
                         autoCapitalize='none'
                         placeholder='Repita a senha'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                         value={passwordRepeat}
                         onChangeText={setPasswordRepeat}
                    />
                    <MaskedTextInput
                         mask='99/99/9999'
                         keyboardType='number-pad'
                         placeholder='Data de nascimento'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                         value={birthdate}
                         onChangeText={setBirthdate}
                    />
                    <MaskedTextInput
                         mask='(99) 99999-9999'
                         keyboardType='number-pad'
                         placeholder='Telefone'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                         value={telephone}
                         onChangeText={setTelephone}
                    />
                    <TextInput
                         placeholder='Endereço'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                         value={street}
                         onChangeText={setStreet}
                    />
                    <View className='flex-row justify-between mt-8'>
                         <TextInput
                              keyboardType='number-pad'
                              placeholder='Número'
                              className='border-b-[1px] py-2 text-base font-text mr-10'
                              value={number}
                              onChangeText={setNumber}
                         />
                         <TextInput
                              placeholder='Complemento (opcional)'
                              className='border-b-[1px] py-2 text-base font-text flex-1'
                              value={complement}
                              onChangeText={setComplement}
                         />
                    </View>
                    <View className='flex-row justify-between mt-8'>
                         <TextInput
                              placeholder='Cidade'
                              className='border-b-[1px] py-2 text-base font-text mr-10 flex-1'
                              value={city}
                              onChangeText={setCity}
                         />
                         <TextInput
                              autoCapitalize='characters'
                              maxLength={2}
                              placeholder='Estado'
                              className='border-b-[1px] py-2 text-base font-text mr-10 w-20'
                              value={state}
                              onChangeText={setState}
                         />
                         <TextInput
                              placeholder='País'
                              className='border-b-[1px] py-2 text-base font-text flex-1'
                              value={country}
                              onChangeText={setCountry}
                         />
                    </View>
                    <View className={error ? 'mt-8 flex-row justify-between mb-20' : 'mt-8 flex-row justify-end mb-20'}>
                         {
                              error &&
                              <View className='flex-row items-center py-3 px-5 bg-red-400 rounded-full'>
                                   <AntDesign name='warning' size={24} color='white' />
                                   <Text className='text-white text-base ml-3'>
                                        {errorMessage}
                                   </Text>
                              </View>
                         }
                         <TouchableOpacity activeOpacity={0.8} onPress={handleDataInsertion} className='px-3 py-3 items-center justify-center bg-black rounded-full'>
                              <AntDesign name='arrowright' size={24} color='white' />
                         </TouchableOpacity>
                    </View>
               </ScrollView>
          </View>
     );
};