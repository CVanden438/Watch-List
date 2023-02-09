import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === 'START_LOADING') {
    return { ...state, isLoading: true }
  }
  if (action.type === 'FINISH_LOADING') {
    return { ...state, isLoading: false }
  }
  if (action.type === 'USER_LOADING') {
    return { ...state, userLoading: true }
  }
  if (action.type === 'REGISTER_USER') {
    localStorage.setItem('profile', action.payload.token)
    return { ...state, user: action.payload.user }
  }
  if (action.type === 'LOGIN_USER') {
    localStorage.setItem('profile', action.payload.token)
    return { ...state, user: action.payload.user }
  }
  if (action.type === 'LOGOUT_USER') {
    return { ...initialState, user: false, userLoading: false }
  }
  if (action.type === 'DISPLAY_ALERT') {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please fill out all fields',
    }
  }
  if (action.type === 'CLEAR_ALERT') {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }
  if (action.type === 'SET_FILTER') {
    return { ...state, filter: action.payload }
  }
  if (action.type === 'GET_CURRENT_USER') {
    return { ...state, user: action.payload.user, userLoading: false }
  }
  if (action.type === 'GET_ALL_REVIEWS') {
    return { ...state, reviews: action.payload.reviews, isLoading: false }
  }
  if (action.type === 'START_EDIT_REVIEW') {
    const editValues = state.reviews.find((review) => {
      return review._id === action.payload
    })
    return {
      ...state,
      editReviewId: action.payload.reviewId,
      editReviewData: editValues,
    }
  }
  if (action.type === 'EDIT_REVIEW_COMPLETE') {
    return { ...state, editReviewData: '', editReviewId: '' }
  }
}

export default reducer
