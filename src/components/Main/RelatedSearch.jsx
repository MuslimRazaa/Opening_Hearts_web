import React from 'react'
import DonationCard from './DonationCard'
import donation from '../../media/images/Tem_Images/donationCard.svg'

function RelatedSearch() {
    return (
        <div className='container'>
            <div className="related-search">
                <div className="related-search-title">
                    <h3>Related Search</h3>
                </div>
                <div className="related-search-cards">

                    <div className="row d-flex justify-content-space-between">
                        <div className="col-lg-4">
                            <DonationCard image={donation} />
                        </div>
                        <div className="col-lg-4">
                            <DonationCard image={donation} />
                        </div>
                        <div className="col-lg-4">
                            <DonationCard image={donation} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RelatedSearch
