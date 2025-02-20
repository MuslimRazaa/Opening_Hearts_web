import React, { useEffect, useRef, useState } from 'react'
import banner from '../../media/images/banner_home.png'
import banner2 from '../../media/images/featuredbanner.png'
import resource from '../../media/images/r.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { homeBanner } from '../../utils/api';


function Banner() {
    const [banner, setBanner] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    {/* <div className='home-banner-wrapper'>
                <img src={banner} />
                </div>
                <div className='home-banner-wrapper'>
                <img src={banner2} />
                </div> */}
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
                    {/* <div className='banner-landing-page-resource' onClick={handleResourceMenu}>
                        <img src={resource} /> <h3>OH!  RESOUCES</h3>
                    </div>
                    <div ref={resourceRef} className={`banner-landing-page-resource-main-${resourceStatus ? "open" : "close"}`} >
                        <div className={`OH-RESOUCES-handeler ${resourceStatus ? "show" : "hide"}`} onClick={handleResourceMenu}>
                            <img src={resource} /> <h3>OH!  RESOUCES</h3>
                        </div>
                        <div className={`resource-boxes-main-${resourceStatus ? "show" : "hide"}`}>

                            <div className='resource-protuct-box'>
                                <h1>Products</h1>
                                <div className='resource-flex'>
                                    <div className='store-box'>Store 01</div>
                                    <div className='store-box'>Store 02</div>
                                </div>
                                <div className='resource-flex'>
                                    <div className='store-box'>Store 03</div>
                                    <div className='store-box'>Store 04</div>
                                </div>
                                <div className='resource-flex'>
                                    <div className='store-box'>Store 05</div>
                                    <div className='store-box'>Store 06</div>
                                </div>
                                <div className='resource-flex'>
                                    <div className='store-box'>Store 07</div>
                                    <div className='store-box'>Store 08</div>
                                </div>
                                <div className='resource-flex'>
                                    <div className='store-box'>Store 09</div>
                                    <div className='store-box'>Store 10</div>
                                </div>
                                <Link to='/bussiness-product'><p>View All</p></Link>
                            </div>
                            <div className='resource-service-box'>
                                <h1>Services</h1>
                                <div className='resource-flex'>
                                    <div className='store-box'>Provider 01</div>
                                    <div className='store-box'>Provider 02</div>
                                </div>
                                <div className='resource-flex'>
                                    <div className='store-box'>Provider 03</div>
                                    <div className='store-box'>Provider 04</div>
                                </div>
                                <div className='resource-flex'>
                                    <div className='store-box'>Provider 05</div>
                                    <div className='store-box'>Provider 06</div>
                                </div>
                                <div className='resource-flex'>
                                    <div className='store-box'>Provider 07</div>
                                    <div className='store-box'>Provider 08</div>
                                </div>
                                <div className='resource-flex'>
                                    <div className='store-box'>Provider 09</div>
                                    <div className='store-box'>Provider 10</div>
                                </div>
                                <Link to='/bussiness-service'><p>View All</p></Link>
                            </div>
                            <div className='resource-organization-box'>
                                <h1>Organizations</h1>
                                <div className='resource-flex'>
                                    <div className='store-box'>Company 01</div>
                                    <div className='store-box'>Company 02</div>
                                </div>
                                <div className='resource-flex'>
                                    <div className='store-box'>Company 03</div>
                                    <div className='store-box'>Company 04</div>
                                </div>
                                <div className='resource-flex'>
                                    <div className='store-box'>Company 05</div>
                                    <div className='store-box'>Company 06</div>
                                </div>
                                <div className='resource-flex'>
                                    <div className='store-box'>Company 07</div>
                                    <div className='store-box'>Company 08</div>
                                </div>
                                <div className='resource-flex'>
                                    <div className='store-box'>Company 09</div>
                                    <div className='store-box'>Company 10</div>
                                </div>
                                <Link to='/bussiness-organization'><p>View All</p></Link>
                            </div>
                        </div>
                    </div> */}
                </div>

            </div>
        </>
    )
}

export default Banner
