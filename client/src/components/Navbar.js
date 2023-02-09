import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import './Navbar.css'
const Navbar = () => {
  const { logoutUser, user } = useAppContext()
  return (
    <>
      <nav className='navbar'>
        <div className='left'>{`Hello ${user.name}`}</div>
        <div className='right'>
          <button onClick={logoutUser}>Logout</button>
        </div>
      </nav>
    </>
  )
}

export default Navbar
