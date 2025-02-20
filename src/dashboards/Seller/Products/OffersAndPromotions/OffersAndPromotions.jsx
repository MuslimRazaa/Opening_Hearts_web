import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import apis from '../../../../service';
import Swal from 'sweetalert2';
import NoDataFound from '../../../../components/shared/noDataFound/NoDataFound';
import { MdDelete } from 'react-icons/md';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';


const PageNumbers = ({
    totalPages,
    page_size,
    getOffers,
    pagination,
    banner_type }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className='all-pages'>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}
                        className={`${(+pagination?.page) === number ? 'active' : ''}`}
                        onClick={() => {
                            getOffers(
                                banner_type,
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


function OffersAndPromotions() {
    const [offers, setOffers] = useState([])
    const [loading, setLoading] = useState(true)
    const [fullLoading, setFullLoading] = useState(false)
    // banner_type == / seller /services/organization
    const banner_type = "seller"
    const [pagination, setPagination] = useState("");
    const page_size = 10;

    const getOffers = async (banner_type, page, page_size) => {
        try {
            const response = await apis.getOffers(banner_type, page, page_size);
            setOffers(response?.data?.data?.banners);
            setPagination(response?.data?.data?.pagination);
            setLoading(false)
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
        getOffers(banner_type, 1, page_size);
    }, [])

    const updateOfferStatus = async (id, active) => {
        setFullLoading(true)
        try {
            const response = await apis.updateOfferStatus({
                id: id,
                active: active
            });
            getOffers(banner_type , 1 , page_size);
        } catch (error) {
            fullLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    }
    return (
        <>
            {fullLoading &&
                <div className="full-screen-loader">
                    <LoadingComponents />
                </div>
            }
            {loading ?
                <LoadingComponents />
                :
                <div className='table-tabs-main'>
                    <div className="offers-and-promotions">
                        <h2>Offers And Promotions</h2>
                        <Link to={'/dashboard/product-promotion-create'}>Create</Link>
                    </div>
                    <div className="table-main-wrapper">
                        <div className='table-main-wrapper'>
                            <div className="order-table">
                                <div className="table-header">
                                    <div><p>ID</p></div>
                                    <div><p>Image</p></div>
                                    <div><p>Start Date</p></div>
                                    <div><p>End Date</p></div>
                                    <div><p>Status</p></div>
                                    <div><p>Action</p></div>
                                </div>
                                {offers?.length > 0 ?
                                    offers.map((offer, index) => (
                                        <div className="table-row" key={index}>
                                            <div><p>{offer.id}</p></div>
                                            <div className='rev-table-order-col'>
                                                <img src={offer.media?.[0]?.original_url} />
                                            </div>
                                            <div className='order-table-user'>
                                                <p>{offer.start_date}</p>
                                            </div>
                                            <div>
                                                <p>{offer.featured_until}</p>
                                            </div>
                                            <div className='order-table-user'>
                                                <p>{offer.status}</p>
                                            </div>
                                            <div onClick={() => { updateOfferStatus(offer?.id, offer.active === 1 ? 0 : 1) }}>
                                                <span className='delete'><MdDelete /></span>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <NoDataFound title={'No data found.'} />
                                }
                            </div>
                            <div className="product-detail-review-pagination">
                                {pagination?.total_pages > 1 &&
                                    <div className="page-pagination filter">
                                        <div className="previous-page"
                                            style={{ pointerEvents: (+pagination?.page) === 1 ? 'none' : 'auto' }}
                                            onClick={() => {
                                                getOffers(
                                                    banner_type,
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
                                                            getOffers(
                                                                banner_type,
                                                                1,
                                                                page_size
                                                            )
                                                        }}
                                                    >1</li>
                                                    <li className={`${(+pagination?.page) === 2 ? 'active' : ''}`}
                                                        onClick={() => {
                                                            getOffers(
                                                                banner_type,
                                                                2,
                                                                page_size
                                                            )
                                                        }}
                                                    >2</li>
                                                    <li className={`${(+pagination?.page) === 3 ? 'active' : ''}`}
                                                        onClick={() => {
                                                            getOffers(
                                                                banner_type,
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
                                                            getOffers(
                                                                banner_type,
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
                                                getOffers={getOffers}
                                                pagination={pagination}
                                                banner_type={banner_type}
                                            />
                                        }
                                        <div className="next-page"
                                            style={{ pointerEvents: (+pagination?.page) === pagination?.total_pages ? 'none' : 'auto' }}
                                            onClick={() => {
                                                getOffers(
                                                    banner_type,
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
                </div>
            }
        </>
    )
}

export default OffersAndPromotions
