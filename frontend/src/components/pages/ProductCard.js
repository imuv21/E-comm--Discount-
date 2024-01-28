import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';


const productCard = ({ product }) => {

  const options = {
    edit: false,
    color: 'grey',
    activeColor: 'rgb(232, 232, 0)',
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true
  };

  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p className='discp'>{product.name}</p>
      <p className='stars'><ReactStars {...options} /> &nbsp; ({product.numOfReviews}) </p>
      <p className='discp'>{`₹${product.price}`}</p>
    </Link>
  )
};

export default productCard