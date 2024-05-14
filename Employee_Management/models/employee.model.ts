export interface IEmployeeReq {
  id: number;
  name: string;
  emailId: string;
  designation: string;
}
export interface IEmployeeRes {
  status?: string;
  message?: string;
  data?: IEmployeeReq[];
}

// export interface IData {
//   id: number;
//   name: string;
//   emailId: string;
// }

export interface IReqId {
  id: string;
}
