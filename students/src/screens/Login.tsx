import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/auth';

export function Login() {
     const { goBack, navigate } = useNavigation();

     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [seePassword, setSeePassword] = useState(false);

     const { login } = useContext(AuthContext);

     async function handleLogin() {
          setError(false);
          setErrorMessage('');

          if (email === '') {
               setError(true);
               setErrorMessage('Insira seu e-mail.');
               return;
          };

          if (password === '') {
               setError(true);
               setErrorMessage('Insira sua senha.');
               return;
          };

          await login({ email, password });
     
          navigate('home');
     };

     return (
          <KeyboardAvoidingView className={error ? 'flex-1 w-full px-8 pb-44 items-center bg-white' : 'flex-1 w-full px-8 pb-16 items-center bg-white'} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
               <ScrollView showsVerticalScrollIndicator={false} className='mt-20 mb-10 w-full flex-1'>
                    <TouchableOpacity onPress={() => goBack()} activeOpacity={0.7}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-2xl font-title'>
                         Bem-vindo!{'\n'}
                         Digite seu e-mail e senha{'\n'}
                         para acessar o aplicativo
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
                    <Text className='mt-3 font-title px-3'>
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
                    <TouchableOpacity onPress={handleLogin} activeOpacity={0.7} className='rounded py-3 justify-center items-center bg-black flex-row space-x-3'>
                         <Text className='text-white text-base font-title'>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('checkEmail')} className='mt-8 flex-row items-center justify-center space-x-1'>
                         <Text className='text-base font-text mb-1'>
                              Não possui conta? Clique aqui
                         </Text>
                         <AntDesign name='arrowright' size={24} color='black' />
                    </TouchableOpacity>
               </View>
          </KeyboardAvoidingView>
     );
};