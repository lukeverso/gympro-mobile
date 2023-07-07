import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function StudentHome() {
     const { navigate } = useNavigation();

     return (
          <ScrollView>
               <View className='h-48 bg-black'>
                    <View className='mt-20 px-8'>
                         <View className='flex-row justify-between items-center'>
                              <TouchableOpacity onPress={() => navigate('studentProfile')} activeOpacity={0.8} className='px-3 py-3 items-center justify-center bg-white rounded-full'>
                                   <Feather name='user' size={24} color='black' />
                              </TouchableOpacity>
                              <View className='flex-row'>
                                   <TouchableOpacity onPress={() => navigate('notifications')} activeOpacity={0.8} className='px-3 py-3 items-center justify-center'>
                                        <Feather name='bell' size={24} color='white' />
                                   </TouchableOpacity>
                                   <TouchableOpacity onPress={() => navigate('menu')} activeOpacity={0.8} className='px-3 py-3 items-center justify-center ml-3'>
                                        <Feather name='menu' size={24} color='white' />
                                   </TouchableOpacity>
                              </View>
                         </View>
                         <Text className='text-lg font-title text-white mt-4'>
                              Bem-vindo, Lucas
                         </Text>
                    </View>
               </View>
               <View className='py-8 px-8'>
                    <Text className='text-2xl font-title'>
                         Treino do dia
                    </Text>
                    <Text className='text-base font-text'>
                         Segunda, 3 de julho
                    </Text>
                    <View className='bg-gray-200 mt-8 p-5 rounded'>
                         <Text className='font-title text-lg'>
                              Bíceps (B)
                         </Text>
                         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ display: 'flex', gap: 20, marginTop: 20 }}>
                              <View className='p-3 bg-white rounded min-w-[180px] max-w-[180px] flex-col justify-between'>
                                   <Feather name='check' size={24} color='black' />
                                   <View>
                                        <Text className='font-title text-xl mt-20 leading-5'>
                                             Rosca direta com barra
                                        </Text>
                                        <Text className='mt-3'>
                                             3 séries{'\n'}
                                             10 repetições{'\n'}
                                             45s de descanso
                                        </Text>
                                   </View>
                              </View>
                              <View className='p-3 bg-white rounded min-w-[180px] max-w-[180px] flex-col justify-between'>
                                   <Feather name='check' size={24} color='black' />
                                   <View>
                                        <Text className='font-title text-xl mt-20 leading-5'>
                                             Rosca direta com barra
                                        </Text>
                                        <Text className='mt-3'>
                                             3 séries{'\n'}
                                             10 repetições{'\n'}
                                             45s de descanso
                                        </Text>
                                   </View>
                              </View>
                              <View className='p-3 bg-white rounded min-w-[180px] max-w-[180px] flex-col justify-between'>
                                   <Feather name='check' size={24} color='black' />
                                   <View>
                                        <Text className='font-title text-xl mt-20 leading-5'>
                                             Rosca direta com barra
                                        </Text>
                                        <Text className='mt-3'>
                                             3 séries{'\n'}
                                             10 repetições{'\n'}
                                             45s de descanso
                                        </Text>
                                   </View>
                              </View>
                              <View className='p-3 bg-white rounded min-w-[180px] max-w-[180px] flex-col justify-between'>
                                   <Feather name='check' size={24} color='black' />
                                   <View>
                                        <Text className='font-title text-xl mt-20 leading-5'>
                                             Rosca direta com barra
                                        </Text>
                                        <Text className='mt-3'>
                                             3 séries{'\n'}
                                             10 repetições{'\n'}
                                             45s de descanso
                                        </Text>
                                   </View>
                              </View>
                              <View className='p-3 bg-white rounded min-w-[180px] max-w-[180px] flex-col justify-between'>
                                   <Feather name='check' size={24} color='black' />
                                   <View>
                                        <Text className='font-title text-xl mt-20 leading-5'>
                                             Rosca direta com barra
                                        </Text>
                                        <Text className='mt-3'>
                                             3 séries{'\n'}
                                             10 repetições{'\n'}
                                             45s de descanso
                                        </Text>
                                   </View>
                              </View>
                              <View className='p-3 bg-white rounded min-w-[180px] max-w-[180px] flex-col justify-between'>
                                   <Feather name='check' size={24} color='black' />
                                   <View>
                                        <Text className='font-title text-xl mt-20 leading-5'>
                                             Rosca direta com barra
                                        </Text>
                                        <Text className='mt-3'>
                                             3 séries{'\n'}
                                             10 repetições{'\n'}
                                             45s de descanso
                                        </Text>
                                   </View>
                              </View>
                         </ScrollView>
                         <View className='flex mt-5'>
                              <TouchableOpacity onPress={() => navigate('trainDetails')} activeOpacity={0.8} className='py-3 bg-black flex-row items-center justify-center flex'>
                                   <Text className='text-white text-base font-title mr-3'>Ver detalhes do treino</Text>
                                   <AntDesign name='arrowright' size={24} color='white' />
                              </TouchableOpacity>
                         </View>
                    </View>
                    <Text className='text-2xl font-title mt-8 mb-5'>
                         Seus treinos
                    </Text>
                    <View className='mt-4 gap-4'>
                         <TouchableOpacity onPress={() => navigate('trainDetails')} activeOpacity={0.7} className='bg-gray-200 rounded flex-row justify-between items-center px-3 py-5'>
                              <View className='flex-row gap-3 items-center'>
                                   <Entypo name='dot-single' size={24} color='black' />
                                   <Text className='font-title text-base mb-1'>
                                        Pernas (C)
                                   </Text>
                                   <Text className='font-text text-xs'>
                                        Amanhã
                                   </Text>
                              </View>
                              <Ionicons name='ios-chevron-forward' size={24} color='black' />
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => navigate('trainDetails')} activeOpacity={0.7} className='bg-gray-200 rounded flex-row justify-between items-center px-3 py-5'>
                              <View className='flex-row gap-3 items-center'>
                                   <Entypo name='dot-single' size={24} color='black' />
                                   <Text className='font-title text-base mb-1'>
                                        Pernas (C)
                                   </Text>
                                   <Text className='font-text text-xs'>
                                        Amanhã
                                   </Text>
                              </View>
                              <Ionicons name='ios-chevron-forward' size={24} color='black' />
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => navigate('trainDetails')} activeOpacity={0.7} className='bg-gray-200 rounded flex-row justify-between items-center px-3 py-5'>
                              <View className='flex-row gap-3 items-center'>
                                   <Entypo name='dot-single' size={24} color='black' />
                                   <Text className='font-title text-base mb-1'>
                                        Pernas (C)
                                   </Text>
                                   <Text className='font-text text-xs'>
                                        Amanhã
                                   </Text>
                              </View>
                              <Ionicons name='ios-chevron-forward' size={24} color='black' />
                         </TouchableOpacity>
                    </View>
                    <Text className='text-2xl font-title mt-8 mb-5'>
                         Sua semana
                    </Text>
                    <View className='flex-row gap-4'>
                         <View className='p-5 bg-gray-200 rounded flex-1 items-center justify-center gap-1'>
                              <Feather name='repeat' size={24} color='black' />
                              <Text className='font-title text-2xl'>
                                   4
                              </Text>
                              <Text className='font-text text-xs text-center'>
                                   dias{'\n'}
                                   consecutivos
                              </Text>
                         </View>
                         <View className='p-5 bg-gray-200 rounded flex-1 items-center justify-center gap-1'>
                              <Feather name='trending-up' size={24} color='black' />
                              <Text className='font-title text-2xl'>
                                   27
                              </Text>
                              <Text className='font-text text-xs text-center'>
                                   exercícios{'\n'}
                                   em sequência
                              </Text>
                         </View>
                    </View>
               </View>
          </ScrollView>
     );
};