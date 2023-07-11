import { Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

export function NoPersonal() {
     const { goBack } = useNavigation();

     const { user } = useContext(AuthContext);

     return (
          <View className='flex-1 bg-white'>
               <View className='mt-20 px-8'>
                    <TouchableOpacity onPress={() => goBack()}>
                         <Feather name='x' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='text-center mt-8 text-2xl font-title'>
                         Parece que você ainda{'\n'}
                         não tem um professor...
                    </Text>
                    <Text className='text-center mt-10 text-lg font-text'>
                         Peça para o seu professor{'\n'}
                         escanear o código QR abaixo
                    </Text>
                    <View className='mt-8 mx-auto'>
                         <QRCode value='https://www.youtube.com/watch?v=dQw4w9WgXcQ' size={220} />
                    </View>
                    <Text className='text-center mt-10 text-lg font-text'>
                         ou informe seu e-mail{'\n'}
                         para você ser adicionado{'\n'}
                         como aluno.
                    </Text>
               </View>
          </View>
     );
};