import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import search from '../media/images/search.svg';
import sort from '../media/images/sort.svg';
import ProductCard from '../components/Main/ProductCard';
import ifoneee from '../media/images/Tem_Images/ifoneee.svg';
import { Link } from 'react-router-dom';
import group from '../media/images/Group.svg';
import Pagination from '../components/Main/Pagination';
import Newsletter from '../components/Main/Newsletter';
import Footer from '../components/Layout/Footer';
import { topRatedProducts } from '../utils/api';

function ProductToExploreDetail() {
    const [currentPage, setCurrentPage] = useState(1);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 32;
    const totalItems = allProducts?.length; // Total number of products
    
    const fetchTopRatedProducts = async (page , page_size) => {
      try {
        const response = await topRatedProducts(page , page_size);
        setAllProducts(response?.data?.data?.product); // Adjust based on API response structure
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top-rated products:', error);
        setLoading(false);
      }
    };
    
        useEffect(() => {
            fetchTopRatedProducts();
        }, []);

    useEffect(() => {
        // Scroll to top when the page loads
        window.scrollTo(0, 0);
    }, []);

    // Calculate the products to display for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedProducts = allProducts?.slice(startIndex, endIndex);
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
                                <h1 style={{ margin: "0" }}>Top Products to Explore</h1>
                            </div>
                            <div className="col-lg-2">
                                <div className="detail-page-title-right">
                                    <h3>({totalItems.toLocaleString()} Products Available)</h3>
                                </div>
                            </div>
                        </div>

                        {displayedProducts?.map((product) => (
                            <div key={product.id} className="col-lg-3">
                                <div className="product-detail-page-card-wrapper">
                                    <ProductCard image={product.media?.[0]?.original_url || 'fallback-image-url'} name={product.title} price={product?.price} discounted_price={product?.discount_price} />
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

export default ProductToExploreDetail;
