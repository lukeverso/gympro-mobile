import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/auth';

export function Login() {
     const { goBack, navigate } = useNavigation();

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [seePassword, setSeePassword] = useState(false);

     const { login } = useContext(AuthContext);

     async function handleLogin() {
          await login({ email, password });

          navigate('home');
     };

     return (
          <View className='flex-1 bg-white'>
               <View className='mt-20 px-8'>
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
                         autoFocus
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
                    <TouchableOpacity onPress={() => navigate('checkEmail')} className='mt-8 flex-row items-center'>
                         <Text className='mr-3 text-base font-text mb-1'>
                              Não possui conta? Clique aqui
                         </Text>
                         <Ionicons name='ios-chevron-forward' size={24} color='black' />
                    </TouchableOpacity>
                    <View className='mt-8 flex-row justify-end'>
                         <TouchableOpacity onPress={handleLogin} activeOpacity={0.7} className='px-3 py-3 items-center justify-center bg-black rounded-full'>
                              <AntDesign name='arrowright' size={24} color='white' />
                         </TouchableOpacity>
                    </View>
               </View>
          </View>
     );
};