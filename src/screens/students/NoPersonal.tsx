import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

export function NoPersonal() {
     const { goBack, navigate } = useNavigation();

     return (
          <View className='flex-1 bg-white'>
               <View className='mt-20 px-8'>
                    <TouchableOpacity onPress={() => goBack()}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-2xl font-title'>
                         Parece que você ainda{'\n'}
                         não tem um personal...
                    </Text>
                    <Text className='mt-8 text-base font-text'>
                         Peça para o seu personal escanear{'\n'}
                         o código QR abaixo para você ser{'\n'}
                         adicionado como aluno
                    </Text>
                    <View className='mt-8 mx-auto'>
                         <QRCode value='https://www.youtube.com/watch?v=dQw4w9WgXcQ' size={220} />
                    </View>
                    <Text className='mt-8 text-base font-text'>
                         ou informe seu e-mail{'\n'}
                         ou nome de usuário.
                    </Text>
               </View>
          </View>
     );
};