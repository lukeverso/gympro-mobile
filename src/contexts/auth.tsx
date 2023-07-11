import { ReactNode, createContext, useState } from 'react';
import { api } from '../lib/api';

interface LoginProps {
     email: string;
     password: string;
};

interface UserProps {
     id: string;
     name: string;
     email: string;
};

export interface AuthContextDataProps {
     user: UserProps | null;
     login: ({ email, password }: LoginProps) => Promise<void>;
     logout: () => void;
};

type AuthContextProviderProps = {
     children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
     const [user, setUser] = useState<UserProps>({} as UserProps);

     function applyTokenInApiHeaders(token: string) {
          api.defaults.headers.authorization = `Bearer ${token}`;
     };

     async function login({ email, password }: LoginProps) {
          try {
               const request = await api.post('/students/login', { email, password });
               applyTokenInApiHeaders(request.data.token);
               setUser(request.data.user);
          } catch (error) {
               console.log(error);
          };
     };

     function logout() {
          
     };

     return (
          <AuthContext.Provider value={{ user, login, logout }}>
               {children}
          </AuthContext.Provider>
     );
};

export default AuthContextProvider;