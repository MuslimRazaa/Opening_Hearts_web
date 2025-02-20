import React, { useEffect, useState } from 'react'
import searchIcon from '../../../../media/images/search.svg';
import tb1 from '../../../../media/images/tabletopB1.png'
import tb2 from '../../../../media/images/tabletopB2.png'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cndr from '../../../../media/images/Calendar.png'
import arr from '../../../../media/images/Vector.png'
import apis from '../../../../service';
import Swal from 'sweetalert2';
import { FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';
import NoDataFound from '../../../../components/shared/noDataFound/NoDataFound';
import RevenueManagmentLineChart from '../../../Charts/RevenueManagmentLineChart';
import ServiceManagmentDoughnutChart from '../../../Charts/ServiceManagmentDoughnutChart';

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
    serviceOrderManagment,
    pagination,
    orderType,
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
                            serviceOrderManagment(
                                orderType,
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


function ServiceRevenueManagment() {

    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [type, setType] = useState("monthly");
    const [charts, setCharts] = useState("");
    const [orders, setOrders] = useState([]);
    const [orderType, setOrdertype] = useState("complete");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [pagination, setPagination] = useState("");
    const page_size = 10;

    const serviceDashboardChartData = async (type) => {
        try {
            const response = await apis.serviceDashboardChartData(type);
            setCharts(response?.data?.data);
            serviceOrderManagment(orderType, search, startDate, endDate, 1, page_size);
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message,
            });
        }
    }

    const serviceOrderManagment = async (orderType, search, startDate, endDate, page, page_size) => {
        try {
            const response = await apis.serviceOrderManagment(orderType, search, startDate, endDate, page, page_size);
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
        serviceDashboardChartData(type)
    }, [])


    return (
        <>
            {loading ?
                <LoadingComponents />
                :
                <div>
                    <div className="row">
                        <div className="col-lg-6">
                            <RevenueManagmentLineChart
                                name={charts?.name}
                                value={charts?.bar_chart_revenue}
                                totalOrder={charts?.total_revenue}
                                serviceDashboardChartData={serviceDashboardChartData}
                            />
                        </div>
                        <div className="col-lg-6">
                            <ServiceManagmentDoughnutChart
                                value={charts?.pie_chart}
                                totalOrder={charts?.total_order}
                                serviceDashboardChartData={serviceDashboardChartData}

                            />
                        </div>
                    </div>
                    <div className='orders-table-and-tabs'>
                        <div className="orders-table-heading">
                            <h2>Completed Orders</h2>
                        </div>
                        <div className='table-tabs-main'>
                            <div className='donation-detail-page-search-bar-table-tab'>
                                <img src={searchIcon} alt="Search icon" />
                                <input type='search' placeholder='Search..' value={search} onChange={(e) => { setSearch(e.target.value); serviceOrderManagment(orderType, e.target.value, startDate, endDate) }} />
                            </div>

                            <div className="calender-buttons mt-4">
                                <div className="both-side-calendor">
                                    <div className="clander-js">
                                        <div className="calender-dpdown">
                                            <img src={cndr} className="calender-icon" />
                                            <img src={arr} className="arrow-down" />
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => { setStartDate(formatDate(date)); serviceOrderManagment(orderType, search, formatDate(date), endDate) }}
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
                                                onChange={(date) => { setEndDate(formatDate(date)); serviceOrderManagment(orderType, search, startDate, formatDate(date)) }}
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
                                            <div><p>Orders</p></div>
                                            <div><p>Date</p></div>
                                            <div><p>Service Count</p></div>
                                            <div><p>Amount</p></div>
                                            <div><p>Type</p></div>
                                            <div><p>Status</p></div>
                                            <div><p>Action</p></div>
                                        </div>
                                        {orders?.service?.length > 0 ?
                                            orders?.service?.map((order, index) => (
                                                <div className="table-row" key={index}>
                                                    <div><p>{order.orderid}</p></div>
                                                    <div><p>{order.created_at.slice(0, 10)}</p></div>
                                                    <div><p>{order.order_product_id?.length}</p></div>
                                                    <div><p>{order?.subtotal_price}</p></div>
                                                    <div>
                                                        {order?.order_product_id?.map((pro, i) => {
                                                            return (
                                                                <>
                                                                    {pro?.service_plan_id ?
                                                                        <p key={i}>Package{order?.order_product_id?.length - 1 === i ? "" : ", "}</p>
                                                                        :
                                                                        <p key={i}>Fixed {order?.order_product_id?.length - 1 === i ? "" : ", "}</p>
                                                                    }
                                                                </>
                                                            )
                                                        })}
                                                    </div>
                                                    <div>
                                                        <p>
                                                            {order?.order_product_id?.map((pro, i) => {
                                                                return (
                                                                    <span key={i}>{pro?.status}{order?.order_product_id?.length - 1 === i ? "" : ", "}</span>
                                                                )
                                                            })}
                                                        </p>
                                                    </div>
                                                    <div><span className='delete' onClick={() => { navigate(`/dashboard/service-revenue-detail?id=${order?.id}`) }}><FaRegEye /></span></div>
                                                </div>
                                            ))
                                            :
                                            <NoDataFound title={'No dat found'} />
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
                                                serviceOrderManagment(
                                                    orderType,
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
                                                            serviceOrderManagment(
                                                                orderType,
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
                                                            serviceOrderManagment(
                                                                orderType,
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
                                                            serviceOrderManagment(
                                                                orderType,
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
                                                            serviceOrderManagment(
                                                                orderType,
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
                                                serviceOrderManagment={serviceOrderManagment}
                                                pagination={pagination}
                                                orderType={orderType}
                                                search={search}
                                                startDate={startDate}
                                                endDate={endDate}
                                            />
                                        }
                                        <div className="next-page"
                                            style={{ pointerEvents: (+pagination?.page) === pagination?.total_pages ? 'none' : 'auto' }}
                                            onClick={() => {
                                                serviceOrderManagment(
                                                    orderType,
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

export default ServiceRevenueManagment
