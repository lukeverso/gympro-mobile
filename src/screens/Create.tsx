import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { MaskedTextInput } from 'react-native-mask-text';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import { api } from '../lib/api';

interface CreateProps {
     email: string;
};

export function Create() {
     const { goBack, navigate } = useNavigation();

     const route = useRoute();

     const { email } = route.params as CreateProps;

     const [name, setName] = useState('');
     const [surname, setSurname] = useState('');
     const [password, setPassword] = useState('');
     const [repeatPassword, setRepeatPassword] = useState('');
     const [telephone, setTelephone] = useState('');
     const [birthdate, setBirthdate] = useState('');
     const [street, setStreet] = useState('');
     const [number, setNumber] = useState('');
     const [complement, setComplement] = useState('');
     const [city, setCity] = useState('');
     const [state, setState] = useState('');
     const [country, setCountry] = useState('');
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     async function handleUserCreation() {
          setError(false);

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

          if (country === '') {
               setError(true);
               setErrorMessage('Insira seu país.');
               return;
          };

          const data = {
               name,
               surname,
               password,
               telephone,
               birthdate,
               street,
               number,
               complement,
               city,
               state,
               country,
               email
          };

          console.log(data);

          const request = await api.post('/students', data);

          console.log(request.data);
     };

     return (
          <>
               <View className='flex-1 w-full h-full bg-gray-200/80 justify-center items-center absolute z-10'>
                    <View className='bg-white justify-center items-center w-[80%] space-y-5 pt-5'>
                         <Feather name='check' size={24} color='black' />
                         <Text className='font-title text-base text-center'>
                              Conta criada com sucesso!{'\n'}
                              Realize o login para acessar{'\n'}
                              o aplicativo.
                         </Text>
                         <TouchableOpacity activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                              <Text className='text-black font-text text-base'>
                                   Okay
                              </Text>
                         </TouchableOpacity>
                    </View>
               </View>
               <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex-1 bg-white pb-10'>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                         <ScrollView>
                              <View className='mt-20 mb-10 px-8'>
                                   <TouchableOpacity onPress={() => goBack()}>
                                        <Ionicons name='ios-chevron-back' size={24} color='black' />
                                   </TouchableOpacity>
                                   <Text className='mt-8 text-2xl font-title'>
                                        Preencha seus dados abaixo
                                   </Text>
                                   <View className='flex-row'>
                                        <View className='flex-1 mr-3'>
                                             <Text className='mt-8 font-title px-3'>
                                                  Nome
                                             </Text>
                                             <TextInput
                                                  autoFocus
                                                  keyboardType='default'
                                                  placeholder='Nome'
                                                  className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onChangeText={setName}
                                             />
                                        </View>
                                        <View className='flex-1 ml-3'>
                                             <Text className='mt-8 font-title px-3'>
                                                  Sobrenome
                                             </Text>
                                             <TextInput
                                                  keyboardType='default'
                                                  placeholder='Sobrenome'
                                                  className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onChangeText={setSurname}
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
                                   <View className='flex-row mt-2'>
                                        <View className='flex-1 mr-3'>
                                             <Text className='mt-8 font-title px-3'>
                                                  Senha
                                             </Text>
                                             <TextInput
                                                  secureTextEntry
                                                  autoCapitalize='none'
                                                  keyboardType='default'
                                                  placeholder='Senha'
                                                  className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onChangeText={setPassword}
                                             />
                                        </View>
                                        <View className='flex-1 ml-3'>
                                             <Text className='mt-8 font-title px-3'>
                                                  Repita a senha
                                             </Text>
                                             <TextInput
                                                  secureTextEntry
                                                  autoCapitalize='none'
                                                  keyboardType='default'
                                                  placeholder='Repita a senha'
                                                  className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onChangeText={setRepeatPassword}
                                             />
                                        </View>
                                   </View>
                                   <View className='flex-row mt-2'>
                                        <View className='flex-1 mr-3'>
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
                                             />
                                        </View>
                                        <View className='flex-1 ml-3'>
                                             <Text className='mt-8 font-title px-3'>
                                                  Nascimento
                                             </Text>
                                             <MaskedTextInput
                                                  mask='99/99/9999'
                                                  keyboardType='number-pad'
                                                  placeholder='Nascimento'
                                                  className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onChangeText={setBirthdate}
                                             />
                                        </View>
                                   </View>
                                   <Text className='mt-8 font-title px-3'>
                                        Endereço
                                   </Text>
                                   <TextInput
                                        autoCapitalize='none'
                                        keyboardType='default'
                                        placeholder='Endereço'
                                        className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                        onChangeText={setStreet}
                                   />
                                   <View className='flex-row mt-2'>
                                        <View className='flex-1 mr-3'>
                                             <Text className='mt-8 font-title px-3'>
                                                  Número
                                             </Text>
                                             <TextInput
                                                  keyboardType='number-pad'
                                                  placeholder='Número'
                                                  autoCapitalize='none'
                                                  className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onChangeText={setNumber}
                                             />
                                        </View>
                                        <View className='flex-1 ml-3'>
                                             <Text className='mt-8 font-title px-3'>
                                                  Complemento
                                             </Text>
                                             <TextInput
                                                  keyboardType='default'
                                                  placeholder='Complemento'
                                                  className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onChangeText={setComplement}
                                             />
                                        </View>
                                   </View>
                                   <View className='flex-row mt-2'>
                                        <View className='flex-1 mr-3'>
                                             <Text className='mt-8 font-title px-3'>
                                                  Cidade
                                             </Text>
                                             <TextInput
                                                  keyboardType='default'
                                                  placeholder='Cidade'
                                                  className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onChangeText={setCity}
                                             />
                                        </View>
                                        <View className='flex-1 mr-3 ml-3'>
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
                                             />
                                        </View>
                                        <View className='flex-1 ml-3'>
                                             <Text className='mt-8 font-title px-3'>
                                                  País
                                             </Text>
                                             <TextInput
                                                  keyboardType='default'
                                                  placeholder='País'
                                                  className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onChangeText={setCountry}
                                             />
                                        </View>
                                   </View>
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
                                        <TouchableOpacity onPress={handleUserCreation} activeOpacity={0.7} className='px-3 py-3 items-center justify-center bg-black rounded-full'>
                                             <AntDesign name='arrowright' size={24} color='white' />
                                        </TouchableOpacity>
                                   </View>
                              </View>
                         </ScrollView>
                    </TouchableWithoutFeedback>
                    <StatusBar style='dark' backgroundColor='#FFFFFF' />
               </KeyboardAvoidingView>
          </>
     );
};