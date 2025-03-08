import React, { useEffect, useState } from 'react'
import emergencycardimg from '../../../../media/images/emergencycard.png';
import profileicon from '../../../../media/images/pro-icon-card.png';
import msgbox from './../../../../media/images/msg-box.png';
import location from './../../../../media/images/location.png';
import chatbox from './../../../../media/images/chat-box.png';
import Funding from './../../../../media/images/Funding Circle log.png';
import { Link, useLocation } from 'react-router-dom';
import Toogle from '../../../../components/Main/Toogle';
import Swal from 'sweetalert2';
import apis from '../../../../service';
import NoDataFound from '../../../../components/shared/noDataFound/NoDataFound';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';

const PageNumbers = ({
    totalPages,
    page_size,
    getOrganizationOtherDonationById,
    pagination,
    id, }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className='all-pages'>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}
                        className={`${(+pagination?.page) === number ? 'active' : ''}`}
                        onClick={() => {
                            getOrganizationOtherDonationById(
                                id,
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

const OrganizationDonationManagementDetail = () => {

    const [donationDetail, setDonationDetail] = useState("")
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const id = params.get('id');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState("");
    const page_size = 10;

    const getOrganizationDonationById = async (id) => {
        try {
            const response = await apis.getOrganizationDonationById(id);
            setDonationDetail(response?.data?.data);
            getOrganizationOtherDonationById(id, 1, page_size)
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message,
            });
        }
    }

    useEffect(() => {
        getOrganizationDonationById(id)
    }, [])

    const getOrganizationOtherDonationById = async (id, page, page_size) => {
        try {
            const response = await apis.getOrganizationOtherDonationById(id, page, page_size);
            setOrders(response?.data?.data);
            setPagination(response?.data?.data?.pagination);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message,
            });
        }
    }


    return (
        <>
            {loading ?
                <LoadingComponents />
                :
                <>
                    <div className='campaign-donation-btn-text'>
                        <h2>Donation Detail</h2>
                        {/* <button type='button' className='active-btn-campaign'>Active</button>
                <Link to="/dashboard/add-organization-campaign" > <button type='button' className='active-btn-campaign'>Add a new Drive</button></Link> */}
                    </div>
                    {/* start */}
                    <div className="compaign-donationcards">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="compaign-emergency-card">
                                    <img src={donationDetail?.organization?.campaign?.cover_image} alt="" />
                                    <div className="row align-items-center">
                                        <div className="col-md-9">
                                            <div className="compaign-emergency-fund-text">
                                                <h3>{donationDetail?.organization?.campaign?.name}</h3>
                                                <div className="compaign-toggle-sys">
                                                    <p>One time</p>
                                                    <Toogle isOn={donationDetail?.organization?.payment_type == 1 ? false : true} colorOne="#EF476F" colorTwo="#06D6A0" />
                                                    <p>Montly</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="compaign-emergency-fund-dolortext">
                                                <p>${donationDetail?.organization?.amount}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <hr style={{ width: '85%', margin: '0 auto', paddingBottom: '10px' }} />
                                        <div className="col-md-12">
                                            <div className="compaign-total-donate-price">
                                                <p>Total:</p>
                                                <p>${donationDetail?.organization?.amount}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="campaign-Subtotal1Service">
                                    <div className="campaign-Subtotal1Servicetext-sec">
                                        <div className="campaign-sub-total-second-sec">
                                            <h2>Sub Total</h2>
                                        </div>
                                        <div className="campaign-sub-total-price">
                                            <h3>${donationDetail?.organization?.amount}</h3>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <hr style={{ width: '85%', margin: '0 auto', paddingBottom: '10px' }} />
                                        <div className="col-md-12">
                                            <div className="compaign-sub-total-donate-price">
                                                <p>Sub Total:</p>
                                                <p>${donationDetail?.organization?.amount}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-6">
                                <div className="compaign-customer-details-card-section">
                                    <h3>
                                        Customer Detail
                                    </h3>
                                    <div className="compaign-customer-details-card">
                                        <div className="img-pro-and-text-compaign">
                                            <img src={profileicon} alt="" />
                                            <div className="name-and-code-both">
                                                <p>{donationDetail?.organization?.user?.first_name + " " + donationDetail?.organization?.user?.last_name} </p>
                                            </div>
                                        </div>
                                        <div className="img-pro-and-icon-compaign">
                                            <img src={msgbox} alt="" />
                                            <p>{donationDetail?.organization?.user?.email}</p>
                                        </div>
                                        <div className="img-pro-and-icon-compaign">
                                            <img src={location} alt="" />
                                            <p>{donationDetail?.organization?.user?.address}</p>
                                        </div>
                                        <div className="img-pro-and-icon-compaign">
                                            <img src={chatbox} alt="" />
                                            <p style={{ fontSize: "16px" }}>Chat with Mathew</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="compaign-organization-detail-card-section">
                                    <h3>Organization Detail</h3>
                                    <div className="compaign-organization-detail-card">
                                        <img src={donationDetail?.organization?.store_vendor?.profile_image} alt="" />

                                        <div class="compaign-organization-adress">
                                            <p style={{ color: 'orangered', fontWeight: '700', }}>NAME:<span> {donationDetail?.organization?.store_vendor?.organization_name}</span></p>
                                            <p style={{ color: 'orangered', fontWeight: '700', }}>LOCATION:<span> {donationDetail?.organization?.store_vendor?.street_address}</span></p>
                                            <p style={{ color: 'orangered', fontWeight: '700', }}>WEBSITE:<span> {donationDetail?.organization?.store_vendor?.website}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* end */}

                    <div className='orders-table-and-tabs'>
                        <div className="orders-table-heading mt-4">
                            <h2>Other Donation</h2>
                        </div>
                        <div className='table-tabs-main mt-2'>
                            <div className="table-main-wrapper">
                                <div className='table-main-wrapper'>
                                    <div className="order-table">
                                        <div className="table-header">
                                            <div><p>Date & Time</p></div>
                                            <div><p>Transaction ID</p></div>
                                            <div><p>Name</p></div>
                                            <div><p>Donation Type</p></div>
                                            <div><p>NGOs</p></div>
                                            <div><p>Amount </p></div>
                                            <div><p>Action </p></div>
                                        </div>
                                        {orders?.transaction?.length > 0 ?
                                            orders?.transaction?.map((tran, index) => (
                                                <div className="table-row" key={index}>
                                                    <div><p>{tran.created_at.slice(0, 10)}</p></div>
                                                    <div><p>{tran.transaction_id}</p></div>
                                                    <div><p>{tran.user.first_name}</p></div>
                                                    <div><p>{tran?.payment_type == 1 ? "Once" : "Montly"}</p></div>
                                                    <div><p>{tran?.campaign?.name}</p></div>
                                                    <div><p>{tran?.amount}</p></div>
                                                    <div><Link to={`/dashboard/organization-donation-detail?id=${tran.id}`} className='view'>View</Link></div>
                                                </div>
                                            ))
                                            :
                                            <NoDataFound title={'No data found'} />
                                        }
                                    </div>

                                </div>
                                {/* <ProductRevenueTable tab={tableTab} /> */}
                            </div>
                            <div className="product-detail-review-pagination">
                                {pagination?.total_pages > 1 &&
                                    <div className="page-pagination filter">
                                        <div className="previous-page"
                                            style={{ pointerEvents: (+pagination?.page) === 1 ? 'none' : 'auto' }}
                                            onClick={() => {
                                                getOrganizationOtherDonationById(
                                                    id,
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
                                                            getOrganizationOtherDonationById(
                                                                id,
                                                                1,
                                                                page_size
                                                            )
                                                        }}
                                                    >1</li>
                                                    <li className={`${(+pagination?.page) === 2 ? 'active' : ''}`}
                                                        onClick={() => {
                                                            getOrganizationOtherDonationById(
                                                                id,
                                                                2,
                                                                page_size
                                                            )
                                                        }}
                                                    >2</li>
                                                    <li className={`${(+pagination?.page) === 3 ? 'active' : ''}`}
                                                        onClick={() => {
                                                            getOrganizationOtherDonationById(
                                                                id,
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
                                                            getOrganizationOtherDonationById(
                                                                id,
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
                                                getOrganizationOtherDonationById={getOrganizationOtherDonationById}
                                                pagination={pagination}
                                                id={id}
                                            />
                                        }
                                        <div className="next-page"
                                            style={{ pointerEvents: (+pagination?.page) === pagination?.total_pages ? 'none' : 'auto' }}
                                            onClick={() => {
                                                getOrganizationOtherDonationById(
                                                    id,
                                                    (+pagination?.page) + 1,
                                                    page_size
                                                )
                                            }}
                                        >Next</div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default OrganizationDonationManagementDetail
