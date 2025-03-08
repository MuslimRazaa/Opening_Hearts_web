import React, { useEffect, useState } from 'react'
import searchIcon from '../../../../media/images/search.svg';
import tb1 from '../../../../media/images/tabletopB1.png'
import tb2 from '../../../../media/images/tabletopB2.png'
import OrderManagmentBarChart from '../../../Charts/OrderManagmentBarChart'
import OrderManagmentDoughnutChart from '../../../Charts/OrderManagmentDoughnutChart'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cndr from '../../../../media/images/Calendar.png'
import arr from '../../../../media/images/Vector.png'
import apis from '../../../../service';
import Swal from 'sweetalert2';
import { FaRegEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';
import NoDataFound from '../../../../components/shared/noDataFound/NoDataFound';
import DonationManagmentBarChart from '../../../Charts/DonationManagmentBarChart';
import DonationManagmentDoughnutChart from '../../../Charts/DonationManagmentDoughnutChart';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const PageNumbers = ({
    totalPages,
    page_size,
    organizationDonationManagment,
    pagination,
    search,
    startDate,
    endDate, }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className='all-pages'>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}
                        className={`${(+pagination?.page) === number ? 'active' : ''}`}
                        onClick={() => {
                            organizationDonationManagment(
                                search,
                                startDate,
                                endDate,
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

function OrganizationDonationManagement() {
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [type, setType] = useState("monthly");
    const [charts, setCharts] = useState("");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState("");
    const page_size = 10;
    const navigate = useNavigate();

    const organizationDonationManagmentChart = async (type) => {
        try {
            const response = await apis.organizationDonationManagmentChart(type);
            setCharts(response?.data?.data);
            organizationDonationManagment( search, startDate, endDate, 1, page_size);
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message,
            });
        }
    }

    const organizationDonationManagment = async ( search, startDate, endDate, page, page_size) => {
        try {
            const response = await apis.organizationDonationManagment( search, startDate, endDate, page, page_size);
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

    useEffect(() => {
        organizationDonationManagmentChart(type)
    }, [])

    return (
        <>
            {loading ?
                <LoadingComponents />
                :
                <div>
                    <div className="row">
                        <div className="col-lg-6">
                            <DonationManagmentBarChart
                                name={charts?.name}
                                value={charts?.bar_chart_donotion}
                                totalOrder={charts?.total_revenue}
                                ProductOrderManagmentChart={organizationDonationManagmentChart}
                            />
                        </div>
                        <div className="col-lg-6">
                            <DonationManagmentDoughnutChart
                                value={charts?.pie_chart}
                                totalOrder={charts?.number_of_doners}
                                ProductOrderManagmentChart={organizationDonationManagmentChart}

                            />
                        </div>
                    </div>
                    <div className='orders-table-and-tabs'>
                        <div className="orders-table-heading mt-4">
                            <h2>Donation Management</h2>
                        </div>
                        <div className='table-tabs-main'>
                            <div className='donation-detail-page-search-bar-table-tab'>
                                <img src={searchIcon} alt="Search icon" />
                                <input type='search' placeholder='Search..' value={search} onChange={(e) => { setSearch(e.target.value); organizationDonationManagment( e.target.value, startDate, endDate, 1, page_size) }} />
                            </div>
                            <div className="calender-buttons mt-4">
                                <div className="both-side-calendor">
                                    <div className="clander-js">
                                        <div className="calender-dpdown">
                                            <img src={cndr} className="calender-icon" />
                                            <img src={arr} className="arrow-down" />
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => { setStartDate(formatDate(date)); organizationDonationManagment( search, formatDate(date), endDate, 1, page_size) }}
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText='Enter start date'
                                            />
                                        </div>
                                    </div>
                                    <p>To</p>
                                    <div className="clander-js">
                                        <div className="calender-dpdown">
                                            <img src={cndr} className="calender-icon" />
                                            <img src={arr} className="arrow-down" />
                                            <DatePicker
                                                selected={endDate}
                                                onChange={(date) => { setEndDate(formatDate(date)); organizationDonationManagment( search, startDate, formatDate(date), 1, page_size) }}
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText='Enter end date'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center align-items-center gap-20'>
                                    <img src={tb1} />
                                    <img src={tb2} />
                                </div>
                            </div>
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
                                                organizationDonationManagment(
                                                    search,
                                                    startDate,
                                                    endDate,
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
                                                            organizationDonationManagment(
                                                                search,
                                                                startDate,
                                                                endDate,
                                                                1,
                                                                page_size
                                                            )
                                                        }}
                                                    >1</li>
                                                    <li className={`${(+pagination?.page) === 2 ? 'active' : ''}`}
                                                        onClick={() => {
                                                            organizationDonationManagment(
                                                                search,
                                                                startDate,
                                                                endDate,
                                                                2,
                                                                page_size
                                                            )
                                                        }}
                                                    >2</li>
                                                    <li className={`${(+pagination?.page) === 3 ? 'active' : ''}`}
                                                        onClick={() => {
                                                            organizationDonationManagment(
                                                                search,
                                                                startDate,
                                                                endDate,
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
                                                            organizationDonationManagment(
                                                                search,
                                                                startDate,
                                                                endDate,
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
                                                organizationDonationManagment={organizationDonationManagment}
                                                pagination={pagination}
                                                search={search}
                                                startDate={startDate}
                                                endDate={endDate}
                                            />
                                        }
                                        <div className="next-page"
                                            style={{ pointerEvents: (+pagination?.page) === pagination?.total_pages ? 'none' : 'auto' }}
                                            onClick={() => {
                                                organizationDonationManagment(
                                                    search,
                                                    startDate,
                                                    endDate,
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

export default OrganizationDonationManagement
