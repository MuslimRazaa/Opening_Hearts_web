import React from 'react'
import TopRatedProvidersCard from './cards/TopRatedProvidersCard'
import { Link } from 'react-router-dom'

function TopRatedSection() {
  return (
    <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <h2 className='service-main-heading'>Top Rated Service Providers</h2>
          </div>
          <div className="col-lg-3">
            <div className="service-card-heading-link">
            <Link to='/serviceProvider' > <h2>View All</h2></Link>
            </div>
          </div>
        </div>
        <div className="row">
            <div className="col-lg-3">
                <TopRatedProvidersCard/>
            </div>
            <div className="col-lg-3">
                <TopRatedProvidersCard/>
            </div>
            <div className="col-lg-3">
                <TopRatedProvidersCard/>
            </div>
            <div className="col-lg-3">
                <TopRatedProvidersCard/>
            </div>

        </div>
    </div>

  )
}

export default TopRatedSection
