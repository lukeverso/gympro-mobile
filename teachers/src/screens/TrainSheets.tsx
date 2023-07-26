import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api } from '../lib/api';

import home from '../assets/images/home.jpg';

interface TrainSheetsProps {
     id: string;
};

export function TrainSheets() {
     const { goBack } = useNavigation();

     const route = useRoute();

     const { id } = route.params as TrainSheetsProps;

     async function getData() {
          try {
               const request = await api.get('');
          } catch (error) {
               console.log(error);
          };
     };

     return (
          <SafeAreaView className='flex-1 bg-white'>
               <ScrollView>
                    <View className='mt-20 px-8'>
                         <View className='flex-row justify-between items-center'>
                              <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                                   <Ionicons name='ios-chevron-back' size={24} color='black' />
                              </TouchableOpacity>
                              <View className='items-center justify-center p-3'></View>
                         </View>
                         <Text className='mt-8 text-2xl font-title'>
                              Detalhes da ficha de treino
                         </Text>
                    </View>
               </ScrollView>
          </SafeAreaView>
     );
};