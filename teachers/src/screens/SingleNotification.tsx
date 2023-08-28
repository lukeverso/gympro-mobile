import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { useState, useContext, useCallback } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { api } from '../lib/api';
import { AuthContext } from '../contexts/auth';

interface StudentDetailsProps {
     id: string;
};

interface NotificationProps {
     content: string;
     expanded: boolean;
     id: string;
     title: string;
};

export function SingleNotification() {
     const { user } = useContext(AuthContext);

     const route = useRoute();

     const { id } = route.params as StudentDetailsProps;

     const [success, setSuccess] = useState(false);
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const { goBack, navigate } = useNavigation();

     const [notifications, setNotifications] = useState<NotificationProps[]>([]);

     const [title, setTitle] = useState('');
     const [content, setContent] = useState('');

     const toggleItem = (index: number) => {
          setNotifications((prevState) => {
               const updatedItems = [...prevState];
               updatedItems[index].expanded = !updatedItems[index].expanded;
               return updatedItems;
          });
     };

     async function getNotifications() {
          try {
               const response = await api.get(`/api/get/notifications/students/${id}/all`);

               setNotifications(response.data.notifications);
          } catch (error) {
               console.log(error);
          };
     };

     useFocusEffect(useCallback(() => {
          getNotifications();
     }, []));

     async function handleSingleNotification() {
          setError(false);
          setErrorMessage('');

          if (title === '') {
               setError(true);
               setErrorMessage('Insira o título.');
               return;
          };

          if (content === '') {
               setError(true);
               setErrorMessage('Insira o conteúdo da notificação.');
               return;
          };

          try {
               const request = await api.post(`/api/post/notifications/${user?.id}/multiple`, {});

               if (request.data.status === 'success') {
                    setSuccess(true);
               } else {
                    setError(true);
                    setErrorMessage(request.data.message);
                    return;
               };
          } catch (error: any) {
               if (error.response) {
                    console.log('Status de erro:', error.response.status);
                    console.log('Dados do erro:', error.response.data);
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
                    success &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='check' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   O e-mail foi editado com sucesso.
                              </Text>
                              <TouchableOpacity onPress={() => navigate('edit')} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Okay
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               <KeyboardAvoidingView className='flex-1 w-full px-8 items-center bg-white' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView showsVerticalScrollIndicator={false} className='mt-20 w-full flex-1'>
                         <View className='flex-row justify-between items-center'>
                              <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                                   <Ionicons name='ios-chevron-back' size={24} color='black' />
                              </TouchableOpacity>
                              <View className='items-center justify-center p-3'></View>
                         </View>
                         <Text className='mt-8 text-2xl font-title'>
                              Criar notificação
                         </Text>
                         <Text className='mt-8 font-title px-3'>
                              Título
                         </Text>
                         <TextInput
                              keyboardType='default'
                              placeholder='Título'
                              className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                         />
                         <Text className='mt-8 font-title px-3'>
                              Conteúdo
                         </Text>
                         <TextInput
                              keyboardType='default'
                              placeholder='Conteúdo'
                              className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                              multiline
                              numberOfLines={8}
                              textAlignVertical='top'
                         />
                         <View className='mt-8 space-y-5'>
                              <TouchableOpacity onPress={handleSingleNotification} activeOpacity={0.7} className='rounded py-3 justify-center items-center bg-black flex-row space-x-3'>
                                   <Text className='text-white text-base font-title'>Criar notificação</Text>
                              </TouchableOpacity>
                              {
                                   error &&
                                   <View className='flex-row justify-center items-center space-x-5 py-3 px-4 bg-red-400 rounded'>
                                        <AntDesign name='warning' size={24} color='white' />
                                        <Text className='font-text text-white text-base'>
                                             {errorMessage}
                                        </Text>
                                   </View>
                              }
                         </View>
                         <Text className='mt-8 text-2xl font-title'>
                              Notificações criadas{'\n'}
                              para este aluno
                         </Text>
                         {
                              notifications.length > 0 ?
                                   notifications?.map((notification: NotificationProps, index: number) => (
                                        <View key={index} className='py-2 border-b-2 border-b-gray-100'>
                                             <TouchableOpacity
                                                  activeOpacity={0.7}
                                                  onPress={() => toggleItem(index)}
                                                  className='flex-row justify-between items-center px-8 h-20'
                                             >
                                                  <View className='flex-row items-center space-x-5'>
                                                       <Feather name='bell' size={24} color='black' />
                                                       <Text className='flex-1 font-title text-lg' numberOfLines={1} ellipsizeMode='tail'>
                                                            {notification.title}
                                                       </Text>
                                                       {
                                                            notification.expanded ?
                                                                 <Ionicons name='ios-chevron-up' size={24} color='black' /> :
                                                                 <Ionicons name='ios-chevron-down' size={24} color='black' />
                                                       }
                                                  </View>
                                             </TouchableOpacity>
                                             {
                                                  notification.expanded &&
                                                  <View className='px-8 mb-8 space-y-3'>
                                                       <Text className='flex-1 font-title text-lg'>
                                                            {notification.title}
                                                       </Text>
                                                       <Text className='font-text text-base'>
                                                            {notification.content}
                                                       </Text>
                                                  </View>
                                             }
                                        </View>
                                   )) :
                                   <View className='w-full flex-col items-center mt-8 space-y-3'>
                                        <Feather name='bell-off' size={24} color='black' />
                                        <Text className='font-title text-lg text-center leading-6'>
                                             Nenhuma notificação{'\n'}
                                             encontrada
                                        </Text>
                                   </View>
                         }
                    </ScrollView>
               </KeyboardAvoidingView>
          </>
     );
};