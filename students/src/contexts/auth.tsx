import { ReactNode, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../lib/api';

import * as SecureStore from 'expo-secure-store';

interface LoginProps {
     email: string;
     password: string;
}

interface UserProps {
     id: string;
}

export interface AuthContextDataProps {
     user: UserProps | null;
     login: ({ email, password }: LoginProps) => Promise<boolean>;
     logout: () => Promise<void>;
}

type AuthContextProviderProps = {
     children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
     const [user, setUser] = useState<UserProps | null>(null);

     function applyTokenInApiHeaders(token: string) {
          api.defaults.headers.authorization = `Bearer ${token}`;
     };

     async function login({ email, password }: LoginProps) {
          try {
               const response = await api.post('/api/post/students/login', { email, password });

               const { user, token } = response.data;

               applyTokenInApiHeaders(token);

               SecureStore.setItemAsync('token', token);

               setUser(user);

               return true;
          } catch (error) {
               console.log('Tô aqui')
               throw error;
          };
     };

     async function logout() {
          try {
               SecureStore.deleteItemAsync('token');

               setUser(null);
          } catch (error) {
               console.log('Erro ao realizar o logout:', error);
          };
     };

     return (
          <AuthContext.Provider value={{ user, login, logout }}>
               {children}
          </AuthContext.Provider>
     );
}

export default AuthContextProvider;
