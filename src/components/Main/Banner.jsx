import React, { useEffect, useRef, useState } from 'react'
import banner from '../../media/images/banner_home.png'
import banner2 from '../../media/images/featuredbanner.png'
import resource from '../../media/images/r.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { homeBanner } from '../../utils/api';
import LoadingComponents from '../shared/loaders/LoadingComponents';


function Banner() {
    const [banner, setBanner] = useState([]);
    const [loading, setLoading] = useState(false);

    const [resourceStatus, setResourceStatus] = useState(false)
    const resourceRef = useRef(null); // Create a ref for the resource element
    const handleResourceMenu = () => {
        setResourceStatus(!resourceStatus)
    }
    useEffect(() => {
        // Function to handle clicks outside of the resource element
        const handleClickOutside = (event) => {
            if (resourceRef.current && !resourceRef.current.contains(event.target)) {
                setResourceStatus(false); // Set status to false if clicked outside
            }
        };

        // Bind the event listener to document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);




    const fetchedTopStores = async () => {
        setLoading(true)
        try {
            const response = await homeBanner();
            setBanner(response?.data?.data?.banners); // Adjust based on API response structure
        } catch (error) {
            console.error('Error fetching top-rated products:', error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchedTopStores();
    }, []);

    if(loading){
        return(
            <LoadingComponents/>
        )
    }
    else{
        return (
            <>
                <div className='banner-landing-page'>
                    <Carousel
                        autoPlay={true}
                        infiniteLoop={true}
                        showArrows={false}
                        showThumbs={false}
                        showIndicators={true}
                        showStatus={false}
                        interval={5000}
                        transitionTime={750}
                    >
                        {banner?.map((banner) => (
                            <div className='home-banner-wrapper'>
                                <img src={banner.image} />
                            </div>
                        ))}
                    </Carousel>
                    <div className="container">
    
                        <div className='banner-landing-page-content'>
                            <h1>
                                SUMMEROFFER
                            </h1>
                            <div className='banner-landing-page-subcontent'>
                                <h2>
                                    25%
                                </h2>
                            </div>
                        </div>
                    </div>
    
                </div>
            </>
        )
    }
    
}

export default Banner
