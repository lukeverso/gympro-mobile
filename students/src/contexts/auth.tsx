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
     login: ({ email, password }: LoginProps) => Promise<boolean>;
     logout: () => Promise<void>;
     isTokenValid: () => Promise<void>;
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

                    const currentTime = Math.floor(Date.now() / 1000);

                    if (parsedUser.expiresIn && currentTime < parsedUser.expiresIn) {
                         applyTokenInApiHeaders(parsedUser.token);
                         setUser(parsedUser);
                    } else {
                         // Token has expired, log the user out
                         await logout();
                    }
               }
          } catch (error) {
               console.log('Erro ao carregar os dados do usuário:', error);
          }
     }

     async function isTokenValid() {
          try {
               const storedUser = await AsyncStorage.getItem('user');

               if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);

                    const currentTime = Math.floor(Date.now() / 1000);

                    return parsedUser.expiresIn && currentTime < parsedUser.expiresIn;
               }

               return false;
          } catch (error) {
               console.log('Erro ao verificar a validade do token:', error);
               return false;
          };
     };

     function applyTokenInApiHeaders(token: string) {
          api.defaults.headers.authorization = `Bearer ${token}`;
     };

     async function login({ email, password }: LoginProps) {
          try {
               const response = await api.post('/api/post/students/login', { email, password });

               const { user, token } = response.data;

               applyTokenInApiHeaders(token);

               const userToStore = {
                    ...user,
                    token,
               };

               await AsyncStorage.setItem('user', JSON.stringify(userToStore));

               setUser(userToStore);

               return true;
          } catch (error) {
               throw error;
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
          <AuthContext.Provider value={{ user, login, logout, isTokenValid }}>
               {children}
          </AuthContext.Provider>
     );
}

export default AuthContextProvider;
