import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export function FAQ() {
     const [accordionItems, setAccordionItems] = useState([
          { title: 'Lorem ipsum dolor sit amet', isExpanded: false, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar congue orci, ut placerat massa congue pellentesque. Curabitur vitae dolor eu ex blandit finibus quis et arcu. In faucibus egestas pretium. In tortor libero, eleifend non nibh vel, finibus pulvinar orci. Sed non mattis turpis. Aliquam nec quam turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.' },
          { title: 'Lorem ipsum dolor sit amet', isExpanded: false, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar congue orci, ut placerat massa congue pellentesque. Curabitur vitae dolor eu ex blandit finibus quis et arcu. In faucibus egestas pretium. In tortor libero, eleifend non nibh vel, finibus pulvinar orci. Sed non mattis turpis. Aliquam nec quam turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.' },
          { title: 'Lorem ipsum dolor sit amet', isExpanded: false, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar congue orci, ut placerat massa congue pellentesque. Curabitur vitae dolor eu ex blandit finibus quis et arcu. In faucibus egestas pretium. In tortor libero, eleifend non nibh vel, finibus pulvinar orci. Sed non mattis turpis. Aliquam nec quam turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.' },
     ]);

     const toggleItem = (index: number) => {
          setAccordionItems((prevState) => {
               const updatedItems = [...prevState];
               updatedItems[index].isExpanded = !updatedItems[index].isExpanded;
               return updatedItems;
          });
     };

     return (
          <ScrollView showsVerticalScrollIndicator={false} className='flex-1 bg-white'>
               <View className='mt-20 px-8'>
                    <TouchableOpacity>
                         <Ionicons name='ios-chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text className='mt-8 text-2xl font-title'>
                         Dúvidas frequentes
                    </Text>
                    <Text className='font-text text-sm'>
                         Algumas respostas sobre o aplicativo GymPro
                    </Text>
               </View>
               {accordionItems.map((item, index) => (
                    <View key={index} className='border-b-2 border-b-gray-200'>
                         <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() => toggleItem(index)}
                              className='flex-row justify-between items-center px-8 h-20'
                         >
                              <View className='flex-row items-center'>
                                   <AntDesign name='questioncircleo' size={24} color='black' />
                                   <Text className='font-title text-lg ml-3'>{item.title}</Text>
                              </View>
                              {
                                   item.isExpanded ?
                                        <Ionicons name='ios-chevron-up' size={24} color='black' /> :
                                        <Ionicons name='ios-chevron-down' size={24} color='black' />
                              }
                         </TouchableOpacity>
                         {
                              item.isExpanded &&
                              <View className='px-8 mb-8'>
                                   <Text className='font-text text-base'>
                                        {item.content}
                                   </Text>
                              </View>
                         }
                    </View>
               ))}
          </ScrollView>
     );
};