import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export function InsertData() {
     const email: string = '';
     const [error, setError] = useState(false);

     const { goBack, navigate } = useNavigation();

     return (
          <View className='flex-1 bg-white'>
               <ScrollView className='mt-20 px-8'>
                    <TouchableOpacity onPress={() => goBack()}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-2xl font-title'>
                         Preencha seus dados abaixo
                    </Text>
                    <TextInput
                         autoFocus
                         keyboardType='email-address'
                         placeholder='E-mail'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                         value={email}
                         editable={false}
                    />
                    <TextInput
                         keyboardType='default'
                         placeholder='Nome completo'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                    />
                    <TextInput
                         keyboardType='default'
                         placeholder='Nome de usuário'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                    />
                    <TextInput
                         secureTextEntry
                         autoCapitalize='none'
                         placeholder='Senha'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                    />
                    <TextInput
                         secureTextEntry
                         autoCapitalize='none'
                         placeholder='Repita a senha'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                    />
                    <TextInput
                         keyboardType='number-pad'
                         placeholder='Data de nascimento'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                    />
                    <TextInput
                         keyboardType='number-pad'
                         placeholder='Telefone'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                    />
                    <TextInput
                         placeholder='Endereço'
                         className='mt-8 border-b-[1px] py-2 text-base font-text'
                    />
                    <View className='flex-row justify-between mt-8'>
                         <TextInput
                              keyboardType='number-pad'
                              placeholder='Número'
                              className='border-b-[1px] py-2 text-base font-text mr-10'
                         />
                         <TextInput
                              placeholder='Complemento (opcional)'
                              className='border-b-[1px] py-2 text-base font-text flex-1'
                         />
                    </View>
                    <View className='flex-row justify-between mt-8'>
                         <TextInput
                              placeholder='Cidade'
                              className='border-b-[1px] py-2 text-base font-text mr-10 flex-1'
                         />
                         <TextInput
                              autoCapitalize='characters'
                              maxLength={2}
                              placeholder='Estado'
                              className='border-b-[1px] py-2 text-base font-text mr-10 w-20'
                         />
                         <TextInput
                              placeholder='País'
                              className='border-b-[1px] py-2 text-base font-text flex-1'
                         />
                    </View>
                    <View className={error ? 'mt-8 flex-row justify-between mb-20' : 'mt-8 flex-row justify-end mb-20'}>
                         {
                              error &&
                              <View className='flex-row items-center py-3 px-5 bg-red-400 rounded-full'>
                                   <AntDesign name='warning' size={24} color='white' />
                                   <Text className='text-white text-base ml-3'>
                                        Este e-mail está em uso.
                                   </Text>
                              </View>
                         }
                         <TouchableOpacity activeOpacity={0.8} className='px-3 py-3 items-center justify-center bg-black rounded-full'>
                              <AntDesign name='arrowright' size={24} color='white' />
                         </TouchableOpacity>
                    </View>
               </ScrollView>
          </View>
     );
};