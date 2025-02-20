import React from 'react'
import search from '../../media/images/search.svg'

function FeatureProductSec2() {
    return (
        <div className='container'>
            <div className="row row d-flex justify-content-space-between align-items-center py-4 ">
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col-lg-4">
                        <div className="feature-product-top-button" >
                            <button className='active'>All</button>
                        </div>
                        </div>
                        <div className="col-lg-4">
                        <div 
                            className="feature-product-top-button" >
                            <button>Top Ranking</button>
                        </div>
                        </div>
                        <div className="col-lg-4">
                        <div 
                            className="feature-product-top-button" >
                            <button>New Arrivals</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className='donation-detail-page-search-bar'>
                        <img src={search} alt="Search icon" />
                        <input type='search' placeholder='Search..' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureProductSec2
