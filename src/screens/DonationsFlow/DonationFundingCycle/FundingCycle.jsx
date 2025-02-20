import React, { useEffect, useState } from 'react'
import HeaderTop from '../../../components/Layout/HeaderTop'
import FundingCycleHeader from '../FundingCycleHeader'
import HeaderNavbar from '../../../components/Layout/HeaderNavbar'
import DonationBannerSec from '../DonationBannerSec'
import FundingNav from '../FundingNav'
import FundAboutOrganization from './FundAboutOrganization'
import DonationFundingCycleSec from './DonationFundingCycle3rdSec'
import Footer from '../../../components/Layout/Footer'
import SliderThreeDetailPage from '../../FeatureProduct/ProductDetail/slider_other-recomendations/SliderThreeDetailPage'
import { Link, useLocation } from 'react-router-dom'
import { OrganizationHome, OrganizationHomeCampaigns } from '../../../utils/api'
import Header from '../../../components/Layout/Header'

function FundingCycle() {
     const [fundingCycleHome, setFundingCycleHome] = useState();
     const [fundingCycleHomeCamp, setFundingCycleHomeCamp] = useState();
      const [loading, setLoading] = useState(false);
    
       const location = useLocation();
      
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');
      
      const fetchOrganizationHome = async () => {
        setLoading(true)
        try {
          const response = await OrganizationHome(id);
          setFundingCycleHome(response?.data); // Adjust based on API response structure
        } catch (error) {
          console.error('Error fetching categories:', error);
        } finally {
          setLoading(false)
        }
      };

      const fetchOrganizationHomeCampaigns = async () => {
        setLoading(true)
        try {
          const response = await OrganizationHomeCampaigns(id);
          setFundingCycleHomeCamp(response?.data); // Adjust based on API response structure
        } catch (error) {
          console.error('Error fetching categories:', error);
        } finally {
          setLoading(false)
        }
      };
    
      useEffect(() => {
        fetchOrganizationHome();
        fetchOrganizationHomeCampaigns();
      }, []);


  return (
    <div>
         <Header/>
         <FundingCycleHeader data={fundingCycleHome?.data}/>
         <DonationBannerSec/>
         <FundingNav id={id}/>
        <FundAboutOrganization data={fundingCycleHome}/>
        <DonationFundingCycleSec data={fundingCycleHome?.data}/>
        {/* <div className="container">
        <div className="sliderThree">
          <div className="row">
            <div className="col-lg-6">
            <div className="funding-cycle-donation-card-title">
                <h2>Campaigns</h2>
            </div>
            </div>
            <div className="col-lg-6">
              <div className="funding-cycle-view-all-btn">
            <Link to="/funding-cycle-all" style={{textDecoration:"none"}} ><button style={{
              color:"#018bc3",
              background:"none",
              border:"none",
              margin:"25px 10px 0px"
            }}>View All</button></Link>  
              </div>
            </div>
          </div>
                <SliderThreeDetailPage data={fundingCycleHomeCamp?.data}/>
            </div>
        </div> */}
            <Footer/>
      
    </div>
  )
}

export default FundingCycle
