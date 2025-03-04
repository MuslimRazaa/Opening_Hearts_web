import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import colorfullarrow from '../../../media/images/arrow-color-full.png'
import arrowwhite from '../../../media/images/arrow-white.png'
import TableCustomerDash from './TableCustomerDash'
import TableCustomerDashDonation from './TableCustomerDashDonation'
import { userDashboardDonationsCount, userDashboardProductCount, userDashboardRecentDonations, userDashboardRecentDonationsCurrent, userDashboardRecentOrders, userDashboardRecentOrdersCurrent, userDashboardRecentServices, userDashboardRecentServicesCurrent, userDashboardServiceCount } from '../../../utils/api'
import { Spinner } from 'react-bootstrap'
import LoadingComponents from '../../../components/shared/loaders/LoadingComponents'
import FoldedTable from './FoldedTable'

const CustomerMainDashboard = () => {
    const [active, setActive] = useState("products")
    const [loadingValues, setLoadingValues] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dashboardCount, setDashboardCount] = useState()
    const [dashboardServiceCount, setDashboardServiceCount] = useState()
    const [dashboardDonattionCount, setDashboardDonattionCount] = useState()
    const [recentOrders, setRecentOrders] = useState([])
    const [recentService, setRecentService] = useState([])
    const [recentDonation, setRecentDonation] = useState([])
    // const [currentDateHere, setCurrentDateHere] = useState("")
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format


    const handleTabClick = (tab) => {
        setActive(tab)
    }

    console.log(currentDate, "currentDate--------------------------------------------")
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
            const response = await userDashboardRecentOrders();
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
            const response = await userDashboardRecentServices();
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
            const response = await userDashboardRecentDonations();
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
    }, [active])


    return (
        <>
            {loadingValues || loading ?
                <div className='main-dash-and-total-data-tabs'>
                    <h2>Hello Customer</h2>
                    <LoadingComponents />
                </div>

                :
                <div className='main-dash-and-total-data-tabs'>
                    <h2>Hello Customer</h2>
                    <div className="customer-dash-buttons-tabs-class">
                        <button className={active === "products" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button'
                            onClick={() => {
                                handleTabClick("products");
                                fetchUserdashboardProductCount();
                                fetchUserdashboardRecentProducts();
                            }} >Products</button>
                        <button className={active === "services" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button'
                            onClick={() => {
                                handleTabClick("services");
                                fetchUserdashboardServiceCount();
                                fetchUserdashboardRecentService();
                            }} >Services</button>
                        <button className={active === "donations" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button' onClick={() => {
                            handleTabClick("donations");
                            fetchUserdashboardDonationCount();
                            fetchUserdashboardRecentDonations();
                        }}>Donations</button>
                    </div>

                    {active === "products" ? <div className="di">
                        <div className="mian-sub-content">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="customer-card-dash">
                                        <h3>Active Order</h3>
                                        {loadingValues ? <Spinner animation="border" role="status" /> : <h2>{dashboardCount?.active_order}</h2>}
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
                                        <div className="calender-buttons">
                                            {/* <div className="both-side-calendor">
                                        <CustomDatePicker datelabel={false} />
                                    </div> */}
                                            {/* <div className='d-flex justify-content-center align-items-center gap-20'>
                                        <img src={tb1} />
                                        <img src={tb2} />
                                    </div> */}
                                        </div>
                                        {/* <TableCustomerDash loading={loading} data={recentOrders} /> */}
                                        <FoldedTable loading={loading} data={recentOrders} />
                                        
                                    </div>
                                </div>
                            </div>
                        </div></div> :
                        active === "services" ? <div className="di">
                            <div className="mian-sub-content">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="customer-card-dash">
                                            <h3>Active Order</h3>
                                            {loadingValues ? <Spinner animation="border" role="status" /> : <h2>{dashboardServiceCount?.active_order}</h2>}
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
                                    <h2>Recentll</h2>
                                    <LoadingComponents />



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
                                            {/* <TableCustomerDash loading={loading} data={recentService} /> */}
                                            <FoldedTable loading={loading} data={recentService} />
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

                </div>
            }
        </>
    )
}

export default CustomerMainDashboard
