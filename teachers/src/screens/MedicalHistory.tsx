import { Text, TouchableOpacity, View, Switch, ScrollView, TextInput, Image } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { api } from '../lib/api';
import anamnesis from '../assets/images/anamnesis.png';

interface MedicalHistoryProps {
     backPain: boolean;
     boneJointIssue: boolean;
     chestPain: boolean;
     chestPainLastMonth: boolean;
     diabetes: boolean;
     drinker: boolean;
     epilepsy: boolean;
     filled: boolean;
     fingerPain: boolean;
     heartProblem: boolean;
     hipPain: boolean;
     hypertension: boolean;
     hypotension: boolean;
     imbalance: boolean;
     kneePain: boolean;
     lifeStyle: boolean;
     medication: boolean;
     neckPain: boolean;
     oncologicalHistory: boolean;
     reasonForNotExercising: string;
     shoulderPain: boolean;
     sleepHours: boolean;
     smoker: boolean;
     stressTest: boolean;
     student: boolean;
     surgicalHistory: boolean;
     timeWithoutTraining: boolean;
     wristPain: boolean;
};

interface StudentDetailsProps {
     id: string;
};

export function MedicalHistory() {
     const { goBack, navigate } = useNavigation();

     const route = useRoute();

     const { id } = route.params as StudentDetailsProps;

     const { user } = useContext(AuthContext);

     const [success, setSuccess] = useState(false);
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryProps | null>(null);

     async function getData() {
          try {
               const request = await api.get(`/api/get/students/${id}/medical-history`);

               if (request.data.medicalHistory.length > 0) setMedicalHistory(request.data.medicalHistory[0]);
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
                                   Ficha preenchida com sucesso.
                              </Text>
                              <TouchableOpacity onPress={() => navigate('home')} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Okay
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               <ScrollView className='flex-1 bg-white'>
                    <View className='mt-20 mb-8 px-8'>
                         <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
                              <Ionicons name='ios-chevron-back' size={24} color='black' />
                         </TouchableOpacity>
                         <Text className='text-3xl font-title text-black mt-8'>
                              Ficha de anamnese
                         </Text>
                         {
                              !medicalHistory?.filled ?
                                   <View className='mt-8 flex-col items-center'>
                                        <Image source={anamnesis} className='h-40 w-64 rounded' />
                                        <Text className='text-xl font-title text-black mt-4'>
                                             A ficha ainda não foi preenchida!
                                        </Text>
                                        <Text className='text-base font-text text-black mt-4 text-center'>
                                             Converse com seu aluno{'\n'}
                                             sobre o preenchimento da ficha.
                                        </Text>
                                   </View>
                                   :
                                   <>
                                        <Text className='text-xl font-title text-black mt-8'>
                                             Histórico patológico
                                        </Text>
                                        <View className='mt-4 space-y-3'>
                                             <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black flex-1'>O aluno já fez alguma cirurgia? {medicalHistory.surgicalHistory ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                             <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black flex-1'>O aluno já teve algum antecedente oncológico? {medicalHistory.oncologicalHistory ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                             <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black flex-1'>O aluno tem hipertensão? {medicalHistory.hypertension ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                             <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black flex-1'>O aluno tem hipotensão? {medicalHistory.hypotension ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                             <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black flex-1'>O aluno tem diabetes? {medicalHistory.diabetes ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                             <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black flex-1'>O aluno tem epilepsia? {medicalHistory.epilepsy ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                        </View>
                                        <Text className='text-xl font-title text-black mt-4'>
                                             Hábitos sociais
                                        </Text>
                                        <View className='mt-4 space-y-3'>
                                             <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black flex-1'>O aluno fuma? {medicalHistory.smoker ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                             <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black flex-1'>O aluno bebe bebidas alcóolicas? {medicalHistory.drinker ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                             <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black flex-1'>O aluno fez algum teste de esforço, ergométrico ou ergoespirométrico recentemente? {medicalHistory.stressTest ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                             <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black flex-1'>Quantas horas de sono o aluno dorme por dia? {medicalHistory.sleepHours} horas.</Text>
                                             </View>
                                             <View className='flex-col justify-between pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black'>Qual estilo de vida do aluno? {medicalHistory.lifeStyle ? 'Ativo.' : 'Sedentário.'}</Text>
                                             </View>
                                             <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black flex-1'>Há quantos meses o aluno está sem fazer academia? {medicalHistory.timeWithoutTraining} meses.</Text>
                                             </View>
                                             <Text className='text-xl font-title text-black mt-4'>
                                                  Dores articulares
                                             </Text>
                                             <View className='mt-4 space-y-3'>
                                                  <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black flex-1'>O aluno sente dores no pescoço? {medicalHistory.neckPain ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black flex-1'>O aluno sente dores nos ombros? {medicalHistory.shoulderPain ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black flex-1'>O aluno sente dores nas costas? {medicalHistory.backPain ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black flex-1'>O aluno sente dores nos punhos? {medicalHistory.wristPain ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black flex-1'>O aluno sente dores nos dedos das mãos? {medicalHistory.fingerPain ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black flex-1'>O aluno sente dores no quadril? {medicalHistory.hipPain ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black flex-1'>O aluno sente dores nos joelhoes? {medicalHistory.kneePain ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                             </View>
                                             <Text className='text-xl font-title text-black mt-4'>
                                                  Questionário de Prontidão para Atividade Física (PAR-Q)
                                             </Text>
                                             <View className='mt-4 space-y-3'>
                                                  <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black flex-1'>Algum médico já disse que o aluno possui algum problema de coração e que só deveria realizar atividades físicas supervisionado por profissionais de saúde? {medicalHistory.heartProblem ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black flex-1'>O aluno sente dores no peito quando pratica atividade física? {medicalHistory.chestPain ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black flex-1'>E no último mês, estas dores ocorreram? {medicalHistory.chestPainLastMonth ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black flex-1'>O aluno apresenta desequilíbrio devido à tontura e/ou perda de consciência? {medicalHistory.imbalance ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black flex-1'>O aluno possui algum problema ósseo ou articular que poderia ser piorado pela atividade física? {medicalHistory.boneJointIssue ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black flex-1'>Atualmente, o aluno toma algum medicamento para pressão arterial e/ou problema de coração? {medicalHistory.medication ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-col justify-between pb-4'>
                                                       <Text className='text-lg font-text text-black flex-1'>Sabe de alguma outra razão pela qual o aluno não deve praticar atividade física? {medicalHistory.reasonForNotExercising}</Text>
                                                  </View>
                                             </View>
                                        </View>
                                   </>
                         }
                    </View>
               </ScrollView>
          </>
     );
};