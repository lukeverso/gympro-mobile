import { api } from '../lib/api';
import { useCallback, useState } from 'react';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface ExerciseItemProps {
     id: string;
     annotations: string | null;
     name: string;
     repetitions: number;
     restTime: number;
     series: number;
     weight: string;
};

interface ExercisesProps {
     active: boolean;
     exercises: ExerciseItemProps[];
     focus: string;
     type: string;
};

interface TrainDetailsProps {
     id: string;
};

export function TrainDetails() {
     const route = useRoute();

     const { goBack } = useNavigation();
     const { id } = route.params as TrainDetailsProps;

     const [refreshing, setRefreshing] = useState(false);
     const [loading, setLoading] = useState<boolean>(false);

     const [exercises, setExercises] = useState<ExercisesProps | null>(null);

     async function getExercises() {
          setLoading(true);

          try {
               const response = await api.get(`/api/get/exercises/${id}`);

               setExercises(response.data);

               setLoading(false);
          } catch (error) {
               console.log(error);
          };
     };

     useFocusEffect(useCallback(() => {
          getExercises();
     }, []));

     const onRefresh = useCallback(() => {
          setRefreshing(true);

          getExercises();

          setTimeout(() => {
               setRefreshing(false);
          }, 1000);
     }, []);

     return (
          <ScrollView
               showsVerticalScrollIndicator={false}
               refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
               }
               className='bg-white'
          >
               <View className='mt-20 px-8 pb-10'>
                    <TouchableOpacity onPress={() => goBack()} activeOpacity={0.7}>
                         <Ionicons name='chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-3xl font-title'>
                         Informações do treino
                    </Text>
                    {
                         loading ?
                              <ActivityIndicator className='mt-8' size='large' color='#000000' /> :
                              <>
                                   <Text className='mt-8 text-2xl font-title'>
                                        {exercises?.focus} ({exercises?.type})
                                   </Text>
                                   <Text className='text-lg font-text'>
                                        Exercícios
                                   </Text>
                                   {
                                        exercises?.exercises.length !== 0 ?
                                             exercises?.exercises.map((exercise: ExerciseItemProps) => {
                                                  return (
                                                       <View key={exercise.id} className='mt-8 space-y-5'>
                                                            <Text className='font-title text-xl'>
                                                                 {exercise.name}
                                                            </Text>
                                                            <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row space-x-3'>
                                                                 <View className='min-w-[130px] bg-gray-100 flex-1 rounded-lg px-5 py-5 justify-center items-center'>
                                                                      <Feather name='x' size={24} color='black' />
                                                                      <Text className='font-title text-2xl mt-2'>{exercise.series}</Text>
                                                                      <Text className='font-text text-xs'>séries</Text>
                                                                 </View>
                                                                 <View className='min-w-[130px] bg-gray-100 flex-1 rounded-lg px-5 py-5 justify-center items-center'>
                                                                      <Feather name='repeat' size={24} color='black' />
                                                                      <Text className='font-title text-2xl mt-2'>{exercise.repetitions}</Text>
                                                                      <Text className='font-text text-xs'>repetições</Text>
                                                                 </View>
                                                                 {
                                                                      exercise.weight &&
                                                                      (
                                                                           <View className='min-w-[130px] bg-gray-100 flex-1 rounded-lg px-5 py-5 justify-center items-center'>
                                                                                <MaterialCommunityIcons name='weight' size={24} color='black' />
                                                                                <Text className='font-title text-2xl mt-2'>{exercise.weight} kg</Text>
                                                                                <Text className='font-text text-xs'>de carga</Text>
                                                                           </View>
                                                                      )
                                                                 }
                                                                 <View className='min-w-[130px] bg-gray-100 flex-1 rounded-lg px-5 py-5 justify-center items-center'>
                                                                      <Feather name='clock' size={24} color='black' />
                                                                      <Text className='font-title text-2xl mt-2'>{exercise.restTime}s</Text>
                                                                      <Text className='font-text text-xs'>de descanso</Text>
                                                                 </View>
                                                            </ScrollView>
                                                            {
                                                                 exercise.annotations &&
                                                                 (
                                                                      <View className='flex-row space-x-3'>
                                                                           <Text className='font-title'>Descrição:</Text>
                                                                           <Text className='font-text flex-1'>{exercise.annotations}</Text>
                                                                      </View>
                                                                 )
                                                            }
                                                       </View>
                                                  )
                                             }) :
                                             <View className='w-full flex-col items-center mt-8 space-y-3'>
                                                  <Feather name="alert-circle" size={24} color="black" />
                                                  <Text className='font-title text-lg text-center leading-6'>
                                                       Você ainda não possui{'\n'}
                                                       exercícios neste treino
                                                  </Text>
                                                  <Text className='font-text text-base text-center'>
                                                       Converse com seu personal{'\n'}
                                                       para que ele possa criar os exercícios{'\n'}
                                                       de acordo com o seu objetivo.
                                                  </Text>
                                                  <Text className='text-center text-base font-text'>
                                                       (Puxe a tela para atualizar os dados{'\n'}
                                                       quando seu professor tiver adicionado{'\n'}
                                                       seus exercícios.)
                                                  </Text>
                                             </View>
                                   }
                              </>
                    }
               </View>
          </ScrollView>
     );
};