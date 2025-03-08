import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import eye from '../../../media/images/eye.svg';
import dropdownList from '../../../media/images/menu-list-dropdown-svgrepo-com.svg';
import dropdownUp from '../../../media/images/up-6-svgrepo-com.svg';
import NoDataFound from '../../../components/shared/noDataFound/NoDataFound';
import Pagination from '../../../components/Main/Pagination';

const FoldedTable = ({ active, loading, data }) => {
    const [expandedOrders, setExpandedOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Sirf 3 rows ek waqt me show hongi

    // Toggle function to show/hide sub-orders
    const toggleOrder = (orderId) => {
        setExpandedOrders((prev) =>
            prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
        );
    };
    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = data?.order?.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className='table-main-wrapper'>
            <div className="order-table">
                <div className="table-header">
                    <div><p>#</p></div>
                    <div><p>Orders#</p></div>
                    <div><p>Date & Time</p></div>
                    <div><p>Status</p></div>
                    <div><p>Amount</p></div>
                    <div><p>Action</p></div>
                </div>

                {loading ? (
                    <div style={{ textAlign: "center", marginTop: "2rem" }}>
                        <Spinner animation="border" role="status" />
                    </div>
                ) : (

                    data?.order?.length > 0 ? (
                        currentOrders?.map((order, index) => (
                            <React.Fragment key={order.id}>
                                <div className="table-row" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr" }}>
                                    <div className='rev-table-order-col' onClick={() => toggleOrder(order.id)} style={{ cursor: 'pointer' }}>
                                        <div className='rev-table-order-col-content'>
                                            <p>{expandedOrders.includes(order.id) ? <img src={dropdownUp} /> : <img src={dropdownList} />}</p>
                                        </div>
                                    </div>
                                    <div className='rev-table-order-col'>
                                        <div className='rev-table-order-col-content'>
                                            <p>#{order?.orderid}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p style={{ color: "#828D9E" }}>{order?.created_at.slice(0, 10)}</p>
                                    </div>
                                    <div>
                                        <p style={{ padding: "0px 14px" }}> ▪ ▪ ▪</p>
                                    </div>
                                    <div>
                                        <p>{order.subtotal_price}</p>
                                    </div>
                                    <div className='table-view-btn'>
                                        <Link to={`/customer-dashboard/customer-dashboard-${active === "products" ? "product" : "service"}-detail?id=${order.id}`} style={{ textDecoration: "none" }}>
                                            <img src={eye} style={{ width: "30px", height: "25px" }} alt="View" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Sub-orders will only be shown if this order is expanded */}
                                {expandedOrders?.includes(order.id) &&
                                    order?.order_product_ids?.map((product, index) => (
                                        <div className="table-row" key={index} style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr" }}>
                                            <div className='rev-table-order-keyy'>{index}</div>
                                            <div className='rev-table-order-col'>
                                                <div className='rev-table-order-col-content'>
                                                    <p className='product-name-list'>{product?.product?.title}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p style={{ color: "#828D9E" }}></p>
                                            </div>
                                            <div className={`status ${product.status}`}>
                                                <p><span>{product?.status}</span></p>
                                            </div>
                                            <div>
                                                <p>{product?.product?.price}</p>
                                            </div>
                                            <Link style={{ textDecoration: "none" }}>
                                                <div className='table-view-btn'>

                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                {/* Sub-orders will only be shown if this order is expanded */}
                                {expandedOrders?.includes(order.id) &&
                                    order?.order_product_id?.map((product, index) => (
                                        <div className="table-row" key={index} style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr" }}>
                                            <div className='rev-table-order-keyy'>{index}</div>
                                            <div className='rev-table-order-col'>
                                                <div className='rev-table-order-col-content'>
                                                    <p className='product-name-list'>{product?.service_product?.name}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p style={{ color: "#828D9E" }}></p>
                                            </div>
                                            <div className={`status ${product.status}`}>
                                                <p><span>{product?.status}</span></p>
                                            </div>
                                            <div>
                                                <p>{product?.product?.price}</p>
                                            </div>
                                            <Link style={{ textDecoration: "none" }}>
                                                <div className='table-view-btn'>

                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                            </React.Fragment>

                        ))


                    ) : (
                        <NoDataFound />
                    )
                )}
                <br />
                {/* Pagination Component */}
                {data?.order?.length > itemsPerPage && (
                    <Pagination
                        totalItems={data?.order?.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </div>
    );
};

export default FoldedTable;
