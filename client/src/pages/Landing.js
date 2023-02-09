import React, { useState } from 'react'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom'
import './Landing.css'
const Landing = () => {
  const [type, setType] = useState('Login')
  const { user } = useAppContext()
  return (
    <div className='Landing'>
      {user && <Navigate to='/' />}
      {type === 'Login' ? (
        <Login setType={setType} />
      ) : (
        <Register setType={setType} />
      )}
    </div>
  )
}

export default Landing
