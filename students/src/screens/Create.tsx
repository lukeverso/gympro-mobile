import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { MaskedTextInput } from 'react-native-mask-text';
import { useRoute } from '@react-navigation/native';
import { api } from '../lib/api';

interface CreateProps {
     email: string;
};

export function Create() {
     const { goBack, navigate } = useNavigation();

     const route = useRoute();
     const { email } = route.params as CreateProps;

     const [success, setSuccess] = useState(false);
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [name, setName] = useState('');
     const [surname, setSurname] = useState('');
     const [password, setPassword] = useState('');
     const [repeatPassword, setRepeatPassword] = useState('');
     const [telephone, setTelephone] = useState('');
     const [birthdate, setBirthdate] = useState('');
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
                    setError(false);
                    setErrorMessage('');

                    const request = await api.get(`https://viacep.com.br/ws/${code}/json`);

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

     async function handleUserCreation() {
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

          if (password === '') {
               setError(true);
               setErrorMessage('Insira sua senha.');
               return;
          };

          if (repeatPassword === '') {
               setError(true);
               setErrorMessage('Repita a senha.');
               return;
          };

          if (password !== repeatPassword) {
               setError(true);
               setErrorMessage('As senhas diferem.');
               return;
          };

          if (telephone === '') {
               setError(true);
               setErrorMessage('Insira seu telefone.');
               return;
          };

          if (birthdate === '') {
               setError(true);
               setErrorMessage('Insira a data de nascimento.');
               return;
          };

          if (code === '') {
               setError(true);
               setErrorMessage('Insira seu cep.');
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
               const data = {
                    name,
                    surname,
                    email,
                    password,
                    telephone,
                    birthdate,
                    code,
                    street,
                    number,
                    complement,
                    district,
                    city,
                    state
               };

               const request = await api.post('/api/post/students', data);

               if (request.data.status === 'success') {
                    setSuccess(true);
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

     const [seePassword, setSeePassword] = useState(false);
     const [seePasswordRepeat, setSeePasswordRepeat] = useState(false);

     return (
          <>
               {
                    success &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='check' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Conta criada com sucesso!{'\n'}
                                   Realize o login para acessar{'\n'}
                                   o aplicativo.
                              </Text>
                              <TouchableOpacity onPress={() => navigate('login')} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Okay
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               <KeyboardAvoidingView className={error ? 'flex-1 w-full px-8 pb-32 items-center bg-white' : 'flex-1 w-full px-8 pb-16 items-center bg-white'} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView showsVerticalScrollIndicator={false} className='mt-20 mb-10 w-full flex-1'>
                         <TouchableOpacity onPress={() => navigate('checkEmail')}>
                              <Ionicons name='ios-chevron-back' size={24} color='black' />
                         </TouchableOpacity>
                         <Text className='mt-8 text-2xl font-title'>
                              Preencha seus dados abaixo
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
                         <Text className='mt-8 font-title px-3'>
                              E-mail
                         </Text>
                         <TextInput
                              autoCapitalize='none'
                              keyboardType='email-address'
                              placeholder='E-mail'
                              className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                              value={email}
                              editable={false}
                         />
                         <Text className='mt-8 font-title px-3'>
                              Senha
                         </Text>
                         <View className='flex-row items-center space-x-4'>
                              <TextInput
                                   secureTextEntry={!seePassword ? true : false}
                                   autoCapitalize='none'
                                   keyboardType='default'
                                   placeholder='Senha'
                                   className='flex-1 mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                   onChangeText={setPassword}
                                   value={password}
                              />
                              <TouchableOpacity onPress={() => setSeePassword(!seePassword)} className='mt-2'>
                                   {
                                        !seePassword ?
                                             <Feather name='eye' size={20} color='black' /> :
                                             <Feather name='eye-off' size={20} color='black' />
                                   }
                              </TouchableOpacity>
                         </View>
                         <Text className='mt-8 font-title px-3'>
                              Repita a senha
                         </Text>
                         <View className='flex-row items-center space-x-4'>
                              <TextInput
                                   secureTextEntry={!seePasswordRepeat ? true : false}
                                   autoCapitalize='none'
                                   keyboardType='default'
                                   placeholder='Repita a senha'
                                   className='flex-1 mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                   onChangeText={setRepeatPassword}
                                   value={repeatPassword}
                              />
                              <TouchableOpacity onPress={() => setSeePasswordRepeat(!seePasswordRepeat)} className='mt-2'>
                                   {
                                        !seePasswordRepeat ?
                                             <Feather name='eye' size={20} color='black' /> :
                                             <Feather name='eye-off' size={20} color='black' />
                                   }
                              </TouchableOpacity>
                         </View>
                         <View className='flex-row mt-2 space-x-6'>
                              <View className='flex-1'>
                                   <Text className='mt-8 font-title px-3'>
                                        Telefone
                                   </Text>
                                   <MaskedTextInput
                                        mask='(99) 99999-9999'
                                        keyboardType='number-pad'
                                        placeholder='Telefone'
                                        autoCapitalize='none'
                                        className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                        onChangeText={setTelephone}
                                        value={telephone}
                                   />
                              </View>
                              <View className='flex-1'>
                                   <Text className='mt-8 font-title px-3'>
                                        Nascimento
                                   </Text>
                                   <MaskedTextInput
                                        mask='99/99/9999'
                                        keyboardType='number-pad'
                                        placeholder='Nascimento'
                                        className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                        onChangeText={setBirthdate}
                                        value={birthdate}
                                   />
                              </View>
                         </View>
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
                         <Text className='mt-8 font-title px-3'>
                              Bairro
                         </Text>
                         <TextInput
                              autoCapitalize='none'
                              keyboardType='default'
                              placeholder='Bairro'
                              className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                              onChangeText={setDistrict}
                              value={district}
                         />
                         <View className='flex-row mt-2 space-x-3'>
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
                         <TouchableOpacity onPress={handleUserCreation} activeOpacity={0.7} className='rounded py-3 justify-center items-center bg-black flex-row space-x-3'>
                              <Text className='text-white text-base font-title'>Criar conta</Text>
                         </TouchableOpacity>
                    </View>
               </KeyboardAvoidingView>
          </>
     );
};