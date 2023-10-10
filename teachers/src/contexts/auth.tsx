import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../lib/api';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface LoginProps {
     email: string;
     password: string;
}

export interface AuthContextDataProps {
     teacher: string | null;
     isTeacherAuthorized: boolean | null;
     login: ({ email, password }: LoginProps) => Promise<void>;
     logout: () => Promise<void>;
}

type AuthContextProviderProps = {
     children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
     const [isTeacherAuthorized, setIsTeacherAuthorized] = useState<boolean | null>(null);
     const [teacher, setTeacher] = useState<string | null>(null);

     async function getUserStored() {
          const teacher = await AsyncStorage.getItem('teacher');
          const token = await AsyncStorage.getItem('token');

          if (teacher && token) {
               setTeacher(teacher);
               api.defaults.headers.authorization = `Bearer ${token}`;
               setIsTeacherAuthorized(true);
          };
     };

     useEffect(() => {
          getUserStored();
     }, []);

     async function login({ email, password }: LoginProps) {
          try {
               const response = await api.post('/api/post/teachers/login', { email, password });

               const teacher = {
                    id: response.data.teacher.id,
                    token: response.data.token
               };

               AsyncStorage.setItem('teacher', teacher.id);
               AsyncStorage.setItem('token', teacher.token);

               api.defaults.headers.authorization = `Bearer ${teacher.token}`;

               setTeacher(teacher.id);
               
               setIsTeacherAuthorized(true);
          } catch (error) {
               throw error;
          };
     };

     async function logout() {
          try {
               AsyncStorage.removeItem('teacher');

               setTeacher(null);

               setIsTeacherAuthorized(false);
          } catch (error) {
               console.log('Erro ao realizar o logout:', error);
          };
     };

     return (
          <AuthContext.Provider value={{ teacher, isTeacherAuthorized, login, logout }}>
               {children}
          </AuthContext.Provider>
     );
};

export default AuthContextProvider;
