import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

export function Login() {
     return (
          <View className='flex-1 bg-white'>
               <View className='mt-20 px-8'>
                    <Ionicons name="ios-chevron-back" size={24} color="black" />
                    <Text className='mt-8 text-2xl font-bold'>
                         Bem-vindo!{'\n'}
                         Digite seu e-mail e senha{'\n'}
                         para acessar o aplicativo
                    </Text>
                    <TextInput placeholder='Seu e-mail' className='mt-8 border-b-[1px] py-2' />
                    <TextInput placeholder='Seu senha' className='mt-8 border-b-[1px] py-2' />
                    <TouchableOpacity className='mt-8 flex-row items-center'>
                         <Text className='mr-3 text-base'>
                              Não possui conta? Clique aqui
                         </Text>
                         <Ionicons name="ios-chevron-forward" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className='mt-8 flex-row items-center'>
                         <Text className='mr-3 text-base'>
                              Esqueceu sua senha? Clique aqui
                         </Text>
                         <Ionicons name="ios-chevron-forward" size={24} color="black" />
                    </TouchableOpacity>
               </View>
               <TouchableOpacity activeOpacity={0.8} className='w-10 h-10 items-center justify-center bg-black rounded-full absolute bottom-10 right-10'>
                    <AntDesign name='arrowright' size={24} color='white' />
               </TouchableOpacity>
          </View>
     );
};