import React from 'react'
import down from '../../../media/images/arrowDown.png'
import search from '../../../media/images/search.svg'
import { Link } from 'react-router-dom'

function ServiceProviderDropdowns() {
    return (
        <div className='container'> 
        <div className="service-provider-top-section-wrapper">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-7">
                    <div className="service-provider-top-dropdowns">
                        <div className="dropdown-button-service-provider">
                         <button>Catagories</button>
                            <img src={down} />
                        </div>
                        <div className="dropdown-button-service-provider">
                            <button>Budget</button>
                            <img src={down} />
                        </div>
                        <div className="dropdown-button-service-provider">
                            <button>Seller type</button>
                            <img src={down} />
                        </div>
                        <div className="dropdown-button-service-provider">
                            <button>Delivery Time</button>
                            <img src={down} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className='donation-detail-page-search-bar'>
                        <img src={search} alt="Search icon" />
                        <input type='search' placeholder='Search..' />
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ServiceProviderDropdowns
