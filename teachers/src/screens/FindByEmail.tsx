import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { api } from '../lib/api';

interface StudentProps {
     id: string;
     name: string;
};

export default function FindByEmail() {
     const { goBack, navigate } = useNavigation();

     const { user } = useContext(AuthContext);

     const [openAddStudentModal, setOpenAddStudentModal] = useState(false);

     const [success, setSuccess] = useState(false);
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [email, setEmail] = useState('');

     const [studentView, setStudentView] = useState<boolean>(false);
     const [student, setStudent] = useState<StudentProps | null>(null);

     async function searchStudent() {
          setError(false);
          setErrorMessage('');
          setStudentView(false);

          try {
               const request = await api.get(`/students/email/${email}`);

               setStudent(request.data);
               setStudentView(true);
          } catch (error) {
               console.log(error);
          };
     };

     async function handleAddStudent() {
          try {
               const request = await api.post(`/teachers/${user?.id}/add/${student?.id}`);

               console.log(request.data);

               if (request.data.status === 'success') {
                    setSuccess(true);
               };
          } catch (error) {
               console.log(error);
          };
     };

     return (
          <>
               {
                    openAddStudentModal &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5'>
                              <Feather name='power' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Deseja adicionar {student?.name} como aluno?
                              </Text>
                              <TouchableOpacity onPress={handleAddStudent} activeOpacity={0.7} className='w-full -mb-5 h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Sim
                                   </Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => setOpenAddStudentModal(false)} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Não
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               {
                    success &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5'>
                              <Feather name='check' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Aluno adicionado com sucesso!
                              </Text>
                              <TouchableOpacity onPress={() => navigate('home')} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Okay
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               <SafeAreaView className='flex-1 bg-white'>
                    <View className='mt-20 px-8'>
                         <TouchableOpacity onPress={goBack}>
                              <Ionicons name='ios-chevron-back' size={24} color='black' />
                         </TouchableOpacity>
                         <Text className='mt-8 text-2xl font-title'>
                              Encontrar um aluno
                         </Text>
                         <View className='flex-row space-x-5 justify-between mt-8'>
                              <TextInput
                                   autoFocus
                                   autoCapitalize='none'
                                   keyboardType='email-address'
                                   placeholder='E-mail do aluno'
                                   className='flex-1 bg-gray-100 rounded-lg flex-row space-x-3 items-center px-5 py-3 placeholder:font-text placeholder:text-base'
                                   value={email}
                                   onChangeText={setEmail}
                              />
                              <TouchableOpacity onPress={searchStudent} activeOpacity={0.7} className='bg-black rounded-full items-center justify-center w-[52px]'>
                                   <Feather name='search' size={24} color='white' />
                              </TouchableOpacity>
                         </View>
                         {
                              error &&
                              <View className='mt-8 flex-row justify-center items-center space-x-3 py-3 bg-red-400 rounded-full'>
                                   <AntDesign name='warning' size={24} color='white' />
                                   <Text className='text-white text-base'>
                                        {errorMessage}
                                   </Text>
                              </View>
                         }
                         {
                              studentView ?
                                   student ?
                                        <TouchableOpacity
                                             activeOpacity={0.7}
                                             onPress={() => { Keyboard.dismiss(); setOpenAddStudentModal(true) }}
                                             className='mt-8 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'
                                        >
                                             <View className='flex-row space-x-2 items-center'>
                                                  <Entypo name='dot-single' size={24} color='black' />
                                                  <Text className='font-title text-base mb-1'>
                                                       {student.name}
                                                  </Text>
                                             </View>
                                             <Ionicons name='ios-chevron-forward' size={24} color='black' />
                                        </TouchableOpacity> :
                                        <View className='w-full flex-col items-center mt-8 space-y-3'>
                                             <Feather name='alert-circle' size={24} color='black' />
                                             <Text className='font-title text-lg text-center leading-6'>
                                                  Aluno não encontrado
                                             </Text>
                                             <Text className='font-text text-base text-center'>
                                                  Para adicionar um aluno,{'\n'}
                                                  volte para a tela inicial e{'\n'}
                                                  use a sessão 'Pesquisar aluno'
                                             </Text>
                                        </View> :
                                   null
                         }
                    </View>
               </SafeAreaView>
          </>
     );
};