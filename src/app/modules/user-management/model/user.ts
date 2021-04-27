export interface User {
  userId: number;
  clientName: string;
  requesterName: string;
  accessCode: string;
  accessStartDate: number;
  accessEndDate: number;
  accessStatus: string;
  accessReason: string;
  createdAt: number;
  updatedAt: number;
  lastLoggedIn: number;
  userMetaInfo: any;
}
