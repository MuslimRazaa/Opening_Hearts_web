import React, { useState } from 'react'
import master from '../../../media/images/master.png'
import stripe from '../../../media/images/stripe.png'
import square from '../../../media/images/square.png'
import icon from '../../../media/images/Rectangle 17717.png'
import user from '../../../media/images/userrr.png'
import { Link } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import NoDataFound from '../../../components/shared/noDataFound/NoDataFound'
import Pagination from '../../../components/Main/Pagination'

const TableCustomerDashDonation = ({ loading, data, tab, link }) => {

        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 4; // Sirf 3 rows ek waqt me show hongi

    // const orders = [ 
    //     {
    //         id: "w34008",
    //         profile: icon,
    //         user: user,
    //         name: "Printing",
    //         donationtype: "Montly",
    //         date: "Today 8:00 PM",
    //         status: 'Active',
    //         NGOs: 'Funding Cycle',
    //         amount: "$500.00 ",
    //         paymentMethod: "MasterCard",
    //         icon: master, // Update icon paths
    //     },
    //     {
    //         id: "w34008",
    //         profile: icon,
    //         user: user,
    //         name: "Mechanic",
    //         donationtype: "Once",
    //         date: "Today 8:00 PM",
    //         status: 'Delivered',
    //         NGOs: 'Funding Cycle',
    //         amount: "$45.00 ",
    //         paymentMethod: "Visa",
    //         icon: stripe,
    //     },
    //     {
    //         id: "w34008",
    //         profile: icon,
    //         user: user,
    //         name: "Logo Design",
    //         donationtype: "Montly",
    //         date: "Today 8:00 PM",
    //         status: 'Refund',
    //         NGOs: 'Funding Cycle',
    //         amount: "$45.00 ",
    //         paymentMethod: "CashApp",
    //         icon: square,
    //     },
    //     {
    //         id: "w34008",
    //         profile: icon,
    //         user: user,
    //         name: "Nike Dunk Low",
    //         donationtype: "Once",
    //         date: "Today 8:00 PM",
    //         status: "Active",
    //         NGOs: 'Funding Cycle',
    //         amount: "$150.00 ",
    //         paymentMethod: "Zelle",
    //         icon: stripe,
    //     },
    // ];
        // Pagination Logic
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentOrders = data?.order?.slice(indexOfFirstItem, indexOfLastItem);
    
    return (
        <>
            <div className='table-main-wrapper'>
                <div className="order-table">
                    <div className="table-header">
                        <div>
                            <p>Transaction ID</p>
                        </div>
                        <div>
                            <p>NGOs</p>
                        </div>
                        <div>
                            <p>Date & Time</p>
                        </div>
                        <div>
                            <p>Amount </p>
                        </div>
                        <div>
                            <p>Donation Type</p>
                        </div>
                    </div>
                    {loading ?
                        <div style={{ textAlign: "center", marginTop: "2rem" }}>
                            <Spinner animation="border" role="status" />
                        </div>
                        :
                        (data?.order?.length > 0 ?
                            <>
                                {data?.order?.map((order, index) => (
                                    <div className="table-row" key={index} style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}>

                                        <div className='order-table-user'>

                                            <p>{order?.transaction_id}</p>
                                        </div>
                                        <div className='order-table-user'>
                                            <img src={order.store_vendor?.profile_image} />
                                            <p>{order?.campaign?.name}</p>
                                        </div>
                                        <Link to="" style={{
                                            textDecoration: "none"
                                        }} >
                                            <div className='rev-table-order-col'>

                                                <div className='rev-table-order-col-content'>
                                                    <p style={{ color: "#828D9E" }}>{order?.created_at.slice(0, 10)}</p>
                                                </div>
                                            </div></Link>

                                        <div>
                                            <p> {order?.amount}</p>
                                        </div>
                                        <div className='order-table-user'>

                                            <p>{order?.payment_type === 1 ? `Daily` : order?.payment_type === 0 ? `Monthly` : ``}</p>
                                        </div>
                                    </div>
                                ))}
                            </> :
                            <NoDataFound />
                        )
                    }
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
        </>
    )
}

export default TableCustomerDashDonation
