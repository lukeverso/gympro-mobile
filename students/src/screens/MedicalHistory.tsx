import { api } from '../lib/api';
import { AuthContext } from '../contexts/auth';
import { useCallback, useContext, useState } from 'react';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, TouchableOpacity, View, Switch, ScrollView, TextInput, Image, Keyboard } from 'react-native';

import anamnesis from '../assets/images/anamnesis.png';

export function MedicalHistory() {
     const { goBack, navigate } = useNavigation();
     const { student } = useContext(AuthContext);

     const [success, setSuccess] = useState(false);
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');

     const [filled, setFilled] = useState<boolean>(false);

     const [surgicalHistory, setSurgicalHistory] = useState<boolean>(false);
     const [oncologicalHistory, setOncologicalHistory] = useState<boolean>(false);
     const [hypertension, setHypertension] = useState<boolean>(false);
     const [hypotension, setHypotension] = useState<boolean>(false);
     const [diabetes, setDiabetes] = useState<boolean>(false);
     const [epilepsy, setEpilepsy] = useState<boolean>(false);

     const [smoker, setSmoker] = useState<boolean>(false);
     const [drinker, setDrinker] = useState<boolean>(false);
     const [stressTest, setStressTest] = useState<boolean>(false);

     const [neckPain, setNeckPain] = useState<boolean>(false);
     const [shoulderPain, setShoulderPain] = useState<boolean>(false);
     const [backPain, setBackPain] = useState<boolean>(false);
     const [wristPain, setWristPain] = useState<boolean>(false);
     const [fingerPain, setFingerPain] = useState<boolean>(false);
     const [hipPain, setHipPain] = useState<boolean>(false);
     const [kneePain, setKneePain] = useState<boolean>(false);

     const [heartProblem, setHeartProblem] = useState<boolean>(false);
     const [chestPain, setChestPain] = useState<boolean>(false);
     const [chestPainLastMonth, setChestPainLastMonth] = useState<boolean>(false);
     const [imbalance, setImbalance] = useState<boolean>(false);
     const [boneJointIssue, setBoneJointIssue] = useState<boolean>(false);
     const [medication, setMedication] = useState<boolean>(false);
     const [lifeStyle, setLifeStyle] = useState<boolean>(false);

     const [sleepHours, setSleepHours] = useState<string>('');
     const [timeWithoutTraining, setTimeWithoutTraining] = useState<string>('');
     const [reasonForNotExercising, setReasonForNotExercising] = useState<string>('');

     const [responsibilityTerm, setResponsibilityTerm] = useState<boolean>(false);

     async function getData() {
          try {
               const request = await api.get(`/api/get/students/${student}/medical-history`);

               if (request.data.medicalHistory.length > 0) setFilled(true);
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

     async function handleMedicalHistorySaving() {
          setError(false);
          setErrorMessage('');

          if (sleepHours === '') {
               setError(true);
               setErrorMessage('Insira a quantidade de horas de sono.');
               return;
          };

          if (timeWithoutTraining === '') {
               setError(true);
               setErrorMessage('Insira a quantidade de meses sem fazer academia.');
               return;
          };

          if (responsibilityTerm === false) {
               setError(true);
               setErrorMessage('Aceite o termo de responsabilidade.');
               return;
          };

          try {
               const request = await api.post(
                    `api/post/students/${student}/medical-history`,
                    {
                         backPain,
                         boneJointIssue,
                         chestPain,
                         chestPainLastMonth,
                         diabetes,
                         drinker,
                         epilepsy,
                         fingerPain,
                         heartProblem,
                         hipPain,
                         hypertension,
                         hypotension,
                         imbalance,
                         kneePain,
                         lifeStyle,
                         medication,
                         neckPain,
                         oncologicalHistory,
                         reasonForNotExercising,
                         shoulderPain,
                         sleepHours,
                         smoker,
                         stressTest,
                         surgicalHistory,
                         timeWithoutTraining,
                         wristPain
                    }
               );

               if (request.data.status === 'success') {
                    Keyboard.dismiss();
                    setSuccess(true);
               } else {
                    setError(true);
                    setErrorMessage(request.data.message);
                    return;
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
                              <Ionicons name='chevron-back' size={24} color='black' />
                         </TouchableOpacity>
                         <Text className='text-3xl font-title text-black mt-8'>
                              Ficha de anamnese
                         </Text>
                         {filled ?
                              <View className='mt-8 flex-col items-center'>
                                   <Image source={anamnesis} className='h-40 w-64 rounded' />
                                   <Text className='text-xl font-title text-black mt-4'>
                                        Ficha já preenchida!
                                   </Text>
                                   <Text className='text-base font-text text-black mt-4 text-center'>
                                        Converse com seu professor{'\n'}
                                        sobre os resultados.
                                   </Text>
                              </View>
                              : <>
                                   <Text className='text-xl font-title text-black mt-8'>
                                        Histórico patológico
                                   </Text>
                                   <View className='mt-4 space-y-3'>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você já fez alguma cirurgia?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={surgicalHistory ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setSurgicalHistory(previousState => !previousState)}
                                                  value={surgicalHistory}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você já teve algum antecedente oncológico?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={oncologicalHistory ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setOncologicalHistory(previousState => !previousState)}
                                                  value={oncologicalHistory}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você tem hipertensão?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={hypertension ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setHypertension(previousState => !previousState)}
                                                  value={hypertension}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você tem hipotensão?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={hypotension ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setHypotension(previousState => !previousState)}
                                                  value={hypotension}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você tem diabetes?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={diabetes ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setDiabetes(previousState => !previousState)}
                                                  value={diabetes}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você tem epilepsia?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={epilepsy ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setEpilepsy(previousState => !previousState)}
                                                  value={epilepsy}
                                             />
                                        </View>
                                   </View>
                                   <Text className='text-xl font-title text-black mt-4'>
                                        Hábitos sociais
                                   </Text>
                                   <View className='mt-4 space-y-3'>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você fuma?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={smoker ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setSmoker(previousState => !previousState)}
                                                  value={smoker}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você bebe bebidas alcóolicas?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={drinker ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setDrinker(previousState => !previousState)}
                                                  value={drinker}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você fez algum teste de esforço, ergométrico ou ergoespirométrico recentemente?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={stressTest ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setStressTest(previousState => !previousState)}
                                                  value={stressTest}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Quantas horas de sono você dorme por dia?</Text>
                                             <View className='mt-2 flex-row justify-center items-center space-x-2'>
                                                  <TextInput
                                                       keyboardType='number-pad'
                                                       placeholder='Ex.: 8'
                                                       className='mt-2 text-center border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                       onChangeText={setSleepHours}
                                                       value={sleepHours}
                                                  />
                                                  <Text className='font-text text-base text-black -mb-2'>horas</Text>
                                             </View>
                                        </View>
                                        <View className='flex-col justify-between pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black'>Qual seu estilo de vida?</Text>
                                             <View className='mt-4 flex-row justify-between space-x-4'>
                                                  <TouchableOpacity
                                                       activeOpacity={0.7}
                                                       onPress={() => setLifeStyle(true)}
                                                       className={`flex-1 py-3 justify-center items-center border-[1px] ${lifeStyle ? 'border-black' : 'border-zinc-200'} rounded-lg`}
                                                  >
                                                       <Text className='font-text text-base text-black'>Ativo</Text>
                                                  </TouchableOpacity>
                                                  <TouchableOpacity
                                                       activeOpacity={0.7}
                                                       onPress={() => setLifeStyle(false)}
                                                       className={`flex-1 py-3 justify-center items-center border-[1px] ${lifeStyle ? 'border-zinc-200' : 'border-black'} rounded-lg`}
                                                  >
                                                       <Text className='font-text text-base text-black'>Sedentário</Text>
                                                  </TouchableOpacity>
                                             </View>
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Há quantos meses você está sem fazer academia?</Text>
                                             <View className='mt-2 flex-row justify-center items-center space-x-2'>
                                                  <TextInput
                                                       keyboardType='number-pad'
                                                       placeholder='Ex.: 3'
                                                       className='mt-2 text-center border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                       onChangeText={setTimeWithoutTraining}
                                                       value={timeWithoutTraining}
                                                  />
                                                  <Text className='font-text text-base text-black -mb-2'>meses</Text>
                                             </View>
                                        </View>
                                   </View>
                                   <Text className='text-xl font-title text-black mt-4'>
                                        Dores articulares
                                   </Text>
                                   <View className='mt-4 space-y-3'>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você sente dores no pescoço?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={neckPain ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setNeckPain(previousState => !previousState)}
                                                  value={neckPain}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você sente dores nos ombros?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={shoulderPain ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setShoulderPain(previousState => !previousState)}
                                                  value={shoulderPain}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você sente dores nas costas?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={backPain ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setBackPain(previousState => !previousState)}
                                                  value={backPain}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você sente dores nos punhos?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={wristPain ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setWristPain(previousState => !previousState)}
                                                  value={wristPain}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você sente dores nos dedos das mãos?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={fingerPain ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setFingerPain(previousState => !previousState)}
                                                  value={fingerPain}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você sente dores no quadril?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={hipPain ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setHipPain(previousState => !previousState)}
                                                  value={hipPain}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você sente dores nos joelhoes?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={kneePain ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setKneePain(previousState => !previousState)}
                                                  value={kneePain}
                                             />
                                        </View>
                                   </View>
                                   <Text className='text-xl font-title text-black mt-4'>
                                        Questionário de Prontidão para Atividade Física (PAR-Q)
                                   </Text>
                                   <View className='mt-4 space-y-3'>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Algum médico já disse que você possui algum problema de coração e que só deveria realizar atividades físicas supervisionado por profissionais de saúde?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={heartProblem ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setHeartProblem(previousState => !previousState)}
                                                  value={heartProblem}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você sente dores no peito quando pratica atividade física?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={chestPain ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setChestPain(previousState => !previousState)}
                                                  value={chestPain}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>E no último mês, estas dores ocorreram?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={chestPainLastMonth ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setChestPainLastMonth(previousState => !previousState)}
                                                  value={chestPainLastMonth}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você apresenta desequilíbrio devido à tontura e/ou perda de consciência?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={imbalance ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setImbalance(previousState => !previousState)}
                                                  value={imbalance}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Você possui algum problema ósseo ou articular que poderia ser piorado pela atividade física?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={boneJointIssue ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setBoneJointIssue(previousState => !previousState)}
                                                  value={boneJointIssue}
                                             />
                                        </View>
                                        <View className='flex-row justify-between items-center pb-4 border-b-[1px] border-b-gray-100'>
                                             <Text className='text-lg font-text text-black flex-1'>Atualmente, você toma algum medicamento para pressão arterial e/ou problema de coração?</Text>
                                             <Switch
                                                  trackColor={{ false: '#767577', true: '#EAEAEA' }}
                                                  thumbColor={medication ? '#767577' : '#EAEAEA'}
                                                  onValueChange={() => setMedication(previousState => !previousState)}
                                                  value={medication}
                                             />
                                        </View>
                                        <View className='flex-col justify-between pb-4'>
                                             <Text className='text-lg font-text text-black flex-1'>Sabe de alguma outra razão pela qual você não deve praticar atividade física?</Text>
                                             <TextInput
                                                  multiline
                                                  keyboardType='default'
                                                  placeholder='Opcional'
                                                  className='mt-2 border-b-[1px] border-b-zinc-200 focus:border-b-black px-3 py-3 text-base font-text'
                                                  onChangeText={setReasonForNotExercising}
                                                  value={reasonForNotExercising}
                                             />
                                        </View>
                                   </View>
                                   <Text className='text-xl font-title text-black mt-4'>
                                        Termo de responsabilidade
                                   </Text>
                                   <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => setResponsibilityTerm(previousState => !previousState)}
                                        className={`my-8 py-4 px-6 space-x-5 flex-row items-center rounded-lg border-[1px] ${responsibilityTerm ? 'border-green-300' : 'border-red-300'}`}
                                   >
                                        {responsibilityTerm ? <Feather name='check' size={24} color='#05944f' /> : <AntDesign name='close' size={24} color='#dc2626' />}
                                        <Text className='text-base font-text text-justify text-black flex-1'>Afirmo que as informações aqui preenchidas são verdadeiras e que não omiti nenhuma outra relacionada a minha saúde.</Text>
                                   </TouchableOpacity>
                                   <View className='space-y-5'>
                                        {
                                             error &&
                                             <View className='flex-row justify-center items-center space-x-5 py-3 px-4 bg-red-400 rounded'>
                                                  <AntDesign name='warning' size={24} color='white' />
                                                  <Text className='font-text text-white text-base'>
                                                       {errorMessage}
                                                  </Text>
                                             </View>
                                        }
                                        <TouchableOpacity onPress={handleMedicalHistorySaving} activeOpacity={0.7} className='rounded py-3 justify-center items-center bg-black flex-row'>
                                             <Text className='text-white text-base font-title'>Salvar</Text>
                                        </TouchableOpacity>
                                   </View>
                              </>
                         }
                    </View>
               </ScrollView>
          </>
     );
};