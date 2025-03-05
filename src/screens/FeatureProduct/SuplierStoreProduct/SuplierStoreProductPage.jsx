import React, { useEffect, useState } from 'react'
import Header from '../../../components/Layout/Header'
import SuplierStoreTop from '../SuplierStore/SuplierStoreTop'
import SuplierProductTop from './SuplierProductTop'
import Footer from '../../../components/Layout/Footer'
import { useLocation } from 'react-router-dom'
import { fetchVendorStore, fetchVendorStoreProducts } from '../../../utils/api'
import LoadingComponents from '../../../components/shared/loaders/LoadingComponents'

function SuplierStoreProductPage() {
  const [vendorProducts, setVendorProducts] = useState([]);
  const [loading, setLoading] = useState(false);
    const [vendor, setVendor] = useState()


  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const guid = queryParams.get('guid');

  const FetchVendorStore= async () => {
    setLoading(true)
    try {
      const response = await fetchVendorStore(guid);
      setVendor(response?.data?.data); // Adjust based on API response structure
      setLoading(false)
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false)
    }
  };


  const FetchVendorStoreProducts = async () => {
    setLoading(true)
    try {
      const response = await fetchVendorStoreProducts(guid);
      setVendorProducts(response?.data?.data?.products); // Adjust based on API response structure
      setLoading(false)
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false)
    }
  };


  useEffect(() => {
    FetchVendorStoreProducts();
    FetchVendorStore()
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <LoadingComponents />
        <Footer />

      </>
    )
  }
  else {
    return (
      <div>
        <Header />
        <SuplierStoreTop id={vendor?.id}  guid={guid} vendor={vendor}/>
        <SuplierProductTop vendorProducts={vendorProducts} guid={guid} />
        <Footer />
      </div>
    )

  }
  return (
    <div>
      <Header />
      <SuplierStoreTop />
      <SuplierProductTop vendorProducts={vendorProducts} guid={guid} />
      <Footer />
    </div>
  )
}

export default SuplierStoreProductPage
