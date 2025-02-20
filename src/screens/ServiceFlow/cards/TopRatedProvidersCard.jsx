import React, { useState } from 'react'
import img1 from '../../../media/images/fiver.png'
import userr from '../../../media/images/userrr.png'
import flag from '../../../media/images/United Kingdom (GB).png'
import star from '../../../media/images/star.svg'
import { Link } from 'react-router-dom'

function TopRatedProvidersCard({id,  user_name,user_image,user_flag,description,rating,rating_count,}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 130;  // Adjust this value as needed

  // Toggle the expanded state
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className='topRatedServiceCardMain'>
   <Link to={`/Service-Seller-Profile?id=${id}`} ><div className="top-rated-service-img">
        <img src={user_image} />
      </div>
      <div className="top-rated-card-profile">
        <div className="row justify-content-space-between align-items-center">
            <div className="col-lg-8">
                <div className="top-ratet-user-details">
                    <img src={userr} />
                    <h3>{user_name}</h3>
                    <img src={flag} style={{width:"25px" , height:"20px"}}/>
                </div>
            </div>
            <div className="col-lg-4 d-flex justify-content-end align-items-center">
                <button className='top-rated-button'>Top Rated</button>
            </div>
        </div>
      </div></Link> 
      <div className="top-rated-card-description">
      <p>
        {isExpanded ? description : `${description?.slice(0, maxLength)}......`}
        <button onClick={toggleReadMore} style={{ background: 'none', border: 'none', color: '#ff6464', cursor: 'pointer' , fontFamily: 'Poppins'}}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </p>
      </div>
      <div className="top-rated-card-rating">
        <div className="top-rated-star">
            <img src={star} style={{width:"18px"}} />
        </div>
        <div className="top-rated-rating">
          <h4>{rating}<span style={{fontWeight:"100px" , color: "gray" , fontSize:"13px"}}>/5 ({rating_count})</span> </h4>
        </div>
      </div>
    </div>
  )
}

export default TopRatedProvidersCard
