import React from 'react'
import supBanner from '../../../media/images/Rectangle 30164.png'
function SuplierStoreBanner({vendor}) {
  return (
    <div className='suplier-store-banner'>
      <img src={vendor?.cover_image} />
    </div>
  )
}

export default SuplierStoreBanner
