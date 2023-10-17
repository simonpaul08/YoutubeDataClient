import React, { useState } from 'react';
import Tick from '../assets/images/tick.png';
import { BsArrowRight } from 'react-icons/bs'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import MiniLoader from './MiniLoader';

const RequestCallback = ({ closeModal }) => {

    const [isSuccess, setIsSuccess] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


    const handleOnRequest = async (e) => {
        e.preventDefault();
        console.log('clicked')
        setIsLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/mail`, { name, phone });
            if(res.data.message){
                setIsSuccess(true);
                setIsLoading(false);
            }
        }catch(e) {
            console.log(e);
            setIsLoading(false);
        }
    }
    return (
        <div className='request-callback'>
            <div className="request-callback-container">
                {isSuccess ?
                    <div className="success-block">
                        <img src={Tick} alt="tick img"/>
                        <h3>Request a call back</h3>
                        <p>Our Team will call you shortly in <br /> 12-24 hrs</p>
                        <p>Can't you wait for call?</p>
                        <Link to="/" className='success-block-btn' onClick={closeModal} >Check another video <BsArrowRight size={20} color='white'/></Link>
                        <button type='button' className='success-block-close-btn' onClick={closeModal}>Close</button>
                    </div>
                    :
                    <div className="request-form" onSubmit={handleOnRequest}>
                        <h3>Request a call back</h3>
                        <form>
                            <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}/>
                            <input type="text" placeholder='Mobile Number' value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            <button type='submit' className='request-form-btn'>{isLoading ? <MiniLoader /> : "Request a call back"}</button>
                            <button type='button' className='request-form-close-btn' onClick={closeModal}>Close</button>
                        </form>
                    </div>}

            </div>
        </div>
    )
}

export default RequestCallback