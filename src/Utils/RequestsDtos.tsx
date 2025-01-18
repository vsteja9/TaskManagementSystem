import { dbtaskStatus, UserRoles } from "./Responses";

export type registerUserReq = {
  name: string;
  role: UserRoles;
  email: string;
  password: string;
};

export type userLoginReq = {
  email: string;
  password: string;
};
export interface taskReq {
  taskName: string;
  taskDescription: string;
  userId: string;
  projectId: string;
}
export type projectReq = {
  name: string;
  description: string;
};

export interface updateTaskReq extends taskReq {
  status: dbtaskStatus;
}
