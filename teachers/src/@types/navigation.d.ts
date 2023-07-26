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
               trainSheets: {
                    id: string;
               };
               menu: undefined;
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
