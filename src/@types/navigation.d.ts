export declare global {
     namespace ReactNavigation {
          interface RootParamList {
               main: undefined;
               login: undefined;
               create: {
                    email: string;
               };
               checkEmail: undefined;
               noPersonal: undefined;
               noWorkout: undefined;
               home: undefined;
               notifications: undefined;
               trainDetails: undefined;
               beginTrain: undefined;
               finishTrain: undefined;
               profile: undefined;
               edit: undefined;
               measures: undefined;
               protectedRoutes: undefined; // Adicionada a rota 'protectedRoutes'
          }
     }
}
