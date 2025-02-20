import React, { useState } from 'react'
import serviceCard from '../../../media/images/Tem_Images/popServ.png'
import { Link } from 'react-router-dom';

function PopularService({ id, title, image, description }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 55;  // Adjust this value as needed
  
    // Toggle the expanded state
    const toggleReadMore = () => {
      setIsExpanded(!isExpanded);
    };
    
  return (
    <div className='popular-card-main'>
      <div className='popular-service-card-wrapper'>
        <Link to={`/singleServiceDetail?id=${id}`} style={{ textDecoration: "none", color: "black" }} >
         <div className='product-card-image'>
          <img src={image} />
        </div></Link>
        <div className='popular-service-card-wrapper'>
          <h2>{title}</h2>
          <p>
            {isExpanded ? description : `${description?.slice(0, maxLength)}`}
            <button onClick={toggleReadMore} style={{ background: 'none', border: 'none', color: '#ff6464', cursor: 'pointer', fontFamily: 'Poppins' }}>
            {description.split(" ").length > 10  &&  (isExpanded ?   'Read Less' : '.......Read More')}
            </button>
          </p>
            </div>
      </div>
    </div>
  )
}

export default PopularService
