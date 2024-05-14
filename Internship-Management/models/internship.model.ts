export interface IReqId {
  id: string;
}

export interface IInternshipBatchReq {
  id?: number;
  batchname: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

export interface IInternshipBatchRes {
  status?: string;
  message?: string;
  data?: IInternshipBatchReq[];
}

export interface IMentorReq {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  domain: string;
  designation: string;
}

export interface IDomains {
  id: number;
  name: string;
}
export interface IDomainsRes {
  status: string;
  data: IDomains[];
}
export interface IDesignations {
  id: number;
  name: string;
}
export interface IDesignationsRes {
  status: string;
  data: IDesignations[];
}
