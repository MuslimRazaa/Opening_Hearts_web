import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import search from '../media/images/search.svg';
import sort from '../media/images/sort.svg';
import donation from '../media/images/Tem_Images/donationCard.svg'
import group from '../media/images/Group.svg';
import Pagination from '../components/Main/Pagination';
import Newsletter from '../components/Main/Newsletter';
import Footer from '../components/Layout/Footer';
import ServicesCard from '../components/Main/ServicesCard';
import DonationCard from '../components/Main/DonationCard';
import RelatedSearch from '../components/Main/RelatedSearch';
import { topRatedCampaings } from '../utils/api';

function DonationDetailPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [donation, setDonation] = useState([]);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 32;
    const totalItems = donation?.length; // Total number of products


    useEffect(() => {
        const fetchTopRatedCampaings= async () => {
            try {
                const response = await topRatedCampaings();
                setDonation(response?.data?.data?.Campaign); // Adjust based on API response structure
            } catch (error) {
                console.error('Error fetching top-rated products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopRatedCampaings();
    }, []);





    useEffect(() => {
        // Scroll to top when the page loads
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);


    // Calculate the products to display for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedProducts = donation?.slice(startIndex, endIndex);


    return (
        <div className='product-to-explore-detail'>
            <Header />
            <div className="container">
                <div className='cards-detail-page-top' style={{ padding: "4rem 0px 5px" }}>
                    <div className="col-lg-8 d-flex justify-content-left gap-20">
                        <img src={group} alt="Group icon" />
                        <h1 style={{ margin: "0" }}>Donate For Humans In Need</h1>
                    </div>
                    <div className="col-lg-4">
                        <div className='donation-detail-page-search-bar'>
                            <img src={search} alt="Search icon" />
                            <input type='search' placeholder='Search..' />
                        </div>
                    </div>
                </div>
                <div className="detail-page-cards-section">
                    <div className="row">

                        {loading ? (
                            <p>Loading...</p>
                        ) : displayedProducts?.map((product) => (
                            <div key={product?.id} className="col-lg-3">
                                <div className="donation-detail-page-card-wrapper">
                                    <DonationCard
                                        image={product?.cover_image}
                                        name={product?.name}
                                        req_amt={product?.fund_required}
                                        description={product?.desctiption}
                                        dnt_amt={product?.receive_amount}
                                        id={product?.id}
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

            {/* <RelatedSearch /> */}
            <Footer />
        </div>
    );
}

export default DonationDetailPage;
