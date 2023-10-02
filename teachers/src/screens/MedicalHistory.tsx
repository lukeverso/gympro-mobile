import { api } from '../lib/api';
import { useCallback, useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { Text, TouchableOpacity, View, ScrollView, Image, Keyboard } from 'react-native';

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
     const route = useRoute();

     const { goBack, navigate } = useNavigation();
     const { id } = route.params as StudentDetailsProps;

     const [success, setSuccess] = useState(false);
     const [openAllowEditingModal, setOpenAllowEditingModal] = useState(false);

     const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryProps | null>(null);

     async function getData() {
          try {
               const request = await api.get(`/api/get/students/${id}/medical-history`);

               console.log(request.data);

               if (request.data.medicalHistory.length > 0) setMedicalHistory(request.data.medicalHistory[0]);
          } catch (error) {
               console.log(error);
          };
     };

     async function handleAllowEditing() {
          try {
               const request = await api.post(`/api/post/students/${id}/medical-history/update`);

               if (request.data.status === 'success') {
                    Keyboard.dismiss();
                    setSuccess(true);
               };

               return;
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
                    openAllowEditingModal &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='file-plus' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   Deseja permitir que o aluno preencha a ficha novamente?
                              </Text>
                              <TouchableOpacity onPress={handleAllowEditing} activeOpacity={0.7} className='w-full -mb-5 h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Sim
                                   </Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => setOpenAllowEditingModal(false)} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Não
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               {
                    success &&
                    <View className='flex-1 w-full h-full bg-gray-100/80 justify-center items-center absolute z-10'>
                         <View className='bg-white justify-center items-center w-[80%] space-y-5 px-5 pt-5 rounded-lg'>
                              <Feather name='check' size={24} color='black' />
                              <Text className='font-title text-lg text-center'>
                                   A ficha pode ser editada novamente.
                              </Text>
                              <TouchableOpacity onPress={() => navigate('studentDetails', { id })} activeOpacity={0.7} className='w-full h-20 border-t-[1px] border-t-gray-200 justify-center items-center'>
                                   <Text className='text-black font-text text-base'>
                                        Okay
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               }
               <ScrollView className='flex-1 bg-white'>
                    <View className='mt-20 mb-8 px-8'>
                         <View className='flex-row justify-between items-center'>
                              <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                                   <Ionicons name='ios-chevron-back' size={24} color='black' />
                              </TouchableOpacity>
                              {
                                   medicalHistory?.filled ?
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => setOpenAllowEditingModal(true)} className='items-center justify-center py-3'>
                                             <Feather name='edit-3' size={24} color='black' />
                                        </TouchableOpacity> :
                                        <View className='items-center justify-center p-3'></View>
                              }
                         </View>
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
                                             <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black'>O aluno já fez alguma cirurgia?</Text>
                                                  <Text className='text-lg font-title text-black'>{medicalHistory.surgicalHistory ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                             <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black'>O aluno já teve algum antecedente oncológico?</Text>
                                                  <Text className='text-lg font-title text-black'>{medicalHistory.oncologicalHistory ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                             <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black'>O aluno tem hipertensão?</Text>
                                                  <Text className='text-lg font-title text-black'>{medicalHistory.hypertension ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                             <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black'>O aluno tem hipotensão?</Text>
                                                  <Text className='text-lg font-title text-black'>{medicalHistory.hypotension ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                             <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black'>O aluno tem diabetes?</Text>
                                                  <Text className='text-lg font-title text-black'>{medicalHistory.diabetes ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                             <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black'>O aluno tem epilepsia?</Text>
                                                  <Text className='text-lg font-title text-black'>{medicalHistory.epilepsy ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                        </View>
                                        <Text className='text-xl font-title text-black mt-4'>
                                             Hábitos sociais
                                        </Text>
                                        <View className='mt-4 space-y-3'>
                                             <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black'>O aluno fuma?</Text>
                                                  <Text className='text-lg font-title text-black'>{medicalHistory.smoker ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                             <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black'>O aluno bebe bebidas alcóolicas?</Text>
                                                  <Text className='text-lg font-title text-black'>{medicalHistory.drinker ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                             <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black'>O aluno fez algum teste de esforço, ergométrico ou ergoespirométrico recentemente?</Text>
                                                  <Text className='text-lg font-title text-black'>{medicalHistory.stressTest ? 'Sim.' : 'Não.'}</Text>
                                             </View>
                                             <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black'>Quantas horas de sono o aluno dorme por dia?</Text>
                                                  <Text className='text-lg font-title text-black'>{medicalHistory.sleepHours} horas.</Text>
                                             </View>
                                             <View className='flex-col justify-between pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black'>Qual estilo de vida do aluno?</Text>
                                                  <Text className='text-lg font-title text-black'>{medicalHistory.lifeStyle ? 'Ativo.' : 'Sedentário.'}</Text>
                                             </View>
                                             <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                  <Text className='text-lg font-text text-black'>Há quantos meses o aluno está sem fazer academia?</Text>
                                                  <Text className='text-lg font-title text-black'>{medicalHistory.timeWithoutTraining} meses.</Text>
                                             </View>
                                             <Text className='text-xl font-title text-black mt-4'>
                                                  Dores articulares
                                             </Text>
                                             <View className='mt-4 space-y-3'>
                                                  <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black'>O aluno sente dores no pescoço?</Text>
                                                       <Text className='text-lg font-title text-black'>{medicalHistory.neckPain ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black'>O aluno sente dores nos ombros?</Text>
                                                       <Text className='text-lg font-title text-black'>{medicalHistory.shoulderPain ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black'>O aluno sente dores nas costas?</Text>
                                                       <Text className='text-lg font-title text-black'>{medicalHistory.backPain ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black'>O aluno sente dores nos punhos?</Text>
                                                       <Text className='text-lg font-title text-black'>{medicalHistory.wristPain ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black'>O aluno sente dores nos dedos das mãos?</Text>
                                                       <Text className='text-lg font-title text-black'>{medicalHistory.fingerPain ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black'>O aluno sente dores no quadril?</Text>
                                                       <Text className='text-lg font-title text-black'>{medicalHistory.hipPain ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black'>O aluno sente dores nos joelhoes?</Text>
                                                       <Text className='text-lg font-title text-black'>{medicalHistory.kneePain ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                             </View>
                                             <Text className='text-xl font-title text-black mt-4'>
                                                  Questionário de Prontidão para Atividade Física (PAR-Q)
                                             </Text>
                                             <View className='mt-4 space-y-3'>
                                                  <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black'>Algum médico já disse que o aluno possui algum problema de coração e que só deveria realizar atividades físicas supervisionado por profissionais de saúde?</Text>
                                                       <Text className='text-lg font-title text-black'>{medicalHistory.heartProblem ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black'>O aluno sente dores no peito quando pratica atividade física?</Text>
                                                       <Text className='text-lg font-title text-black'>{medicalHistory.chestPain ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black'>E no último mês, estas dores ocorreram?</Text>
                                                       <Text className='text-lg font-title text-black'>{medicalHistory.chestPainLastMonth ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black'>O aluno apresenta desequilíbrio devido à tontura e/ou perda de consciência?</Text>
                                                       <Text className='text-lg font-title text-black'>{medicalHistory.imbalance ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black'>O aluno possui algum problema ósseo ou articular que poderia ser piorado pela atividade física?</Text>
                                                       <Text className='text-lg font-title text-black'>{medicalHistory.boneJointIssue ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-col pb-4 border-b-[1px] border-b-gray-100'>
                                                       <Text className='text-lg font-text text-black'>Atualmente, o aluno toma algum medicamento para pressão arterial e/ou problema de coração?</Text>
                                                       <Text className='text-lg font-title text-black'>{medicalHistory.medication ? 'Sim.' : 'Não.'}</Text>
                                                  </View>
                                                  <View className='flex-col justify-between pb-4'>
                                                       <Text className='text-lg font-text text-black'>Sabe de alguma outra razão pela qual o aluno não deve praticar atividade física?</Text>
                                                       <Text className='text-lg font-title text-black'>{medicalHistory.reasonForNotExercising || 'Não preenchido.'}</Text>
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