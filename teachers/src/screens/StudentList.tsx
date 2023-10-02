import { api } from '../lib/api';
import { AuthContext } from '../contexts/auth';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useContext, useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView, RefreshControl } from 'react-native';

interface StudentProps {
     id: string;
     age: number;
     name: string;
     birthdate: string;
};

export function StudentList() {
     const { goBack, navigate } = useNavigation();
     const { teacher } = useContext(AuthContext);

     const [refreshing, setRefreshing] = useState(false);

     const [searchQuery, setSearchQuery] = useState('');

     const [students, setStudents] = useState<StudentProps[] | null>(null);

     async function getData() {
          try {
               const request = await api.get(`/api/get/teachers/${teacher}/students`);

               setStudents(request.data);
          } catch (error) {
               console.log(error);
          };
     };

     const onRefresh = useCallback(() => {
          setRefreshing(true);

          getData();

          setTimeout(() => {
               setRefreshing(false);
          }, 1000);
     }, []);

     useFocusEffect(useCallback(() => {
          getData();
     }, []));

     return (
          <SafeAreaView className='flex-1 bg-white'>
               <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <View className='mt-20 px-8'>
                         <View className='flex-row justify-between items-center'>
                              <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                                   <Ionicons name='ios-chevron-back' size={24} color='black' />
                              </TouchableOpacity>
                              <View className='items-center justify-center p-3'></View>
                         </View>
                         <Text className='mt-8 text-2xl font-title'>
                              Todos os seus alunos
                         </Text>
                         <Text className='mt-8 font-title px-3'>
                              Pesquisar aluno
                         </Text>
                         <TextInput
                              autoCapitalize='none'
                              keyboardType='email-address'
                              placeholder='Nome do aluno'
                              value={searchQuery}
                              onChangeText={setSearchQuery}
                              className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                         />
                         <Text className='mt-5 px-3 text-sm text-black font-title'>
                              Lista de alunos
                         </Text>
                         {
                              students ?
                                   students?.filter((student: StudentProps) =>
                                        student.name.toLowerCase().includes(searchQuery.toLowerCase())
                                   ).map((student: StudentProps) => {
                                        return (
                                             <TouchableOpacity
                                                  key={student.id}
                                                  activeOpacity={0.7}
                                                  onPress={() => navigate('studentDetails', { id: student?.id })}
                                                  className='mt-5 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'
                                             >
                                                  <View className='flex-row space-x-2 items-center'>
                                                       <Text className='font-title text-base mb-1'>
                                                            {student.name}
                                                       </Text>
                                                       <Text className='font-text text-xs'>
                                                            {student.age} anos
                                                       </Text>
                                                  </View>
                                                  <Ionicons name='ios-chevron-forward' size={24} color='black' />
                                             </TouchableOpacity>
                                        )
                                   }) :
                                   <View className='w-full flex-col items-center mt-8 space-y-3'>
                                        <Feather name='alert-circle' size={24} color='black' />
                                        <Text className='font-title text-lg text-center leading-6'>
                                             Você não possui alunos
                                        </Text>
                                        <Text className='font-text text-base text-center'>
                                             Para adicionar um aluno,{'\n'}
                                             volte para a tela inicial e{'\n'}
                                             use a sessão "Pesquisar aluno"
                                        </Text>
                                   </View>
                         }
                    </View>
               </ScrollView>
          </SafeAreaView>
     );
};