// we need to call the apis here and write the custom hook.
// 1. register
// 2. login
// 3. add task
// 4. get tasks fro selected project
// 5. get all users
// 6. add user  or it is register
// 7. add project
// 8. update task
// 9. delete task

import {
  projectReq,
  registerUserReq,
  taskReq,
  updateTaskReq,
} from "../Utils/RequestsDtos";
import {
  AddProjectRes,
  projectRes,
  registerUserResponse,
  usersRes,
} from "../Utils/Responses";
import axios from "axios";
export async function fetchToken() {
  let token: string | null = localStorage.getItem("JWTtoken");
  if (token) {
    const usercred = JSON.parse(localStorage.getItem("userCred") || "");
    if (!usercred)
      token = await generateToken({
        email: "vst123@gmail.com",
        password: "Vst@12345",
      });
    else {
      token = await generateToken(usercred);
    }
  }
  return token?.replace('"', "")?.replace('"', "");
}

export async function generateToken(payload: any): Promise<string> {
  // temporary hardcoding initial user credentials.
  // but on going forward we can store credentials in gcp secrets..
  // const payload = { email: "vst123@gmail.com", password: "Vst@12345" };
  try {
    const response = await axios.post(
      `https://tmsbe.onrender.com/login`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}
export type Requests = {
  registerUser(user: registerUserReq): Promise<registerUserResponse | void>;
  AddTask(task: taskReq): any;
  AddProject(projectReq: projectReq): Promise<AddProjectRes>;
  getTasksForProject(projectId: string): any;
  getAllUsers(): Promise<usersRes[]>;
  updateTask(params: { id: string; task: updateTaskReq }): any;
  deleteTask(taskId: string): any;
  getAllProjects(): Promise<projectRes[]>;
};
export const useAllRequests = (): Requests => {
  async function registerUser(user: registerUserReq): Promise<void> {
    try {
      const URL = `https://tmsbe.onrender.com/users/create`;

      // if (token)
      //   token = await generateToken({
      //     email: "vst123@gmail.com",
      //     password: "Vst@12345",
      //   });
      const registerToken = await generateToken({
        email: "vst123@gmail.com",
        password: "Vst@12345",
      });
      const response = await axios.post(URL, user, {
        headers: {
          Authorization: `Bearer ${registerToken}`,
          "content-type": "application/json",
          accept: "*/*",
        },
      });
      localStorage.setItem(
        "JWTtoken",
        await generateToken({ email: user.email, password: user.password })
      );
      console.log("final response", response);
    } catch (err: any) {
      if (err.message === "jwt expired") {
        // need to handle the things..
      }
      throw err;
    }
  }
  async function AddTask(task: taskReq) {
    try {
      const URL = `https://tmsbe.onrender.com/tasks/create`;
      const response = await axios.post(URL, task, {
        headers: {
          Authorization: `Bearer ${await fetchToken()}`,
          "content-type": "application/json",
          accept: "*/*",
        },
      });
      console.log("response from addtask", response.data);
    } catch (err) {
      console.log("err from the add task", err);
      throw err;
    }
  }
  async function AddProject(projectReq: projectReq) {
    try {
      const URL = `https://tmsbe.onrender.com/projects/create`;
      console.log("jwt token", await fetchToken());
      const response = await axios.post(URL, projectReq, {
        headers: {
          Authorization: `Bearer ${await fetchToken()}`,
          "content-type": "application/json",
          accept: "*/*",
        },
      });
      console.log("response", response);
      return response.data;
    } catch (err) {
      console.log("err from the add project", err);
      throw err;
    }
  }

  async function getTasksForProject(projectId: string) {
    try {
      const URL = `https://tmsbe.onrender.com/tasks/project/${projectId}`;
      console.log("getprojects", URL, projectId);
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${await fetchToken()}`,
          "content-type": "application/json",
          accept: "*/*",
        },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  async function getAllUsers(): Promise<usersRes[]> {
    try {
      const URL = `https://tmsbe.onrender.com/users/all`;
      console.log("fetchToken", await fetchToken());
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${await fetchToken()}`,
          "content-type": "application/json",
          accept: "*/*",
        },
      });
      return response.data;
    } catch (err: any) {
      console.log(err.message);
      throw err;
    }
  }
  async function updateTask(params: any) {
    try {
      const { id, task } = params;
      const URL = `https://tmsbe.onrender.com/tasks/update/${id}`;
      const response = await axios.put(URL, task, {
        headers: {
          Authorization: `Bearer ${await fetchToken()}`,
          "content-type": "application/json",
          accept: "*/*",
        },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  async function deleteTask(id: string) {
    try {
      const URL = `https://tmsbe.onrender.com/tasks/delete/${id}`;
      const response = await axios.delete(URL, {
        headers: {
          Authorization: `Bearer ${await fetchToken()}`,
          "content-type": "application/json",
          accept: "*/*",
        },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  async function getAllProjects(): Promise<projectRes[]> {
    try {
      const URL = `https://tmsbe.onrender.com/projects/all`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${await fetchToken()}`,
          "content-type": "application/json",
          accept: "*/*",
        },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  return {
    AddTask,
    registerUser,
    AddProject,
    getTasksForProject,
    getAllUsers,
    updateTask,
    deleteTask,
    getAllProjects,
  };
};
