import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Layout/Header';
import search from '../media/images/search.svg';
import sort from '../media/images/sort.svg';
import service from '../media/images/Tem_Images/service.svg'
import group from '../media/images/Group.svg';
import Pagination from '../components/Main/Pagination';
import Newsletter from '../components/Main/Newsletter';
import Footer from '../components/Layout/Footer';
import ServicesCard from '../components/Main/ServicesCard';
import { topRatedService } from '../utils/api';

function ServiceDetailPage() {
    const [types, setTypes] = useState(false);
    const [service, setService] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 32;
    const totalItems = service?.length; // Total number of products


  useEffect(() => {
    const fetchTopRatedService= async () => {
      try {
        const response = await topRatedService();
        setService(response?.data?.data?.service); // Adjust based on API response structure
      } catch (error) {
        console.error('Error fetching top-rated products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedService();
  }, []);

    const handleTypesDropdown = () => {
        setTypes(!types);
    }

    // Reference for dropdown to check if the click is inside
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const buttonLabels = [
        'Programming', 'Designing', 'Animation', 'Mechanic', 'Programming', 'Designing', 'Animation', 'Mechanic',
        'Programming', 'Designing', 'Animation', 'Mechanic', 'Programming', 'Designing', 'Animation', 'Mechanic',
        'Programming', 'Designing', 'Animation', 'Mechanic', 'Programming', 'Designing', 'Animation', 'Mechanic',
        'Programming', 'Designing', 'Animation', 'Mechanic', 'Programming', 'Designing', 'Animation', 'Mechanic',
        'Programming', 'Designing', 'Animation', 'Mechanic', 'Programming', 'Designing', 'Animation', 'Mechanic',
        'Programming', 'Designing', 'Animation', 'Mechanic', 'Programming', 'Designing', 'Animation', 'Mechanic',
        'Programming', 'Designing', 'Animation', 'Mechanic', 'Programming', 'Designing', 'Animation', 'Mechanic',
        'Programming', 'Designing', 'Animation', 'Mechanic', 'Programming', 'Designing', 'Animation', 'Mechanic',
    ];

    useEffect(() => {
        // Scroll to top when the page loads
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        // Close the dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setTypes(false); // Close the dropdown
            }
        };

        document.addEventListener('click', handleClickOutside);

        // Cleanup event listener when component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Calculate the products to display for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedProducts = service?.slice(startIndex, endIndex);

    return (
        <div className='product-to-explore-detail'>
            <Header />
            <div className="container">
                <div className='cards-detail-page-top'>
                    <div className="class-flex">
                        <div
                            className="service-detail-page-top-button" >
                            <button>All</button>
                        </div>
                        <div className="service-detail-page-top-button">
                            <button>Programming</button>
                        </div>
                        <div className="service-detail-page-top-button">
                            <button>Design</button>
                        </div>
                        <div className="service-detail-page-top-button">
                            <button>Animation</button>
                        </div>
                        <div className="service-detail-page-top-button"
                            onClick={handleTypesDropdown}
                            ref={buttonRef}>
                            <button>More</button>
                        </div>
                    </div>
                    <div className='donation-detail-page-search-bar'>
                        <img src={search} alt="Search icon" />
                        <input type='search' placeholder='Search..' />
                    </div>

                    {/* Hover div on All button */}
                    <div
                        ref={dropdownRef} // Ref for dropdown
                        className={`service-tabs-all-types ${types ? 'open' : 'close'}`}
                    >
                        {buttonLabels.map((label, index) => (
                            <div key={index} className="service-detail-page-types-button">
                                <button>{label}</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="detail-page-cards-section">
                    <div className="row">
                        <div className="product-section-title d-flex justify-content-space-between align-items-center">
                            <div className="col-lg-10 d-flex justify-content-left gap-20">
                                <img src={group} alt="Group icon" />
                                <h1 style={{ margin: "0" }}>Grow Your Business with our Services</h1>
                            </div>
                            <div className="col-lg-2">
                                <div className="detail-page-title-right">
                                    <h3>({totalItems.toLocaleString()} services Available)</h3>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <p>Loading...</p>
                        ) : displayedProducts.map((product) => (
                            <div key={product.id} className="col-lg-3">
                                <div className="service-detail-page-card-wrapper">
                                    <ServicesCard
                                        image={product.main_image}
                                        name={product.name}
                                        cat={product?.category.name}
                                        description={product?.category.description}
                                        rating={product.price}
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

export default ServiceDetailPage;
