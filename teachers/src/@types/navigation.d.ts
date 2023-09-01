export declare global {
     namespace ReactNavigation {
          interface RootParamList {
               main: undefined;
               login: undefined;
               create: {
                    email: string;
               };
               checkEmail: undefined;
               checkCode: {
                    email: string;
               };
               home: undefined;
               studentList: undefined;
               findByEmail: undefined;
               studentDetails: {
                    id: string | undefined;
               };
               workoutDetails: {
                    studentId: string | undefined;
                    workoutId: string | undefined;
               };
               exerciseDetails: {
                    exerciseId: string | undefined;
                    studentId: string | undefined;
                    workoutId: string | undefined;
               };
               createSheet: {
                    id: string | undefined;
               };
               createWorkout: {
                    id: string | undefined;
               };
               medicalHistory: {
                    id: string | undefined;
               };
               createExercise: {
                    studentId: string | undefined;
                    workoutId: string | undefined;
               };
               menu: undefined;
               changePicture: undefined;
               multipleNotifications: undefined;
               singleNotification: {
                    id?: string | undefined;
               };
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
