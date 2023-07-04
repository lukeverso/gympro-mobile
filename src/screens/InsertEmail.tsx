import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export function InsertEmail() {
     const [email, setEmail] = useState('');
     const [error, setError] = useState(false);

     const { goBack, navigate } = useNavigation();

     function handleEmailInsertion() {
          navigate('insertData', {
               email: email
          })
     };

     return (
          <View className='flex-1 bg-white'>
               <View className='mt-20 px-8'>
                    <TouchableOpacity onPress={() => goBack()}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-2xl font-title'>
                         Digite seu e-mail para{'\n'}
                         iniciar o processo
                    </Text>
                    <TextInput
                         autoFocus
                         autoCapitalize='none'
                         keyboardType='email-address'
                         placeholder='Seu e-mail'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                         onChangeText={setEmail}
                    />
               </View>
               {
                    error &&
                    <View className='flex-row items-center absolute bottom-10 left-10 py-3 px-5 bg-red-400 rounded-full'>
                         <AntDesign name='warning' size={24} color='white' />
                         <Text className='text-white text-base ml-3'>
                              Este e-mail está em uso.
                         </Text>
                    </View>
               }
               <TouchableOpacity onPress={handleEmailInsertion} activeOpacity={0.8} className='px-3 py-3 items-center justify-center bg-black rounded-full absolute bottom-10 right-10'>
                    <AntDesign name='arrowright' size={24} color='white' />
               </TouchableOpacity>
          </View>
     );
};