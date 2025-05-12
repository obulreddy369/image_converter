import React, { useContext } from 'react'
import { Route,Routes } from 'react-router-dom'
import BuyCredit from './pages/BuyCredit'
import Home from './pages/Home'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  const {showLogin}=useContext(AppContext);

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <ToastContainer/>
      <Navbar/>
      {showLogin && <Login/>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result/>}/>
        <Route path='/Buy' element={<BuyCredit/>}/>
  
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
