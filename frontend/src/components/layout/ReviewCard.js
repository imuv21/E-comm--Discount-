import React from 'react';
import ReactStars from 'react-rating-stars-component';
import profile from '../images/profile.png';

const ReviewCard = ({ review }) => {

    const options = {
        edit: false,
        color: 'grey',
        activeColor: 'rgb(232, 232, 0)',
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true
    };

    return (
        <div className='reviewCard'>
            <img src={profile} alt='User' />
            <p>{review.name}</p>
            <ReactStars {...options} />
            <span>{review.comment}</span>
        </div>
    )
}

export default ReviewCard