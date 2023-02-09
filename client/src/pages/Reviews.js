import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal/Modal'
import { useAppContext } from '../context/appContext'
import Review from '../components/Review/Review'
import Loading from '../components/Loading'
import { Navigate, useNavigate } from 'react-router-dom'
import './Reviews.css'
const Reviews = () => {
  const [isModalOpen, setisModalOpen] = useState(false)
  //const [filter, setFilter] = useState('All')
  const { getAllReviews, reviews, isLoading, logoutUser, filter, setFilter } =
    useAppContext()
  const navigate = useNavigate()
  useEffect(() => {
    getAllReviews()
  }, [filter])
  // if (isLoading) {
  //   return <Loading />
  // }
  return (
    //FlipMove for cool effect
    <div className='reviews'>
      {isModalOpen && <Modal setisModalOpen={setisModalOpen} />}
      <div className='reviewsTop'>
        <button
          onClick={() => {
            setisModalOpen(true)
          }}
        >
          Create Review
        </button>
        <button
          onClick={() => {
            navigate('/')
          }}
        >
          Home
        </button>
        <select
          name='mediaType'
          onChange={(e) => {
            setFilter(e.target.value)
          }}
          value={filter}
        >
          <option value='All'>All</option>
          <option value='Film'>Film</option>
          <option value='Show'>Show</option>
          <option value='Anime'>Anime</option>
        </select>
      </div>
      <div className='reviewContainer'>
        <div className='reviewWatched'>
          {reviews.map((review) => {
            if (!review.watched) {
              return (
                <Review
                  key={review._id}
                  {...review}
                  setisModalOpen={setisModalOpen}
                />
              )
            }
          })}
        </div>
        <div className='reviewNotWatched'>
          {reviews.map((review) => {
            if (review.watched) {
              return (
                <Review
                  key={review._id}
                  {...review}
                  setisModalOpen={setisModalOpen}
                />
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default Reviews
