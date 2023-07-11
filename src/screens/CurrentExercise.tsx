import { Image, Text, TouchableOpacity, View } from "react-native";
import { Feather, MaterialIcons } from '@expo/vector-icons';

export function CurrentExercise() {
     return (
          <View className='flex-1 bg-white'>
               <View className='py-20 px-8 flex-1 justify-between'>
                    <TouchableOpacity>
                         <Feather name='x' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='font-title text-3xl'>
                         Rosca direta com barra
                    </Text>
                    <View className='flex-row gap-3'>
                         <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                              <Feather name='x' size={24} color='black' />
                              <Text className='font-title text-xl mt-1'>3</Text>
                              <Text className='text-center font-text text-xs mt-1'>séries</Text>
                         </View>
                         <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                              <Feather name='repeat' size={24} color='black' />
                              <Text className='font-title text-xl mt-1'>21</Text>
                              <Text className='text-center font-text text-xs mt-1'>repetições</Text>
                         </View>
                         <View className='bg-white flex-1 rounded items-center justify-center py-3'>
                              <Feather name='clock' size={24} color='black' />
                              <Text className='font-title text-xl mt-1'>45s</Text>
                              <Text className='text-center font-text text-xs mt-1'>descanso</Text>
                         </View>
                    </View>
                    <View className='mb-3'>
                         <Text className='font-title text-lg text-center'>
                              Observações:
                         </Text>
                         <Text className='px-8 text-center mt-3'>
                              7 repetições até a metade, 7 da metade
                              pra cima e 7 repetições completas.
                         </Text>
                    </View>
                    <View className='flex-row mt-5 gap-3'>
                         <TouchableOpacity activeOpacity={0.7} className='py-3 bg-black flex-row items-center justify-center flex-1'>
                              <Text className='text-white text-base font-title mr-3'>Iniciar treino</Text>
                              <Feather name='check' size={20} color='white' />
                         </TouchableOpacity>
                         <TouchableOpacity activeOpacity={0.7} className='py-3 bg-red-400 flex-row items-center justify-center flex-1'>
                              <Text className='text-white text-base font-title mr-3'>Hoje não deu</Text>
                              <MaterialIcons name='block' size={20} color='white' />
                         </TouchableOpacity>
                    </View>
               </View>
          </View>
     );
};