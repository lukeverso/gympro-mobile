export declare global {
     namespace ReactNavigation {
          interface RootParamList {
               // Screens with no variable as parameter
               changePicture: undefined;
               checkEmail: undefined;
               edit: undefined;
               editAddress: undefined;
               editEmail: undefined;
               editName: undefined;
               editTelephone: undefined;
               evolution: undefined;
               findByEmail: undefined;
               home: undefined;
               login: undefined;
               main: undefined;
               studentList: undefined;
               menu: undefined;
               multipleNotifications: undefined;
               profile: undefined;
               scanCode: undefined;
               // Screens with variable(s) as parameter(s)
               create: { email: string; };
               checkCode: { email: string; };
               createExercise: { studentId: string | undefined; workoutId: string | undefined; };
               createSheet: { id: string | undefined; };
               createWorkout: { id: string | undefined; };
               exerciseDetails: { exerciseId: string | undefined; studentId: string | undefined; workoutId: string | undefined; };
               measures: { id: string | undefined; };
               medicalHistory: { id: string | undefined; };
               singleNotification: { id?: string | undefined; };
               studentDetails: { id: string | undefined; };
               workoutDetails: { studentId: string | undefined; workoutId: string | undefined; };
          }
     }
}
