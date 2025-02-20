import React from 'react'
import master from '../../../media/images/master.png'
import stripe from '../../../media/images/stripe.png'
import square from '../../../media/images/square.png'
import icon from '../../../media/images/Rectangle 17717.png'
import user from '../../../media/images/userrr.png'
import { Link } from 'react-router-dom'
function PurchaseHistoryTable({ tab }) {
    const orders = [
        {
            id: "w34008",
            profile: icon,
            user: user,
            name: "Printing",
            seller: "Zaire Herwitz",
            date: "Today 8:00 PM",
            status: tab,
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
            status: tab,
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
            status: tab,
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
            status: tab,
            amount: "$150.00 (Fix)",
            paymentMethod: "Zelle",
            icon: stripe,
        },
    ];
    return (
        <div className='table-main-wrapper'>
            <div className="order-table">
                <div className="table-header">
                    <div>
                        <p>Orders</p>
                    </div>
                    <div>
                        <p>Name</p>
                    </div>
                    <div>
                        <p>Date & Time</p>
                    </div>
                    <div>
                        <p>Seller</p>
                    </div>
                    <div>
                        <p>Status</p>
                    </div>
                    <div>
                        <p>Amount </p>
                    </div>
                    <div>
                        <p>Payment Method</p>
                    </div>
                </div>
                {orders.map((order, index) => (
                    <div className="table-row" key={index}>
                        <Link to="/customer-dashboard/customer-dashboard-product-detail" style={{
                            textDecoration: "none"
                        }} >
                            <div className='rev-table-order-col'>
                                <div className='rev-table-order-col-image'>
                                    <img src={order.profile} />
                                </div>
                                <div className='rev-table-order-col-content'>
                                    <p>{order.name}</p>
                                    <span>#w34008</span>
                                </div>
                            </div></Link>
                        <div className='order-table-user'>
                            <img src={order.user} />
                            <p>{order.seller}</p>
                        </div>
                        <div>
                            <p style={{ color: "#828D9E" }}>{order.date}</p>
                        </div>
                        <div className='order-table-user'>
                            <img src={order.user} />
                            <p>{order.seller}</p>
                        </div>
                        <div className={`status ${order.status}`}>
                            <p style={{ color: "#F16522" }}>{tab}</p>
                        </div>
                        <div>
                            <p> {order.amount}</p>
                        </div>
                        <div>
                            <img src={order.icon} alt={order.paymentMethod} />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default PurchaseHistoryTable
