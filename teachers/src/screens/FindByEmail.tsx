import { View, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, Ionicons, Octicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { api } from '../lib/api';

interface StudentProps {
     id: string;
     name: string;
};

export function FindByEmail() {
     const { goBack, navigate } = useNavigation();

     const { user } = useContext(AuthContext);

     const [openAddStudentModal, setOpenAddStudentModal] = useState(false);

     const [success, setSuccess] = useState(false);
     const [failureSame, setFailureSame] = useState(false);
     const [failureDifferent, setFailureDifferent] = useState(false);
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
               const request = await api.get(`/api/get/students/${email}/search`);

               setStudent(request.data);
               setStudentView(true);
          } catch (error) {
               console.log(error);
          };
     };

     const [studentId, setStudentId] = useState<string>('');

     async function handleAddStudent() {
          try {
               const request = await api.post(`/api/post/teachers/${user?.id}/add/${student?.id}`);

               if (request.data.status === 'success') {
                    setOpenAddStudentModal(false);
                    Keyboard.dismiss();
                    setSuccess(true);
               };
          } catch (error: any) {
               if (error.response) {
                    console.log('Status de erro:', error.response.status);
                    console.log('Dados do erro:', error.response.data);

                    if (error.response.data.code === 'sameTeacher') {
                         setFailureSame(true);

                         setStudentId(error.response.data.student);
                    } else if (error.response.data.code === 'differentTeacher') {
                         setFailureDifferent(true);
                    };
               } else if (error.request) {
                    console.log('Erro de solicitação:', error.request);
               } else {
                    console.log('Erro de configuração:', error.message);
               }
          };
     };

     return (
          <>
               {
                    openAddStudentModal &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
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
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
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
               {
                    failureSame &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='alert-circle' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Este aluno já pertence a você.
                              </Text>
                              <TouchableOpacity onPress={() => { setOpenAddStudentModal(false); setFailureSame(false); navigate('studentDetails', { id: studentId }) }} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Okay
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               {
                    failureDifferent &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='alert-circle' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Este aluno já possui outro professor associado.
                              </Text>
                              <TouchableOpacity onPress={() => { setOpenAddStudentModal(false); setFailureDifferent(false); navigate('home') }} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Okay
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               <View className='flex-1 bg-white px-8 items-center'>
                    <View className='mt-20 mb-10 w-full'>
                         <View className='flex-row justify-between items-center'>
                              <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                                   <Ionicons name='ios-chevron-back' size={24} color='black' />
                              </TouchableOpacity>
                              <View className='items-center justify-center p-3'></View>
                         </View>
                         <Text className='mt-8 text-2xl font-title'>
                              Pesquisar aluno por e-mail
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
                         {
                              studentView ?
                                   student ?
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => { Keyboard.dismiss(); setOpenAddStudentModal(true) }} className='mt-8 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'>
                                             <Text className='font-title text-base mb-1'>
                                                  {student.name}
                                             </Text>
                                             <Octicons name="person-add" size={24} color="black" />
                                        </TouchableOpacity> :
                                        <View className='w-full flex-col items-center mt-8 space-y-3'>
                                             <Feather name='alert-circle' size={24} color='black' />
                                             <Text className='font-title text-lg text-center leading-6'>
                                                  Nenhum aluno não encontrado
                                             </Text>
                                        </View> :
                                   null
                         }
                    </View>
                    <View className='absolute bottom-8 w-full space-y-5'>
                         {
                              error &&
                              <View className='flex-row justify-center items-center space-x-5 py-3 px-4 bg-red-400 rounded'>
                                   <AntDesign name='warning' size={24} color='white' />
                                   <Text className='font-text text-white text-base'>
                                        {errorMessage}
                                   </Text>
                              </View>
                         }
                         <TouchableOpacity onPress={searchStudent} activeOpacity={0.7} className='rounded py-3 justify-center items-center bg-black flex-row space-x-3'>
                              <Text className='text-white text-base font-title'>Pesquisar</Text>
                         </TouchableOpacity>
                    </View>
               </View>
          </>
     );
};