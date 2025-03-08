import React, { useEffect, useState } from 'react'
import TopRatedProvidersCard from './cards/TopRatedProvidersCard'
import { Link } from 'react-router-dom'
import { topRatedServiceProvider } from '../../utils/api';
import { Spinner } from 'react-bootstrap';
import NoDataFound from '../../components/shared/noDataFound/NoDataFound';
import LoadingComponents from '../../components/shared/loaders/LoadingComponents';

function TopRatedSection() {
  const [topRatedService, setTopRatedService] = useState([]);
  const [loading, setLoading] = useState(false);



  const fetchTopRatedServiceProvider = async () => {

    setLoading(true)

    try {
      const response = await topRatedServiceProvider();
      setTopRatedService(response?.data?.data?.serviceProvider); // Adjust based on API response structure
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false)
    }
  };


  useEffect(() => {
    fetchTopRatedServiceProvider();
  }, []);



  if (loading) {
    return (
      <>
        <LoadingComponents />
      </>
    )
  }
  else {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <h2 className='service-main-heading'>Top Rated Service Providers</h2>
            </div>
            <div className="col-lg-3">
              <div className="service-card-heading-link">
                <Link to='/serviceProvider' > <h2>View All</h2></Link>
              </div>
            </div>
          </div>
          <div className="row">
            {Array.isArray(topRatedService) && topRatedService.length > 0 ? (
              topRatedService?.slice(0, 4).map((product) => (
                <div className="col-lg-3" key={product.id}>
                  <TopRatedProvidersCard
                    id={product?.id}
                    user_name={product?.vendor_service?.store_name}
                    user_image={product.cover_image}
                    user_flag={product?.vendor_service?.country}
                    description={product?.description}
                    rating={product?.rating}
                    rating_count={product?.rating_count}
                  />
                </div>
              ))
            ) : (
              <NoDataFound title="No Data Found" /> // You can display a fallback message or an empty state here.
            )}
          </div>
        </div>
      </>

    )
  }

}

export default TopRatedSection
