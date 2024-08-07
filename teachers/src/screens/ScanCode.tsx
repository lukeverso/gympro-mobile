import { api } from '../lib/api';
import { AuthContext } from '../contexts/auth';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { View, Text, SafeAreaView, TouchableOpacity, Keyboard } from 'react-native'

export function ScanCode() {
     const { goBack, navigate } = useNavigation();
     const { teacher } = useContext(AuthContext);

     const [error, setError] = useState(false);
     const [success, setSuccess] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [scanned, setScanned] = useState<boolean>(false);
     const [hasPermission, setHasPermission] = useState<boolean>(false);

     async function getBarCodeScannerPermissions() {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
     };

     async function handleBarCodeScanned({ type, data }: any) {
          setScanned(true);

          try {
               const request = await api.post(`/api/post/teachers/${teacher}/add/${data}`);

               if (request.data.status === 'success') {
                    Keyboard.dismiss();
                    setSuccess(true);
               };
          } catch (error) {
               console.log(error);

               setError(true);
               setErrorMessage('Ocorreu um erro. Tente novamente.');
          };
     };

     useEffect(() => {
          getBarCodeScannerPermissions();
     }, []);

     if (hasPermission === null) return <Text>É preciso permitir o uso da câmera.</Text>;

     if (hasPermission === false) return <Text>Não foi possível obter o acesso à câmera.</Text>;

     return (
          <>
               {
                    success &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='check' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Aluno adicionado com sucesso!
                              </Text>
                              <TouchableOpacity onPress={() => navigate('home')} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Okay
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               <SafeAreaView className='flex-1 bg-white'>
                    <View className='mt-20 px-8'>
                         <View className='flex-row justify-between items-center'>
                              <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                                   <Ionicons name='chevron-back' size={24} color='black' />
                              </TouchableOpacity>
                              <View className='items-center justify-center p-3'></View>
                         </View>
                         <Text className='mt-8 text-3xl font-title'>
                              Escanear código
                         </Text>
                         <Text className='mt-1 font-text text-base'>
                              Utilize a câmera do seu celular para escanear o código do aluno na tela do celular dele
                         </Text>
                         <BarCodeScanner
                              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                              className='w-full h-96 mt-8 mb-8'
                         />
                    </View>
                    <View className='absolute bottom-8 w-full space-y-5 px-8'>
                    {
                              (error && scanned) &&
                              <View className='flex-row justify-center items-center space-x-5 py-3 px-4 bg-red-400 rounded'>
                                   <AntDesign name='warning' size={24} color='white' />
                                   <Text className='font-text text-white text-base'>
                                        {errorMessage}
                                   </Text>
                              </View>
                         }
                         {
                              scanned &&
                              <TouchableOpacity onPress={() => setScanned(false)} activeOpacity={0.7} className='rounded py-3 justify-center items-center bg-black flex-row space-x-3'>
                                   <Text className='text-white text-base font-title'>Escanear novamente</Text>
                              </TouchableOpacity>
                         }
                    </View>
               </SafeAreaView>
          </>
     );
};