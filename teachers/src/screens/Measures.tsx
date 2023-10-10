import { api } from '../lib/api';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { MaskedTextInput } from 'react-native-mask-text';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface StudentDetailsProps {
     id: string;
};

export function Measures() {
     const route = useRoute();

     const { goBack, navigate } = useNavigation();
     const { id } = route.params as StudentDetailsProps;

     const [error, setError] = useState(false);
     const [success, setSuccess] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

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

     async function handleMeasuresInsert() {
          setError(false);
          setErrorMessage('');

          try {
               const request = await api.post(`/api/post/students/${id}/measures`, {
                    weight, height, bmi, shoulders, chest, waist, hip, arm, thigh, calf, wingspan
               });

               if (request.data.status === 'success') {
                    Keyboard.dismiss();
                    
                    setSuccess(true);
               } else {
                    setError(true);
                    setErrorMessage(request.data.message || 'Ocorreu um erro');
                    return;
               };
          } catch (error: any) {
               if (error.response) {
                    console.log('Status de erro:', error.response.status);
                    console.log('Dados do erro:', error.response.data);
               } else if (error.request) {
                    console.log('Erro de solicitação:', error.request);
               } else {
                    console.log('Erro de configuração:', error.message);
               }
          };
     };

     async function getMeasures() {
          setError(false);
          setErrorMessage('');

          try {
               const request = await api.get(`/api/get/students/${id}/measures`);

               if (request.data.measures) {
                    setWeight(request.data.measures.weight);
                    setHeight(request.data.measures.height);
                    setBmi(request.data.measures.bmi);
                    setShoulders(request.data.measures.shoulders);
                    setChest(request.data.measures.chest);
                    setWaist(request.data.measures.waist);
                    setHip(request.data.measures.hip);
                    setArm(request.data.measures.arm);
                    setThigh(request.data.measures.thigh);
                    setCalf(request.data.measures.calf);
                    setWingspan(request.data.measures.wingspan);
               } else {
                    setWeight('');
                    setHeight('');
                    setBmi('');
                    setShoulders('');
                    setChest('');
                    setWaist('');
                    setHip('');
                    setArm('');
                    setThigh('');
                    setCalf('');
                    setWingspan('');
               };
          } catch (error) {
               console.log(error);

               setError(true);
               setErrorMessage('Ocorreu um erro...');
          };
     };

     useEffect(() => {
          getMeasures();
     }, []);

     useEffect(() => {
          if (weight.length >= 4 && height.length === 3) {
               bmiCalculator(weight, height);
          } else {
               setBmi('');
          };
     }, [weight, height]);

     return (
          <>
               {
                    success &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='check' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   As medidas foram salvas com sucesso.
                              </Text>
                              <TouchableOpacity onPress={() => { setSuccess(false); navigate('menu'); }} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Okay
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               <KeyboardAvoidingView className={error ? 'flex-1 w-full px-8 pb-28 items-center bg-white' : 'flex-1 w-full px-8 pb-16 items-center bg-white'} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView showsVerticalScrollIndicator={false} className='mt-20 mb-10 w-full flex-1'>
                         <View className='flex-row justify-between items-center'>
                              <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                                   <Ionicons name='ios-chevron-back' size={24} color='black' />
                              </TouchableOpacity>
                              <View className='items-center justify-center p-3'></View>
                         </View>
                         <Text className='mt-8 text-2xl font-title'>
                              Edite as medidas do aluno
                         </Text>
                         <View className='mt-8 flex-row justify-between items-start'>
                              <View className='flex-1 space-y-4'>
                                   <View className='flex-row items-center space-x-5'>
                                        <View className='flex-1 flex-row space-x-3 items-center'>
                                             <TextInput
                                                  placeholder='Peso'
                                                  keyboardType='number-pad'
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
                                                  keyboardType='number-pad'
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
                                                  keyboardType='number-pad'
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
                                                  keyboardType='number-pad'
                                                  className='flex-1 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  value={shoulders}
                                                  onChangeText={setShoulders}
                                             />
                                             <Text className='font-text text-base'>cm</Text>
                                        </View>
                                        <View className='flex-1 flex-row space-x-3 items-center'>
                                             <TextInput
                                                  placeholder='Peito'
                                                  keyboardType='number-pad'
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
                                                  keyboardType='number-pad'
                                                  className='flex-1 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  value={waist}
                                                  onChangeText={setWaist}
                                             />
                                             <Text className='font-text text-base'>cm</Text>
                                        </View>
                                        <View className='flex-1 flex-row space-x-3 items-center'>
                                             <TextInput
                                                  placeholder='Quadril'
                                                  keyboardType='number-pad'
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
                                                  keyboardType='number-pad'
                                                  className='flex-1 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  value={arm}
                                                  onChangeText={setArm}
                                             />
                                             <Text className='font-text text-base'>cm</Text>
                                        </View>
                                        <View className='flex-1 flex-row space-x-3 items-center'>
                                             <TextInput
                                                  placeholder='Coxa'
                                                  keyboardType='number-pad'
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
                                                  keyboardType='number-pad'
                                                  className='flex-1 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  value={calf}
                                                  onChangeText={setCalf}
                                             />
                                             <Text className='font-text text-base'>cm</Text>
                                        </View>
                                        <View className='flex-1 flex-row space-x-3 items-center'>
                                             <TextInput
                                                  placeholder='Envergadura'
                                                  keyboardType='number-pad'
                                                  className='flex-1 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  value={wingspan}
                                                  onChangeText={setWingspan}
                                             />
                                             <Text className='font-text text-base'>cm</Text>
                                        </View>
                                   </View>
                              </View>
                         </View>
                    </ScrollView>
                    <View className='absolute bottom-8 w-full space-y-5'>
                         {
                              error &&
                              <View className='flex-row justify-center items-center space-x-5 py-3 px-4 bg-red-400 rounded'>
                                   <AntDesign name='warning' size={24} color='white' />
                                   <Text className='font-text text-white text-base'>
                                        {errorMessage}
                                   </Text>
                              </View>
                         }
                         <TouchableOpacity onPress={handleMeasuresInsert} activeOpacity={0.7} className='rounded py-3 justify-center items-center bg-black flex-row space-x-3'>
                              <Text className='text-white text-base font-title'>Atualizar</Text>
                         </TouchableOpacity>
                    </View>
               </KeyboardAvoidingView>
          </>
     );
};