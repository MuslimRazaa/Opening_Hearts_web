import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import search from '../media/images/search.svg';
import sort from '../media/images/sort.svg';
import soffa from '../media/images/Tem_Images/soffaa.svg'
import group from '../media/images/Group.svg';
import Pagination from '../components/Main/Pagination';
import Newsletter from '../components/Main/Newsletter';
import Footer from '../components/Layout/Footer';
import StoreCard from '../components/Main/StoreCard';
import { topRatedStores } from '../utils/api';

function TopRatedStoresDetailPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [store, setStore] = useState([]);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 32;
    const totalItems = store?.length; // Total number of products




    useEffect(() => {
        const fetchedTopStores = async () => {
            try {
                const response = await topRatedStores();
                setStore(response.data?.data?.store); // Adjust based on API response structure
            } catch (error) {
                console.error('Error fetching top-rated products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchedTopStores();
    }, []);


    useEffect(() => {
        // Scroll to top when the page loads
        window.scrollTo(0, 0);
    }, []);
    // Calculate the products to display for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedProducts = store?.slice(startIndex, endIndex);


    return (
        <div className='product-to-explore-detail'>
            <Header />
            <div className="container">
                <div className='cards-detail-page-top'>
                    <div className="detail-page-button">
                        <button>Sort by</button>
                        <img src={sort} alt="Sort icon" />
                    </div>
                    <div className='detail-page-search-bar'>
                        <img src={search} alt="Search icon" />
                        <input type='search' placeholder='Search..' />
                    </div>
                </div>
                <div className="detail-page-cards-section">
                    <div className="row">
                        <div className="product-section-title d-flex justify-content-space-between align-items-center">
                            <div className="col-lg-10 d-flex justify-content-left gap-20">
                                <img src={group} alt="Group icon" />
                                <h1 style={{ margin: "0" }}>Top Rated Store</h1>
                            </div>
                            <div className="col-lg-2">
                                <div className="detail-page-title-right">
                                    <h3>({totalItems.toLocaleString()} Products Available)</h3>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <p>Loading...</p>
                        ) : displayedProducts.map((product) => (
                            <div key={product.id} className="col-lg-4">
                                <div className="store-detail-page-card-wrapper">
                                    <StoreCard
                                        cat={product?.category[0]?.name}
                                        image={product.cover_image || 'fallback-image-url'}
                                        name={product.shop_name}
                                        rating={product.rating}
                                        vImage={product?.main_image}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='pagination-wrapper-detail-page'>
                        <Pagination
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
            <Newsletter />
            <Footer />
        </div>
    );
}

export default TopRatedStoresDetailPage;
