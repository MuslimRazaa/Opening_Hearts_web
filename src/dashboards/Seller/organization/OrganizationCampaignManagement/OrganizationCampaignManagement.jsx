import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';
import apis from '../../../../service';
import Swal from 'sweetalert2';
import SellerServiceCard from '../../../../components/Main/SellerServiceCard';
import CampaignCard from '../../../../components/Main/CampaignCard';
import NoDataFound from '../../../../components/shared/noDataFound/NoDataFound';

const PageNumbers = ({
    totalPages,
    page_size,
    getOrganizationCampaigns,
    pagination,
    type }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className='all-pages'>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}
                        className={`${(+pagination?.page) === number ? 'active' : ''}`}
                        onClick={() => {
                            getOrganizationCampaigns(
                                type,
                                number,
                                page_size,
                            )
                        }}>
                        {number}
                    </li>
                ))}
            </ul>
        </div>
    );
};

function OrganizationCampaignManagement() {
    const [campaigns, setCampaigns] = useState([]);
    const [type, setType] = useState('active');
    const [pagination, setPagination] = useState("");
    const [loading, setLoading] = useState(true);
    const [fullLoading, setFullLoading] = useState(false);
    const user_data = localStorage.getItem('user_data');
    const user = JSON.parse(user_data)
    const page_size = 9;

    const getOrganizationCampaigns = async (type , page, page_size) => {
        setLoading(true);
        try {
            const response = await apis.getOrganizationCampaigns(type , page, page_size);
            setCampaigns(response?.data?.data?.campaign);
            setPagination(response?.data?.data?.pagination);
            setLoading(false);
            setFullLoading(false)
        } catch (error) {
            setLoading(false)
            setFullLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    }

    useEffect(() => {
        getOrganizationCampaigns(type , 1, page_size)
    }, [])

    return (
        <div>
            <div className='step-three-form-listing'>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="step-three-heading">
                            <h2>Start Listing your First Campaign</h2>
                            <p>This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="primium-subscription-bottom-step-form">
                            <Link to="/dashboard/add-organization-campaign" > <button>Add a Campaign</button> </Link>
                        </div>
                    </div>
                </div>
                {loading ?
                    <LoadingComponents />
                    :
                    // campaigns?.length > 0 ?
                        <div className="seller-shop-product-listing">
                            <div className="campaign-tabs">
                                <ul>
                                    <li 
                                    onClick={() => { setType('active'); getOrganizationCampaigns('active' , 1, page_size) }}
                                    className={`${type === 'active' ? 'active' : ""}`}
                                    >Active Campaign</li>
                                    <li 
                                    onClick={() => { setType('in-active'); getOrganizationCampaigns('in-active' , 1, page_size) }} className={`${type === 'in-active' ? 'active' : ""}`}>In Active Campaign</li>
                                </ul>
                            </div>
                            {campaigns?.length > 0 ?
                            <div className="row">
                                {campaigns?.map((campaign, index) => {
                                    return (
                                        <div className="col-lg-4 mt-4" key={index}>
                                            <CampaignCard
                                                setFullLoading={setFullLoading}
                                                campaign={campaign}
                                                getOrganizationCampaigns={getOrganizationCampaigns}
                                                page_size={page_size}
                                                type={type}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                            :
                            <NoDataFound title={'No dat found'}/>
                            }
                            <div className="product-detail-review-pagination">
                                {pagination?.total_pages > 1 &&
                                    <div className="page-pagination filter">
                                        <div className="previous-page"
                                            style={{ pointerEvents: (+pagination?.page) === 1 ? 'none' : 'auto' }}
                                            onClick={() => {
                                                getOrganizationCampaigns(
                                                    type,
                                                    (+pagination?.page) - 1,
                                                    page_size
                                                )
                                            }}
                                        >Previous</div>
                                        {pagination?.total_pages > 12 ?
                                            <div className="all-pages">
                                                <ul>
                                                    <li className={`${(+pagination?.page) === 1 ? 'active' : ''}`}
                                                        onClick={() => {
                                                            getOrganizationCampaigns(
                                                                type,
                                                                1,
                                                                page_size
                                                            )
                                                        }}
                                                    >1</li>
                                                    <li className={`${(+pagination?.page) === 2 ? 'active' : ''}`}
                                                        onClick={() => {
                                                            getOrganizationCampaigns(
                                                                type,
                                                                2,
                                                                page_size
                                                            )
                                                        }}
                                                    >2</li>
                                                    <li className={`${(+pagination?.page) === 3 ? 'active' : ''}`}
                                                        onClick={() => {
                                                            getOrganizationCampaigns(
                                                                type,
                                                                3,
                                                                page_size
                                                            )
                                                        }}
                                                    >3</li>
                                                    <li>
                                                        <svg width="33" height="3" viewBox="0 0 33 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0.39853 3V0.202939H2.61842V3H0.39853ZM5.38461 3V0.202939H7.6045V3H5.38461ZM10.3707 3V0.202939H12.5906V3H10.3707ZM15.3568 3V0.202939H17.5767V3H15.3568ZM20.3429 3V0.202939H22.5627V3H20.3429ZM25.3289 3V0.202939H27.5488V3H25.3289ZM30.315 3V0.202939H32.5349V3H30.315Z" fill="#A7A7A7" />
                                                        </svg>
                                                    </li>
                                                    <li className={`${(+pagination?.page) === pagination?.total_pages ? 'active' : ''}`}
                                                        onClick={() => {
                                                            getOrganizationCampaigns(
                                                                type,
                                                                pagination?.total_pages,
                                                                page_size
                                                            )
                                                        }}
                                                    >{pagination?.total_pages}</li>
                                                </ul>
                                            </div>
                                            :
                                            <PageNumbers
                                                totalPages={pagination?.total_pages}
                                                page_size={page_size}
                                                getOrganizationCampaigns={getOrganizationCampaigns}
                                                pagination={pagination}
                                                type={type}
                                            />
                                        }
                                        <div className="next-page"
                                            style={{ pointerEvents: (+pagination?.page) === pagination?.total_pages ? 'none' : 'auto' }}
                                            onClick={() => {
                                                getOrganizationCampaigns(
                                                    type,
                                                    (+pagination?.page) + 1,
                                                    page_size
                                                )
                                            }}
                                        >Next</div>
                                    </div>
                                }
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

export default OrganizationCampaignManagement
