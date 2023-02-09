import React from 'react';
import { useAppContext } from '../../context/appContext';

const Review = ({
  _id,
  title,
  description,
  rating,
  mediaType,
  watched,
  setisModalOpen,
}) => {
  const { deleteReview, setEditReview } = useAppContext();
  //   const handleEdit = (id) => {
  //     setEditReview(id)
  //   }
  const handleEdit = () => {
    setEditReview(_id);
    setisModalOpen(true);
  };
  return (
    <div className='review'>
      <img src='https://www.clipartmax.com/png/middle/1-18632_free-film-wallpaper-clip-art-movie-logo-without-background.png' />
      <h3>{title}</h3>
      <div>{`Rating: ${rating}, Type: ${mediaType}`}</div>
      <div className=''>
        <button
          onClick={() => {
            deleteReview(_id);
          }}
        >
          Remove
        </button>
        <button onClick={() => handleEdit()}>Edit</button>
      </div>
    </div>
  );
};

export default Review;
