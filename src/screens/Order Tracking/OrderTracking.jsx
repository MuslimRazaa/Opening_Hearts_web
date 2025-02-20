import React, { useState } from 'react'
import Header from '../../components/Layout/Header'
import s3 from '../../media/images/s333.png'
import delboy from '../../media/images/delBoy.png'
import deltruck from '../../media/images/delTruck.png'
import gift from '../../media/images/gift.png'
import ordertracking from '../../media/images/ordertracking.png'
import Footer from '../../components/Layout/Footer'

function OrderTracking() {
    const [status, setStatus] = useState("status1")

    const handleStatus=(status_prop)=>{
        setStatus(status_prop)
    }
    console.log(status, "---------------status")


    return (
        <>
            <Header />
            {/* centered Structure */}
            <div className='container'>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="order-tracking-title">
                            <h2>Order Tracking</h2>
                        </div>
                    </div>
                    <div className="col-lg-6"></div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="order-tracking-delivery-status">
                            <div className="delivery-status">
                                <h3>Delivery Status</h3>
                                <p>Est Delivery: Tue,<span style={{ color: "black" }}> Dec 15 </span> -Wed,<span style={{ color: "black" }}> Dec 16 </span></p>
                            </div>
                            <div className="delivery-status-button">
                                <div class="f-service-detail-page-top-button">
                                    {status === "status4" ? <button>Delivered</button> : <button>Pending</button>}
                                </div>
                            </div>

                        </div>
                        <div className="order-tracking-delivery-items">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="order-tracking-item-title">
                                        <h2>Order Items</h2>
                                        <p>Order ID : #e1f5ev15vr4fw6e4f</p>
                                    </div>
                                </div>
                                <div className="col-lg-8"></div>
                                <div className="col-lg-4">
                                    <div className="order-tracking-item-image">
                                        <img src={s3} />
                                      
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="order-tracking-item-details">
                                        <h2>Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394</h2>
                                        <h4>$38.00</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="order-tracking-item-size-color-quantity d-flex">
                                                <div className="order-tracking-item-size d-flex">
                                                    <p>Size</p>
                                                    <span>9.5</span>
                                                </div>
                                                <div className="order-tracking-item-color d-flex">
                                                    <p>Color</p>
                                                    <div className='order-tracking-item-color-value'></div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-6">
                                            <div className="order-tracking-item-color d-flex">
                                                <h4>Quantity :</h4>
                                                <span>1</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="order-tracking-item-calculation">
                                        <p>Subtotal ( 1 item )</p>
                                        <p>Shipping</p>
                                        <p>Discount</p>
                                        <br></br>
                                        <h3>Order Total</h3>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="order-tracking-item-calculation-values">
                                        <p>$58.88</p>
                                        <p>$56.00</p>
                                        <p>-$5.00</p>
                                        <br></br>
                                        <h3>$ 98.00</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="order-tracking-time-title">
                            <h3>Expected Arrival</h3>
                            <p>01/08/2024</p>
                        </div>
                        <div className="order-tracking-time-image">
                            {/* <img src={ordertracking} /> */}
                            {status === "status1" ? <img src={ordertracking} style={{width: "80%"}}/> :
                                            status === "status2" ? <img src={gift} style={{width: "70%"}} /> :
                                            status === "status3" ? <img src={deltruck} /> :
                                            status === "status4" ? <img src={delboy} /> : ""}
                           {status === "status1" ? <h2>Relax, we are processing your order</h2> :
                            status === "status2" ? <h2>Your order is for shipping </h2> :
                            status === "status3" ? <h2>Your Order has been Shipped </h2> :
                            status === "status4" ? <h2>Enjoy your products!</h2> : ""}
                        </div>
                        <div className="order-tracking-time-timeline">
                        
                     {/*this timeline with onClick function is just for UI Understanding  */}

                            <div class="timeline">
                                <div class="step active" onClick={() => handleStatus("status1")}>
                                    <span>01</span>
                                </div>
                                <div class={`line ${status === "status2" || status === "status3" || status === "status4" ? 'active' : ""} `}></div>
                                <div class={`step ${status === "status2" || status === "status3" || status === "status4" ? 'active' : ""} `} onClick={() => handleStatus("status2")}>
                                <span>02</span>
                                </div>
                                <div class={`line ${status === "status3" || status === "status4" ? 'active' : ""} `}></div>
                                <div class={`step ${status === "status3" || status === "status4" ? 'active' : ""} `} onClick={() => handleStatus("status3")}>
                                <span>03</span>
                                </div>
                                <div class={`line ${status === "status4" ? 'active' : ""} `}></div>
                                <div class={`step ${status === "status4" ? 'active' : ""} `} onClick={() => handleStatus("status4")}>
                                <span>04</span>
                                </div>
                            </div>


                        {/* actual timeline commented, integration part */}


                            {/* <div class="timeline">
                                <div class="step active">
                                    <span>01</span>
                                </div>
                                <div class="line"></div>
                                <div class="step"></div>
                                <div class="line"></div>
                                <div class="step"></div>
                                <div class="line"></div>
                                <div class="step"></div>
                            </div> */}
                            <div class="timeline2">
                                <div class="step2 active">
                                    <span>Order Processing</span>
                                </div>
                                <div class="line2"></div>
                                <div class="step2"> Order Packed</div>
                                <div class="line2"></div>
                                <div class="step2">Order Shipped</div>
                                <div class="line2"></div>
                                <div class="step2">Order Delivered</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default OrderTracking
