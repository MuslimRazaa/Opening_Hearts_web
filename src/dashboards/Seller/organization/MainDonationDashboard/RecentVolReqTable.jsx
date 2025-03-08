import React from 'react'
import master from '../../../../media/images/master.png'
import stripe from '../../../../media/images/stripe.png'
import square from '../../../../media/images/square.png'
import icon from '../../../../media/images/Rectangle 17717.png'
import eye from '../../../../media/images/eye.png'
import user from '../../../../media/images/userrr.png'
import { Link } from 'react-router-dom'
function RecentVolReqTable({ tab, link }) {
    const orders = [
        {
            id: "Food Drive in Wiscosin By Feed the Children",
            profile: icon,
            user: user,
            duration: "Month",
            email: "ZaireHerwitz@example.com",
            seller: "Zaire Herwitz",
            date: "Today 8:00 PM",
            status: tab,
            amount: "$500.00 (Fix)",
            paymentMethod: "MasterCard",
            icon: master, // Update icon paths
        },
        {
            id: "Food Drive in Wiscosin By Feed the Children",
            profile: icon,
            user: user,
            duration: "Day",
            email: "ZaireHerwitz@example.com",
            seller: "Zaire Herwitz",
            date: "Today 8:00 PM",
            status: tab,
            amount: "$45.00 (Hourly)",
            paymentMethod: "Visa",
            icon: stripe,
        },
        {
            id: "Food Drive in Wiscosin By Feed the Children",
            profile: icon,
            duration: "Month",
            user: user,
            email: "ZaireHerwitz@example.com",
            seller: "Zaire Herwitz",
            date: "Today 8:00 PM",
            status: tab,
            amount: "$45.00 (Fix)",
            paymentMethod: "CashApp",
            icon: square,
        },
        {
            id: "Food Drive in Wiscosin By Feed the Children",
            duration: "week",
            profile: icon,
            user: user,
            email: "ZaireHerwitz@example.com",
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
                        <p>Name</p>
                    </div>
                    <div>
                        <p>Campaigns and Events</p>
                    </div>
                    <div>
                        <p>email</p>
                    </div>
                    <div> 
                        <p>Aproval Request</p>
                    </div>
                    <div>
                        <p>View </p>
                    </div>
                </div>
                {orders.map((order, index) => (
                    <div className="table-row-vol-req" key={index}>
                        <div className='rev-table-order-col'>
                            <div className='rev-table-order-col-image'>
                                <img src={order.user} />
                            </div>
                            <div className='rev-table-order-col-content'>
                                <p>{order.seller}</p>
                                <span>{order.date}</span>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center align-items-center gap-10'>
                            <img src={order.user} alt="user" />
                            <p className='vol-req-camp' title={order.id} >{order.id}</p>
                        </div>
                        <div className='order-table-user'>
                        <p  className='vol-req-email'>{order.email}</p>
                        </div>
                        <div className="vol-req-buttons">
                        <button>Approve</button>
                            <button className='vol-req-decline-btn'>Decline</button>
                        </div>
                        <div style={{textAlign:"center"}}>
                           <Link to="/donation-dashboard/donation-volunteer-profile-edit" style={{
                        textDecoration:"none"
                       }} >  <img src={eye} /> </Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default RecentVolReqTable
