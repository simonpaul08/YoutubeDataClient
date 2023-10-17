import React, { useEffect, useState } from 'react'
import { AiFillYoutube } from 'react-icons/ai';
import DashboardIcon from '../components/DashboardIcon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';
import Loader from '../components/Loader';
import Header from '../components/Header';

const Dashboard = () => {

    const [url, setUrl] = useState('');
    const { setData } = useDataContext();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const short = url.indexOf("=");
        const id = url.substring((short + 1), url.length);

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/youtube`, { url: id });
            setData(res.data);
            window.localStorage.setItem('youtubeData', JSON.stringify(res.data));
            setIsLoading(false);
            navigate('/results');
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setData(null)
        window.localStorage.removeItem('youtubeData');
    }, [])

    return (
        <>
            {isLoading && <Loader />}
            <div className='dashboard'>
                <DashboardIcon />
                <div className="dashboard-container">
                    <div className="dashboard-content">
                        <h1 className='dashboard-heading'>Discover your earning potential</h1>
                        <h3 className='dashboard-sub-heading'>Turn your Youtube expertise into a lucrative income
                            through resource sharing</h3>

                        <form className="dashboard-form" onSubmit={handleOnSubmit}>
                            <div className="input-wrapper">
                                <AiFillYoutube size={25} color='gray' />
                                <input type="text" placeholder='enter youtube video link' value={url} onChange={(e) => setUrl(e.target.value)} />
                            </div>
                            <button type='submit' className='dashboard-btn'>Check Earnings</button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Dashboard