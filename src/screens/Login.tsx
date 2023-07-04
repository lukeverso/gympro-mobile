import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function Login() {
     const { goBack, navigate } = useNavigation();

     function handleLogin() {
          console.log('Clicou.');
     };

     return (
          <View className='flex-1 bg-white'>
               <View className='mt-20 px-8'>
                    <TouchableOpacity onPress={() => goBack()}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-2xl font-title'>
                         Bem-vindo!{'\n'}
                         Digite seu e-mail e senha{'\n'}
                         para acessar o aplicativo
                    </Text>
                    <TextInput
                         autoFocus
                         autoCapitalize='none'
                         keyboardType='email-address'
                         placeholder='Seu e-mail'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                    />
                    <TextInput
                         secureTextEntry
                         autoCapitalize='none'
                         placeholder='Seu senha'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                    />
                    <TouchableOpacity onPress={() => navigate('create')} className='mt-8 flex-row items-center'>
                         <Text className='mr-3 text-base font-text'>
                              Não possui conta? Clique aqui
                         </Text>
                         <Ionicons name='ios-chevron-forward' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity className='mt-8 flex-row items-center'>
                         <Text className='mr-3 text-base font-text'>
                              Esqueceu sua senha? Clique aqui
                         </Text>
                         <Ionicons name='ios-chevron-forward' size={24} color='black' />
                    </TouchableOpacity>
               </View>
               <TouchableOpacity onPress={handleLogin} activeOpacity={0.8} className='px-3 py-3 items-center justify-center bg-black rounded-full absolute bottom-10 right-10'>
                    <AntDesign name='arrowright' size={24} color='white' />
               </TouchableOpacity>
          </View>
     );
};