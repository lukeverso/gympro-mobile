import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { api } from '../lib/api';

import home from '../assets/images/home.jpg';

interface ExerciseDetailsProps {
     id: string;
};

interface ExerciseProps {
     annotations: string | null;
     id: string;
     name: string;
     repetitions: number;
     restTime: number;
     series: number;
     weight: string;
};

export function ExerciseDetails() {
     const { goBack, navigate } = useNavigation();

     const route = useRoute();

     const { id } = route.params as ExerciseDetailsProps;

     async function getData() {
          try {
               const request = await api.get(`/workouts/${id}`);
          } catch (error) {
               console.log(error);
          };
     };

     useFocusEffect(useCallback(() => {
          // getData();
     }, []));

     return (
          <SafeAreaView className='flex-1 bg-white'>
               <ScrollView>
                    <View className='mt-20 px-8'>
                         <View className='flex-row justify-between items-center'>
                              <TouchableOpacity activeOpacity={0.7} onPress={goBack} className='items-center justify-center py-3'>
                                   <Ionicons name='ios-chevron-back' size={24} color='black' />
                              </TouchableOpacity>
                              <View className='items-center justify-center p-3'></View>
                         </View>
                         <Text className='mt-8 text-2xl font-title'>
                              Supino reto com barra
                         </Text>
                    </View>
               </ScrollView>
          </SafeAreaView>
     );
};