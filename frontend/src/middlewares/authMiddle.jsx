import React from 'react'
import { Navigate, useNavigate} from 'react-router-dom';
import Login from '../pages/login';

const authMiddle = ({children}) => {
  
  // const navigate=useNavigate()
const isAuthenticated=!! localStorage.getItem('token');
console.log( isAuthenticated) 

if (isAuthenticated){ return children}
else {
 return <Navigate to="/login"/>
}

}

export default authMiddle