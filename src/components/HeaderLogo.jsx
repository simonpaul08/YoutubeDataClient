import React from 'react';
import logo from '../assets/images/header-logo.png';
import { Link } from 'react-router-dom';

const HeaderLogo = () => {
  return (
    <Link to="/" className='header-logo'>
        <img src={logo} alt="logo" className='header-logo-img'/>
        <p className='header-logo-text'>anchors</p>
        <div className="header-logo-beta">
            <p>Beta</p>
        </div>
    </Link>
  )
}

export default HeaderLogo