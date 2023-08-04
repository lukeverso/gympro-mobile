import { Image, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { api } from '../lib/api';

import workout from '../assets/images/workout.png';

export function NoWorkout() {
     const { user } = useContext(AuthContext);

     const { navigate } = useNavigation();

     const [refreshing, setRefreshing] = useState(false);

     const onRefresh = useCallback(() => {
          setRefreshing(true);

          async function getData() {
               try {
                    const request = await api.get(`/students/${user?.id}`);

                    if (request.data.response.sheets.length === 0) {
                         return;
                    };

                    navigate('home');
               } catch (error) {
                    console.log(error);
               };
          };

          getData();

          setTimeout(() => {
               setRefreshing(false);
          }, 1000);
     }, []);

     return (
          <SafeAreaView className='flex-1 bg-white justify-center items-center'>
               <ScrollView
                    contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}
                    refreshControl={
                         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <View className='flex-1 bg-white'>
                         <View className='flex-1 px-8 justify-center items-center'>
                              <Text className='text-center text-2xl font-title'>
                                   Oops!{'\n'}
                                   Você ainda não possui{'\n'}
                                   uma ficha de treino...
                              </Text>
                              <View className='mt-8 mx-auto'>
                                   <Image source={workout} />
                              </View>
                              <Text className='text-center mt-10 text-lg font-text'>
                                   Converse com seu professor{'\n'}
                                   para ele criar a ficha ideal{'\n'}
                                   para você.
                              </Text>
                              <Text className='text-center mt-10 text-lg font-text'>
                                   (Puxe a tela para atualizar os dados{'\n'}
                                   quando seu professor tiver criado{'\n'}
                                   sua ficha de treino.)
                              </Text>
                         </View>
                    </View>
               </ScrollView>
          </SafeAreaView>
     );
};