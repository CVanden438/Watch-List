import React, { useState } from 'react'
import { useAppContext } from '../../context/appContext'
const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
}
const Register = ({ setType }) => {
  const [values, setValues] = useState(initialState)
  const { registerUser } = useAppContext()
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const { firstname, lastname, email, password } = values
    if (!firstname || !lastname || !email || !password) {
      return
    }
    registerUser(values)
    setValues(initialState)
  }
  return (
    <>
      <form action='submit' onSubmit={handleSubmit} className='register'>
        <div className='btns'>
          <button type='button' onClick={() => setType('Login')}>
            Login
          </button>
          <button type='button'>Register</button>
        </div>
        <input
          type='text'
          placeholder='First Name'
          name='firstname'
          value={values.firstname}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Last Name'
          value={values.lastname}
          name='lastname'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Email'
          value={values.email}
          name='email'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Password'
          value={values.password}
          name='password'
          onChange={handleChange}
        />
        <button type='submit' className='submitBtn'>
          Submit
        </button>
      </form>
    </>
  )
}

export default Register
