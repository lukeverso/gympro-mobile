import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { MaskedTextInput } from 'react-native-mask-text';
import { StatusBar } from 'expo-status-bar';

export function Edit() {
     const { goBack, navigate } = useNavigation();

     const [name, setName] = useState('');
     const [surname, setSurname] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [repeatPassword, setRepeatPassword] = useState('');
     const [telephone, setTelephone] = useState('');
     const [birthdate, setBirthdate] = useState('');
     const [address, setAddress] = useState('');
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     function handleEmailCheck() {
          console.log('Clicou.')
     };

     return (
          <KeyboardAvoidingView
               behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex-1 bg-white pb-10'>
               <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>
                         <View className='mt-20 mb-10 px-8'>
                              <TouchableOpacity onPress={() => goBack()}>
                                   <Ionicons name='ios-chevron-back' size={24} color='black' />
                              </TouchableOpacity>
                              <Text className='mt-8 text-2xl font-title'>
                                   Edite seus dados
                              </Text>
                              <View className='flex-row'>
                                   <View className='flex-1 mr-3'>
                                        <Text className='mt-8 font-title px-3'>
                                             Nome
                                        </Text>
                                        <TextInput
                                             autoFocus
                                             autoCapitalize='none'
                                             keyboardType='default'
                                             placeholder='Nome'
                                             className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                             onChangeText={setName}
                                        />
                                   </View>
                                   <View className='flex-1 ml-3'>
                                        <Text className='mt-8 font-title px-3'>
                                             Sobrenome
                                        </Text>
                                        <TextInput
                                             autoCapitalize='none'
                                             keyboardType='default'
                                             placeholder='Sobrenome'
                                             className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                             onChangeText={setSurname}
                                        />
                                   </View>
                              </View>
                              <Text className='mt-8 font-title px-3'>
                                   E-mail
                              </Text>
                              <TextInput
                                   autoCapitalize='none'
                                   keyboardType='email-address'
                                   placeholder='E-mail'
                                   className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                   onChangeText={setEmail}
                              />
                              <View className='flex-row mt-2'>
                                   <View className='flex-1 mr-3'>
                                        <Text className='mt-8 font-title px-3'>
                                             Senha
                                        </Text>
                                        <TextInput
                                             autoCapitalize='none'
                                             keyboardType='default'
                                             placeholder='Senha'
                                             className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                             onChangeText={setPassword}
                                        />
                                   </View>
                                   <View className='flex-1 ml-3'>
                                        <Text className='mt-8 font-title px-3'>
                                             Repita a senha
                                        </Text>
                                        <TextInput
                                             autoCapitalize='none'
                                             keyboardType='default'
                                             placeholder='Repita a senha'
                                             className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                             onChangeText={setRepeatPassword}
                                        />
                                   </View>
                              </View>
                              <View className='flex-row mt-2'>
                                   <View className='flex-1 mr-3'>
                                        <Text className='mt-8 font-title px-3'>
                                             Telefone
                                        </Text>
                                        <MaskedTextInput
                                             mask='(99) 99999-9999'
                                             keyboardType='number-pad'
                                             placeholder='Telefone'
                                             autoCapitalize='none'
                                             className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                             onChangeText={setTelephone}
                                        />
                                   </View>
                                   <View className='flex-1 ml-3'>
                                        <Text className='mt-8 font-title px-3'>
                                             Nascimento
                                        </Text>
                                        <MaskedTextInput
                                             mask='99/99/9999'
                                             keyboardType='number-pad'
                                             placeholder='Nascimento'
                                             className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                             onChangeText={setBirthdate}
                                        />
                                   </View>
                              </View>
                              <Text className='mt-8 font-title px-3'>
                                   Endereço
                              </Text>
                              <TextInput
                                   autoCapitalize='none'
                                   keyboardType='email-address'
                                   placeholder='Endereço'
                                   className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                   onChangeText={setAddress}
                              />
                              <View className='flex-row mt-2'>
                                   <View className='flex-1 mr-3'>
                                        <Text className='mt-8 font-title px-3'>
                                             Número
                                        </Text>
                                        <MaskedTextInput
                                             mask='(99) 99999-9999'
                                             keyboardType='number-pad'
                                             placeholder='Número'
                                             autoCapitalize='none'
                                             className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                             onChangeText={setTelephone}
                                        />
                                   </View>
                                   <View className='flex-1 ml-3'>
                                        <Text className='mt-8 font-title px-3'>
                                             Complemento
                                        </Text>
                                        <MaskedTextInput
                                             mask='99/99/9999'
                                             keyboardType='number-pad'
                                             placeholder='Complemento'
                                             className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                             onChangeText={setBirthdate}
                                        />
                                   </View>
                              </View>
                              <View className='flex-row mt-2'>
                                   <View className='flex-1 mr-3'>
                                        <Text className='mt-8 font-title px-3'>
                                             Cidade
                                        </Text>
                                        <MaskedTextInput
                                             mask='(99) 99999-9999'
                                             keyboardType='number-pad'
                                             placeholder='Cidade'
                                             autoCapitalize='none'
                                             className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                             onChangeText={setTelephone}
                                        />
                                   </View>
                                   <View className='flex-1 mr-3 ml-3'>
                                        <Text className='mt-8 font-title px-3'>
                                             Estado
                                        </Text>
                                        <MaskedTextInput
                                             autoCapitalize='characters'
                                             maxLength={2}
                                             keyboardType='default'
                                             placeholder='Estado'
                                             className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                             onChangeText={setBirthdate}
                                        />
                                   </View>
                                   <View className='flex-1 ml-3'>
                                        <Text className='mt-8 font-title px-3'>
                                             País
                                        </Text>
                                        <MaskedTextInput
                                             autoCapitalize='none'
                                             keyboardType='default'
                                             placeholder='País'
                                             className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                             onChangeText={setBirthdate}
                                        />
                                   </View>
                              </View>
                              <View className={error ? 'mt-8 flex-row justify-between' : 'mt-8 flex-row justify-end'}>
                                   {
                                        error &&
                                        <View className='flex-row items-center py-3 px-5 bg-red-400 rounded-full'>
                                             <AntDesign name='warning' size={24} color='white' />
                                             <Text className='text-white text-base ml-3'>
                                                  {errorMessage}
                                             </Text>
                                        </View>
                                   }
                                   <TouchableOpacity activeOpacity={0.7} className='px-3 py-3 items-center justify-center bg-black rounded-full'>
                                        <AntDesign name='arrowright' size={24} color='white' />
                                   </TouchableOpacity>
                              </View>
                         </View>
                    </ScrollView>
               </TouchableWithoutFeedback>
               <StatusBar style='dark' backgroundColor='#FFFFFF' />
          </KeyboardAvoidingView>
     );
};