import React from 'react'
import master from '../../../media/images/master.png'
import stripe from '../../../media/images/stripe.png'
import square from '../../../media/images/square.png'
import icon from '../../../media/images/Rectangle 17717.png'
import user from '../../../media/images/userrr.png'

import { Link } from 'react-router-dom'

const TableRecontCompaign = ({tab,link}) => {
    const orders = [
        {
            id: "w34008",
            profile: icon,
            user: user,
            name: "Printing",
            donationtype: "Montly",
            date: "Today 8:00 PM",
            status: 'Active',
            NGOs: 'Funding Cycle',
            amount: "$500.00 ",
            paymentMethod: "MasterCard",
            icon: master, // Update icon paths
        },
        {
            id: "w34008",
            profile: icon,
            user: user,
            name: "Mechanic",
            donationtype: "Once",
            date: "Today 8:00 PM",
            status: 'Delivered',
            NGOs: 'Funding Cycle',
            amount: "$45.00 ",
            paymentMethod: "Visa",
            icon: stripe,
        },
        {
            id: "w34008",
            profile: icon,
            user: user,
            name: "Logo Design",
            donationtype: "Montly",
            date: "Today 8:00 PM",
            status: 'Refund',
            NGOs: 'Funding Cycle',
            amount: "$45.00 ",
            paymentMethod: "CashApp",
            icon: square,
        },
        {
            id: "w34008",
            profile: icon,
            user: user,
            name: "Nike Dunk Low",
            donationtype: "Once",
            date: "Today 8:00 PM",
            status: "Active",
            NGOs: 'Funding Cycle',
            amount: "$150.00 ",
            paymentMethod: "Zelle",
            icon: stripe,
        },
    ];
    return (
        <>
            <div className='table-main-wrapper'>
                <div className="order-table">
                    <div className="table-header">
                        <div>
                            <p>Date & Time</p>
                        </div>
                        <div>
                            <p>Transaction ID</p>
                        </div>
                        <div>
                            <p>Name</p>
                        </div>
                        <div>
                            <p>Donation Type</p>
                        </div>
                        <div>
                            <p>NGOs</p>
                        </div>
                        <div>
                            <p>Amount </p>
                        </div>
                        <div>
                            <p>Payment Method </p>
                        </div>
                    </div>
                    {orders.map((order, index) => (
                        <div className="table-row" key={index}>
                           
                                <div className='rev-table-order-col'>

                                    <div className='rev-table-order-col-content'>
                                        <p style={{ color: "#828D9E" }}>{order.date}</p>
                                    </div>
                                </div>
                            <div className='order-table-user'>

                                <p>{order.id}</p>
                            </div>
                            <div>
                                <p>{order.name}</p>
                            </div>
                            <div className='order-table-user'>

                                <p>{order.donationtype}</p>
                            </div>
                            <div className='order-table-user'>
                                <img src={order.user} />
                                <p>{order.NGOs}</p>
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
        </>
    )
}

export default TableRecontCompaign
