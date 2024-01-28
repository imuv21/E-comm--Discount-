import '../Style.css';
import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from '../layout/ReviewCard';
import Loader from '../layout/loader/Loader';
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';

const ProductDetails = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { product, loading, error } = useSelector((state) => state.productDetails);

  const addToCartHandler = () =>{
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id))
  }, [dispatch, id, error, alert]);

  const options = {
    edit: false,
    color: 'grey',
    activeColor: 'rgb(232, 232, 0)',
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true
  };

  const [quantity, setQuantity] = useState(1);
  const incQuantity = () => {
    if (quantity >= product.stock) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decQuantity = () =>{
    if (quantity === 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
};

  return (
    <Fragment>
      {loading ? (<Loader />) : (
        <Fragment>
          <MetaData title={`${product.name} - Discount`} />
          <div className='ProductDetails'>

            <div className='pd_img'>
              <Carousel>
                {product.images && product.images.map((item, i) => (
                  <img className='CarouselImage' key={item.url} src={item.url} alt={`${i} Slide`} />
                ))}
              </Carousel>
            </div>

            <div className='pd_detail'>
              <div className='detailsBlock-3'>
                <h2 className='heading'>{product.name}</h2>
                <p className='dis'>{product._id}</p>
              </div>
              <div className='detailsBlock-2'>
                <ReactStars {...options} />
                <p className='dis'>({product.numOfReviews} Reviews)</p>
              </div>
              <div className='detailsBlock-3'>
                <h1 className='heading'>{`₹${product.price}`}</h1>
                <div className='detailsBlock-1'>
                  <button className='pmbtn' onClick={decQuantity}>-</button>
                  <input value={quantity} readOnly type='number' />
                  <button className='pmbtn'  onClick={incQuantity}>+</button>&nbsp;&nbsp;&nbsp;
                  <button className='pd_btn' onClick={addToCartHandler}>Add To Cart</button>
                </div>
              </div>
              <div className='detailsBlock-22'>
                <p className='dis'>Status: &nbsp;</p> <b className={product.Stock < 1 ? "redColor" : "greenColor"}>{product.Stock < 1 ? "Out Of Stock" : "In Stock"}</b>
              </div>
              <div className='detailsBlock-3'>
                <p className='dis'>Description: {product.description}</p>
                <button className='pd_btn'>Submit Review</button>
              </div>
            </div>
          </div>

          <div className='sup-reviews'>
            <h2 className='homeHeading mauto'>reviews</h2>
            {product.reviews && product.reviews[0] ? (
              <div className='reviews'>
                {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}
              </div>
            ) : (
              <p className='norev'>No Reviews Yet</p>
            )}
          </div>


        </Fragment>
      )}
    </Fragment>
  )
}

export default ProductDetails;