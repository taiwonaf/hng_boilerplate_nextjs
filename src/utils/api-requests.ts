import { getApiUrl } from "./getApiUrl";

export type User = {
  id: number;
  name: string;
  email: string;
};

export async function getUsers() {
  const url = await getApiUrl();
  const response = await fetch(`${url}users`);
  const users = (await response.json()) as User[];
  return users;
}

// export async function getSingleBlog() {
//   const url = await getApiUrl();
//   const response = await axios;
// }
