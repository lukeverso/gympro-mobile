import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export function Create() {
     const [status, setStatus] = useState('student');

     const { goBack, navigate } = useNavigation();

     function handleSelection() {
          console.log('Clicou.');
          navigate('insertEmail', {
               status: status
          });
     };

     return (
          <View className='flex-1 bg-white'>
               <View className='mt-20 px-8'>
                    <TouchableOpacity onPress={() => goBack()}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-2xl font-title'>
                         Bem-vindo!{'\n'}
                         Você é aluno ou personal?
                    </Text>
                    <TouchableOpacity onPress={() => setStatus('student')} className='mt-8 px-5 py-3 border border-black flex-row items-center'>
                         {
                              status === 'student' ?
                                   <MaterialCommunityIcons name='record-circle-outline' size={24} color='black' /> :
                                   <MaterialCommunityIcons name='circle-outline' size={24} color='black' />
                         }
                         <Text className='ml-3 text-base font-text'>
                              Sou aluno
                         </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setStatus('teacher')} className='mt-8 px-5 py-3 border border-black flex-row items-center'>
                         {
                              status === 'teacher' ?
                                   <MaterialCommunityIcons name='record-circle-outline' size={24} color='black' /> :
                                   <MaterialCommunityIcons name='circle-outline' size={24} color='black' />
                         }
                         <Text className='ml-3 text-base font-text'>
                              Sou personal
                         </Text>
                    </TouchableOpacity>
               </View>
               <TouchableOpacity onPress={handleSelection} activeOpacity={0.8} className='px-3 py-3 items-center justify-center bg-black rounded-full absolute bottom-10 right-10'>
                    <AntDesign name='arrowright' size={24} color='white' />
               </TouchableOpacity>
          </View>
     );
};