import React from 'react'
import Cookies from 'js-cookie';
import { Navigate} from 'react-router-dom';
const authMiddle =  ({children}) => {
  const isAuthenticated = !!Cookies.get('Token'); 
  console.log(isAuthenticated)
    if (isAuthenticated){ return children}
    else {
     return <Navigate to="/login"/>
    }

}

export default authMiddle