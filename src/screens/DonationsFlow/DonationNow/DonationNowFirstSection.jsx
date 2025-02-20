import React, { useEffect, useState } from 'react'
import bannerFirstimgdon from '../../../media/images/donation-1st-img.png'
import bannerFirstimgdon2 from '../../../media/images/dn2.png'
import bannerFirstimgdon3 from '../../../media/images/dn3.png'
import sepratorimg from '../../../media/images/specrator-donation-now.png'
import fundlogo from '../../../media/images/Funding Circle log.png'
import { Link } from 'react-router-dom'
import TopCatagories from '../../../components/Main/TopCatagories'
import DonateForHuman from '../../../components/Main/DonateForHuman'
import { donationsHomeOrganization, newsAndMedia, ourPartners } from '../../../utils/api'


function DonationNowFirstSection() {

    const [organizations, setOrganizations] = useState([]);
    const [ourPartner, setOurPartner] = useState([]);
    const [newsMedia, setNewsMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);

    const fetchOrganization = async () => {
        setLoading2(true);
        try {
            const response = await donationsHomeOrganization();
            setOrganizations(response?.data?.data?.organization); // Adjust based on API response structure
        } catch (error) {
            console.error('Error fetching top-rated products:', error);
        } finally {
            setLoading2(false);
        }
    };

    const fetchOurPartners = async () => {
        setLoading(true);
        try {
            const response = await ourPartners();
            setOurPartner(response?.data?.data?.partners); // Adjust based on API response structure
        } catch (error) {
            console.error('Error fetching top-rated products:', error);
        } finally {
            setLoading(false);
        }
    };


    const fetchNewsAndMedia = async () => {
        setLoading(true);
        try {
            const response = await newsAndMedia();
            setNewsMedia(response?.data?.data?.NewsMedia); // Adjust based on API response structure
        } catch (error) {
            console.error('Error fetching top-rated products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrganization();
        fetchOurPartners();
        fetchNewsAndMedia();
    }, []);


    // const logos = [
    //     { src: alfredlogo, alt: 'Alfred Logo' },
    //     { src: autodesklogo, alt: 'Autodesk Logo' },
    //     { src: fundlogo, alt: 'Fund Logo' },
    //     { src: beazerlogo, alt: 'Beazer Logo' },
    //     { src: autodesklogo, alt: 'Autodesk Logo' },
    //     { src: alfredlogo, alt: 'Alfred Logo' },
    // ];
    // const logos2 = [
    //     { src: alfredlogo, alt: 'Alfred Logo' },
    //     { src: autodesklogo, alt: 'Autodesk Logo' },
    //     { src: fundlogo, alt: 'Fund Logo' },
    //     { src: beazerlogo, alt: 'Beazer Logo' },
    // ];


    return (
        <>
            <div className='donation-now-1st-sec'>
                <div className="dn1">
                    <img src={bannerFirstimgdon} alt="" />
                </div>
                <div className="dn2">
                    <div className="dn2-t">
                        <img src={bannerFirstimgdon2} alt="" />
                    </div>
                    <div className="dn2-b">
                        <img src={bannerFirstimgdon3} alt="" />
                    </div>
                </div>
            </div>
            <div className="donation-now-2nd-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="how-we-work">
                                <h1>How we work</h1>
                                <p><span style={{ color: 'orangered' }}>Opening Hearts</span> is a nonprofit dedicated to supporting other nonprofits by connecting them with donors and companies. Since 2002, we've empowered trusted,
                                    community-led organizations from Afghanistan to Zimbabwe (and countless places in between) with the tools, training, and support they need to create a better world for everyone.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-3">
                            <div className="camp-980">
                                <h1>980</h1>
                                <p>Campaigns</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="camp-980">
                                <h1>$500M</h1>
                                <p>Donations</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="camp-980">
                                <h1>250K</h1>
                                <p>Donors</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="camp-980">
                                <h1>584</h1>
                                <p>Organizations</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="spector-img-sec">
                                <img src={sepratorimg} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="how-it-work-main-sec">
                                <h1>How it works</h1>

                                <div className="row mt-5">
                                    <div className="col-md-4">
                                        <div className="card-how-it-work">
                                            <h3>
                                                Non Profits
                                            </h3>
                                            <p>Nonprofits around the world apply and join opening heart to access more funding, to build new skills, and to make important connections.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card-how-it-work">
                                            <h3>
                                                Donors
                                            </h3>
                                            <p>People like you give to your favorite projects; you feel great when you get updates about how your money is put to work by trusted organizations.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card-how-it-work">
                                            <h3>
                                                Our Impact
                                            </h3>
                                            <p>Nonprofits have the funding they need to listen to feedback and try out new ways to work; communities all over the globe get more awesome!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="donation-3rd-sec">
                <div className="container">
                    <div className="row">
                        <div className="organizations">
                            <h2>
                                Organizations
                            </h2>
                            {/* <Link to="">View All</Link> */}
                        </div>
                        <div className="organizations-card-sec">
                            <div className="row">
                            {organizations?.slice(0, 2).map((item, index) => (
                                item ? ( <div className="col-md-6">
                                        <div className="organization-card">
                                            <div className="organization-information">
                                                <p>{item?.organization_name}</p>
                                                <img width={149.5} src={item?.profile_image} alt="" srcset="" />
                                            </div>
                                            <div className="organization-adress">
                                                <p style={{ color: 'orangered', fontWeight: '700', }}>LOCATION:<span>{item?.street_address}</span></p>
                                                <p style={{ color: 'orangered', fontWeight: '700', }}>WEBSITE:<span> {item?.website}</span></p>
                                                {/* <p style={{ color: 'orangered', fontWeight: '700', }}>FACEBOOK:<span> Facebook Page</span></p>
                                                <p style={{ color: 'orangered', fontWeight: '700', }}>TWITTER:<span> @GlobalGiving</span></p> */}
                                            </div>
                                        </div>
                                    </div>)
                                    : "null" ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TopCatagories />
            <DonateForHuman />





            <div className="our-partners">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="our-partner-heading">
                                <h1>Our Partners</h1>
                                <p>We've made it possible for more than 5847 companies to support local causes around the world. We help companies expand their philanthropic footprint with global nonprofit vetting,</p>
                            </div>
                        </div>


                    </div>
                    <div className="row justify-content-center">

                        {ourPartner?.map((logo, index) => (
                            <div className="col-md-2 my-auto">
                                <div className="our-partner-img-sec">
                                    <img key={index} src={logo.main_image} alt={logo} width={'100%'} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row justify-content-center text-center mt-3">
                        <div className="col-md-12">
                            {/* <button type='button'  className='btn btn-viewall'>View All Partners</button> */}
                        </div>
                    </div>
                    <div className="news-media-section">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-media-head">
                                    <h1>
                                        News And Media
                                    </h1>
                                </div>
                                <div className="row">
                                    {newsMedia?.map((item) => (
                                        <div className="col-md-4">
                                            <div className="media-new-card">
                                                <img src={item?.main_image} alt="" />
                                                <h2>{item?.title}<button style={{ marginLeft: '8px' }} type='button' className='btn btn-viewall'>Learn More</button></h2>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DonationNowFirstSection


