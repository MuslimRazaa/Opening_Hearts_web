import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import colorfullarrow from '../../../media/images/arrow-color-full.png'
import arrowwhite from '../../../media/images/arrow-white.png'
import { userDashboardDonationsCount, userDashboardProductCount, userDashboardRecentDonations, userDashboardRecentOrders, userDashboardRecentServices, userDashboardServiceCount } from '../../../utils/api'
import { Spinner } from 'react-bootstrap'
import TableCustomerDash from '../CustomerMainDashboard/TableCustomerDash'
import TableCustomerDashDonation from '../CustomerMainDashboard/TableCustomerDashDonation'
import LoadingComponents from '../../../components/shared/loaders/LoadingComponents'
import FoldedTable from '../CustomerMainDashboard/FoldedTable'

const PurchaseHistrydash = () => {
  const [active, setActive] = useState("products")
  const [loadingValues, setLoadingValues] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dashboardCount, setDashboardCount] = useState()
  const [dashboardServiceCount, setDashboardServiceCount] = useState()
  const [dashboardDonattionCount, setDashboardDonattionCount] = useState()
  const [recentOrders, setRecentOrders] = useState([])
  const [recentService, setRecentService] = useState([])
  const [recentDonation, setRecentDonation] = useState([])
  const [tableTab, setTableTab] = useState("Active")
  const currentDate = ""

  const handleTableTabchange = (tab) => {
    setTableTab(tab)
  }
  const handleTabClick = (tab) => {
    setActive(tab)
  }


  // counts api's
  const fetchUserdashboardProductCount = async () => {
    setLoadingValues(true)
    try {
      const response = await userDashboardProductCount();
      setDashboardCount(response?.data?.data)
      console.log(response, ":: dashboard count log")
      setLoadingValues(false)

    }
    catch (error) {
      console.log(error)
      setLoadingValues(false)
    }
  }
  const fetchUserdashboardServiceCount = async () => {
    setLoadingValues(true)

    try {
      const response = await userDashboardServiceCount();
      setDashboardServiceCount(response?.data?.data)
      console.log(response, ":: dashboard count log")
      setLoadingValues(false)

    }
    catch (error) {
      console.log(error)
      setLoadingValues(false)

    }
  }
  const fetchUserdashboardDonationCount = async () => {
    setLoadingValues(true)

    try {
      const response = await userDashboardDonationsCount();
      setDashboardDonattionCount(response?.data?.data)
      console.log(response, ":: dashboard count log")
      setLoadingValues(false)

    }
    catch (error) {
      console.log(error)
      setLoadingValues(false)

    }
  }


  // orders api
  const fetchUserdashboardRecentProducts = async () => {
    setLoading(true)
    try {
      const response = await userDashboardRecentOrders(tableTab);
      setRecentOrders(response?.data?.data)
      console.log(response, ":: recent Orders log")
      setLoading(false)

    }
    catch (error) {
      console.log(error)
      setLoading(false)

    }
  }
  const fetchUserdashboardRecentService = async () => {
    setLoading(true)
    try {
      const response = await userDashboardRecentServices(tableTab);
      setRecentService(response?.data?.data)
      console.log(response, ":: recent Service log")
      setLoading(false)

    }
    catch (error) {
      console.log(error)
      setLoading(false)

    }
  }
  const fetchUserdashboardRecentDonations = async () => {
    setLoading(true)
    try {
      const response = await userDashboardRecentDonations(tableTab);
      setRecentDonation(response?.data?.data)
      console.log(response, ":: recent Service log")
      setLoading(false)

    }
    catch (error) {
      console.log(error)
      setLoading(false)

    }
  }


  useEffect(() => {
    fetchUserdashboardProductCount();
    fetchUserdashboardRecentProducts();
    fetchUserdashboardServiceCount();
    fetchUserdashboardDonationCount();
    fetchUserdashboardRecentService();
    fetchUserdashboardRecentDonations();
  }, [])

  useEffect(() => {
    fetchUserdashboardProductCount();
    fetchUserdashboardRecentProducts();
    fetchUserdashboardServiceCount();
    fetchUserdashboardDonationCount();
    fetchUserdashboardRecentService();
    fetchUserdashboardRecentDonations();
  }, [tableTab])


  return (
    <>
      {loadingValues || loading ?
        <div className='main-dash-and-total-data-tabs'>
          <div className="mian-dashpurchase-histry">
            <h1>
              Purchase History
            </h1>
          </div>
          <LoadingComponents />
        </div>

        :
        <div className='main-dash-and-total-data-tabs'>
          <div className="mian-dashpurchase-histry">
            <h1>
              Purchase History
            </h1>
          </div>
          <div className="customer-dash-buttons-tabs-class">
            <button className={active === "products" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button' onClick={() => handleTabClick("products")} >Products</button>
            <button className={active === "services" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button' onClick={() => handleTabClick("services")} >Services</button>
            <button className={active === "donations" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button' onClick={() => handleTabClick("donations")}>Donations</button>
          </div>

          {active === "products" ? <div className="di">
            <div className="mian-sub-content">
              <div className="row">
                <div className="col-lg-6">
                  <div className="customer-card-dash">
                    <h3>Amount Spend</h3>
                    {loadingValues ? <Spinner animation="border" role="status" /> : <h2>${dashboardCount?.total_price}</h2>}
                    <div className="total-uper-arrow">
                      <p>Achieved significant growth over the month.</p>
                      <img src={colorfullarrow} className='color-full-arrow ' alt="" />
                      <img src={arrowwhite} className='white-arrow ' alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="customer-card-dash">
                    <h3>Completed Orders</h3>
                    {loadingValues ? <Spinner animation="border" role="status" /> : <h2>{dashboardCount?.complete_order}</h2>}
                    <div className="total-uper-arrow">
                      <p>Achieved significant growth over the month.</p>
                      <img src={colorfullarrow} className='color-full-arrow ' alt="" />
                      <img src={arrowwhite} className='white-arrow ' alt="" />
                    </div>
                  </div>

                </div>

              </div>
              <div className="recent-data-tabel">
                <h2>Recent</h2>
                <div className="row">
                  <div className="col-md-12">
                    <div className='table-tabs-main'>
                      <div className="tabs-button-wrapper">
                        <button className={tableTab === "All" ? "active" : ""} onClick={() => handleTableTabchange("All")}>All</button>
                        <button className={tableTab === "pending" ? "active" : ""} onClick={() => handleTableTabchange("pending")}>Pending</button>
                        <button className={tableTab === "cancel" ? "active" : ""} onClick={() => handleTableTabchange("cancel")}>Cancel</button>
                        <button className={tableTab === "complete" ? "active" : ""} onClick={() => handleTableTabchange("complete")}>Complete</button>
                        <button className={tableTab === "refunded" ? "active" : ""} onClick={() => handleTableTabchange("refunded")}>Refund</button>
                        <button className={tableTab === "accepted" ? "active" : ""} onClick={() => handleTableTabchange("accepted")}>Accepted</button>
                      </div>
                    </div>
                    <div className="calender-buttons">
                      {/* <div className="both-side-calendor">
                                        <CustomDatePicker datelabel={false} />
                                    </div> */}
                      {/* <div className='d-flex justify-content-center align-items-center gap-20'>
                                        <img src={tb1} />
                                        <img src={tb2} />
                                    </div> */}
                    </div>
                    {/* <TableCustomerDash active={active} loading={loading} data={recentOrders} tab={tableTab} />
                    <br></br>
                    <br></br>
                    <br></br> */}
                    <FoldedTable active={active} loading={loading} data={recentOrders} tab={tableTab} />
                  </div>
                </div>
              </div>
            </div></div> :
            active === "services" ? <div className="di">
              <div className="mian-sub-content">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="customer-card-dash">
                      <h3>Amount Spend</h3>
                      {loadingValues ? <Spinner animation="border" role="status" /> : <h2>$ {dashboardServiceCount?.total_price}</h2>}
                      <div className="total-uper-arrow">
                        <p>Achieved significant growth over the month.</p>
                        <img src={colorfullarrow} className='color-full-arrow ' alt="" />
                        <img src={arrowwhite} className='white-arrow ' alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="customer-card-dash">
                      <h3>Completed Orders</h3>
                      {loadingValues ? <Spinner animation="border" role="status" /> : <h2>{dashboardServiceCount?.complete_order}</h2>}
                      <div className="total-uper-arrow">
                        <p>Achieved significant growth over the month.</p>
                        <img src={colorfullarrow} className='color-full-arrow ' alt="" />
                        <img src={arrowwhite} className='white-arrow ' alt="" />
                      </div>
                    </div>

                  </div>

                </div>
                <div className="recent-data-tabel">
                  <h2>Recent</h2>

                  <div className="row">
                    <div className="col-md-12">
                      <div className='table-tabs-main'>
                        <div className="tabs-button-wrapper">
                          <button className={tableTab === "All" ? "active" : ""} onClick={() => handleTableTabchange("All")}>All</button>
                          <button className={tableTab === "pending" ? "active" : ""} onClick={() => handleTableTabchange("pending")}>Pending</button>
                          <button className={tableTab === "cancel" ? "active" : ""} onClick={() => handleTableTabchange("cancel")}>Cancel</button>
                          <button className={tableTab === "complete" ? "active" : ""} onClick={() => handleTableTabchange("complete")}>Complete</button>
                        </div>
                      </div>
                      {/* <div className="calender-buttons">
                                            <div className="both-side-calendor">
                                                <CustomDatePicker datelabel={false} />

                                            </div>
                                            <div className='d-flex justify-content-center align-items-center gap-20'>
                                                <img src={tb1} />
                                                <img src={tb2} />
                                            </div>
                                         </div> */}
                      <FoldedTable active={active} loading={loading} data={recentService} tab={tableTab} />
                    </div>
                  </div>
                </div>
              </div></div> :
              active === "donations" ? <div className="di">
                <div className="mian-sub-content">
                  <div className="row">
                    <div className="col-lg-6">
                      <Link style={{ color: "black" }} to={"/customer-dashboard/customer-dashboard-donation-detail"} ><div className="customer-card-dash">
                        <h3>Donations</h3>
                        {loadingValues ? <Spinner animation="border" role="status" /> : <h2>{dashboardDonattionCount?.time_count} Times</h2>}
                        <div className="total-uper-arrow">
                          <p>Achieved significant growth over the month.</p>
                          <img src={colorfullarrow} className='color-full-arrow ' alt="" />
                          <img src={arrowwhite} className='white-arrow ' alt="" />
                        </div>
                      </div></Link>
                    </div>
                    <div className="col-lg-6">
                      <div className="customer-card-dash">
                        <h3>Amount Donate</h3>
                        {loadingValues ? <Spinner animation="border" role="status" /> : <h2>${dashboardDonattionCount?.amount_donation}</h2>}
                        <div className="total-uper-arrow">
                          <p>Achieved significant growth over the month.</p>
                          <img src={colorfullarrow} className='color-full-arrow ' alt="" />
                          <img src={arrowwhite} className='white-arrow ' alt="" />
                        </div>
                      </div>

                    </div>

                  </div>
                  <div className="recent-data-tabel">
                    <h2>Recent Campaigns</h2>
                    <div className="row">
                      <div className="col-md-12">
                        {/* <div className="calender-buttons">
                                                <div className="both-side-calendor">
                                                    <CustomDatePicker datelabel={false} />

                                                </div>
                                                <div className='d-flex justify-content-center align-items-center gap-20'>
                                                    <img src={tb1} />
                                                    <img src={tb2} />
                                                </div>
                                            </div> */}
                        <TableCustomerDashDonation loading={loading} data={recentDonation} />
                      </div>
                    </div>
                  </div>
                </div></div> :

                ""}

        </div>}
    </>
  )
}

export default PurchaseHistrydash


