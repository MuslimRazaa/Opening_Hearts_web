import React, { useState } from 'react'
import star from '../../media/images/star.svg'
import { Link } from 'react-router-dom';

function ServicesCard({catId,  image, name, rating, description, cat }) {

    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 130;  // Adjust this value as needed
  
    // Toggle the expanded state
    const toggleReadMore = () => {
      setIsExpanded(!isExpanded);
    };
  return (
    <div className='service-card'>
      <div className='service-card-image'>
        <img src={image} />
        <div className='service-card-content'>
          <div className='service-card-title-rating'>
            <h1>{name}</h1>
            <div className='service-card-rating'>
              {/* <img src={star} /> */}
              <h3>{rating}</h3>
            </div>
          </div>
          <h2>Categories : {cat}</h2>
          <p>
            {isExpanded ? description : `${description?.slice(0, maxLength)}......`}
            <button onClick={toggleReadMore} style={{ background: 'none', border: 'none', color: '#ff6464', cursor: 'pointer', fontFamily: 'Poppins' }}>
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          </p>            <div className='service-card-button'>
            <Link to={`/serviceCatagory?id=${catId}`} ><button>Get Service</button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesCard
