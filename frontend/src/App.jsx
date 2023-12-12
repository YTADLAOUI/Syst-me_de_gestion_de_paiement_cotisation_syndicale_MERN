import './App.css'
import Login from './pages/login'
import Register from './pages/register'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import Tableau from './components/tableau'
function App() {
 

  return (
   <>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/' element={<Header/>} />
      <Route path='/t' element={<Tableau/>} />
    </Routes>
   </>
  )
}

export default App
