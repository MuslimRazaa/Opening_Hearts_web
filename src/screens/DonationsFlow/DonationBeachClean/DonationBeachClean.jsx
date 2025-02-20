import React, { useEffect, useState } from 'react'
import Header from '../../../components/Layout/Header'
import FundingCycleHeader from '../FundingCycleHeader'
import DonationBannerSec from '../DonationBannerSec'
import FundingNav from '../FundingNav'
import DonationBeachFirstSec from './DonationBeachFirstSec'
import Footer from '../../../components/Layout/Footer'
import { useLocation } from 'react-router-dom'
import { OrganizationEventDetail } from '../../../utils/api'

function DonationBeachClean() {
       const [fundingCycleHome, setFundingCycleHome] = useState([]);
       const [fundingCycleHomeCamp, setFundingCycleHomeCamp] = useState([]);
        const [loading, setLoading] = useState(false);
        const [loading2, setLoading2] = useState(false);
      
         const location = useLocation();
        
          const queryParams = new URLSearchParams(location.search);
          const id = queryParams.get('id');


        const fetchOrganizationEventDetail = async () => {
          setLoading2(true)
          try {
            const response = await OrganizationEventDetail(id);
            setFundingCycleHome(response?.data?.data); // Adjust based on API response structure
          } catch (error) {
            console.error('Error fetching categories:', error);
          } finally {
            setLoading2(false)
          }
        };
      
        useEffect(() => {
          fetchOrganizationEventDetail();
        }, []);


  return (
    <div>
      <Header/>
      {/* <FundingCycleHeader funding={"false"}/> */}
      {/* <DonationBannerSec /> */}
      <FundingNav/>
      <DonationBeachFirstSec data={fundingCycleHome}/>
      <Footer/>
    </div>
  )
}

export default DonationBeachClean
