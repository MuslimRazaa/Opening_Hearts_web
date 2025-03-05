import React from 'react'
import ServiceCardSlider from './cards/ServiceCardSlider'
import { Link } from 'react-router-dom'

function TrendinService() {
  return (

    <div className='popula-service-card-section-main'>
      <div className="container">
        <ServiceCardSlider title="Trending Service" />
      </div>
    </div>
  )
}

export default TrendinService
