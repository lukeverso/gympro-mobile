import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function Menu() {
     const { goBack } = useNavigation();

     return (
          <View className='flex-1 bg-white'>
               <View className='mt-20 px-8'>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='text-3xl font-title text-black mt-8'>
                         Menu do aplicativo
                    </Text>
               </View>
               <TouchableOpacity activeOpacity={0.7} className='flex-row justify-between items-center px-8 h-20 border-b-2 border-b-gray-100'>
                    <View className='flex-row gap-3 items-center'>
                         <Feather name='edit-3' size={24} color='black' />
                         <Text className='font-title text-base mb-1'>
                              Editar dados do perfil
                         </Text>
                    </View>
                    <Ionicons name='ios-chevron-forward' size={24} color='black' />
               </TouchableOpacity>
               <TouchableOpacity activeOpacity={0.7} className='flex-row justify-between items-center px-8 h-20 border-b-2 border-b-gray-100'>
                    <View className='flex-row gap-3 items-center'>
                         <FontAwesome5 name='ruler-horizontal' size={24} color='black' />
                         <Text className='font-title text-base mb-1'>
                              Editar minhas medidas
                         </Text>
                    </View>
                    <Ionicons name='ios-chevron-forward' size={24} color='black' />
               </TouchableOpacity>
               <TouchableOpacity activeOpacity={0.7} className='flex-row justify-between items-center px-8 h-20 border-b-2 border-b-gray-100'>
                    <View className='flex-row gap-3 items-center'>
                         <Feather name='edit-3' size={24} style={{ color: '#c62222' }} />
                         <Text className='font-title text-base mb-1 text-red-400'>
                              Sair do aplicativo
                         </Text>
                    </View>
                    <Ionicons name='ios-chevron-forward' size={24} style={{ color: '#c62222' }} />
               </TouchableOpacity>
          </View>
     );
};