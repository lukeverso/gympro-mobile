import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
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

export function Notifications() {
     const { user } = useContext(AuthContext);

     const { goBack } = useNavigation();

     const [notifications, setNotifications] = useState<NotificationProps[]>([]);

     const toggleItem = (index: number) => {
          setNotifications((prevState) => {
               const updatedItems = [...prevState];
               updatedItems[index].expanded = !updatedItems[index].expanded;
               return updatedItems;
          });
     };

     async function getNotifications() {
          try {
               const response = await api.get(`/api/get/notifications/${user?.id}`);

               setNotifications(response.data);
          } catch (error) {
               console.log(error);
          };
     };

     useFocusEffect(useCallback(() => {
          getNotifications();
     }, []));

     return (
          <ScrollView showsVerticalScrollIndicator={false} className='flex-1 bg-white'>
               <View className='mt-20 px-8'>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-2xl font-title'>
                         Avisos e notificações
                    </Text>
                    <Text className='mt-1 font-text text-base'>
                         Sua lista de informes da academia
                    </Text>
               </View>
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
     );
};