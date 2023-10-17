import React, { useEffect, useState } from 'react'
import { PiMedalFill } from 'react-icons/pi';
import mainVid from '../assets/images/main-vid.png';
import { AiFillEye } from 'react-icons/ai';
import { BiSolidLike } from 'react-icons/bi';
import { FaCommentAlt } from 'react-icons/fa';
import otherVid from '../assets/images/other-vid.png';
import { useDataContext } from '../context/DataContext';
import moment from 'moment/moment';

const Results = () => {

    const { data } = useDataContext();

    const calculateValue = (subs, views, likes, comment) => {
        let minVal = Math.min(parseInt(subs), parseInt(views));
        let calculated = minVal * ((10 * parseInt(likes)) + (5 * parseInt(comment)));
        return calculated;
    }


    return (
        <>
            <div className='results'>
                <div className="results-container">
                    <div className="main-result">
                        <div className="main-col-1">
                            <div className="badge">
                                <PiMedalFill size={14} />
                                <span>Top Earner Video</span>
                            </div>
                            <img src={data?.data?.items[0]?.snippet?.thumbnails?.default?.url || mainVid} alt="main video thumbnail" className='main-img' />
                            <p className='timeline'>Uploaded on - {moment(data?.data?.items[0]?.snippet?.publishedAt).format("DD-MM-YYYY")}</p>
                        </div>
                        <div className="main-col-2">
                            <p className='main-col-2-heading'>{data?.data?.items[0]?.snippet?.title}</p>
                            <div className="engagement">
                                <div className="engagement-list">
                                    <AiFillEye size={20} color='#ccc' />
                                    <p>{data?.data?.items[0]?.statistics?.viewCount}</p>
                                </div>
                                <div className="engagement-list">
                                    <BiSolidLike size={20} color='#ccc' />
                                    <p>{data?.data?.items[0]?.statistics?.likeCount}</p>
                                </div>
                                <div className="engagement-list">
                                    <FaCommentAlt size={20} color='#ccc' />
                                    <p>{data?.data?.items[0]?.statistics?.commentCount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="main-col-3">
                            <div className="revenue-box">
                                <h3 className='revenue'>₹ {calculateValue(
                                    data?.subscribers,
                                    data?.data?.items[0]?.statistics?.viewCount,
                                    data?.data?.items[0]?.statistics?.likeCount,
                                    data?.data?.items[0]?.statistics?.commentCount
                                )?.toLocaleString()}</h3>
                                <button className='revenue-btn'>Check How ?</button>
                            </div>
                        </div>
                    </div>

                    <div className="other-videos">
                        <p className='other-videos-heading'>Other Videos Potentials</p>

                        <table className="other-videos-table">
                            <thead>
                                <tr>
                                    <td>Rank</td>
                                    <td>Title</td>
                                    <td>Thumbnail</td>
                                    <td>Views</td>
                                    <td>Likes</td>
                                    <td>Comment</td>
                                    <td>Uploaded on</td>
                                    <td>*Estimated Earning</td>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.vidListResponseData?.items?.map((item, index) => {
                                    const itemSnippet = item?.snippet;
                                    const itemStatistics = item?.statistics;

                                    return (
                                        <tr key={index}>
                                            <td>{index + 2}</td>
                                            <td>{itemSnippet?.title}</td>
                                            <td><img src={itemSnippet?.thumbnails?.default?.url} alt="other video thumbnail" className='table-img' /></td>
                                            <td>{itemStatistics?.viewCount}</td>
                                            <td>{itemStatistics?.likeCount}</td>
                                            <td>{itemStatistics?.commentCount}</td>
                                            <td>{moment(itemSnippet?.publishedAt).format("DD-MM-YYYY")}</td>
                                            <td>{calculateValue(
                                                data?.subscribers,
                                                itemStatistics?.viewCount,
                                                itemStatistics?.likeCount,
                                                itemStatistics?.commentCount
                                                )?.toLocaleString()}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Results