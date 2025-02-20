import React, { useEffect, useState } from 'react'
import DonationBannerSec from '../DonationBannerSec'
import FundingCycleHeader from '../FundingCycleHeader'
import Header from '../../../components/Layout/Header'
import image2 from "../../../media/images/Tem_Images/donationCard.svg";
import FundingNav from '../FundingNav'
import DonationCard from '../../../components/Main/DonationCard'
import Pagination from '../../../components/Main/Pagination';
import Footer from '../../../components/Layout/Footer';
import { useLocation } from 'react-router-dom';
import { OrganizationHome, OrganizationHomeCampaigns } from '../../../utils/api';

function DonationFundingCycleAll({id}) {
    // const [currentPage, setCurrentPage] = useState(1);
     const [fundingCycleHomeCamp, setFundingCycleHomeCamp] = useState([]);
     const [fundingCycleHome, setFundingCycleHome] = useState();
      const [loading, setLoading] = useState(false);



    // const itemsPerPage = 8;
    // const totalItems = 150; // Total number of products

        const location = useLocation();
        const queryParams = new URLSearchParams(location.search);
        const R_id = queryParams.get('id');
      

      const fetchOrganizationHome = async () => {
        setLoading(true)
        try {
          const response = await OrganizationHome(R_id);
          setFundingCycleHome(response?.data); // Adjust based on API response structure
        } catch (error) {
          console.error('Error fetching categories:', error);
        } finally {
          setLoading(false)
        }
      };


     const fetchOrganizationHomeCampaigns = async () => {
        setLoading(true)
        try {
          const response = await OrganizationHomeCampaigns(R_id);
          setFundingCycleHomeCamp(response?.data?.data?.campaign); // Adjust based on API response structure
        } catch (error) {
          console.error('Error fetching categories:', error);
        } finally {
          setLoading(false)
        }
      };
    
      useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        fetchOrganizationHomeCampaigns();
        fetchOrganizationHome();
      }, []);


    // Calculate the products to display for the current page
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const displayedProducts = fundingCycleHomeCamp?.slice(startIndex, endIndex);

    return (
        <div>
            <Header />
            <FundingCycleHeader data={fundingCycleHome?.data}/>
            <DonationBannerSec />
            <FundingNav id={R_id} />
            <div className='container'>
                <div className="Donation-Funding-Cycle-All">
                    <div className="row">

                        {fundingCycleHomeCamp?.map((product) => (
                            <div key={product?.id} className="col-lg-3">
                                <div className="donation-detail-page-card-wrapper">
                                    <DonationCard  
                                    id={product?.id}
                                    image={product?.cover_image}
                                    name={product?.name}
                                    req_amt={product?.fund_required}
                                    description={product?.desctiption}
                                    dnt_amt={product?.receive_amount}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className='pagination-wrapper-detail-page'>
                        <Pagination
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                            onPageChange={setCurrentPage}
                        />
                    </div> */}
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default DonationFundingCycleAll
