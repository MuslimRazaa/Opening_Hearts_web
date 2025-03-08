import React from 'react'
import master from '../../../../media/images/master.png'
import stripe from '../../../../media/images/stripe.png'
import square from '../../../../media/images/square.png'
import icon from '../../../../media/images/Rectangle 17717.png'
import user from '../../../../media/images/userrr.png'
import { Link } from 'react-router-dom'
function DonationRevenueTable({tab, link}) {
    const orders = [
        {
            id: "w34008",
            tab: "Once",
            profile: icon,
            user: user,
            dname: "Funding Cycle",
            seller: "Zaire Herwitz",
            date: "Today 8:00 PM",
            status: tab,
            amount: "$50",
            paymentMethod: "MasterCard",
            icon: master, // Update icon paths
        },
        {
            id: "w34008",
            tab: "Monthly",
            profile: icon,
            user: user,
            dname: "Funding Cycle",
            seller: "Zaire Herwitz",
            date: "Today 8:00 PM",
            status: tab,
            amount: "$45",
            paymentMethod: "Visa",
            icon: stripe,
        },
        {
            id: "w34008",
            tab: "Once",
            profile: icon,
            user: user,
            dname: "Funding Cycle",
            seller: "Zaire Herwitz",
            date: "Today 8:00 PM",
            status: tab,
            amount: "$45",
            paymentMethod: "CashApp",
            icon: square,
        },
        {
            id: "w34008",
            tab: "Monthly",
            profile: icon,
            user: user,
            dname: "Funding Cycle",
            seller: "Zaire Herwitz",
            date: "Today 8:00 PM",
            status: tab,
            amount: "$15",
            paymentMethod: "Zelle",
            icon: stripe,
        },
    ];
    return (
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
                    <div className="table-row-don-dash" key={index}>
                       <div>
                            <p style={{ color: "#828D9E" }}>{order.date}</p>
                        </div>
                        
                        
                        <div>
                            <p style={{ color: "#828D9E" }}>{order.id}</p>
                        </div>

                        <div className='order-table-user'>
                            <img src={order.user} />
                            <p style={{margin:"0"}}>{order.seller}</p>
                        </div>
                        <div >
                            <p style={{ color: "#F16522" }}>{order.tab}</p>
                        </div>

                        <Link to="/donation-dashboard/campaign-Donation" style={{
                        textDecoration:"none"
                       }} >
                       <div className='rev-table-order-col'>
                            <div className='rev-table-order-col-image'>
                                <img src={order.user} />
                            </div>
                            <div className='rev-table-order-col-content'>
                              {link ?  <Link to={link} ><p style={{margin:"0"}}>{order.dname}</p></Link> : <p style={{margin:"0"}}>{order.dname}</p>}
                            </div>
                        </div></Link> 
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

export default DonationRevenueTable
