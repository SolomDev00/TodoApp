import { AxiosRequestConfig } from "axios";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";

interface IAuthenticatedQuery {
  URL: string;
  queryKey: string[];
  config?: AxiosRequestConfig;
}

const useAuthenticatedQuery = ({
  URL,
  config,
  queryKey,
}: IAuthenticatedQuery) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get(URL, config);
      return data.todos;
    },
  });
};

export default useAuthenticatedQuery;
