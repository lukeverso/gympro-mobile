import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { api } from '../lib/api';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/auth';

export function ScanCode() {
     const { goBack, navigate } = useNavigation();

     const { user } = useContext(AuthContext);

     const [success, setSuccess] = useState(false);
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [hasPermission, setHasPermission] = useState<boolean>(false);
     const [scanned, setScanned] = useState<boolean>(false);

     useEffect(() => {
          const getBarCodeScannerPermissions = async () => {
               const { status } = await BarCodeScanner.requestPermissionsAsync();
               setHasPermission(status === 'granted');
          };

          getBarCodeScannerPermissions();
     }, []);

     const handleBarCodeScanned = async ({ type, data }: any) => {
          setScanned(true);

          try {
               const request = await api.post(`/teachers/${user?.id}/add/${data}`);

               console.log(request.data);

               if (request.data.status === 'success') {
                    setSuccess(true);
               };
          } catch (error) {
               console.log(error);

               setError(true);
               setErrorMessage('Ocorreu um erro. Tente novamente.');
          }
     };

     if (hasPermission === null) return <Text>Requesting for camera permission</Text>;

     if (hasPermission === false) return <Text>No access to camera</Text>;

     return (
          <>
               {
                    success &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 pt-5'>
                              <Feather name='check' size={24} color='black' />
                              <Text className='font-title text-base text-center'>
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
                         <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
                              <Ionicons name='ios-chevron-back' size={24} color='black' />
                         </TouchableOpacity>
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
                              <View className='flex-row justify-center items-center space-x-3 py-3 bg-red-400 rounded-full'>
                                   <AntDesign name='warning' size={24} color='white' />
                                   <Text className='text-white text-base'>
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