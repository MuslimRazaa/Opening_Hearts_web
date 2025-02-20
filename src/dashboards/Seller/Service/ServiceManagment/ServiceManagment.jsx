import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import apis from '../../../../service';
import SellerProductCard from '../../../../components/Main/SellerProductCard';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';
import SellerServiceCard from '../../../../components/Main/SellerServiceCard';

const PageNumbers = ({
    totalPages,
    page_size,
    getSellerService,
    pagination,
    guid }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className='all-pages'>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}
                        className={`${(+pagination?.page) === number ? 'active' : ''}`}
                        onClick={() => {
                            getSellerService(
                                guid,
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

function ServiceManagment() {
    const [services, setServices] = useState([]);
    const [pagination, setPagination] = useState("");
    const [loading, setLoading] = useState(true);
    const [fullLoading, setFullLoading] = useState(false);
    const user_data = localStorage.getItem('user_data');
    const user = JSON.parse(user_data)
    const page_size = 9;

    const getSellerService = async (page, page_size) => {
        try {
            const response = await apis.getSellerService(page, page_size);
            setServices(response?.data?.data?.serviceProducts);
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
        getSellerService(1, page_size)
    }, [])
    return (
        <>
            {fullLoading &&
                <div className="full-screen-loader">
                    <LoadingComponents />
                </div>
            }
            <div>
                <div className='step-three-form-listing'>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="step-three-heading">
                                <h2>Start Listing your First Service</h2>
                                <p>This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="primium-subscription-bottom-step-form">
                                <Link to="/dashboard/add-service" > <button>Add a Service</button> </Link>
                            </div>
                        </div>
                    </div>
                    {loading ?
                        <LoadingComponents />
                        :
                        services?.length > 0 ?
                            <div className="seller-shop-product-listing">
                                <div className="row">
                                    {services?.map((service, index) => {
                                        return (
                                            <div className="col-lg-4 mt-4" key={index}>
                                                <SellerServiceCard 
                                                setFullLoading={setFullLoading} 
                                                service={service} 
                                                getSellerService={getSellerService}
                                                page_size={page_size}/>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="product-detail-review-pagination">
                                    {pagination?.total_pages > 1 &&
                                        <div className="page-pagination filter">
                                            <div className="previous-page"
                                                style={{ pointerEvents: (+pagination?.page) === 1 ? 'none' : 'auto' }}
                                                onClick={() => {
                                                    getSellerService(
                                                        user?.seller?.guid,
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
                                                                getSellerService(
                                                                    user?.seller?.guid,
                                                                    1,
                                                                    page_size
                                                                )
                                                            }}
                                                        >1</li>
                                                        <li className={`${(+pagination?.page) === 2 ? 'active' : ''}`}
                                                            onClick={() => {
                                                                getSellerService(
                                                                    user?.seller?.guid,
                                                                    2,
                                                                    page_size
                                                                )
                                                            }}
                                                        >2</li>
                                                        <li className={`${(+pagination?.page) === 3 ? 'active' : ''}`}
                                                            onClick={() => {
                                                                getSellerService(
                                                                    user?.seller?.guid,
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
                                                                getSellerService(
                                                                    user?.seller?.guid,
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
                                                    getSellerService={getSellerService}
                                                    pagination={pagination}
                                                    guid={user?.seller?.guid}
                                                />
                                            }
                                            <div className="next-page"
                                                style={{ pointerEvents: (+pagination?.page) === pagination?.total_pages ? 'none' : 'auto' }}
                                                onClick={() => {
                                                    getSellerService(
                                                        user?.seller?.guid,
                                                        (+pagination?.page) + 1,
                                                        page_size
                                                    )
                                                }}
                                            >Next</div>
                                        </div>
                                    }
                                </div>
                            </div>
                            :
                            <div className="step-three-service-part">
                                <h2>No Service Uploaded</h2>
                            </div>

                    }

                </div>
            </div>
        </>
    )
}

export default ServiceManagment

