import React from 'react'
import TopRatedProvidersCard from '../cards/TopRatedProvidersCard'

function OtherRecomendationsForSeller() {
  return (
    <div className='service-provider-browsing-history'>
      <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="browsing-history-title-service-provider">
                    <h2>Other Recommandations</h2>
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
    </div>
  )
}

export default OtherRecomendationsForSeller
