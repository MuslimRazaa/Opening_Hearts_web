import React, { useEffect, useState } from 'react'
import bannerFirstimgdon from '../../../media/images/donation-1st-img.png'
import bannerFirstimgdon2 from '../../../media/images/dn2.png'
import bannerFirstimgdon3 from '../../../media/images/dn3.png'
import sepratorimg from '../../../media/images/specrator-donation-now.png'
import fundlogo from '../../../media/images/Funding Circle log.png'
import { Link } from 'react-router-dom'
import TopCatagories from '../../../components/Main/TopCatagories'
import DonateForHuman from '../../../components/Main/DonateForHuman'
import { donationsHomeOrganization, newsAndMedia, organizationCount, ourPartners } from '../../../utils/api'
import NoDataFound from '../../../components/shared/noDataFound/NoDataFound'
import LoadingComponents from '../../../components/shared/loaders/LoadingComponents'


function DonationNowFirstSection() {

    const [organizations, setOrganizations] = useState([]);
    const [ourPartner, setOurPartner] = useState([]);
    const [newsMedia, setNewsMedia] = useState([]);
    const [orgCount, setOrgCount] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingCount, setLoadingCount] = useState(true);
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


    const fetchOrganizationCount = async () => {
        setLoadingCount(true);
        try {
            const response = await organizationCount();
            setOrgCount(response?.data?.data); // Adjust based on API response structure
        } catch (error) {
            console.error('Error fetching top-rated products:', error);
        } finally {
            setLoadingCount(false);
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
        fetchOrganizationCount();
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
                    {loadingCount ? 
                    <LoadingComponents /> :
                    orgCount  ?
                    (<div className="row mt-5">
                        <div className="col-md-3">
                            <div className="camp-980">
                                <h1>{orgCount?.campaign_count}</h1>
                                <p>Campaigns</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="camp-980">
                                <h1>${Math.floor(orgCount?.amount)}</h1>
                                <p>Donations</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="camp-980">
                                <h1>{orgCount?.donors_count}</h1>
                                <p>Donors</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="camp-980">
                                <h1>{orgCount?.organization_count}</h1>
                                <p>Organizations</p>
                            </div>
                        </div>
                    </div>) : <NoDataFound title={"No data found"}/>}
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
                        <div className="how-we-work">
                            <h1>Organizations</h1>
                            <p>Explore organizations and stay updated with their latest campaigns and events. Follow your favorite organizations to support their causes and participate in upcoming activities.</p>
                        </div>
                        {loading2 ?
                            <LoadingComponents />
                            :
                            (<>
                                {organizations?.slice(0, 3).map((item, index) => (
                                    organizations?.length > 0 ?
                                        (<div className="col-lg-4 my-4">
                                            <div className="org-profile-card">

                                                <div className='org-profile-name'>
                                                    <div className='org-profile-img'>
                                                        <img src={item?.profile_image} />
                                                    </div>
                                                    <div className="org-profile-name">
                                                        <div className='org-profile-name-wrapper'>
                                                            <h2>{item?.organization_name}</h2>
                                                            <span>{item?.organization_type}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="org-profile-data">
                                                    <p style={{ color: 'orangered', fontWeight: '600', }}>Loc icon:<span> {item?.street_address}</span></p>
                                                    <p style={{ color: 'orangered', fontWeight: '600', }}>EIN icon:<span> {item?.phone}</span></p>
                                                    <p style={{ color: 'orangered', fontWeight: '600', }}>web icon:<span> {item?.website}</span></p>
                                                </div>

                                                <div className='vist-org-btn'>
                                                    <Link to={`/funding-cycle?id=${item?.id}`} > <button>Follow</button> </Link>
                                                </div>

                                            </div>
                                        </div>) :
                                        <NoDataFound title={"No Data Found"} />
                                ))}
                            </>
                            )}

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
                                    {/* {newsMedia?.map((item) => (
                                        <div className="col-md-4">
                                            <div className="media-new-card">
                                                <img src={item?.main_image} alt="" />
                                                <h2>{item?.title}<button style={{ marginLeft: '8px' }} type='button' className='btn btn-viewall'>Learn More</button></h2>
                                            </div>
                                        </div>
                                    ))} */}
                                    {newsMedia?.map((item) => (
                                            <div className="col-md-4">
                                                <div className="card-how-it-work">
                                                    <div>
                                                        <img src={item?.main_image} alt=""/>
                                                    </div>
                                                    <h3>
                                                        {item?.title}
                                                    </h3>
                                                    <p>Nonprofits around the world apply and join opening heart to access more funding, to build new skills, and to make important connections.</p>
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


