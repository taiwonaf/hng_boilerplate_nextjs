import axios from "axios";

export type User = {
  id: number;
  name: string;
  email: string;
};

const defaultOptions = {
  baseURL: `${process.env.API_URL}/api/v1/blogs/`,
  headers: {
    Application: "application/json",
  },
};

const apiClient = axios.create(defaultOptions);

const getSingleBlog = async (id: string) => {
  try {
    const response = await apiClient.get(`${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export { getSingleBlog };
