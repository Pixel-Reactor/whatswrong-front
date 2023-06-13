import React, { useEffect, useState } from "react"
import { useContext } from "react"

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('')
//el user no puede tener algo por defecto porque si no daria undefinded y no se podria utilizar en los otros 
//componentes como variable !user para decirle que vayan al login si no está logueado
//
  const setLocalStorage = (data) => {
    
    if (data) {
      localStorage.setItem('whatswronguser', JSON.stringify(data))
    } 
  }
  useEffect(() => {
    const user = localStorage.getItem('whatswronguser')
   if(user){
    console.log('si!')
    console.log(user)
   }else{
    console.log('no!')
    
   }

  
  }, []);
  const logOut = () =>{
    localStorage.clear()
    setUser('')
  }
  return (
    <UserContext.Provider value={[user,setUser, setLocalStorage,logOut]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
