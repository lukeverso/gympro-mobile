import { ScrollView, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import Arm from '../../assets/measures/arm.svg';
import Calf from '../../assets/measures/calf.svg';
import Chest from '../../assets/measures/chest.svg';
import Height from '../../assets/measures/height.svg';
import Hip from '../../assets/measures/hip.svg';
import Shoulders from '../../assets/measures/shoulders.svg';
import Thigh from '../../assets/measures/thigh.svg';
import Waist from '../../assets/measures/waist.svg';
import Weight from '../../assets/measures/weight.svg';
import Wingspan from '../../assets/measures/wingspan.svg';

export function StudentEditMeasures() {
     const [selectedImage, setSelectedImage] = useState('Weight');

     const { goBack, navigate } = useNavigation();

     function handleTextInputFocus(imageName: string) {
          setSelectedImage(imageName);
     };

     return (
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex-1 bg-white'>
               <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView className='mt-20 px-8'>
                         <TouchableOpacity onPress={() => goBack()}>
                              <Ionicons name='ios-chevron-back' size={24} color='black' />
                         </TouchableOpacity>
                         <Text className='mt-8 text-2xl font-title'>
                              Edite seus dados
                         </Text>
                         <View className='mt-8 flex-row justify-between items-center'>
                              <View className='flex-1 pr-3'>
                                   <View className='flex-row items-center mb-5'>
                                        <TextInput
                                             autoFocus
                                             placeholder='Peso'
                                             className='border-b-[1px] mr-3 font-text text-base flex-1'
                                             onFocus={() => handleTextInputFocus('Weight')}
                                        />
                                        <Text className='font-text text-base'>kg</Text>
                                   </View>
                                   <View className='flex-row items-center mb-5'>
                                        <TextInput
                                             placeholder='Altura'
                                             className='border-b-[1px] mr-3 font-text text-base flex-1'
                                             onFocus={() => handleTextInputFocus('Height')}
                                        />
                                        <Text className='font-text text-base'>cm</Text>
                                   </View>
                                   <View className='flex-row items-center mb-5'>
                                        <TextInput
                                             editable={false}
                                             placeholder='IMC'
                                             className='border-b-[1px] mr-3 font-text text-base flex-1'
                                        />
                                        <Text className='font-text text-base'>nm</Text>
                                   </View>
                                   <View className='flex-row items-center mb-5'>
                                        <TextInput
                                             placeholder='Ombro'
                                             className='border-b-[1px] mr-3 font-text text-base flex-1'
                                             onFocus={() => handleTextInputFocus('Shoulders')}
                                        />
                                        <Text className='font-text text-base'>cm</Text>
                                   </View>
                                   <View className='flex-row items-center mb-5'>
                                        <TextInput
                                             placeholder='Peito'
                                             className='border-b-[1px] mr-3 font-text text-base flex-1'
                                             onFocus={() => handleTextInputFocus('Chest')}
                                        />
                                        <Text className='font-text text-base'>cm</Text>
                                   </View>
                                   <View className='flex-row items-center mb-5'>
                                        <TextInput
                                             placeholder='Cintura'
                                             className='border-b-[1px] mr-3 font-text text-base flex-1'
                                             onFocus={() => handleTextInputFocus('Waist')}
                                        />
                                        <Text className='font-text text-base'>cm</Text>
                                   </View>
                                   <View className='flex-row items-center mb-5'>
                                        <TextInput
                                             placeholder='Quadril'
                                             className='border-b-[1px] mr-3 font-text text-base flex-1'
                                             onFocus={() => handleTextInputFocus('Hip')}
                                        />
                                        <Text className='font-text text-base'>cm</Text>
                                   </View>
                                   <View className='flex-row items-center mb-5'>
                                        <TextInput
                                             placeholder='Braço'
                                             className='border-b-[1px] mr-3 font-text text-base flex-1'
                                             onFocus={() => handleTextInputFocus('Arm')}
                                        />
                                        <Text className='font-text text-base'>cm</Text>
                                   </View>
                                   <View className='flex-row items-center mb-5'>
                                        <TextInput
                                             placeholder='Coxa'
                                             className='border-b-[1px] mr-3 font-text text-base flex-1'
                                             onFocus={() => handleTextInputFocus('Thigh')}
                                        />
                                        <Text className='font-text text-base'>cm</Text>
                                   </View>
                                   <View className='flex-row items-center mb-5'>
                                        <TextInput
                                             placeholder='Panturrilha'
                                             className='border-b-[1px] mr-3 font-text text-base flex-1'
                                             onFocus={() => handleTextInputFocus('Calf')}
                                        />
                                        <Text className='font-text text-base'>cm</Text>
                                   </View>
                                   <View className='flex-row items-center mb-5'>
                                        <TextInput
                                             placeholder='Envergadura'
                                             className='border-b-[1px] mr-3 font-text text-base flex-1'
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
                    </ScrollView>
               </TouchableWithoutFeedback>
               <TouchableOpacity activeOpacity={0.8} className='px-3 py-3 items-center justify-center bg-black rounded-full absolute bottom-10 right-10'>
                    <AntDesign name='arrowright' size={24} color='white' />
               </TouchableOpacity>
          </KeyboardAvoidingView>
     );
};