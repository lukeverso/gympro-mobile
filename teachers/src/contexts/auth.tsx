import { ReactNode, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../lib/api';

interface LoginProps {
     email: string;
     password: string;
}

interface UserProps {
     id: string;
}

export interface AuthContextDataProps {
     user: UserProps | null;
     login: ({ email, password }: LoginProps) => Promise<void>;
     logout: () => Promise<void>;
}

type AuthContextProviderProps = {
     children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
     const [user, setUser] = useState<UserProps | null>(null);

     useEffect(() => {
          loadUserFromStorage();
     }, []);

     async function loadUserFromStorage() {
          try {
               const storedUser = await AsyncStorage.getItem('user');

               if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);

                    applyTokenInApiHeaders(parsedUser.token);

                    setUser(parsedUser);
               };
          } catch (error) {
               console.log('Erro ao carregar os dados do usuário:', error);
          };
     };

     function applyTokenInApiHeaders(token: string) {
          api.defaults.headers.authorization = `Bearer ${token}`;
     };

     async function login({ email, password }: LoginProps) {
          try {
               const response = await api.post('/teachers/login', { email, password });
               
               const { teacher, token } = response.data;

               applyTokenInApiHeaders(token);

               const userToStore = {
                    ...teacher,
                    token,
               };

               await AsyncStorage.setItem('user', JSON.stringify(userToStore));
               setUser(userToStore);
          } catch (error) {
               console.log('Erro ao realizar o login:', error);
          };
     };

     async function logout() {
          try {
               await AsyncStorage.removeItem('user');

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
