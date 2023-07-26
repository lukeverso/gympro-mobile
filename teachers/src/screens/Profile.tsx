import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';

export function Profile() {
     const { goBack } = useNavigation();

     return (
          <View className='flex-1 bg-white'>
               <View className='mt-20 px-8'>
                    <View className='flex-row justify-between items-center'>
                         <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                              <Ionicons name='ios-chevron-back' size={24} color='black' />
                         </TouchableOpacity>
                         <View className='items-center justify-center p-3'></View>
                    </View>
                    <Text className='mt-8 text-3xl font-title'>
                         Menu do aplicativo
                    </Text>
               </View>
               <View className='mt-8'>
                    <TouchableOpacity activeOpacity={0.7} className='flex-row justify-between items-center px-8 h-24 border-b-2 border-b-gray-100'>
                         <View className='flex-row gap-3 items-center'>
                              <Feather name='edit-3' size={24} color='black' />
                              <Text className='font-title text-base mb-1'>
                                   Editar dados do perfil
                              </Text>
                         </View>
                         <Ionicons name='ios-chevron-forward' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} className='flex-row justify-between items-center px-8 h-24 border-b-2 border-b-gray-100'>
                         <View className='flex-row gap-3 items-center'>
                              <FontAwesome5 name='ruler-horizontal' size={24} color='black' />
                              <Text className='font-title text-base mb-1'>
                                   Editar minhas medidas
                              </Text>
                         </View>
                         <Ionicons name='ios-chevron-forward' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} className='flex-row justify-between items-center px-8 h-24 border-b-2 border-b-gray-100'>
                         <View className='flex-row gap-3 items-center'>
                              <Feather name='edit-3' size={24} style={{ color: '#c62222' }} />
                              <Text className='font-title text-base mb-1 text-red-400'>
                                   Sair do aplicativo
                              </Text>
                         </View>
                         <Ionicons name='ios-chevron-forward' size={24} style={{ color: '#c62222' }} />
                    </TouchableOpacity>
               </View>
          </View>
     );
};