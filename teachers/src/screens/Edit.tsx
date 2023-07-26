import { Text, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export function Edit() {
     const { goBack, navigate } = useNavigation();

     return (
          <View className='flex-1 bg-white'>
               <View className='mt-20 mb-10 px-8'>
                    <View className='flex-row justify-between items-center'>
                         <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                              <Ionicons name='ios-chevron-back' size={24} color='black' />
                         </TouchableOpacity>
                         <View className='items-center justify-center p-3'></View>
                    </View>
                    <Text className='mt-8 text-2xl font-title'>
                         Edite seus dados abaixo
                    </Text>
               </View>
               <TouchableOpacity onPress={() => navigate('editName')} activeOpacity={0.7} className='flex-row justify-between items-center px-8 py-8 border-b-2 border-b-gray-100'>
                    <View className='flex-row space-x-3 items-center'>
                         <Octicons name="person" size={24} color="black" />
                         <Text className='font-title text-base mb-1'>
                              Editar nome
                         </Text>
                    </View>
                    <Ionicons name='ios-chevron-forward' size={24} color='black' />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigate('editEmail')} activeOpacity={0.7} className='flex-row justify-between items-center px-8 py-8 border-b-2 border-b-gray-100'>
                    <View className='flex-row space-x-3 items-center'>
                         <Feather name='mail' size={24} color='black' />
                         <Text className='font-title text-base mb-1'>
                              Editar e-mail
                         </Text>
                    </View>
                    <Ionicons name='ios-chevron-forward' size={24} color='black' />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigate('editTelephone')} activeOpacity={0.7} className='flex-row justify-between items-center px-8 py-8 border-b-2 border-b-gray-100'>
                    <View className='flex-row space-x-3 items-center'>
                         <Feather name="phone-call" size={24} color="black" />
                         <Text className='font-title text-base mb-1'>
                              Editar telefone
                         </Text>
                    </View>
                    <Ionicons name='ios-chevron-forward' size={24} color='black' />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigate('editAddress')} activeOpacity={0.7} className='flex-row justify-between items-center px-8 py-8 border-b-2 border-b-gray-100'>
                    <View className='flex-row space-x-3 items-center'>
                         <Ionicons name="location-outline" size={24} color="black" />
                         <Text className='font-title text-base mb-1'>
                              Editar endereço
                         </Text>
                    </View>
                    <Ionicons name='ios-chevron-forward' size={24} color='black' />
               </TouchableOpacity>
               <StatusBar style='dark' backgroundColor='#FFFFFF' />
          </View>
     );
};