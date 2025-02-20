import React, { useEffect, useState } from 'react'
import Header from '../../../components/Layout/Header'
import ServiceProviderDropdowns from '../ServiceProviderFlow/ServiceProviderDropdowns'
import ServiceProviderCardsSection from '../ServiceProviderFlow/ServiceProviderCardsSection'
import RelatedSearchServiceProvider from '../ServiceProviderFlow/RelatedSearchServiceProvider'
import ServiceProviderBrowserSearch from '../ServiceProviderFlow/ServiceProviderBrowserSearch'
import Footer from '../../../components/Layout/Footer'
import ServiceCatagoryCardSection from './ServiceCatagoryCardSection'
import {BASE_URL} from '../../../utils/api'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function ServiceCatagoryDetailPage() {
  const [serviceBySubCat , setServiceBySubCat ] = useState([])
  const [loading , setLoading ] = useState()


   const location = useLocation();
  
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
  
  

  const fetchServiceBySubCat = async () => {
    if (!id) return;
    setLoading(true);
    try {
        const response = await axios.get(`${BASE_URL}service/service-by-filter?sub_category_id=${id}&type=category`);
        setServiceBySubCat(response?.data?.data?.service);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
    fetchServiceBySubCat();
}, [id]);



  return (
    <>
     <Header/>
     <ServiceProviderDropdowns/>
     <ServiceCatagoryCardSection data={serviceBySubCat}/>
     <RelatedSearchServiceProvider />
     {/* <ServiceProviderBrowserSearch/> */}
     <Footer/>
    </>
  )
}

export default ServiceCatagoryDetailPage
