import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';

export function StudentProfile() {
     return (
          <View className='flex-1 bg-white'>
               <View className='h-48 bg-black'>
                    <View className='mt-20 px-8'>
                         <View className='flex-row justify-between'>
                              <TouchableOpacity activeOpacity={0.8} className='px-3 py-3 items-center justify-center bg-white rounded-full'>
                                   <Feather name='user' size={24} color='black' />
                              </TouchableOpacity>
                              <TouchableOpacity activeOpacity={0.8} className='px-3 py-3 items-center justify-center ml-3'>
                                   <Feather name='x' size={24} color='white' />
                              </TouchableOpacity>
                         </View>
                         <Text className='text-lg font-title text-white mt-4'>
                              Lucas Cristovam
                         </Text>
                    </View>
               </View>
               <View>
                    <TouchableOpacity activeOpacity={0.7} className='flex-row justify-between items-center px-8 h-20 border-b-2 border-b-gray-200'>
                         <View className='flex-row gap-3 items-center'>
                              <Feather name='edit-3' size={24} color='black' />
                              <Text className='font-title text-base mb-1'>
                                   Editar dados do perfil
                              </Text>
                         </View>
                         <Ionicons name='ios-chevron-forward' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} className='flex-row justify-between items-center px-8 h-20 border-b-2 border-b-gray-200'>
                         <View className='flex-row gap-3 items-center'>
                              <FontAwesome5 name='ruler-horizontal' size={24} color='black' />
                              <Text className='font-title text-base mb-1'>
                                   Editar minhas medidas
                              </Text>
                         </View>
                         <Ionicons name='ios-chevron-forward' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} className='flex-row justify-between items-center px-8 h-20 border-b-2 border-b-gray-200'>
                         <View className='flex-row gap-3 items-center'>
                              <Feather name='settings' size={24} color='black' />
                              <Text className='font-title text-base mb-1'>
                                   Configurações do aplicativo
                              </Text>
                         </View>
                         <Ionicons name='ios-chevron-forward' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} className='flex-row justify-between items-center px-8 h-20 border-b-2 border-b-gray-200'>
                         <View className='flex-row gap-3 items-center'>
                              <AntDesign name='questioncircleo' size={24} color='black' />
                              <Text className='font-title text-base mb-1'>
                                   Perguntas frequentes
                              </Text>
                         </View>
                         <Ionicons name='ios-chevron-forward' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} className='flex-row justify-between items-center px-8 h-20 border-b-2 border-b-gray-200'>
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