import React, { useState } from 'react'
import { useAppContext } from '../../context/appContext'
import './Modal.css'
const initialState = {
  title: '',
  description: '',
  rating: 0,
  mediaType: 'Film',
  watched: false,
}
const Modal = ({ setisModalOpen }) => {
  const {
    createReview,
    getAllReviews,
    editReviewData,
    editReview,
    editReviewId,
  } = useAppContext()
  const [values, setValues] = useState(editReviewData || initialState)
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleChangeCheck = (e) => {
    setValues({ ...values, [e.target.name]: e.target.checked })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const { title, description } = values
    if (!title || !description) {
      return
    }
    if (editReviewData) {
      editReview(values)
      setisModalOpen(false)
    } else {
      createReview(values)
      setisModalOpen(false)
    }
  }

  return (
    <div className='modal'>
      <form action='submit' className='modalForm' onSubmit={handleSubmit}>
        <h2>{editReviewData ? 'Edit Review' : 'Create Review'}</h2>
        <input
          type='text'
          placeholder='Film Name'
          name='title'
          value={values.title}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Description'
          name='description'
          value={values.description}
          onChange={handleChange}
        />
        <select
          name='mediaType'
          onChange={handleChange}
          value={values.mediaType}
        >
          <option value='Film'>Film</option>
          <option value='Show'>Show</option>
          <option value='Anime'>Anime</option>
        </select>
        <div className='rating'>
          <label>Rating:</label>
          <input
            type='number'
            placeholder='Rating(1-5)'
            name='rating'
            value={values.rating}
            onChange={handleChange}
            min='0'
            max='5'
          />
        </div>
        <label>Watched:</label>
        <input
          type='checkbox'
          name='watched'
          checked={values.watched ? true : false}
          onChange={handleChangeCheck}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
export default Modal
