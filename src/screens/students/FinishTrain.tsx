import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import finish from '../../assets/finish.png';

export function FinishTrain() {
     return (
          <View className='flex-1 bg-white'>
               <View className='py-20 px-8 flex-1 justify-between'>
                    <TouchableOpacity>
                         <Feather name='x' size={24} color='black' />
                    </TouchableOpacity>
                    <View className='gap-10 items-center'>
                         <Text className='font-title text-3xl text-center'>
                              Treino{'\n'}
                              finalizado!
                         </Text>
                         <Image source={finish} />
                         <Text className='font-text text-base text-center'>
                              Lembre-se de alongar o corpo{'\n'}
                              antes de sair da academia!
                         </Text>
                    </View>
                    <View className='flex mt-5'>
                         <TouchableOpacity activeOpacity={0.8} className='py-3 bg-black flex-row items-center justify-center flex'>
                              <Text className='text-white text-base font-title mr-3'>Concluir treino</Text>
                              <Feather name='check' size={24} color='white' />
                         </TouchableOpacity>
                    </View>
               </View>
          </View>
     );
};