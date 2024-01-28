import '../Style.css';
import React, { Fragment, useEffect } from 'react';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';

const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(state => state.products);

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {
        loading ? <Loader /> :
          <Fragment>
            <MetaData title="Discount" />
            <div className='banner'>
              <p>welcome to discount</p>
              <h1>find amazing products below</h1>
              <a href='#proContainer'>
                <button> Scroll&nbsp;&nbsp;<ArrowCircleDownOutlinedIcon /> </button>
              </a>
            </div>
            <h2 className='homeHeading mauto'>featured products</h2>
            <div className='proContainer mauto' id='proContainer'>
              {products && products.map((product) => <ProductCard product={product} />)}
            </div>
          </Fragment>
      }
    </Fragment>
  )
}

export default Home