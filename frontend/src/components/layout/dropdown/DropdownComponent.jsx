import './dropdown.css';
import React, { useState, useEffect } from 'react';
import plusLogo from './plus.png'; 
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const DropdownComponent = ({user}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [rotated, setRotated] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  function dashboard(){
    navigate("/dashboard");
  }

  function orders(){
    navigate("/orders");
  }

  function cartt(){
    navigate("/cart");
  }

  function logoutUser(){
    dispatch(logout());
    alert.success("Logout Successfully");
  }


  useEffect(() => {
    // Apply initial rotation when component mounts
    rotateImage();
  }, []);

  const toggleDropdown = () => {
    const dropdown = document.getElementsByClassName('language-dropdown')[0];

    if (!isDropdownVisible) {
      dropdown.style.display = 'block';
      dropdown.style.animation = 'slideDown 0.3s';
    } else {
      dropdown.style.animation = 'slideUp 0.3s';
      dropdown.addEventListener('animationend', onAnimationEnd);
    }

    setIsDropdownVisible(!isDropdownVisible);
  };

  const onAnimationEnd = () => {
    const dropdown = document.getElementsByClassName('language-dropdown')[0];
    dropdown.style.display = 'none';
    dropdown.removeEventListener('animationend', onAnimationEnd);
  };

  const rotateImage = () => {
    const images = document.getElementsByClassName('rotatingImage');

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      setRotated(!rotated);
      const rotationValue = rotated ? '45deg' : '0deg';
      image.style.transform = `rotate(${rotationValue})`;
    }
  };

  return (
    <div className="language_container">
      <div className="plus_icon" onClick={toggleDropdown}>
        <img src={plusLogo} className="rotatingImage" alt="plus icon" onClick={rotateImage} />
      </div>
      <div className="language-dropdown">
        <ul>
        {user.role === 'admin' && (
            <li onClick={dashboard}>
              <span>
                <DashboardIcon sx={{ color: 'black', fontSize: '40px' }} />
              </span>
            </li>
          )}
          <li onClick={cartt}>
            <span>
              <ShoppingCartIcon sx={{ color: 'black', fontSize: '40px' }} />
            </span>
          </li>
          <li onClick={orders}>
            <span>
              <ListAltIcon sx={{ color: 'black', fontSize: '40px' }} />
            </span>
          </li>
          <li onClick={ logoutUser }>
            <span>
              <LogoutIcon sx={{ color: 'black', fontSize: '40px' }} />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};


export default DropdownComponent;
