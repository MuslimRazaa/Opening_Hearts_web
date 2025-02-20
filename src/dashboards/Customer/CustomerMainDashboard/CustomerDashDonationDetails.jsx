import React, { useState } from 'react'
import emergencycardimg from '../../../media/images/emergencycard.png';
import profileicon from '../../../media/images/pro-icon-card.png';
import msgbox from './../../../media/images/msg-box.png';
import location from './../../../media/images/location.png';
import chatbox from './../../../media/images/chat-box.png';
import Funding from './../../../media/images/Funding Circle log.png';
import { Link } from 'react-router-dom';
import Toogle from '../../../components/Main/Toogle';

const CustomerDashDonationDetails = () => {
     const [checked, setChecked] = useState(true);
  return (
    <>
      <div className='campaign-donation-btn-text'>
                <h2>Campaign</h2>
                <button type='button' className='active-btn-campaign'>Active</button>
          
            </div>
            {/* start */}
            <div className="compaign-donationcards">
                <div className="row">
                    <div className="col-md-6">
                        <div className="compaign-emergency-card">
                            <img src={emergencycardimg} alt="" />
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <div className="compaign-emergency-fund-text">
                                        <h3>
                                            Donate Emergency Fund
                                        </h3>
                                        <div className="compaign-toggle-sys">
                                            <p>One time</p>
                                            <Toogle
                                                isOn={checked}
                                                handleToggle={() => setChecked(!checked)}
                                                colorOne="#EF476F"
                                                colorTwo="#06D6A0"
                                            />

                                            <p>Montly</p>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="compaign-emergency-fund-dolortext">
                                        <p>30$</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <hr style={{ width: '85%', margin: '0 auto', paddingBottom: '10px' }} />
                                <div className="col-md-12">
                                    <div className="compaign-total-donate-price">
                                        <p>Total:</p>
                                        <p>$30</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="campaign-Subtotal1Service">
                            <div className="campaign-Subtotal1Servicetext-sec">
                                <div className="campaign-sub-total-second-sec">
                                    <h2>
                                        Subtotal ( 1 Service )
                                    </h2>
                                    <h2>
                                        Service Charge
                                    </h2>
                                    <h2>Discount</h2>
                                </div>
                                <div className="campaign-sub-total-price">
                                    <h3>$45.00</h3>
                                </div>
                            </div>

                            <div className="row mt-5">
                                <hr style={{ width: '85%', margin: '0 auto', paddingBottom: '10px' }} />
                                <div className="col-md-12">
                                    <div className="compaign-sub-total-donate-price">
                                        <p>Sub Total:</p>
                                        <p>$30</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-6">
                        <div className="compaign-customer-details-card-section">
                            <h3>
                                Customer Detail
                            </h3>
                            <div className="compaign-customer-details-card">
                                <div className="img-pro-and-text-compaign">
                                    <img src={profileicon} alt="" />
                                    <div className="name-and-code-both">
                                        <p>Zaire Herwitz

                                        </p>
                                        <span>#w34008</span>
                                    </div>
                                </div>
                                <div className="img-pro-and-icon-compaign">
                                    <img style={{ width: "31.16px" }} src={msgbox} alt="" />
                                    <p>Adam@gmail.com

                                    </p>
                                </div>
                                <div className="img-pro-and-icon-compaign">
                                    <img style={{ width: "23.34px" }} src={location} alt="" />
                                    <p>123 West 45th Street, New York, NY 10036

                                    </p>
                                </div>
                                <div className="img-pro-and-icon-compaign">
                                    <img style={{ width: "25.28px" }} src={chatbox} alt="" />
                                    <p style={{ fontSize: "13.58px" }}>Chat with Mathew

                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="compaign-organization-detail-card-section">
                            <h3>
                                Organization Detail
                            </h3>
                            <div className="compaign-organization-detail-card">
                                <img src={Funding} width="119.24" alt="" />

                                <div class="compaign-organization-adress">
                                    <p style={{ color: 'orangered', fontWeight: '700', }}>LOCATION:<span> Washington, D.C. - USA<br />EIN: 30-0108263</span></p>
                                    <p style={{ color: 'orangered', fontWeight: '700', }}>WEBSITE:<span> ​www.Funding cirlce.org</span></p>
                                    <p style={{ color: 'orangered', fontWeight: '700', }}>FACEBOOK:<span> Facebook Page</span></p>
                                    <p style={{ color: 'orangered', fontWeight: '700', }}>TWITTER:<span> @GlobalGiving</span></p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
            {/* end */}
    </>
  )
}

export default CustomerDashDonationDetails
