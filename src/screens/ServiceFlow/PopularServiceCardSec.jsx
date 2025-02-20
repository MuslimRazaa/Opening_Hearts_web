import React from 'react'
import ServiceCardSlider from './cards/ServiceCardSlider'
import { Link } from 'react-router-dom'

function PopularServiceCardSec() {
  return (

    <div className='popula-service-card-section-main'>
        <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <h2 className='service-main-heading'>Popular Service</h2>
          </div>
          <div className="col-lg-3">
            <div className="service-card-heading-link">
            <Link to='/popularService' ><h2>View All</h2></Link>
            </div>
          </div>
        </div>
        <ServiceCardSlider/>
        </div>
    </div>
  )
}

export default PopularServiceCardSec
