import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type User = {
  id: number;
  name: string;
  email: string;
};

const defaultOptions = {
  baseURL: `https://deployment.api-php.boilerplate.hng.tech/api/v1/`,
  // baseURL: `${process.env.API_URL}/api/v1/`,
  headers: {
    "Application": "application/json",
  },
};

const apiClient = axios.create(defaultOptions);

const getSingleBlog = async (id: string) => {
  try {
    const response = await apiClient.get(`blogs/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const useGetBlog = (id: string) => {
  const data = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getSingleBlog(id),
    // initialData: blogInitial,
    staleTime: 5 * 1000,
  });

  return data;
};

// const {} = useGetPost("fas3");

const getAllComments = async (blogId: string) => {
  try {
    const response = await apiClient.get(`blogs/${blogId}/comments`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const createComment = async ({
  content,
  blogId,
}: {
  content: string;
  blogId: string;
}) => {
  try {
    const response = await apiClient.post(`blogs/${blogId}/comments`, {
      content,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export { getSingleBlog, getAllComments, createComment, useGetBlog };
