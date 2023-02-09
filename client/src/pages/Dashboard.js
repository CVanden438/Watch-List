import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal/Modal'
import { useAppContext } from '../context/appContext'
import Review from '../components/Review/Review'
import Loading from '../components/Loading'
import { Navigate, useNavigate } from 'react-router-dom'
import './Dashboard.css'
const Dashboard = () => {
  const { user } = useAppContext()
  const navigate = useNavigate()

  const handleClick = (input) => {
    return navigate(input)
  }
  return (
    <>
      <div className='dashboard'>
        <button onClick={() => handleClick('/reviews')}>Reviews</button>
        <button onClick={() => handleClick('/tasks')}>Tasks</button>
      </div>
    </>
  )
}

export default Dashboard
