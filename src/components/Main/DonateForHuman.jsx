import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import group from '../../media/images/Group.svg'
import StoreCard from './StoreCard'
import DonationCard from './DonationCard'
import donation from '../../media/images/Tem_Images/donationCard.svg'
import pat from '../../media/images/Tem_Images/pat.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import BASE_URL, { topRatedCampaings } from '../../utils/api'
import LoadingComponents from '../shared/loaders/LoadingComponents'
import NoDataFound from '../shared/noDataFound/NoDataFound'

function DonateForHuman() {

  const [donation, setDonation] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopRatedCampaings = async () => {
    try {
      const response = await topRatedCampaings();
      setDonation(response?.data?.data?.Campaign || []); // Adjust based on API response structure
    } catch (error) {
      console.error('Error fetching top-rated products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRatedCampaings();
  }, []);
  return (
    <>
      <div className='container'>
        <div className="donation-section">
          <div className="row">

            <div className="product-section-title d-flex justify-content-space-between align-item-center">
              <div className="col-lg-11 d-flex justify-content-left gap-20">
                <img src={group} /> <h1>Donate For Humans In Need</h1>
              </div>
              <div className="col-lg-1">
                <div className="view-all-buttons">
                  <Link to='/donation-detail'><p>View All</p></Link>
                </div>
              </div>
            </div>


            <div className="row">

              {loading ? (
                <LoadingComponents />
              ) :  donation?.length > 0 ? (
                donation?.slice(0, 4).map((product) => (
                  <div className="col-lg-3" key={product.id}>
                    <DonationCard
                      image={product.cover_image}
                      name={product.name}
                      req_amt={product?.fund_required}
                      description={product?.desctiption}
                      dnt_amt={product?.receive_amount}
                      percentage={product?.percentage}
                      id={product?.id}
                    />
                  </div>
                ))
              ) : <NoDataFound />}
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default DonateForHuman
