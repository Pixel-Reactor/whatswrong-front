import { useUser } from "../context/UserContext";

import useFetchPost from "./useFetchPost";

// export const palabra = (id) => useFetch(`url`)
// export const palabra = () => useFetch(`url`)

export function useUserActions() {
  const fetchPost = useFetchPost();
  const [, setUser] = useUser();


 
  const logout = () => setUser();

  return { logout};
}

export function usePostActions() {
  const fetchPost = useFetchPost();

  const add = (title, image) =>
    fetchPost("http://localhost:4000/", { title, image });
  const remove = () => alert("Not implemented yet!");

  return { add, remove };
}
