import React from 'react'
import icon from '../../media/images/explore.png'

function TopCatagoriesCard({image, txt}) {

  return (
    <div className='top-cat-card'>
        <div className='top-cat-card-wrapper'>    
        <div className='top-cat-card-icon'>
            <img src={image} />
        </div>
        <div className='top-cat-card-title'>
            <h3>{txt}</h3>
        </div>
      </div>
    </div>
  )
}

export default TopCatagoriesCard



