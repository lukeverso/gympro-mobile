import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

interface StudentDetailsProps {
     id: string;
};

interface StudentProps {
     age: number;
     birthdate: string;
     email: string;
     name: string;
     status: boolean;
     telephone: string;
};

export default function StudentDetails() {
     const { goBack, navigate } = useNavigation();

     const route = useRoute();

     const { id } = route.params as StudentDetailsProps;

     const [student, setStudent] = useState<StudentProps | null>(null);

     useEffect(() => {
          async function getDetails() {
               try {
                    const request = await api.get(`/students/details/${id}`);

                    setStudent(request.data);
               } catch (error) {
                    console.log(error);
               };
          };

          getDetails();
     }, []);

     return (
          <ScrollView className='flex-1 bg-white px-8'>
               <View className='mt-20 mb-10 w-full'>
                    <TouchableOpacity onPress={() => goBack()}>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-2xl font-title'>
                         Seu aluno
                    </Text>
                    <View className='mt-4 bg-gray-100 flex-row p-5 justify-between rounded-lg'>
                         <View className='space-y-1'>
                              <Text className='font-title text-xl'>{student?.name}</Text>
                              <Text className='font-text text-sm'>{student?.age} anos • Aluno {student?.status === true ? 'ativo' : 'inativo'}</Text>
                              <Text className='font-text text-sm'>{student?.email}</Text>
                              <Text className='font-text text-sm'>{student?.telephone}</Text>
                         </View>
                         <TouchableOpacity activeOpacity={0.7}>
                              <AntDesign name="close" size={24} color="black" />
                         </TouchableOpacity>
                    </View>
                    <View className='mt-8 flex-row justify-between items-center'>
                         <Text className='text-2xl font-title'>
                              Fichas de treino
                         </Text>
                         <TouchableOpacity activeOpacity={0.7}>
                              <Text className='text-sm text-black font-title'>
                                   Ver todas
                              </Text>
                         </TouchableOpacity>
                    </View>
                    <Text className='mt-8 text-2xl font-title'>
                         Opções gerais
                    </Text>
               </View>
          </ScrollView>
     );
};