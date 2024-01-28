import '../Style.css';
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const Search = ( ) => {

    const navigate = useNavigate();
    const [keyword,  setKeyword] = useState("");
    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }else{
            navigate("/products");
        }
    };

  return (
    <Fragment>
        <MetaData title="Search Any Product" />
        <form className='searchBox' onSubmit={searchSubmitHandler}>
            <input type='text' className='searchinput' placeholder='Search Here...' onChange={(e) => setKeyword(e.target.value)} />
            <input type='submit' className='searchbtn' value="Search" />
        </form>
    </Fragment>
  )
}

export default Search