import { useCallback, useContext, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from '../contexts/auth';
import { api } from '../lib/api';

export function NoPersonal() {
     const { user } = useContext(AuthContext);

     const { navigate } = useNavigation();

     const [refreshing, setRefreshing] = useState(false);

     const onRefresh = useCallback(() => {
          setRefreshing(true);

          async function getData() {
               try {
                    const request = await api.get(`/api/get/students/${user?.id}`);

                    if (request.data.response.teacher === null) {
                         return;
                    };

                    if (request.data.response.sheets.length === 0) {
                         navigate('noWorkout');
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
          <SafeAreaView className='flex-1 bg-white'>
               <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}
                    refreshControl={
                         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <View className='px-8'>
                         <Text className='text-center text-2xl font-title'>
                              Parece que você ainda{'\n'}
                              não tem um professor...
                         </Text>
                         <Text className='text-center mt-10 text-lg font-text'>
                              Peça para o seu professor{'\n'}
                              escanear o código QR abaixo
                         </Text>
                         <View className='mt-8 mx-auto'>
                              <QRCode value={`${user?.id}`} size={220} />
                         </View>
                         <Text className='text-center mt-10 text-lg font-text'>
                              ou informe seu e-mail{'\n'}
                              para você ser adicionado{'\n'}
                              como aluno.
                         </Text>
                         <Text className='text-center mt-10 text-lg font-text'>
                              (Puxe a tela para atualizar os dados{'\n'}
                              quando seu professor tiver adicionado{'\n'}
                              você como aluno.)
                         </Text>
                    </View>
               </ScrollView>
          </SafeAreaView>
     );
};