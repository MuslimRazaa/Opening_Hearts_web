import React, { useEffect, useState } from 'react'
import TopRatedProvidersCard from '../cards/TopRatedProvidersCard'
import Pagination from '../../../components/Main/Pagination';
import { topRatedServiceProvider } from '../../../utils/api';

function ServiceProviderCardsSection() {
    const [currentPage, setCurrentPage] = useState(1);
    const [topRatedService, setTopRatedService] = useState([]);
    const [loading, setLoading] = useState([]);



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




    const itemsPerPage = 52;
    const totalItems = 150;

    const cardsArray = Array.from({ length: totalItems }, (_, index) => index + 1);

    // Calculate the products to display for the current page
    //   const startIndex = (currentPage - 1) * itemsPerPage;
    //   const endIndex = startIndex + itemsPerPage;
    //   const displayedProducts = cardsArray.slice(startIndex, endIndex);

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12">
                    <div className="service-provider-top-title-cards-section">
                        <h2>({topRatedService?.length} + Result)</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                {Array.isArray(topRatedService) && topRatedService?.length > 0 ? (
                    topRatedService?.map((product) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
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
                    <p>No top-rated services available.</p> // You can display a fallback message or an empty state here.
                )}
            <div className="feature-product-paginantion">
                {/* <Pagination
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    /> */}
            </div>
        </div>
        </div >
    )
}

export default ServiceProviderCardsSection