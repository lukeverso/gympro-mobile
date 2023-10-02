import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, ActivityIndicator } from 'react-native';

export function Login() {
     const { goBack, navigate } = useNavigation();
     const { login } = useContext(AuthContext);

     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');
     const [seePassword, setSeePassword] = useState(false);
     const [loading, setLoading] = useState<boolean>(false);

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     async function handleLogin() {
          setLoading(true);

          setError(false);
          setErrorMessage('');

          if (email === '') {
               setLoading(false);

               setError(true);
               setErrorMessage('Insira seu e-mail.');

               setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
               }, 3000);

               return;
          };

          if (password === '') {
               setLoading(false);

               setError(true);
               setErrorMessage('Insira sua senha.');

               setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
               }, 3000);

               return;
          };

          try {
               await login({ email, password });

               setLoading(false);

               navigate('home');
          } catch (error) {
               setLoading(false);

               setError(true);
               setErrorMessage('Confira os dados inseridos.');

               setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
               }, 3000);
          };
     };

     return (
          <KeyboardAvoidingView className={error ? 'flex-1 w-full px-8 pb-44 items-center bg-white' : 'flex-1 w-full px-8 pb-16 items-center bg-white'} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
               <ScrollView showsVerticalScrollIndicator={false} className='mt-20 mb-10 w-full flex-1'>
                    <TouchableOpacity onPress={() => goBack()} activeOpacity={0.7}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-2xl font-title'>
                         Bem-vindo, aluno!{'\n'}
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
                    <TouchableOpacity
                         onPress={() => navigate('checkEmail')}
                         activeOpacity={0.7}
                         className='mt-8 rounded py-3 justify-center items-center flex-row space-x-2'
                    >
                         <Text className='text-base font-text mb-1'>
                              Não possui conta? Clique aqui
                         </Text>
                         <AntDesign name='arrowright' size={24} color='black' />
                    </TouchableOpacity>
               </ScrollView>
               <View className='absolute bottom-8 w-full space-y-5'>
                    {
                         error &&
                         <View className='flex-row justify-center items-center space-x-3 py-3 px-4 bg-red-400 rounded'>
                              <AntDesign name='warning' size={24} color='white' />
                              <Text className='font-text text-white text-base'>
                                   {errorMessage}
                              </Text>
                         </View>
                    }
                    <TouchableOpacity onPress={handleLogin} activeOpacity={0.7} className='mt-8 rounded py-3 justify-center items-center bg-black flex-row'>
                         {
                              loading ?
                                   <ActivityIndicator size='small' color='#FFFFFF' /> :
                                   <Text className='font-text text-base text-white'>
                                        Entrar
                                   </Text>
                         }
                    </TouchableOpacity>
               </View>
          </KeyboardAvoidingView>
     );
};