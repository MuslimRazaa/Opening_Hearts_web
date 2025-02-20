import React, { useEffect, useState } from 'react'
import heartimg from '../../../media/images/heart-icon.svg'
import shareimg from '../../../media/images/share-icon.svg'
import cardfoodimg from '../../../media/images/foodcardimg.png'
import carddonaimg from '../../../media/images/Donation-img.png'
import fundlogo from '../../../media/images/Funding Circle log.png'
import FoodSideCompo from './FoodSideCompo'
import { Link, useLocation } from 'react-router-dom'
import { getCampaign } from '../../../utils/api'


function FoodDriveFirstSec() {
   const [campaignDetailPage, setCampaignDetailPage] = useState();
    const [loading, setLoading] = useState(false);
  
     const location = useLocation();
    
      const queryParams = new URLSearchParams(location.search);
      const id = queryParams.get('campaign_id');
    
    const fetchCampaignDetail = async () => {
      setLoading(true)
      try {
        const response = await getCampaign(id);
        setCampaignDetailPage(response?.data?.data); // Adjust based on API response structure
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false)
      }
    };
  
    useEffect(() => {
      fetchCampaignDetail();
    }, []);
  
  
  
  return (
    <>
      <div className='donate-food-drive-sec1'>

        <div className="container">
          <div className="row">
            <h5>Save this Campaign</h5>
            <div className="col-md-7">
              <div className="food-h-and-img-sec">
                <h1>
                  {campaignDetailPage?.name}
                </h1>
                <div className="food-two-img-sec">
                  <img src={heartimg} alt="" />
                  <img src={shareimg} alt="" />
                </div>
              </div>

              <div className="card-food-img">
                <img src={campaignDetailPage?.cover_image} alt="" />
                {/* <h3>Summary</h3>
                <p>Sudan is experiencing a catastrophic civil war as violent clashes between paramilitary and government forces
                  threaten the lives of people across the country. Since April 2023, thousands of Sudanese have been killed,
                  and millions more injured and displaced in the fighting. Your donation to the Sudan Emergency Fund
                  will provide emergency relief, food, water, medicine, and other essential supplies to impacted communities.</p>*/}
              </div> 
                <div className="card-food-img-i" dangerouslySetInnerHTML={{ __html: campaignDetailPage?.desctiption }}>
                </div>
              <div className="food-donation-card">
                {/* <h3>How Your Donation Will Be Used</h3>
                <p>When you donate to Opening Hearts Sudan Emergency Fund, your donation will be used to:</p>
                <ul>
                  <li>Deliver food, water, and critical supplies to families in crisis-affected communities</li>
                  <li>Support shelter and protection including for displaced people</li>
                  <li>Provide medical treatment and psychosocial support</li>
                  <li>Meet other needs as they emerg</li>
                </ul> */}
                <img src={carddonaimg} alt="" />
              </div>

              <div className="foodorganization-card">
                <div className="foodorganization-information">
                  <p>{campaignDetailPage?.company?.organization_name}</p>
                  <img width={'174.26px'} src={campaignDetailPage?.company?.profile_image} alt="" srcset="" />

                  <Link to={`/funding-cycle?id=${campaignDetailPage?.company?.id}`} style={{textDecoration:"none"}}> <button className='view-profile-btn'>View Profile</button></Link>  
                </div>
                <div className="foodorganization-adress">
                  <p style={{ color: 'orangered', fontWeight: '700', }}>LOCATION:<span>{campaignDetailPage?.company?.street_address}</span></p>
                  <p style={{ color: 'orangered', fontWeight: '700', }}>WEBSITE:<span>{campaignDetailPage?.company?.website}</span></p>
                  {/* <p style={{ color: 'orangered', fontWeight: '700', }}>FACEBOOK:<span> Facebook Page</span></p>
                  <p style={{ color: 'orangered', fontWeight: '700', }}>TWITTER:<span> @GlobalGiving</span></p> */}
                </div>
              </div>
            </div>
            <div className="col-md-5">
            <FoodSideCompo data={campaignDetailPage}/>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default FoodDriveFirstSec
