import React, { useState } from 'react'
import { useAppContext } from '../../context/appContext'
import Alert from '../Alert'
const initialState = {
  email: '',
  password: '',
}
const Login = ({ setType }) => {
  const [values, setValues] = useState(initialState)
  const { loginUser, displayAlert, showAlert } = useAppContext()
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = values
    if (!email || !password) {
      displayAlert()
      return
    }
    loginUser(values)
    setValues(initialState)
  }
  return (
    <>
      <form action='submit' onSubmit={handleSubmit} className='login'>
        <div className='btns'>
          <button type='button'>Login</button>
          <button type='button' onClick={() => setType('Register')}>
            Register
          </button>
        </div>
        <input
          type='text'
          placeholder='Email'
          name='email'
          value={values.email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={values.password}
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
      {showAlert && <Alert />}
    </>
  )
}

export default Login
