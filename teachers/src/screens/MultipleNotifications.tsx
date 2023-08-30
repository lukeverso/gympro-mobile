import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { useState, useContext, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { api } from '../lib/api';
import { AuthContext } from '../contexts/auth';

interface NotificationProps {
     content: string;
     expanded: boolean;
     id: string;
     title: string;
};

export function MultipleNotifications() {
     const { user } = useContext(AuthContext);

     const { goBack } = useNavigation();

     const toggleItem = (index: number) => {
          setNotifications((prevState) => {
               const updatedItems = [...prevState];
               updatedItems[index].expanded = !updatedItems[index].expanded;
               return updatedItems;
          });
     };

     const [success, setSuccess] = useState(false);
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [notifications, setNotifications] = useState<NotificationProps[]>([]);

     const [title, setTitle] = useState('');
     const [content, setContent] = useState('');

     async function getNotifications() {
          try {
               const response = await api.get(`/api/get/notifications/teachers/${user?.id}/all`);

               setNotifications(response.data.notifications);
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

     useFocusEffect(useCallback(() => {
          getNotifications();
     }, []));

     async function handleMultipleNotifications() {
          setError(false);
          setErrorMessage('');

          if (title === '') {
               setError(true);
               setErrorMessage('Insira o título da notificação.');
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
          <KeyboardAvoidingView className='flex-1 w-full px-8 items-center bg-white' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
               <ScrollView showsVerticalScrollIndicator={false} className='mt-20 w-full flex-1'>
                    <View className='flex-row justify-between items-center'>
                         <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                              <Ionicons name='ios-chevron-back' size={24} color='black' />
                         </TouchableOpacity>
                         <View className='items-center justify-center p-3'></View>
                    </View>
                    <Text className='mt-8 text-2xl font-title'>
                         Criar notificações{'\n'}
                         para todos os alunos
                    </Text>
                    <Text className='mt-8 font-title px-3'>
                         Título
                    </Text>
                    <TextInput
                         keyboardType='default'
                         placeholder='Título'
                         className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                         onChangeText={setTitle}
                         value={title}
                    />
                    <Text className='mt-8 font-title px-3'>
                         Conteúdo
                    </Text>
                    <TextInput
                         keyboardType='default'
                         placeholder='Conteúdo'
                         className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                         multiline
                         numberOfLines={4}
                         textAlignVertical='top'
                         onChangeText={setContent}
                         value={content}
                    />
                    <View className='mt-8 space-y-5'>
                         <TouchableOpacity onPress={handleMultipleNotifications} activeOpacity={0.7} className='rounded py-3 justify-center items-center bg-black flex-row space-x-3'>
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
                         para todos os alunos
                    </Text>
                    {
                         notifications.length > 0 ?
                              notifications?.map((notification: NotificationProps, index: number) => (
                                   <TouchableOpacity key={index} onPress={() => console.log('OK')} activeOpacity={0.7} className='mt-5 bg-gray-100 rounded-lg flex-row justify-between items-center px-5 py-5'>
                                        <Text className='font-title text-base mb-1'>
                                             {notification.title}
                                        </Text>
                                        <Feather name='trash-2' size={24} color='black' />
                                   </TouchableOpacity>
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
     );
};