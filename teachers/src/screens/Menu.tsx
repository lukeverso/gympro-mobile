import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Feather, Ionicons, Octicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { api } from '../lib/api';
import * as ImagePicker from 'expo-image-picker';

export function Menu() {
     const { goBack, navigate } = useNavigation();

     const { user, logout } = useContext(AuthContext);

     const [success, setSuccess] = useState<boolean>(false);
     const [successPicture, setSuccessPicture] = useState<boolean>(false);
     const [pictureModal, setPictureModal] = useState<boolean>(false);
     const [loading, setLoading] = useState<boolean>(false);
     const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(null);

     const [name, setName] = useState<string>('');
     const [email, setEmail] = useState<string>('');
     const [telephone, setTelephone] = useState<string>('');
     const [picture, setPicture] = useState<string>('');

     async function getData() {
          try {
               const request = await api.get(`/teachers/${user?.id}`);

               setName(request.data.name);
               setEmail(request.data.email);
               setTelephone(request.data.telephone);
               setPicture(request.data.picture);
          } catch (error) {
               console.log(error);
          };
     };

     useFocusEffect(useCallback(() => {
          getData();
     }, []));

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
               <View className='flex-1 bg-white'>
                    <View className='mt-20 px-8'>
                         <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
                              <Ionicons name='ios-chevron-back' size={24} color='black' />
                         </TouchableOpacity>
                         <Text className='text-3xl font-title text-black mt-8'>
                              Menu do aplicativo
                         </Text>
                    </View>
                    <View className='items-center mt-8 mb-8'>
                         <View>
                              <TouchableOpacity onPress={() => { setImage(null); navigate('changePicture'); }} activeOpacity={0.7} className='w-32 h-32 rounded-full items-center justify-center bg-gray-100'>
                                   {
                                        picture ?
                                             <Image source={{ uri: picture }} className='w-32 h-32 rounded-full' /> :
                                             <Octicons name='person' size={32} color='black' />
                                   }
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => { setImage(null); navigate('changePicture'); }} activeOpacity={0.7} className='w-10 h-10 rounded-full items-center justify-center bg-white absolute bottom-0 right-0'>
                                   <Feather name='camera' size={20} color='black' />
                              </TouchableOpacity>
                         </View>
                         <View className='items-center mt-4 space-y-1'>
                              <Text className='font-title text-lg text-black'>
                                   {name}
                              </Text>
                              <Text className='font-text text-sm text-black'>
                                   {email}
                              </Text>
                              <Text className='font-text text-sm text-black'>
                                   {telephone}
                              </Text>
                         </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('edit')} className='flex-row justify-between items-center px-8 py-8'>
                         <View className='flex-row space-x-3 items-center'>
                              <Feather name='edit-3' size={24} color='black' />
                              <Text className='font-title text-base mb-1'>
                                   Editar dados do perfil
                              </Text>
                         </View>
                         <Ionicons name='ios-chevron-forward' size={24} color='black' />
                    </TouchableOpacity>
                    <View className='absolute bottom-8 w-full px-8'>
                         <TouchableOpacity onPress={logout} activeOpacity={0.7} className='flex-row justify-center items-center space-x-3 py-3 bg-gray-100 rounded-full'>
                              <Feather name='log-out' size={24} color='black' />
                              <Text className='font-title text-base mb-1 text-black'>
                                   Sair do aplicativo
                              </Text>
                         </TouchableOpacity>
                    </View>
               </View>
          </>
     );
};