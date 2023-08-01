export declare global {
     namespace ReactNavigation {
          interface RootParamList {
               main: undefined;
               login: undefined;
               create: {
                    email: string;
               };
               checkEmail: undefined;
               home: undefined;
               studentList: undefined;
               findByEmail: undefined;
               studentDetails: {
                    id: string;
               };
               workoutDetails: {
                    id: string;
               };
               exerciseDetails: {
                    id: string;
               };
               createSheet: {
                    id: string | undefined;
               };
               createWorkout: {
                    id: string | undefined;
               }
               createExercise: {
                    id: string | undefined;
               }
               menu: undefined;
               changePicture: undefined;
               notifications: undefined;
               profile: undefined;
               edit: undefined;
               editName: undefined;
               editEmail: undefined;
               editTelephone: undefined;
               editAddress: undefined;
               scanCode: undefined;
               measures: {
                    id: string | undefined;
               };
               evolution: undefined;
          }
     }
}
