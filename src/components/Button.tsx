import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { ReactNode } from 'react';

interface ButtonProps {
     title: string;
     icon: ReactNode;
};

export function Button({ title, icon }: ButtonProps) {
     return (
          <TouchableOpacity activeOpacity={0.8} className='px-5 py-3 bg-white flex flex-row items-center justify-center gap-3'>
               <Text className='text-base font-bold'>
                    {title}
               </Text>
               {icon}
          </TouchableOpacity>
     );
};