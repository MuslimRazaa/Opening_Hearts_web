import React from 'react'
import Header from '../../components/Layout/Header'
import Productbanner from './Productbanner'
import FeatureProductSec2 from './FeatureProductSec2'
import FeatureProductSec3 from './FeatureProductSec3'
import Pagination from '../../components/Main/Pagination'
import Footer from '../../components/Layout/Footer'
import RelatedSearch from '../../components/Main/RelatedSearch'
import FeatureRelatedSearch from './FeatureRelatedSearch'


function FeatureProduct() {
  return (
    <>
     <Header/>
     {/* <Productbanner/> */}
     <FeatureProductSec3 />
     {/* <FeatureRelatedSearch/> */}
     <br></br>
     <br></br>
    <div className="container">
     <div className='feature-related-search-tabs'>
        <h2>Related Search</h2>
        <div class="f-service-detail-page-top-button">
          <button>Headphones</button>
        </div>
        <div class="f-service-detail-page-top-button">
          <button>Mobiles</button>
        </div>
        <div class="f-service-detail-page-top-button">
          <button>Air Pods</button>
        </div>
        <div class="f-service-detail-page-top-button">
          <button>Watches</button>
        </div>
        <div class="f-service-detail-page-top-button">
          <button>Laptops</button>
        </div>
        <div class="f-service-detail-page-top-button">
          <button>Charger</button>
        </div>
        <div class="f-service-detail-page-top-button">
          <button>I Phones</button>
        </div>
        <div class="f-service-detail-page-top-button">
          <button>Samsung</button>
        </div>
     </div>
    </div>
     <Footer/>
     

    </>
  )
}

export default FeatureProduct
