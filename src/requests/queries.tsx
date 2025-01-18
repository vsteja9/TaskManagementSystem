import { useQuery } from "@tanstack/react-query";
import { useAllRequests } from ".";

export const getUsersQueryKey = () => ["allUsers"];
export const getTasksForProjectQueryKey = (projectId: string) => [
  `projects${projectId}`,
];
export const getProjectsQueryKey = () => ["allProjects"];
export function useGetAllUsers() {
  const { getAllUsers } = useAllRequests();
  return useQuery({
    queryKey: getUsersQueryKey(),
    queryFn: () => getAllUsers(),
  });
}

export function useGetTasksForProject(projectId: string) {
  const { getTasksForProject } = useAllRequests();
  return useQuery({
    queryKey: getTasksForProjectQueryKey(projectId),
    queryFn: () => getTasksForProject(projectId),
  });
}

export function useGetAllProjects() {
  const { getAllProjects } = useAllRequests();
  return useQuery({
    queryKey: getProjectsQueryKey(),
    queryFn: () => getAllProjects(),
  });
}
