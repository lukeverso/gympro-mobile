export declare global {
     namespace ReactNavigation {
          interface RootParamList {
               main: undefined;
               login: undefined;
               create: {
                    email: string;
               };
               checkCode: {
                    email: string;
               };
               checkEmail: undefined;
               medicalHistory: undefined;
               noPersonal: undefined;
               noWorkout: undefined;
               home: undefined;
               menu: undefined;
               changePicture: undefined;
               notifications: undefined;
               trainDetails: {
                    id: string;
               };
               beginTrain: undefined;
               currentExercise: undefined;
               finishTrain: undefined;
               profile: undefined;
               edit: undefined;
               editName: undefined;
               editEmail: undefined;
               editTelephone: undefined;
               editAddress: undefined;
               measures: undefined;
               evolution: undefined;
          }
     }
}
