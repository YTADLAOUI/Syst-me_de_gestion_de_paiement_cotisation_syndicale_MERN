import './App.css'
import Login from './pages/login'
import Register from './pages/register'
// import Modal from './components/DynamicForm'
import { Route, Routes } from 'react-router-dom'
import Appertement from './pages/appertement'
function App() {
 

  return (
   <>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      {/* <Route path='/' element={<Modal/>} /> */}
      <Route path='/appertement' element={<Appertement/>} />
    </Routes>
   </>
  )
}

export default App
