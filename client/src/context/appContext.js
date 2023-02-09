import React, { useReducer, useContext, useEffect } from 'react'
import axios from 'axios'
import reducer from './reducer'
import { Navigate } from 'react-router-dom'
const AppContext = React.createContext()

const initialState = {
  user: false,
  reviews: [],
  isLoading: true,
  userLoading: true,
  editReviewId: '',
  editReviewData: '',
  showAlert: false,
  alertType: '',
  alertText: '',
  filter: 'All',
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const API = axios.create({ baseURL: 'http://localhost:5000/api/v1' })
  API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.authorization = `Bearer ${localStorage.getItem('profile')}`
    }
    return req
  })
  const registerUser = async (input) => {
    try {
      const { data } = await API.post('/auth/register', input)
      dispatch({ type: 'REGISTER_USER', payload: data })
    } catch (error) {
      console.log(error)
    }
  }
  const loginUser = async (input) => {
    try {
      const { data } = await API.post('/auth/login', input)
      dispatch({ type: 'LOGIN_USER', payload: data })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        dispatch({ type: 'USER_LOADING' })
        const { data } = await API.get('/auth/getCurrentUser')
        dispatch({ type: 'GET_CURRENT_USER', payload: data })
      } catch (error) {
        console.log('Could not get user')
        logoutUser()
      }
    }
    localStorage.getItem('profile') ? getCurrentUser() : logoutUser()
  }, [])
  const logoutUser = async () => {
    try {
      localStorage.clear()
      dispatch({ type: 'LOGOUT_USER' })
    } catch (error) {
      console.log(error)
    }
  }
  const displayAlert = () => {
    dispatch({ type: 'DISPLAY_ALERT' })
    console.log('1')
    clearAlert()
  }
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: 'CLEAR_ALERT' })
    }, 3000)
    console.log('2')
  }
  const setFilter = async (value) => {
    dispatch({ type: 'SET_FILTER', payload: value })
  }
  const createReview = async (input) => {
    try {
      const { data } = await API.post('/reviews', input)
      getAllReviews()
    } catch (error) {
      console.log(error)
    }
  }
  const getAllReviews = async () => {
    let url = `/reviews?filter=${state.filter}`
    console.log(url)
    dispatch({ type: 'START_LOADING' })
    try {
      const { data } = await API.get(url)
      dispatch({ type: 'GET_ALL_REVIEWS', payload: data })
    } catch (error) {
      console.log(error)
    }
  }
  //either put function iunside or use useCallback
  // useEffect(() => {
  //   getCurrentUser()
  // }, [])
  const deleteReview = async (reviewId) => {
    dispatch({ type: 'START_LOADING' })
    try {
      await API.delete(`/reviews/${reviewId}`)
      getAllReviews()
    } catch (error) {
      console.log(error)
    }
  }
  const setEditReview = async (reviewId) => {
    dispatch({ type: 'START_EDIT_REVIEW', payload: reviewId })
  }
  const editReview = async (input) => {
    try {
      const { title, description, rating, _id, mediaType, watched } = input
      await API.patch(`/reviews/${_id}`, {
        title,
        description,
        rating,
        mediaType,
        watched,
      })
      dispatch({ type: 'EDIT_REVIEW_COMPLETE' })
      getAllReviews()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        logoutUser,
        //getCurrentUser,
        createReview,
        getAllReviews,
        deleteReview,
        setEditReview,
        editReview,
        displayAlert,
        clearAlert,
        setFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
