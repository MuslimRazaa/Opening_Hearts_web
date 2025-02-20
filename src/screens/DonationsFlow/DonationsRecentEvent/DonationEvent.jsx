import React, { useEffect, useState } from 'react'
import HeaderTop from '../../../components/Layout/HeaderTop'
import HeaderNavbar from '../../../components/Layout/HeaderNavbar'
import FundingCycleHeader from '../FundingCycleHeader'
import DonationBannerSec from '../DonationBannerSec'
import FundingNav from '../FundingNav'
import DonationRecentEvent from './DonationRecentEvent'
import DonationUpcomingEvent from './DonationUpcomingEvent'
import Footer from '../../../components/Layout/Footer'
import { useLocation } from 'react-router-dom'
import { OrganizationEventsRecents, OrganizationEventsUpcommimg, OrganizationHome } from '../../../utils/api'

function DonationEvent() {
  const [fundingCycleHome, setFundingCycleHome] = useState([]);
  const [fundingCycleHome2, setFundingCycleHome2] = useState();
  const [fundingCycleHomeCamp, setFundingCycleHomeCamp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const fetchOrganizationEventsRecents = async () => {
    setLoading(true)
    try {
      const response = await OrganizationEventsRecents(id);
      setFundingCycleHomeCamp(response?.data?.data?.event); // Adjust based on API response structure
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false)
    }
  };


  const fetchOrganizationHome = async () => {
    setLoading(true)
    try {
      const response = await OrganizationHome(id);
      setFundingCycleHome2(response?.data); // Adjust based on API response structure
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false)
    }
  };


  const fetchOrganizationEventsUpcommimg = async () => {
    setLoading2(true)
    try {
      const response = await OrganizationEventsUpcommimg(id);
      setFundingCycleHome(response?.data?.data?.event); // Adjust based on API response structure
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading2(false)
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    fetchOrganizationEventsRecents()
    fetchOrganizationEventsUpcommimg()
    fetchOrganizationHome()
  }, []);


  return (
    <div>
      <HeaderTop />
      <HeaderNavbar />
      <FundingCycleHeader data={fundingCycleHome2?.data} />
      <DonationBannerSec />
      <FundingNav id={id} />
      <DonationRecentEvent upcomming={fundingCycleHome} recent={fundingCycleHomeCamp} />
      <DonationUpcomingEvent upcomming={fundingCycleHome} />
      <Footer />

    </div>
  )
}

export default DonationEvent

