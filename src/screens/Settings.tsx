import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useState } from 'react';

export function Settings() {
     const [isEnabled, setIsEnabled] = useState(false);
     const toggleSwitch = () => setIsEnabled(previousState => !previousState);

     return (
          <View className='flex-1 bg-white'>
               <View className='mt-20 px-8'>
                    <TouchableOpacity>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-2xl font-title'>
                         Configurações
                    </Text>
                    <Text className='font-text text-sm'>
                         Configurações do app GymPro
                    </Text>
                    <View className='flex-row justify-between items-center py-8'>
                         <View className='flex-row items-center'>
                              <Feather name='sun' size={24} color='black' />
                              <Text className='ml-3 font-title text-lg'>
                                   Aparência
                              </Text>
                         </View>
                         <Switch
                              trackColor={{ false: '#727275', true: '#000000' }}
                              thumbColor={isEnabled ? '#FFFFFF' : '#d3d3d4'}
                              ios_backgroundColor="#3e3e3e"
                              onValueChange={toggleSwitch}
                              value={isEnabled}
                         />
                    </View>
               </View>
          </View>
     );
};