// creating AuthContext so that we can use this context directly form anywhere
import React,{useEffect, useState} from 'react';
import { firebaseAuth } from '../config/firebase';

 
export const AuthContext=React.createContext();


export const AuthProvider = ({children}) => {
  const [currentUser,setcurrentUser] =useState(null);
     
  let signup=(email,password) =>{
      return firebaseAuth.createUserWithEmailAndPassword(email,password)
  }

  let login=(email,password) =>{
       return firebaseAuth.signInWithEmailAndPassword(email,password);
  }

  let logout=() =>{
      return firebaseAuth.signOut();
  }
   useEffect(() =>{
       //event attach kra hai
       // loggedout => loggedin
       //loggedin =>loggedout
       firebaseAuth.onAuthStateChanged((user) =>{
           console.log("Inside auth state changed !!",user);
           setcurrentUser(user);
       })
   })

   let value={
       currentUser:currentUser,
       login:login,
       logout:logout,
       signup:signup
   }
   return <AuthContext.Provider value={value}> 
       {children}
   </AuthContext.Provider>

}

