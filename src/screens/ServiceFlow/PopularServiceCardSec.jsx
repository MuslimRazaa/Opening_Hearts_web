import React from 'react'
import ServiceCardSlider from './cards/ServiceCardSlider'
import { Link } from 'react-router-dom'

function PopularServiceCardSec() {
  return (

    <div className='popula-service-card-section-main'>
        <div className="container">
        <ServiceCardSlider title="Popular Service"/>
        </div>
    </div>
  )
}

export default PopularServiceCardSec
