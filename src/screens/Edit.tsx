import { Text, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export function Edit() {
     const { goBack, navigate } = useNavigation();

     return (
          <View className='flex-1 bg-white'>
               <View className='mt-20 mb-10 px-8'>
                    <TouchableOpacity onPress={() => goBack()}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-2xl font-title'>
                         Edite seus dados abaixo
                    </Text>
               </View>
               <TouchableOpacity onPress={() => navigate('edit')} activeOpacity={0.7} className='flex-row justify-between items-center px-8 py-8 border-b-2 border-b-gray-100'>
                    <View className='flex-row space-x-3 items-center'>
                         <Feather name='edit-3' size={24} color='black' />
                         <Text className='font-title text-base mb-1'>
                              Editar nome
                         </Text>
                    </View>
                    <Ionicons name='ios-chevron-forward' size={24} color='black' />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigate('edit')} activeOpacity={0.7} className='flex-row justify-between items-center px-8 py-8 border-b-2 border-b-gray-100'>
                    <View className='flex-row space-x-3 items-center'>
                         <Feather name='mail' size={24} color='black' />
                         <Text className='font-title text-base mb-1'>
                              Editar e-mail
                         </Text>
                    </View>
                    <Ionicons name='ios-chevron-forward' size={24} color='black' />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigate('edit')} activeOpacity={0.7} className='flex-row justify-between items-center px-8 py-8 border-b-2 border-b-gray-100'>
                    <View className='flex-row space-x-3 items-center'>
                         <Feather name='edit-3' size={24} color='black' />
                         <Text className='font-title text-base mb-1'>
                              Editar e-mail
                         </Text>
                    </View>
                    <Ionicons name='ios-chevron-forward' size={24} color='black' />
               </TouchableOpacity>
               <StatusBar style='dark' backgroundColor='#FFFFFF' />
          </View>
     );
};