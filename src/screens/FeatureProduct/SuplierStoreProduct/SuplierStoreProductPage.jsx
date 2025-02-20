import React, { useEffect, useState } from 'react'
import Header from '../../../components/Layout/Header'
import SuplierStoreTop from '../SuplierStore/SuplierStoreTop'
import SuplierProductTop from './SuplierProductTop'
import Footer from '../../../components/Layout/Footer'
import { useLocation } from 'react-router-dom'
import { fetchVendorStoreProducts } from '../../../utils/api'

function SuplierStoreProductPage() {
    const [vendorProducts, setVendorProducts] = useState([]);

  
    const location = useLocation();
  
    const queryParams = new URLSearchParams(location.search);
    const guid = queryParams.get('guid');


     const FetchVendorStoreProducts= async () => {
        try {
          const response = await fetchVendorStoreProducts(guid);
          setVendorProducts(response?.data?.data?.products); // Adjust based on API response structure
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
    
    
      useEffect(() => {
        FetchVendorStoreProducts();
      }, []);
  
  return (
    <div>
        <Header/>
        <SuplierStoreTop/>
        <SuplierProductTop vendorProducts={vendorProducts} guid={guid} />
        <Footer/>
    </div>
  )
}

export default SuplierStoreProductPage
