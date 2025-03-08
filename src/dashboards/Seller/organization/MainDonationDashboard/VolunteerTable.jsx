
import React from 'react'
import master from '../../../../media/images/master.png'
import stripe from '../../../../media/images/stripe.png'
import square from '../../../../media/images/square.png'
import icon from '../../../../media/images/Rectangle 17717.png'
import user from '../../../../media/images/userrr.png'
import { Link } from 'react-router-dom'
function VolunteerTable({tab, link}) {
    const orders = [
        {
            id: "Food Drive in Wiscosin By Feed the Children",
            profile: icon,
            user: user,
            duration:"Month",
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
            duration:"Day",
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
            duration:"Month",
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
            duration:"week",
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
                <div className="table-header-vol">
                    <div>                        
                    <p>Date & Time</p>
                    </div>
                    <div>                       
                        <p>Name</p>
                    </div>
                    <div>                        
                        <p>Email</p>
                    </div>
                    <div>
                        <p>Duration</p>
                        </div>
                    <div style={{textAlign:"center"}}>
                        <p style={{textAlign:"center"}}>Campaign </p>
                        </div>
                </div>
                {orders.map((order, index) => (
                    <div className="table-row-volunteer" key={index}>
                       
                       <div className='rev-table-order-col'>
                            <div className='rev-table-order-col-content'>
                            <p>{order.date}</p>
                            </div>
                        </div>
                        <div className='order-table-user'>
                            <img src={order.user} />
                            {link ?  <Link to={link} ><p>{order.seller}</p></Link> : <p>{order.seller}</p>}                        
                            </div>
                        <div>
                            <p style={{ color: "#828D9E" }}>{order.email}</p>
                        </div>
                        <div className={`status ${order.duration}`}>
                            <p style={{ color: "#F16522" }}>{order.duration}</p>
                        </div>

                        <div className='d-flex justify-content-center align-items-center gap-10'>
                            <img src={order.user} alt="user" />
                            <p style={{ color: "#F16522" }}>{order.id}</p>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default VolunteerTable
