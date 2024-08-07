import { api } from '../lib/api';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Image, Keyboard, Text, TouchableOpacity, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export function ChangePicture() {
     const { goBack, navigate } = useNavigation();
     const { student } = useContext(AuthContext);
     
     const [error] = useState(false);
     const [errorMessage] = useState('');

     const [successPicture, setSuccessPicture] = useState<boolean>(false);
     const [loading, setLoading] = useState<boolean>(false);
     const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(null);

     async function pickImage() {
          let result = await ImagePicker.launchImageLibraryAsync({
               mediaTypes: ImagePicker.MediaTypeOptions.All,
               allowsEditing: true,
               aspect: [1, 1],
               quality: 1,
          });

          result && setImage(result);
     };

     async function saveImage() {
          setLoading(true);

          if (!image) {
               setLoading(false);

               return;
          };

          try {
               const formData = new FormData();

               const filename = image?.assets ? image?.assets[0].uri : '';
               const uri = image?.assets ? image?.assets[0].uri : '';
               const extension = filename.split('.')[1];

               formData.append('file', JSON.parse(JSON.stringify({
                    name: filename,
                    uri: uri,
                    type: `image/${extension}`
               })));

               const request = await api.post(`/api/post/students/${student}/upload`,
                    formData,
                    {
                         headers: {
                              'Content-Type': 'multipart/form-data'
                         },
                    }
               );

               if (request.data) {
                    setLoading(false);
                    Keyboard.dismiss();
                    setSuccessPicture(true);
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

     return (
          <>
               {
                    successPicture &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='check' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Sua foto foi alterada com sucesso.
                              </Text>
                              <TouchableOpacity onPress={() => { setSuccessPicture(false); navigate('menu'); }} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
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
                              <Ionicons name='chevron-back' size={24} color='black' />
                         </TouchableOpacity>
                         <Text className='text-3xl font-title text-black mt-8'>
                              Alterar foto de perfil
                         </Text>
                         {
                              !image &&
                              <View className='mt-8'>
                                   <TouchableOpacity onPress={pickImage} activeOpacity={0.7} className='px-5 py-10 justify-center items-center space-x-3 border border-gray-200 rounded-lg flex-row'>
                                        <AntDesign name='picture' size={24} color='black' />
                                        <Text className='font-text text-base'>
                                             Escolher foto
                                        </Text>
                                   </TouchableOpacity>
                              </View>
                         }
                         {
                              image?.assets &&
                              <>
                                   <View className='mx-auto items-center mt-8 w-36 h-36'>
                                        <TouchableOpacity onPress={() => setImage(null)} className='w-36 h-36 rounded-full'>
                                             <Image
                                                  source={{ uri: image.assets[0].uri }}
                                                  className='w-36 h-36 rounded-full'
                                             />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setImage(null)} activeOpacity={0.7} className='w-10 h-10 rounded-full items-center justify-center bg-white absolute bottom-0 right-0'>
                                             <Feather name='trash-2' size={24} color='black' />
                                        </TouchableOpacity>
                                   </View>
                                   <Text className='mt-8 font-text text-base text-center'>
                                        Sua foto ficará assim. Para{'\n'}
                                        alterá-la, clique no ícone da lixeira.
                                   </Text>
                              </>
                         }
                    </View>
                    <View className='absolute px-8 bottom-8 w-full space-y-5'>
                         {
                              error &&
                              <View className='flex-row justify-center items-center space-x-3 py-3 bg-red-400 rounded-full'>
                                   <AntDesign name='warning' size={24} color='white' />
                                   <Text className='font-text text-white text-base'>
                                        {errorMessage}
                                   </Text>
                              </View>
                         }
                         <TouchableOpacity onPress={saveImage} activeOpacity={0.7} disabled={image ? false : true} className={`mt-8 w-full rounded-lg py-3 justify-center items-center ${image ? 'bg-black' : 'bg-gray-200'}`}>
                              {
                                   loading ?
                                        <ActivityIndicator size='small' color='#FFFFFF' /> :
                                        <Text className='font-text text-base text-white'>
                                             Salvar foto
                                        </Text>
                              }
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => navigate('menu')} activeOpacity={0.7} className='mt-2 w-full rounded py-3 justify-center items-center flex-row space-x-3'>
                              <Text className='font-text text-base'>
                                   Cancelar
                              </Text>
                         </TouchableOpacity>
                    </View>
               </View>
          </>
     );
};