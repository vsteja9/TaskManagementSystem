import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { generateToken, useAllRequests } from ".";
import {
  projectReq,
  registerUserReq,
  taskReq,
  updateTaskReq,
} from "../Utils/RequestsDtos";
import { AddProjectRes, registerUserResponse } from "../Utils/Responses";
import { useContext } from "react";
import { LocalContext } from "../LocalContext";
import { useNavigate } from "react-router-dom";
import {
  getProjectsQueryKey,
  getTasksForProjectQueryKey,
  getUsersQueryKey,
} from "./queries";
import { AxiosError, HttpStatusCode } from "axios";

// we need to invalidate the queries once they are done.
export function useRegisterMutation(): UseMutationResult<
  void | registerUserResponse,
  unknown,
  registerUserReq,
  unknown
> {
  const { setSnackBarMessage, setSnackBar } = useContext(LocalContext);
  const { registerUser } = useAllRequests();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => registerUser(user),
    onSuccess: () => {
      setSnackBarMessage("User Registration Successful");
      setSnackBar(true);
      setTimeout(() => {
        navigate("/mainpage");
      }, 4000);
      queryClient.invalidateQueries({ queryKey: getUsersQueryKey() });
    },
    onError: (err: AxiosError) => {
      console.log("err mutation", err);
      if (err.status === 403)
        setSnackBarMessage(err.message + " Please Contact Admin Again.");
      else setSnackBarMessage("User Registration Failed.Please Try Again.");

      setSnackBar(true);
    },
  });
}

export function useAddTask(): UseMutationResult<
  void | unknown,
  unknown,
  taskReq,
  unknown
> {
  const { setSnackBar, setSnackBarMessage } = useContext(LocalContext);
  const { AddTask } = useAllRequests();
  const queryClient = useQueryClient();
  const { selectedProject } = useContext(LocalContext);
  return useMutation({
    mutationFn: (task) => AddTask(task),
    onSuccess: () => {
      // take the project id from data and invalidate the gettasks query...
      setSnackBar(true), setSnackBarMessage("Successfully added the task");
      queryClient.invalidateQueries({
        queryKey: getTasksForProjectQueryKey(selectedProject),
      });
    },
    onError: () => {
      setSnackBar(true),
        setSnackBarMessage("task addition failed.Please try Again.");
    },
  });
}

export function useAddProject(): UseMutationResult<
  void | AddProjectRes,
  unknown,
  projectReq,
  unknown
> {
  const { setSnackBar, setSnackBarMessage } = useContext(LocalContext);
  const { AddProject } = useAllRequests();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: projectReq) => AddProject(project),
    onSuccess: (data) => {
      console.log("success message from mutation...", data);
      setSnackBar(true);
      setSnackBarMessage("Successfully Added the Project");
      queryClient.invalidateQueries({
        queryKey: getProjectsQueryKey(),
      });
    },
    onError: (err) => {
      console.log("err", err);
      setSnackBar(true),
        setSnackBarMessage("Project Addition Failed.please try Again.");
    },
  });
}

export function useUpdateTask(): UseMutationResult<
  void,
  unknown,
  { id: string; task: updateTaskReq },
  unknown
> {
  const { updateTask } = useAllRequests();
  const { setSnackBar, setSnackBarMessage } = useContext(LocalContext);
  const { selectedProject } = useContext(LocalContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; task: updateTaskReq }) =>
      updateTask(params),
    onSuccess: () => {
      setSnackBar(true), setSnackBarMessage("Tasks are Successfully updated.");
      queryClient.invalidateQueries({
        queryKey: getTasksForProjectQueryKey(selectedProject),
      });
    },
    onError: () => {
      setSnackBar(true),
        setSnackBarMessage("Tasks are not updated Properly.Please try Again.");
    },
  });
}

export function useDeleteTask(): UseMutationResult<
  void,
  unknown,
  string,
  unknown
> {
  const { setSnackBar, setSnackBarMessage } = useContext(LocalContext);
  const { deleteTask } = useAllRequests();
  const queryClient = useQueryClient();
  const { selectedProject } = useContext(LocalContext);
  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      setSnackBar(true), setSnackBarMessage("Successfully deleted the Task.");
      queryClient.invalidateQueries({
        queryKey: getTasksForProjectQueryKey(selectedProject),
      });
    },
    onError: () => {
      setSnackBar(true),
        setSnackBarMessage("Task deletion is Failed.Please try Again.");
    },
  });
}

export function useGenerateToken(): UseMutationResult<
  string,
  unknown,
  { email: string; password: string },
  unknown
> {
  const { setSnackBarMessage, setSnackBar } = useContext(LocalContext);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload) => generateToken(payload),
    onSuccess: (data) => {
      console.log("data", data);
      setSnackBarMessage("User Login Successful.");
      navigate("/mainpage");
    },
    onError: (err: any) => {
      console.log("err value", err.status);
      if (err.status === HttpStatusCode.Unauthorized) {
        setSnackBarMessage("Unauthorised Login password.Please try Again.");
      } else {
        setSnackBarMessage("User Login Failed.Please try Again.");
      }
      throw err;
    },
    onSettled: () => {
      setSnackBar(true);
    },
  });
}
