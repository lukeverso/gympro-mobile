import { Text, TouchableOpacity, View, Switch, ScrollView } from 'react-native';
import { AntDesign, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

export function MedicalHistory() {
     const { goBack, navigate } = useNavigation();

     const { user } = useContext(AuthContext);

     return (
          <ScrollView className='flex-1 bg-white'>
               <View className='mt-20 mb-8 px-8'>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='text-3xl font-title text-black mt-8'>
                         Ficha de anamnese
                    </Text>
                    <Text className='text-xl font-title text-black mt-8'>
                         Histórico patológico
                    </Text>
                    <View className='mt-4 space-y-3'>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você já fez alguma cirurgia?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você já teve algum antecedente oncológico?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você tem hipertensão?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você tem hipotensão?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você tem diabetes?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você tem epilepsia?</Text>
                              <Switch />
                         </View>
                    </View>
                    <Text className='text-xl font-title text-black mt-4'>
                         Hábitos sociais
                    </Text>
                    <View className='mt-4 space-y-3'>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você fuma?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você bebe bebidas alcóolicas?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você fez algum teste de esforço, ergométrico ou ergoespirométrico recentemente?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Quantas horas de sono você dorme por dia?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Qual seu estilo de vida?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Há quanto tempo você está sem fazer academia?</Text>
                              <Switch />
                         </View>
                    </View>
                    <Text className='text-xl font-title text-black mt-4'>
                         Dores articulares
                    </Text>
                    <View className='mt-4 space-y-3'>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você sente dores no pescoço?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você sente dores nos ombros?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você sente dores nas costas?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você sente dores nos punhos?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você sente dores nos dedos das mãos?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você sente dores no quadril?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você sente dores nos joelhoes?</Text>
                              <Switch />
                         </View>
                    </View>
                    <Text className='text-xl font-title text-black mt-4'>
                         Questionário de Prontidão para Atividade Física (PAR-Q)
                    </Text>
                    <View className='mt-4 space-y-3'>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Algum médico já disse que você possui algum problema de coração e que só deveria realizar atividades físicas supervisionado por profissionais de saúde?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você sente dores no peito quando pratica atividade física?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>E no último mês, estas dores ocorreram?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você apresenta desequilíbrio devido à tontura e/ou perda de consciência?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Você possui algum problema ósseo ou articular que poderia ser piorado pela atividade física?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Atualmente, você toma algum medicamento para pressão arterial e/ou problema de coração?</Text>
                              <Switch />
                         </View>
                         <View className='flex-row justify-between items-center'>
                              <Text className='text-lg font-text text-black flex-1'>Sabe de alguma outra razão pela qual você não deve praticar atividade física?</Text>
                              <Switch />
                         </View>
                    </View>
                    <Text className='text-xl font-title text-black mt-4'>
                         Termo de responsabilidade
                    </Text>
               </View>
          </ScrollView>
     );
};