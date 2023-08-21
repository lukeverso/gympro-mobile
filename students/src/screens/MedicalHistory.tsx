import { Text, TouchableOpacity, View, Switch } from 'react-native';
import { AntDesign, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

export function MedicalHistory() {
     const { goBack, navigate } = useNavigation();

     const { user } = useContext(AuthContext);

     return (
          <View className='flex-1 bg-white'>
               <View className='mt-20 mb-8 px-8'>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='text-3xl font-title text-black mt-8'>
                         Ficha de anamnese
                    </Text>
                    <Text className='text-xl font-title text-black mt-8'>
                         Histórico patológico
                    </Text>
                    <View className='mt-4 space-y-3'>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black'>Você já fez alguma cirurgia?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black'>Você já teve algum antecedente oncológico?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black'>Você tem hipertensão?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black'>Você tem hipotensão?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black'>Você tem diabetes?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black'>Você tem epilepsia?</Text>
                              <Switch />
                         </View>
                    </View>
                    <Text className='text-xl font-title text-black mt-4'>
                         Hábitos sociais
                    </Text>
                    <View className='mt-4 space-y-3'>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black'>Você fuma?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black'>Você bebe bebidas alcóolicas?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black'>Você faz teste de esforço, ergom?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black'>Você tem hipotensão?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black'>Você tem diabetes?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black'>Você tem epilepsia?</Text>
                              <Switch />
                         </View>
                    </View>
               </View>
          </View>
     );
};