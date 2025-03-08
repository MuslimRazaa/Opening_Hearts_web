import React, { useEffect, useState } from 'react'
import badgeBanner from '../../../../media/images/badge-banner.png'
import checkMark from '../../../../media/images/checkmark-circle-2.png'
import { Link, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import apis from '../../../../service'
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents'


function OrganizationSubscription() {
  const [loader, setLoader] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const type = 'organization';

  const subscriptionBuyPlans = async (type) => {
    try {
      const response = await apis.subscriptionBuyPlans(type);
      setSubscriptions(response?.data?.data)
      setLoader(false)
    } catch (error) {
      setLoader(false)
      Swal.fire({
        icon: 'error',
        text: error.response?.data?.message,
      });
    }
  }

  useEffect(() => {
    subscriptionBuyPlans(type)
  }, [])
  return (
    <>
      {
        loader ?
          <LoadingComponents />
          :
          <>
            < div className='become-seller-packages' >
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="become-seller-package-head">
                      <h1>
                        Packages
                      </h1>
                      <p>You need to buy Package before become a seller.</p>
                    </div>
                  </div>
                </div>
                {subscriptions?.select_plan?.plan_name === "Basic" ?
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="become-seller-package-card-main">
                        <div className="become-seller-package-card-badge-and-banner-main">
                          <div className="become-seller-package-card-banner">
                            <img src={badgeBanner} />
                          </div>
                          <div className='become-seller-package-card-badge-main'>
                            <div className="become-seller-package-card-badge">
                              <div className="become-seller-package-card-badge-inner">
                                <h3>${subscriptions?.select_plan?.plan?.price}</h3>
                                <h4>/Month</h4>
                                <h6 style={{ textAlign: "center", color: "white", margin: "0" }}>+</h6>
                                <h4>a Percentage of <br></br> Sales Platform  <br></br>Fees (PSPF)</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="become-seller-package-card-detail-one-main">
                          <ul>
                            {subscriptions?.select_plan?.plan?.new_description?.map((list, j) => {
                              return (
                                <div className="become-seller-package-card-detail-one-li-b" key={j}>
                                  <img src={checkMark} />
                                  <li> {list?.name} </li>
                                </div>
                              )
                            })}
                          </ul>
                        </div>
                        <hr className='hr-package-card'></hr>
                        <div className="become-seller-package-card-button">
                          <Link to={`/buy-package-again?type=${type}&planId=${subscriptions?.select_plan?.plan?.id}`} ><button>Selected plan</button></Link>
                          <Link to={`/buy-package-again?type=${type}&planId=${subscriptions?.select_plan?.plan?.id}`} ><button>Buy Again</button></Link>
                        </div>
                      </div>
                    </div>
                    {subscriptions?.plan?.map((subscription, index) => {
                      return (
                        <div className="col-lg-6" key={index}>
                          <div className="become-seller-package-card-main">
                            <div className="become-seller-package-card-badge-and-banner-main">
                              <div className="become-seller-package-card-banner">
                                <img src={badgeBanner} />
                              </div>
                              <div className='become-seller-package-card-badge-main'>
                                <div className="become-seller-package-card-badge">
                                  <div className="become-seller-package-card-badge-inner">
                                    <h3>${subscription?.price}</h3>
                                    <h4>/Month</h4>
                                    <h6 style={{ textAlign: "center", color: "white", margin: "0" }}>+</h6>
                                    <h4>a Percentage of <br></br> Sales Platform  <br></br>Fees (PSPF)</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="become-seller-package-card-detail-one-main">
                              <ul>
                                {subscription?.new_description?.map((list, j) => {
                                  return (
                                    <div className="become-seller-package-card-detail-one-li-b" key={j}>
                                      <img src={checkMark} />
                                      <li> {list?.name} </li>
                                    </div>
                                  )
                                })}
                              </ul>
                            </div>
                            <hr className='hr-package-card'></hr>
                            <div className="become-seller-package-card-button">
                              <Link to={`/buy-package-again?type=${type}&planId=${subscription?.id}`} ><button>Select this plan</button></Link>
                              {/* <button>Buy Again</button> */}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  :
                  null
                }
                {subscriptions?.select_plan?.plan_name === "Premium" ?
                  <div className="row">
                    {subscriptions?.plan?.map((subscription, index) => {
                      return (
                        <div className="col-lg-6" key={index}>
                          <div className="become-seller-package-card-main">
                            <div className="become-seller-package-card-badge-and-banner-main">
                              <div className="become-seller-package-card-banner">
                                <img src={badgeBanner} />
                              </div>
                              <div className='become-seller-package-card-badge-main'>
                                <div className="become-seller-package-card-badge">
                                  <div className="become-seller-package-card-badge-inner">
                                    <h3>${subscription?.price}</h3>
                                    <h4>/Month</h4>
                                    <h6 style={{ textAlign: "center", color: "white", margin: "0" }}>+</h6>
                                    <h4>a Percentage of <br></br> Sales Platform  <br></br>Fees (PSPF)</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="become-seller-package-card-detail-one-main">
                              <ul>
                                {subscription?.new_description?.map((list, j) => {
                                  return (
                                    <div className="become-seller-package-card-detail-one-li-b" key={j}>
                                      <img src={checkMark} />
                                      <li> {list?.name} </li>
                                    </div>
                                  )
                                })}
                              </ul>
                            </div>
                            <hr className='hr-package-card'></hr>
                            <div className="become-seller-package-card-button">
                              <Link to={`/buy-package-again?type=${type}&planId=${subscription?.id}`} ><button>Select this plan</button></Link>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div className="col-lg-6">
                      <div className="become-seller-package-card-main">
                        <div className="become-seller-package-card-badge-and-banner-main">
                          <div className="become-seller-package-card-banner">
                            <img src={badgeBanner} />
                          </div>
                          <div className='become-seller-package-card-badge-main'>
                            <div className="become-seller-package-card-badge">
                              <div className="become-seller-package-card-badge-inner">
                                <h3>${subscriptions?.select_plan?.plan?.price}</h3>
                                <h4>/Month</h4>
                                <h6 style={{ textAlign: "center", color: "white", margin: "0" }}>+</h6>
                                <h4>a Percentage of <br></br> Sales Platform  <br></br>Fees (PSPF)</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="become-seller-package-card-detail-one-main">
                          <ul>
                            {subscriptions?.select_plan?.plan?.new_description?.map((list, j) => {
                              return (
                                <div className="become-seller-package-card-detail-one-li-b" key={j}>
                                  <img src={checkMark} />
                                  <li> {list?.name} </li>
                                </div>
                              )
                            })}
                          </ul>
                        </div>
                        <hr className='hr-package-card'></hr>
                        <div className="become-seller-package-card-button">
                          <Link to={`/buy-package-again?type=${type}&planId=${subscriptions?.select_plan?.plan?.id}`} ><button>Selected plan</button></Link>
                          <Link to={`/buy-package-again?type=${type}&planId=${subscriptions?.select_plan?.plan?.id}`} ><button>Buy Again</button></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  :
                  null
                }
              </div>
            </div >
          </>
      }
    </>
  )
}

export default OrganizationSubscription
