import { useUser } from "../context/UserContext";

import useFetchPost from "./useFetchPost";

// export const palabra = (id) => useFetch(`url`)
// export const palabra = () => useFetch(`url`)

export function useUserActions() {
  const fetchPost = useFetchPost();
  const [, setUser] = useUser();

  const login = (email, pwd) =>
    fetchPost("http://localhost:4000/login", {
      email,
      pwd,
    }).then((data) => {
      if (data.message) {
        return data;
      } else {
        setUser(data);
      }
    });
  const signup = (email, pwd, nombre, username, bio) =>
    fetchPost("http://localhost:4000/newuser", {
      email,
      pwd,
      nombre,
      username,
      biografia: bio,
    });

  const logout = () => setUser();

  return { login, logout, signup };
}

export function usePostActions() {
  const fetchPost = useFetchPost();

  const add = (title, image) =>
    fetchPost("http://localhost:4000/", { title, image });
  const remove = () => alert("Not implemented yet!");

  return { add, remove };
}
