import React from 'react'
import TopCatSlider from '../../components/Main/TopCatSlider'
import FeatureRelatedSearchslider from './FeatureRelatedSearchslider'
// import donation from '../../../media/images/Tem_Images/donationCard.svg'

function FeatureRelatedSearch() {
    return (
        <div className='container'>
            <div className="related-search" style={{marginBottom: "2rem"}}>
                <div className="feature-related-search-title">
                    <h3>Related Products</h3>
                </div>
                <div className="related-search-cards">
                    <FeatureRelatedSearchslider/>
                </div>
            </div>
        </div>
    )
}

export default FeatureRelatedSearch
