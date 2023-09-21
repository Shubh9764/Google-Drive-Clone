import React, { useContext, useEffect, useState } from 'react'
import app  from '../firebase'
import { getAuth, createUserWithEmailAndPassword , onAuthStateChanged,signInWithEmailAndPassword,signOut,sendPasswordResetEmail,updateEmail,updatePassword} from "firebase/auth";



export const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}


export function AuthProvide ({children}) {
    const [currentUser ,setCurrentUser] = useState()
    const auth = getAuth(app)
    const [loading,setLoading] = useState(true)

    const signup = (email,password) => {
        console.log("Auth : "+auth+"email :"+email+ " password : "+password)
       return createUserWithEmailAndPassword(auth,email,password)
    }
    const login = (email,password) => {
        console.log("Auth : "+auth+"email :"+email+ " password : "+password)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logout = () => {
        return signOut(auth)
    }
    useEffect(() => {
      const unsubscribe =  onAuthStateChanged( auth,user => {
            setLoading(false)
            console.log("onAuthStateChanged")
            setCurrentUser(user)
        })
        return unsubscribe
    },[])
   
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth,email)
    }
    const changeEmail = (email) => {
        console.log("inside update email "+ auth.currentUser.email)
        return updateEmail(currentUser,email)
    }
    const changePassword= (password) => {
        console.log("inside update pass")
        return updatePassword(auth.currentUser,password)
    }

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        changeEmail,
        changePassword
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

