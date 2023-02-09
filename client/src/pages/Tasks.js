import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Tasks.css'
const Tasks = () => {
  const navigate = useNavigate()
  return (
    <div className='tasks'>
      <h1>Task List</h1>
      <button
        onClick={() => {
          navigate('/')
        }}
      >
        Home
      </button>
      <div className='toggleDay'>
        <button>Back</button>
        <span>Today</span>
        <button>Forward</button>
      </div>
      <div className='taskContainer'>
        <div className='dailyTasks'>
          <h2>Daily Tasks</h2>
          <button>Add Daily Task</button>
        </div>
        <div className='todayTasks'>
          <h2>Todays Tasks</h2>
          <button>Add Task</button>
        </div>
      </div>
      <button>New Day</button>
    </div>
  )
}

export default Tasks
