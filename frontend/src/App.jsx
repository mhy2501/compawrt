import React, {useState, useEffect} from 'react'
import Home from './pages/Home'
import Ngos from './pages/Ngos'
import OurBabies from './pages/OurBabies'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements, redirect, Navigate} from 'react-router-dom'
import app from './api/axios-config'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    redirectIfUser()
  },[])

  async function redirectIfUser() {
    app.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    
    try {
      const res = await app.get('verify')
      console.log(res.data)
      if (!res.data) {
        setIsAuthenticated(false)
        
      } else {
        setIsAuthenticated(true)
      }
    } catch (err) {
      localStorage.removeItem('token')
      return redirect('/login')
    }
  
    return null
  }
  
  console.log(isAuthenticated)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
          <Route path='/' element={<Home />} />
          <Route path='ngos' element={<Ngos />} />
          <Route path='ourbabies' element={<OurBabies />} />
          <Route 
            path='signup' 
            element={isAuthenticated ? <Navigate replace={true} to='/dashboard' /> : <SignUp />} 
            />
          <Route 
            path='login' 
            element={isAuthenticated ? <Navigate replace={true} to='/dashboard' /> : <Login />} 
            />
            <Route
              path='/dashboard'
              element={
                isAuthenticated ? 
                <Dashboard /> 
                : <Navigate replace={true} to='/login' />
              }
            />
      </Route>
    
         )
  )

    return (
    <RouterProvider router ={router} />
  
    )
}

export default App