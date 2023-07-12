import { ScrollView, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import Arm from '../assets/icons/arm.svg';
import Calf from '../assets/icons/calf.svg';
import Chest from '../assets/icons/chest.svg';
import Height from '../assets/icons/height.svg';
import Hip from '../assets/icons/hip.svg';
import Shoulders from '../assets/icons/shoulders.svg';
import Thigh from '../assets/icons/thigh.svg';
import Waist from '../assets/icons/waist.svg';
import Weight from '../assets/icons/weight.svg';
import Wingspan from '../assets/icons/wingspan.svg';

export function Measures() {
     const [selectedImage, setSelectedImage] = useState('Weight');

     const { goBack, navigate } = useNavigation();

     function handleTextInputFocus(imageName: string) {
          setSelectedImage(imageName);
     };

     return (
          <View className='flex-1 bg-white'>
               <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex-1 bg-white mt-20 pb-10'>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                         <ScrollView className='px-8'>
                              <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
                                   <Ionicons name='ios-chevron-back' size={24} color='black' />
                              </TouchableOpacity>
                              <Text className='mt-8 text-2xl font-title'>
                                   Edite seus dados
                              </Text>
                              <View className='mt-8 flex-row justify-between items-start'>
                                   <View className='flex-1 pr-12'>
                                        <View className='flex-row items-center mb-5'>
                                             <TextInput
                                                  autoFocus
                                                  placeholder='Peso'
                                                  className='w-full border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onFocus={() => handleTextInputFocus('Weight')}
                                             />
                                             <Text className='font-text text-base'>kg</Text>
                                        </View>
                                        <View className='flex-row items-center mb-5'>
                                             <TextInput
                                                  placeholder='Altura'
                                                  className='w-full border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onFocus={() => handleTextInputFocus('Height')}
                                             />
                                             <Text className='font-text text-base'>cm</Text>
                                        </View>
                                        <View className='flex-row items-center mb-5'>
                                             <TextInput
                                                  editable={false}
                                                  placeholder='IMC'
                                                  className='w-full border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                             />
                                             <Text className='font-text text-base'>nm</Text>
                                        </View>
                                        <View className='flex-row items-center mb-5'>
                                             <TextInput
                                                  placeholder='Ombro'
                                                  className='w-full border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onFocus={() => handleTextInputFocus('Shoulders')}
                                             />
                                             <Text className='font-text text-base'>cm</Text>
                                        </View>
                                        <View className='flex-row items-center mb-5'>
                                             <TextInput
                                                  placeholder='Peito'
                                                  className='w-full border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onFocus={() => handleTextInputFocus('Chest')}
                                             />
                                             <Text className='font-text text-base'>cm</Text>
                                        </View>
                                        <View className='flex-row items-center mb-5'>
                                             <TextInput
                                                  placeholder='Cintura'
                                                  className='w-full border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onFocus={() => handleTextInputFocus('Waist')}
                                             />
                                             <Text className='font-text text-base'>cm</Text>
                                        </View>
                                        <View className='flex-row items-center mb-5'>
                                             <TextInput
                                                  placeholder='Quadril'
                                                  className='w-full border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onFocus={() => handleTextInputFocus('Hip')}
                                             />
                                             <Text className='font-text text-base'>cm</Text>
                                        </View>
                                        <View className='flex-row items-center mb-5'>
                                             <TextInput
                                                  placeholder='Braço'
                                                  className='w-full border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onFocus={() => handleTextInputFocus('Arm')}
                                             />
                                             <Text className='font-text text-base'>cm</Text>
                                        </View>
                                        <View className='flex-row items-center mb-5'>
                                             <TextInput
                                                  placeholder='Coxa'
                                                  className='w-full border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onFocus={() => handleTextInputFocus('Thigh')}
                                             />
                                             <Text className='font-text text-base'>cm</Text>
                                        </View>
                                        <View className='flex-row items-center mb-5'>
                                             <TextInput
                                                  placeholder='Panturrilha'
                                                  className='w-full border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onFocus={() => handleTextInputFocus('Calf')}
                                             />
                                             <Text className='font-text text-base'>cm</Text>
                                        </View>
                                        <View className='flex-row items-center mb-5'>
                                             <TextInput
                                                  placeholder='Envergadura'
                                                  className='w-full border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onFocus={() => handleTextInputFocus('Wingspan')}
                                             />
                                             <Text className='font-text text-base'>cm</Text>
                                        </View>
                                   </View>
                                   {selectedImage === 'Arm' && <Arm />}
                                   {selectedImage === 'Calf' && <Calf />}
                                   {selectedImage === 'Chest' && <Chest />}
                                   {selectedImage === 'Height' && <Height />}
                                   {selectedImage === 'Hip' && <Hip />}
                                   {selectedImage === 'Thigh' && <Thigh />}
                                   {selectedImage === 'Shoulders' && <Shoulders />}
                                   {selectedImage === 'Waist' && <Waist />}
                                   {selectedImage === 'Weight' && <Weight />}
                                   {selectedImage === 'Wingspan' && <Wingspan />}
                              </View>
                              <View className='flex-row justify-end mb-10'>
                                   <TouchableOpacity activeOpacity={0.7} className='px-3 py-3 items-center justify-center bg-black rounded-full'>
                                        <AntDesign name='arrowright' size={24} color='white' />
                                   </TouchableOpacity>
                              </View>
                         </ScrollView>
                    </TouchableWithoutFeedback>
               </KeyboardAvoidingView>
          </View>
     );
};