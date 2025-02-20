import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import apis from '../../../../service';
import Swal from 'sweetalert2';
import NoDataFound from '../../../../components/shared/noDataFound/NoDataFound';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';
import { MdDelete } from 'react-icons/md';
import { AiFillEdit } from "react-icons/ai";

function DiscountsAndcoupons() {
    const [coupons, setCoupons] = useState([])
    const [loading, setLoading] = useState(true)
    const [fullLoading, setFullLoading] = useState(false)
    const [tabActive, setTabActive] = useState("tab1")
    const navigate = useNavigate()
    // banner_type == / seller /services/organization
    const banner_type = "seller"

    const getCoupons = async (banner_type) => {
        try {
            const response = await apis.getCoupons(banner_type);
            setCoupons(response?.data?.data);
            setLoading(false)
            setFullLoading(false)
        } catch (error) {
            setLoading(false)
            setFullLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    }

    useEffect(() => {
        getCoupons(banner_type);
    }, [])

    const updateOfferStatus = async (id, active) => {
        setFullLoading(true)
        try {
            const response = await apis.updateOfferStatus({
                id: id,
                active: active
            });
            getCoupons(banner_type);
        } catch (error) {
            fullLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    }
    const deleteCoupon = async (id) => {
        setFullLoading(true)
        try {
            const response = await apis.deleteCoupon(id);
            getCoupons(banner_type);
        } catch (error) {
            fullLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    }

    const updateCouponStatus = async (id, status) => {
        setFullLoading(true)
        try {
            const response = await apis.updateCouponStatus(id, { status: status });
            getCoupons(banner_type);
        } catch (error) {
            fullLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    }

    const handleTabs = (e) => {
        setTabActive(e)
    }
    return (
        <>
            {fullLoading &&
                <div className="full-screen-loader">
                    <LoadingComponents />
                </div>
            }
            {loading ?
                <LoadingComponents />
                :
                <div className='table-tabs-main'>
                    <div className="offers-and-promotions">
                        <h2>Discounts And Coupons</h2>
                        <Link to={'/dashboard/product-coupon-create'}>Create</Link>
                    </div>
                    <div className="promotions-tabs-top">
                        <tab onClick={() => handleTabs("tab1")} className={tabActive === "tab1" ? "active-tab" : "not-active-tab"}>Active - {coupons?.active_count}</tab>
                        <tab onClick={() => handleTabs("tab2")} className={tabActive === "tab2" ? "active-tab" : "not-active-tab"}>InActive - {coupons?.expired_count}</tab>
                    </div>
                    {tabActive === "tab1" ?
                        <div className="table-main-wrapper">
                            <div className='table-main-wrapper'>
                                <div className="order-table">
                                    <div className="table-header">
                                        <div><p>Name</p></div>
                                        <div><p>Code</p></div>
                                        <div><p>Start Date</p></div>
                                        <div><p>End Date</p></div>
                                        <div><p>Status</p></div>
                                        <div><p>Action</p></div>
                                    </div>
                                    {coupons?.active_coupons?.length > 0 ?
                                        coupons?.active_coupons.map((activeCoupon, index) => (
                                            <div className="table-row" key={index}>
                                                <div><p>{activeCoupon?.title}</p></div>
                                                <div><p>{activeCoupon?.code}</p></div>
                                                <div><p>{activeCoupon?.start_date}</p></div>
                                                <div><p>{activeCoupon?.end_date}</p></div>
                                                <div>
                                                    <div
                                                        className={activeCoupon.status === 1 ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"}
                                                        onClick={() => { updateCouponStatus(activeCoupon?.id, activeCoupon?.status === 1 ? 0 : 1) }}>
                                                        <div className={`toggle-price-switch ${activeCoupon.status === 1 ? "on" : "off"}`}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className='delete' onClick={() => { navigate(`/dashboard/product-coupon-create?id=${activeCoupon?.id}`) }}><AiFillEdit /></span>
                                                    <span className='delete' onClick={() => { deleteCoupon(activeCoupon?.id) }} style={{ marginLeft: '10px' }}><MdDelete /></span>
                                                </div>
                                            </div>
                                        ))
                                        :
                                        <NoDataFound title={'No data found.'} />
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div className="table-main-wrapper">
                            <div className='table-main-wrapper'>
                                <div className="order-table">
                                    <div className="table-header">
                                        <div><p>ID</p></div>
                                        <div><p>Image</p></div>
                                        <div><p>Start Date</p></div>
                                        <div><p>End Date</p></div>
                                        <div><p>Status</p></div>
                                        <div><p>Action</p></div>
                                    </div>
                                    {coupons?.expired_coupons?.length > 0 ?
                                        coupons?.expired_coupons.map((activeCoupon, index) => (
                                            <div className="table-row" key={index}>
                                                <div><p>{activeCoupon?.title}</p></div>
                                                <div><p>{activeCoupon?.code}</p></div>
                                                <div><p>{activeCoupon?.start_date}</p></div>
                                                <div><p>{activeCoupon?.end_date}</p></div>
                                                <div>
                                                    <div
                                                        className={activeCoupon.status === 1 ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"}
                                                        onClick={() => { updateCouponStatus(activeCoupon?.id, activeCoupon?.status === 1 ? 0 : 1) }}>
                                                        <div className={`toggle-price-switch ${activeCoupon.status === 1 ? "on" : "off"}`}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className='delete' onClick={() => { navigate(`/dashboard/product-coupon-create?id=${activeCoupon?.id}`) }}><AiFillEdit /></span>
                                                    <span className='delete' onClick={() => { deleteCoupon(activeCoupon?.id) }} style={{ marginLeft: '10px' }}><MdDelete /></span>
                                                </div>
                                            </div>
                                        ))
                                        :
                                        <NoDataFound title={'No data found.'} />
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default DiscountsAndcoupons
