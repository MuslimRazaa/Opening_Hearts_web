import React from 'react'
import storeLogo from '../../media/images/Tem_Images/storeLogo.svg'
import Arrow from '../../media/images/Arrow 2.svg'
import star from '../../media/images/star.svg'
import { Link } from 'react-router-dom'

function StoreCard({guid, image , cat, name, rating, vImage}) {
  return (
    <div className='store-card'>
        <img src={image} />
      <Link to={`/SuplierStore?guid=${guid}`} ><div className='store-card-arow'>
        <img src={Arrow} />
      </div></Link>
      <div className='store-card-logo-section'>
        <div className='store-card-logo'>
            <img src={vImage} />
        </div>
        <div className='store-card-content'>
            <h1>{name}</h1>
            <h4>Category: {cat}</h4>
        </div>
        <div className='store-card-rating'>
        <img src={star} /><h3> {rating}</h3>
        </div>
      </div>
    </div>
  )
}

export default StoreCard
