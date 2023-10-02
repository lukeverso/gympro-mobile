import { api } from '../lib/api';
import { ReactNode, createContext, useState } from 'react';

interface LoginProps {
     email: string;
     password: string;
}

export interface AuthContextDataProps {
     student: string | null;
     isStudentAuthorized: boolean | null;
     login: ({ email, password }: LoginProps) => Promise<void>;
     logout: () => Promise<void>;
}

type AuthContextProviderProps = {
     children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
     const [isStudentAuthorized, setIsStudentAuthorized] = useState<boolean | null>(null);
     const [student, setStudent] = useState<string | null>(null);

     function applyTokenInApiHeaders(token: string) {
          api.defaults.headers.authorization = `Bearer ${token}`;
     };

     async function login({ email, password }: LoginProps) {
          try {
               const response = await api.post('/api/post/students/login', { email, password });

               const student = {
                    id: response.data.user.id,
                    token: response.data.token
               };

               applyTokenInApiHeaders(student.token);
               
               setStudent(student.id);
               
               setIsStudentAuthorized(true);
          } catch (error) {
               throw error;
          };
     };

     async function logout() {
          try {               
               setStudent(null);

               setIsStudentAuthorized(false);
          } catch (error) {
               console.log('Erro ao realizar o logout:', error);
          };
     };

     return (
          <AuthContext.Provider value={{ student, isStudentAuthorized, login, logout }}>
               {children}
          </AuthContext.Provider>
     );
};

export default AuthContextProvider;
