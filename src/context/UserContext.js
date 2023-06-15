import React, { useEffect, useState } from "react"
import { useContext } from "react"
import { useCookies } from 'react-cookie';

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('')
  const [menuon, setMenuon] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies();

 useEffect(() => {
  const cookie = cookies;
  if(cookie.wwuser){
    console.log(cookie.wwuser)
    setUser(cookie.wwuser)
  }

 }, []);
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() +1) 
    
   if(user.token){
   setCookie('wwuser',user,{expires: date})
   }
   
  
  }, [user.token]);
const LogOut = () =>{
  removeCookie('wwuser', { path: '/' });
  setUser('')
}
  return (
    <UserContext.Provider value={{user,setUser,menuon,setMenuon,LogOut}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
