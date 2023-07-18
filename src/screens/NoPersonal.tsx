import { RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth';

export function NoPersonal() {
     const { user } = useContext(AuthContext);

     const { navigate } = useNavigation();

     const [refreshing, setRefreshing] = useState(false);

     const onRefresh = useCallback(() => {
          setRefreshing(true);

          async function getData() {
               try {

               } catch (error) {

               }
          };

          setTimeout(() => {
               setRefreshing(false);
          }, 1000);
     }, []);

     return (
          <SafeAreaView className='flex-1 bg-white'>
               <ScrollView
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
                              <QRCode value={`http://localhost:3333/teachers/add/${user?.id}`} size={220} />
                         </View>
                         <Text className='text-center mt-10 text-lg font-text'>
                              ou informe seu e-mail{'\n'}
                              para você ser adicionado{'\n'}
                              como aluno.
                         </Text>
                    </View>
               </ScrollView>
          </SafeAreaView>
     );
};