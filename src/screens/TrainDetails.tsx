import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { api } from '../lib/api';

interface TrainDetailsProps {
     id: string;
};

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

export function TrainDetails() {
     const { goBack } = useNavigation();

     const route = useRoute();

     const { id } = route.params as TrainDetailsProps;

     const [exercises, setExercises] = useState<ExercisesProps | null>(null);

     useEffect(() => {
          async function getExercises() {
               const response = await api.get(`/exercises/${id}`);

               setExercises(response.data.exercises);
          };

          getExercises();
     }, []);

     return (
          <ScrollView className='flex-1 bg-white'>
               <View className='mt-20 px-8 pb-10'>
                    <TouchableOpacity onPress={() => goBack()} activeOpacity={0.7}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-3xl font-title'>
                         Informações do treino
                    </Text>
                    <Text className='mt-8 text-2xl font-title'>
                         {exercises?.focus} ({exercises?.type})
                    </Text>
                    <Text className='text-lg font-text'>
                         Exercícios
                    </Text>
                    {
                         exercises?.exercises.map((exercise: ExerciseItemProps) => {
                              return (
                                   <View key={exercise.id} className='mt-8 px-5 py-5 bg-gray-100 rounded space-y-5'>
                                        <Text className='font-title text-xl'>
                                             {exercise.name}
                                        </Text>
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row space-x-3'>
                                             <View className='min-w-[100px] bg-white flex-1 rounded px-3 py-5 justify-center items-center'>
                                                  <Feather name='x' size={24} color='black' />
                                                  <Text className='font-title text-2xl mt-2'>{exercise.series}</Text>
                                                  <Text className='font-text text-xs'>séries</Text>
                                             </View>
                                             <View className='min-w-[100px] bg-white flex-1 rounded px-3 py-5 justify-center items-center'>
                                                  <Feather name='repeat' size={24} color='black' />
                                                  <Text className='font-title text-2xl mt-2'>{exercise.repetitions}</Text>
                                                  <Text className='font-text text-xs'>repetições</Text>
                                             </View>
                                             {
                                                  exercise.weight &&
                                                  (
                                                       <View className='min-w-[100px] bg-white flex-1 rounded px-3 py-5 justify-center items-center'>
                                                            <MaterialCommunityIcons name='weight' size={24} color='black' />
                                                            <Text className='font-title text-2xl mt-2'>{exercise.weight} kg</Text>
                                                            <Text className='font-text text-xs'>de carga</Text>
                                                       </View>
                                                  )
                                             }
                                             <View className='min-w-[100px] bg-white flex-1 rounded px-3 py-5 justify-center items-center'>
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
                         })
                    }
                    <View className='flex mt-8'>
                         <TouchableOpacity activeOpacity={0.7} className='py-3 bg-black flex-row items-center justify-center flex'>
                              <Text className='text-white text-base font-title mr-3'>Começar treino</Text>
                              <Feather name='check' size={24} color='white' />
                         </TouchableOpacity>
                    </View>
               </View>
          </ScrollView>
     );
};