import React, { useEffect, useState } from 'react'
import Header from '../../../components/Layout/Header'
import ServiceSellerProfileTop from './ServiceSellerProfileTop'
import ServiceSellerGallery from './ServiceSellerGallery'
import AboutMethew from './AboutMethew'
import GetToKnowAbtMethew from './GetToKnowAbtMethew'
import OtherRecomendationsForSeller from './OtherRecomendationsForSeller'
import Footer from '../../../components/Layout/Footer'
import SingleServiceFaqs from '../SingleServiceDetailPage/SingleServiceFaqs'
import { addServiceToCart, serviceDetail } from '../../../utils/api'
import { useLocation } from 'react-router-dom'
import ServicePackageTable from './ServicePackageTable'
import FullScreenLoadingComponents from '../../../components/shared/loaders/FullScreenLoadingComponents'

function ServiceSellProfile() {
  const [serviceDetailPage, setServiceDetailPage] = useState({});
  const [loading, setLoading] = useState(false);

   const location = useLocation();
  
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
  
  
  const fetchServiceDetail = async () => {
    setLoading(true)
    try {
      const response = await serviceDetail(id);
      setServiceDetailPage(response?.data); // Adjust based on API response structure
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false)
    }
  };




  useEffect(() => {
    fetchServiceDetail();
  }, []);


  if(loading){
    return(
      <>
      <Header/>
      <FullScreenLoadingComponents />
      <Footer/>
      </>
    )
  }

  else{
    return (
      <div>
          <Header/>
          <ServiceSellerProfileTop data={serviceDetailPage?.data} available={true}/>
          <ServiceSellerGallery data_review={serviceDetailPage?.data}  data={serviceDetailPage?.data} />
          <AboutMethew data={serviceDetailPage?.data}/>
          <GetToKnowAbtMethew data={serviceDetailPage?.data}/>
          <ServicePackageTable/>
          <SingleServiceFaqs data={serviceDetailPage?.data}/>
          {/* <OtherRecomendationsForSeller/> */}
          <Footer/>
      </div>
    )
  }
 
}

export default ServiceSellProfile
