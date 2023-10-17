import React, { useEffect, useState } from 'react'
import HeaderLogo from './HeaderLogo'
import { BsFillTelephoneFill } from 'react-icons/bs'; 
import { useDataContext } from '../context/DataContext';

const Header = ({ showModal }) => {

  const { isResults, setIsResults } = useDataContext();

  return (
    <header className='header'>
        <nav className='nav' style={{ justifyContent: `${isResults ? "space-between" : "flex-start"}` }}>
            <HeaderLogo />
            {isResults  && <div className='call-back' onClick={showModal}>
                <BsFillTelephoneFill size={16}/>
                <p>Request a call back</p>
            </div>}
        </nav>
    </header>
  )
}

export default Header