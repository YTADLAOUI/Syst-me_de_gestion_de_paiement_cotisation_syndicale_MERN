import './App.css'
import Login from './pages/login'
import Register from './pages/register'
// import Modal from './components/DynamicForm'
import { Route, Routes } from 'react-router-dom'
import Appertement from './pages/appertement'
import Paie from './pages/payment'
import AuthMiddle from './middlewares/authMiddle'
function App() {
 

  return (
   <>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/appertement' element={
         <AuthMiddle>
            <Appertement/>
         </AuthMiddle> 
          }
         />
      <Route path='/paie' element={<AuthMiddle><Paie/></AuthMiddle>} />
      <Route path="*" element={<h3 className='w-full h-full flex justify-center items-center'>page Not Fond</h3>} />
    </Routes>
   </>
  )
}

export default App
