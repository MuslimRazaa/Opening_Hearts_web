import React from 'react'
import master from '../../../media/images/master.png'
import stripe from '../../../media/images/stripe.png'
import square from '../../../media/images/square.png'
import icon from '../../../media/images/Rectangle 17717.png'
import user from '../../../media/images/userrr.png'
import userB from '../../../media/images/blankuser.jpg'
import eye from '../../../media/images/eye.svg'
import { Link } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

const TableCustomerDash = ({active, loading, data, tab, link }) => {
    const orders = [
        {
            id: "w34008",
            profile: icon,
            user: user,
            name: "Printing",
            seller: "Zaire Herwitz",
            date: "Today 8:00 PM",
            status: 'Active',
            amount: "$500.00 (Fix)",
            paymentMethod: "MasterCard",
            icon: master, // Update icon paths
        },
        {
            id: "w34008",
            profile: icon,
            user: user,
            name: "Mechanic",
            seller: "Zaire Herwitz",
            date: "Today 8:00 PM",
            status: 'Delivered',
            amount: "$45.00 (Hourly)",
            paymentMethod: "Visa",
            icon: stripe,
        },
        {
            id: "w34008",
            profile: icon,
            user: user,
            name: "Logo Design",
            seller: "Zaire Herwitz",
            date: "Today 8:00 PM",
            status: 'Refund',
            amount: "$45.00 (Fix)",
            paymentMethod: "CashApp",
            icon: square,
        },
        {
            id: "w34008",
            profile: icon,
            user: user,
            name: "Nike Dunk Low",
            seller: "Zaire Herwitz",
            date: "Today 8:00 PM",
            status: "Active",
            amount: "$150.00 (Fix)",
            paymentMethod: "Zelle",
            icon: stripe,
        },
    ];

    console.log(loading, "loading in table")

    return (
        <div className='table-main-wrapper'>
            <div className="order-table">
                <div className="table-header">
                    <div>
                        <p>Orders#</p>
                    </div>
                    <div>
                        <p>Date & Time</p>
                    </div>
                    <div>
                        <p>Status</p>
                    </div>
                    <div>
                        <p>Amount </p>
                    </div>
                    <div>
                        <p>Action</p>
                    </div>
                </div>

                {loading ?
                    <div style={{ textAlign: "center", marginTop: "2rem" }}>
                        <Spinner animation="border" role="status" />
                    </div>
                    : (data?.order?.length > 0 ? <>
                        {data?.order?.map((order, index) => (
                            <div className="table-row" key={index} style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}>

                                <div className='rev-table-order-col'>
                                    <div className='rev-table-order-col-content'>
                                        <p>#{order?.orderid} </p>
                                    </div>
                                </div>
                                <div>
                                    <p style={{ color: "#828D9E" }}>{order?.created_at.slice(0, 10)}</p>
                                </div>
                                {order?.order_product_id &&
                                    order?.order_product_id?.length > 0 ?
                                    <div className={`status ${order.status}`}>
                                        <p>
                                            {order?.order_product_id?.map((product, i) => {
                                                return (
                                                    <span key={i}>{product?.status} {order?.order_product_id?.length - 1 === i ? "" : ", "}</span>
                                                )
                                            })}
                                        </p>
                                    </div>
                                    :
                                    null
                                }

                                {order?.order_product_ids &&
                                    order?.order_product_ids?.length > 0 ?
                                    <div className={`status ${order.status}`}>
                                        <p>
                                            {order?.order_product_ids?.map((product, i) => {
                                                return (
                                                    <span key={i}>{product?.status} {order?.order_product_ids?.length - 1 === i ? "" : ", "}</span>
                                                )
                                            })}
                                        </p>
                                    </div>
                                    :
                                    null

                                }
                                <div>
                                    <p> {order.subtotal_price}</p>
                                </div>
                               {active === "products" ? 
                               <Link to={`/customer-dashboard/customer-dashboard-product-detail?id=${order?.id}`} style={{
                                    textDecoration: "none"
                                }} ><div className='table-view-btn'>
                                        <img src={eye} style={{ width: "30px", height: "25px" }} />
                                    </div></Link>
                                    
                                : 
                                <Link to={`/customer-dashboard/customer-dashboard-service-detail?id=${order?.id}`} style={{
                                    textDecoration: "none"
                                }} ><div className='table-view-btn'>
                                        <img src={eye} style={{ width: "30px", height: "25px" }} />
                                    </div></Link>
                                }
                            </div>
                        ))}
                    </> : <div className="table-row" style={{ gridTemplateColumns: "10fr 0fr 0fr 0fr 0fr" }} >
                                <p>No data Found </p>
                    </div>)}
            </div>

        </div>
    )
}

export default TableCustomerDash

