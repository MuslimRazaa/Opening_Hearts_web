import React, { useEffect, useState } from 'react'
import productBanner from '../../media/images/Banners_Mesa de trabajo 1 1 (1).png'
import { allFeaturedProductsBanner } from '../../utils/api';

function Productbanner() {
    const [banner, setBanner] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchedTopStores = async () => {
            try {
                const response = await allFeaturedProductsBanner();
                setBanner(response?.data?.data?.banners); // Adjust based on API response structure
            } catch (error) {
                console.error('Error fetching top-rated products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchedTopStores();
    }, []);
  return (
    <div className='service-landing-page'>
            {/* <img src={banner[0]?.image} />       */}
            <img src={productBanner} style={{height:"50%"}}/>      
    </div>
  )
}

export default Productbanner
