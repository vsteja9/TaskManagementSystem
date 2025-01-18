import { columnType } from "./Enums";

export enum UserRoles {
  admin = "ADMIN",
  user = "USER",
}
export type registerUserResponse = {
  id: string;
  name: string;
  email: string;
  createDateTime: Date;
  lastChangedDateTime: Date;
  role: UserRoles;
};

export type AddProjectRes = {
  id: string;
  name: string;
  description: string;
};

export type projectRes = {
  id: string;
  name: string;
  description: string;
  createDateTime: Date;
  lastChangedDateTime: Date;
};
export type usersRes = {
  name: string;
  email: string;
  role: UserRoles;
  tasks: any[];
  id: string;
  createDateTime: Date;
  lastChangedDateTime: Date;
};

export type taskRes = {
  createDateTime: Date;
  description: string;
  id: string;
  lastChangedDateTime: Date;
  name: string;
  status: dbtaskStatus;
  project: getProjectRes;
  user: getUserRes;
};
export enum dbtaskStatus {
  ANALYSIS = "Analysis",
  DEV = "Dev",
  QA = "qa",
  DONE = "Done",
}

type getProjectRes = {
  createDateTime: Date;
  description: string;
  id: string;
  lastChangedDateTime: Date;
  name: string;
};

type getUserRes = {
  createDateTime: Date;
  email: string;
  id: string;
  lastChangedDateTime: string;
  name: string;
  role: UserRoles;
};
