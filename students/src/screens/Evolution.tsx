import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';

import construction from '../assets/images/construction.png';

export function Evolution() {
     const { goBack } = useNavigation();

     return (
          <View className='flex-1 bg-white'>
               <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex-1 bg-white'>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                         <ScrollView className='px-8 pb-10'>
                              <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()} className='mt-20'>
                                   <Ionicons name='ios-chevron-back' size={24} color='black' />
                              </TouchableOpacity>
                              <Text className='mt-8 text-2xl font-title'>
                                   Acompanhe sua evolução
                              </Text>
                              <Image source={construction} className='mt-8 w-full h-52 rounded-lg' />
                              <Text className='mt-4 font-title text-xl text-center'>
                                   Esta sessão está em{'\n'}
                                   construção...
                              </Text>
                              <Text className='mt-4 mb-10 font-text text-base text-center'>
                                   Mas é rápido! Em breve ela{'\n'}
                                   estará disponível para o seu uso!
                              </Text>
                         </ScrollView>
                    </TouchableWithoutFeedback>
               </KeyboardAvoidingView>
          </View>
     );
};