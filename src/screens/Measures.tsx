import { ScrollView, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { MaskedTextInput } from 'react-native-mask-text';

import construction from '../assets/images/construction.png';

export function Measures() {
     const { goBack } = useNavigation();

     const [weight, setWeight] = useState('');
     const [height, setHeight] = useState('');
     const [bmi, setBmi] = useState('');
     const [shoulders, setShoulders] = useState('');
     const [chest, setChest] = useState('');
     const [waist, setWaist] = useState('');
     const [hip, setHip] = useState('');
     const [arm, setArm] = useState('');
     const [thigh, setThigh] = useState('');
     const [calf, setCalf] = useState('');
     const [wingspan, setWingspan] = useState('');

     function bmiCalculator(weight: string, height: string) {
          let weightNumber = Number(weight);
          let heightNumber = Number(height) / 100;
          let bmi = weightNumber / (heightNumber * heightNumber);
          bmi = parseFloat(bmi.toFixed(2));
          setBmi(bmi.toString());
     };

     useEffect(() => {
          if (weight.length === 4 && height.length === 3) {
               console.log('entrou')
               bmiCalculator(weight, height);
          } else {
               setBmi('');
          };
     }, [weight, height]);


     return (
          <View className='flex-1 bg-white'>
               <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex-1 bg-white'>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                         <ScrollView className='px-8 pb-10'>
                              <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()} className='mt-20'>
                                   <Ionicons name='ios-chevron-back' size={24} color='black' />
                              </TouchableOpacity>
                              <Text className='mt-8 text-2xl font-title'>
                                   Edite suas medidas
                              </Text>
                              <View className='mt-8 flex-row justify-between items-start'>
                                   <View className='flex-1 space-y-4'>
                                        <View className='flex-row items-center space-x-5'>
                                             <View className='flex-1 flex-row space-x-3 items-center'>
                                                  <MaskedTextInput
                                                       autoFocus
                                                       mask='99.9'
                                                       placeholder='Peso'
                                                       className='flex-1 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                       value={weight}
                                                       onChangeText={setWeight}
                                                  />
                                                  <Text className='font-text text-base'>kg</Text>
                                             </View>
                                             <View className='flex-1 flex-row space-x-3 items-center'>
                                                  <MaskedTextInput
                                                       mask='999'
                                                       placeholder='Altura'
                                                       className='flex-1 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                       value={height}
                                                       onChangeText={setHeight}
                                                  />
                                                  <Text className='font-text text-base'>cm</Text>
                                             </View>
                                        </View>
                                        <View className='flex-row items-center space-x-5'>
                                             <View className='flex-1 flex-row space-x-3 items-center'>
                                                  <TextInput
                                                       editable={false}
                                                       placeholder='IMC'
                                                       className='flex-1 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                       value={bmi}
                                                  />
                                                  <Text className='font-text text-base'>IMC</Text>
                                             </View>
                                             <View className='flex-1 flex-row space-x-3 items-center'>
                                                  <View className='flex-1'>
                                                       {
                                                            '00.00' < bmi && bmi < '18.50' ?
                                                                 <View className='bg-red-200 py-2 rounded-full justify-center items-center'><Text className='font-text text-base text-black'>Magreza</Text></View> :
                                                                 '18.50' <= bmi && bmi <= '24.99' ?
                                                                      <View className='bg-green-200 py-2 rounded-full justify-center items-center'><Text className='font-text text-base text-black'>Normal</Text></View> :
                                                                      '25.00' <= bmi && bmi <= '29.99' ?
                                                                           <View className='bg-red-300 py-2 rounded-full justify-center items-center'><Text className='font-text text-base text-white'>Sobrepeso</Text></View> :
                                                                           '30.00' <= bmi && bmi <= '39.99' ?
                                                                                <View className='bg-red-500 py-2 rounded-full justify-center items-center'><Text className='font-text text-base text-white'>Obesidade</Text></View> :
                                                                                bmi > '40.00' ?
                                                                                     <View className='bg-red-700 py-2 rounded-full justify-center items-center'><Text className='font-text text-base text-white'>Obesidade grave</Text></View> :
                                                                                     <View className='bg-gray-100 py-2 rounded-full justify-center items-center'><Text className='font-text text-base text-black'>Preencha acima</Text></View>
                                                       }
                                                  </View>
                                             </View>
                                        </View>
                                        <View className='flex-row items-center space-x-5'>
                                             <View className='flex-1 flex-row space-x-3 items-center'>
                                                  <TextInput
                                                       placeholder='Ombro'
                                                       className='flex-1 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                       value={shoulders}
                                                       onChangeText={setShoulders}
                                                  />
                                                  <Text className='font-text text-base'>cm</Text>
                                             </View>
                                             <View className='flex-1 flex-row space-x-3 items-center'>
                                                  <TextInput
                                                       placeholder='Peito'
                                                       className='flex-1 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                       value={chest}
                                                       onChangeText={setChest}
                                                  />
                                                  <Text className='font-text text-base'>cm</Text>
                                             </View>
                                        </View>
                                        <View className='flex-row items-center space-x-5'>
                                             <View className='flex-1 flex-row space-x-3 items-center'>
                                                  <TextInput
                                                       placeholder='Cintura'
                                                       className='flex-1 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                       value={waist}
                                                       onChangeText={setWaist}
                                                  />
                                                  <Text className='font-text text-base'>cm</Text>
                                             </View>
                                             <View className='flex-1 flex-row space-x-3 items-center'>
                                                  <TextInput
                                                       placeholder='Quadril'
                                                       className='flex-1 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                       value={hip}
                                                       onChangeText={setHip}
                                                  />
                                                  <Text className='font-text text-base'>cm</Text>
                                             </View>
                                        </View>
                                        <View className='flex-row items-center space-x-5'>
                                             <View className='flex-1 flex-row space-x-3 items-center'>
                                                  <TextInput
                                                       placeholder='Braço'
                                                       className='flex-1 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                       value={arm}
                                                       onChangeText={setArm}
                                                  />
                                                  <Text className='font-text text-base'>cm</Text>
                                             </View>
                                             <View className='flex-1 flex-row space-x-3 items-center'>
                                                  <TextInput
                                                       placeholder='Coxa'
                                                       className='flex-1 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                       value={thigh}
                                                       onChangeText={setThigh}
                                                  />
                                                  <Text className='font-text text-base'>cm</Text>
                                             </View>
                                        </View>
                                        <View className='flex-row items-center space-x-5'>
                                             <View className='flex-1 flex-row space-x-3 items-center'>
                                                  <TextInput
                                                       placeholder='Panturrilha'
                                                       className='flex-1 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                       value={calf}
                                                       onChangeText={setCalf}
                                                  />
                                                  <Text className='font-text text-base'>cm</Text>
                                             </View>
                                             <View className='flex-1 flex-row space-x-3 items-center'>
                                                  <TextInput
                                                       placeholder='Envergadura'
                                                       className='flex-1 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                       value={wingspan}
                                                       onChangeText={setWingspan}
                                                  />
                                                  <Text className='font-text text-base'>cm</Text>
                                             </View>
                                        </View>
                                   </View>
                              </View>
                              <View className='mt-8 flex-row justify-end'>
                                   <TouchableOpacity activeOpacity={0.7} className='px-3 py-3 items-center justify-center bg-black rounded-full'>
                                        <AntDesign name='arrowright' size={24} color='white' />
                                   </TouchableOpacity>
                              </View>
                              <Text className='mt-8 text-2xl font-title'>
                                   Acompanhe sua evolução
                              </Text>
                              <Image source={construction} className='mt-8 w-full h-52 rounded-lg' />
                              <Text className='mt-4 font-title text-xl text-center'>
                                   Esta sessão está em{'\n'}
                                   construção...
                              </Text>
                              <Text className='mt-4 mb-10 font-text text-base text-center'>
                                   Mas é rápido! Em breve ela{'\n'}
                                   estará disponível para o seu uso!
                              </Text>
                         </ScrollView>
                    </TouchableWithoutFeedback>
               </KeyboardAvoidingView>
          </View>
     );
};