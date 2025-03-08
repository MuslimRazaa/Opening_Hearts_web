import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FundingCycleHeader from '../../../../screens/DonationsFlow/FundingCycleHeader';
import DonationBannerSec from '../../../../screens/DonationsFlow/DonationBannerSec';
import FundAboutOrganization from '../../../../screens/DonationsFlow/DonationFundingCycle/FundAboutOrganization';
import DonationFundingCycleSec from '../../../../screens/DonationsFlow/DonationFundingCycle/DonationFundingCycle3rdSec';
import { OrganizationHome, OrganizationHomeCampaigns } from '../../../../utils/api';
import shareicon from '../../../../media/images/share-icon.svg'
import hearticon from '../../../../media/images/heart-icon.svg'
import apis from '../../../../service';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';

function OrganizationProfile() {
    const [donationProfile, setDonationProfile] = useState();
    const [fundingCycleHomeCamp, setFundingCycleHomeCamp] = useState();
    const [loading, setLoading] = useState(true);

    const getDonationProfile = async () => {
        try {
            const response = await apis.getDonationProfile();
            setDonationProfile(response?.data?.data);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getDonationProfile();
    }, []);


    return (
        <>
            {loading ?
                <LoadingComponents />
                :
                <div>
                    <div className='funding-cycle-main'>
                        <div className="fund-inner-main">
                            <div className="funding-logo">
                                <img src={donationProfile?.organization_store?.profile_image} alt="" srcset="" />
                            </div>
                            <div className="funding-card">
                                <div className="insidecard-txt">
                                    <h3>{donationProfile?.organization_store?.organization_name}</h3>
                                    <p>Non-Profit Organization</p>
                                </div>
                                <div className="found-card-icon">
                                    <p>{donationProfile?.organization_store?.year} <span>Years</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='donation-bannner' style={{ backgroundImage: `url(${donationProfile?.organization_store?.cover_image})` }}></div>
                    <div className='fund-about-organize'>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1>About Organization</h1>
                                    <div className="funding-slider">
                                        <div className="row">
                                            {donationProfile?.organization_store?.media?.map((image) => (
                                                <div className="col-md-3">
                                                    <img src={image?.original_url} alt="" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-campaigns">
                                        <div className="row">
                                            <div className="col-md-9">
                                                <p>{donationProfile?.organization_store?.description}</p>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="both-camp-txt">
                                                    <h2>{donationProfile?.organization_store?.campaign_count}</h2>
                                                    <p>Campaigns</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='3rd-sec-fund-dona mb-5'>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="third-section-card">
                                        <div className="locations-sec">
                                            <h2>Locations</h2>
                                            <p>{donationProfile?.organization_store?.street_address}</p>
                                        </div>
                                        <div className="website-sec">
                                            <h2>Website</h2>
                                            <p>{donationProfile?.organization_store?.website}</p>
                                        </div>
                                        <div className="established-sec">
                                            <h2>Year Established</h2>
                                            <p>{donationProfile?.organization_store?.created_at?.slice(0, 4)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default OrganizationProfile
