import React from 'react'
import serviceCard from '../../../media/images/Tem_Images/popServ.png'

function PopularService() {
  return (
    <div className='popular-card-main'>
        <div className='popular-service-card-wrapper'>
            <div className='product-card-image'>
                <img src={serviceCard} />
            </div>
            <div className='popular-service-card-wrapper'>
               <h2>Programming</h2>
               <p>FashionForAll is a platform that helps to make fashion accessible to all. It brings fashion to your doorstep!</p>
            </div>
        </div>
    </div>
  )
}

export default PopularService
