import ReactStarts from 'react-rating-stars-component'
import React from "react";
// import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
    const options = {
        value: review.rating,
        edit: false,
        activeColor: 'tomato',
        color: 'rgb(20,20,20,0.1)',
        isHalf: true,
        precision: 0.5,
        size: window.innerWidth < 768 ? 20 : 30
    };

    return (
        <div className="reviewCard">
            <img src='/images/Profile.png' alt="User" />
            <p>{review.name}</p>
            <ReactStarts {...options} />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    );
};

export default ReviewCard;