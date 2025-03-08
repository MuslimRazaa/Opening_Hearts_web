import React, { useEffect, useRef, useState } from 'react'
import logo from '../../media/images/logo.png';
import cart from '../../media/images/shopping-cart.svg';
import bell from '../../media/images/notification-bing.svg';
import sep from '../../media/images/sepratorNav.svg';
import belle from '../../media/images/notification-bingvvv.svg';
import down from '../../media/images/whiteArrowDown.svg';
import userrr from '../../media/images/blankuser.jpg';
import getDonation from '../../media/images/framee2.svg';
import becomeAseller from '../../media/images/becomeAseller.svg';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL, getProfileDetails, notifications } from '../../utils/api';
import axios from 'axios';
import { useUserData } from '../shared/helperMethod';
import Toogle from '../Main/Toogle';
import LoadingComponents from '../shared/loaders/LoadingComponents';
import NoDataFound from '../shared/noDataFound/NoDataFound';

function HeaderTop({ }) {
    const [userIcon, setUserIcon] = useState(false)
    const [peoductDrop, setProductDrop] = useState(false)
    const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);
    const [count, setCount] = useState(false);
    const [notificationBell, setNotificationBell] = useState(false);
    const [notificationTab, setNotificationTab] = useState("");
    const [getNotification, setGetNotification] = useState();
    const [getProfile, setGetProfile] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);
    const [notificationLoading, setNotificationLoading] = useState(false);

    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const dropdownRefff = useRef(null);
    const buttonRef = useRef(null);
    const buttonRefff = useRef(null);
    const userfetch = useUserData()
    const userData = JSON.parse(localStorage.getItem("user_data"))
    const user = useUserData();

    const fetchCartCountApi = async () => {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        try {
            const response = await axios.get(`${BASE_URL}cart/count`, { headers });
            setCount(response?.data.data)
        } catch (error) {
            console.error('Error fetching top-rated products:', error);
        }
    }

    const FetchGetProfileDetails = async () => {
        setProfileLoading(true)
        try {
            const response = await getProfileDetails();
            setGetProfile(response?.data?.data)
            setProfileLoading(false)
        }
        catch (err) {
            console.error(err)
            setProfileLoading(false)
        }
    }
    const FetchNotifications = async (tab) => {
        setNotificationLoading(true)
        try {
            const response = await notifications(tab);
            setGetNotification(response?.data?.data)
            console.log(getNotification, "notifications")
            setNotificationLoading(false)

        }
        catch (err) {
            console.error(err)
            setNotificationLoading(false)

        }
    }

    const handleNotificationsTab = (tab) => {
        setNotificationTab(tab)
    }

    const sellerDashboardToggleDown = () => {
        setIsDropdownVisible2(!isDropdownVisible2);
    };
    const handleUserIcon = () => {
        setUserIcon(!userIcon)
    };
    const handleNotificationIcon = () => {
        setNotificationBell(!notificationBell)
    };

    const handleProductDropdown = () => {
        setProductDrop(!peoductDrop)
    };
    const handleLogin = () => {
        navigate("/login");
    };
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        setUserIcon(false)
    }
    useEffect(() => {
        fetchCartCountApi();
        FetchGetProfileDetails();
        FetchNotifications();
    }, []);

    useEffect(() => {
        FetchNotifications(notificationTab);
    }, [notificationTab]);

    // user icon dropdow
    useEffect(() => {
        // Scroll to top when the page loads
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        // Close the dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setUserIcon(false); // Close the dropdown
            }
        };

        document.addEventListener('click', handleClickOutside);

        // Cleanup event listener when component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // notification dropdow
    useEffect(() => {
        // Scroll to top when the page loads
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        // Close the dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (
                dropdownRefff.current && !dropdownRefff.current.contains(event.target) &&
                buttonRefff.current && !buttonRefff.current.contains(event.target)
            ) {
                setNotificationBell(false)
            }
        };

        document.addEventListener('click', handleClickOutside);

        // Cleanup event listener when component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    return (
        <div className='top-nav'>
            <div className="container">
                <div className="top-nav-wrapper">
                    <div className='top-nav-logo'>
                        <Link to='/'>
                            <img src={logo} alt="Logo" />
                        </Link>
                    </div>

                    <div className='nav-bar-nav-items'>
                        <ul>
                            <Link to='/'><li>Home</li></Link>
                            <Link to='/donation-now'><li>Donate now</li></Link>
                            <div className='featured-dropdown-for-arrow'>
                                <li onClick={handleProductDropdown} style={{ color: "white" }}>Featured Products</li>
                                <img src={down} onClick={handleProductDropdown} />
                            </div>
                            {peoductDrop &&
                                <div className='featured-dropdown' ref={dropdownRef} >
                                    <ul>
                                        <Link to='/featureProduct'><li>All Products</li></Link>
                                        <Link to='/SuplierProduct'><li>Product Suppliers</li></Link>
                                    </ul>
                                </div>}
                            <Link to='/service'><li>Services</li></Link>
                        </ul>
                    </div>

                    <div className='top-nav-icons'>
                        <div className='top-nav-img-container'>
                            {user?.is_organization_subscription == 1 ? null :
                                <Link to="/non-profit-form"> <img src={getDonation} className="GetDonationIcon" style={{ width: "30px" }} title='Get A Donation' /></Link>
                            }
                            {user?.is_product_subscription == 1 && user?.is_service_subscription == 1 ? null :
                                <Link to="/become-seller"><img src={becomeAseller} className="GetDonationIcon" style={{ width: "29px" }} title='Become a Seller' /></Link>
                            }
                            <img src={sep} alt="Notifications" style={{ padding: "0px 8px" }} />
                            <div className="cart-icon-coun">
                                <Link to="/ShoppingCart" > <img src={cart} alt="Cart" /> </Link>
                                {(count?.productCount + count?.serviceCount > 0) && (
                                    <span className='cart-qunt' style={{ color: "white" }}>
                                        {count?.productCount + count?.serviceCount}
                                    </span>
                                )}                            </div>
                            {/* <img src={bell} ref={buttonRef} onClick={handleNotificationIcon}  alt="Notifications" /> */}
                            <img src={bell} ref={buttonRefff} onClick={handleNotificationIcon} alt="Notifications" /><span className='notificationCount'>{getNotification?.count || 0}</span>
                        </div>

                        {!userData ?
                            (<div className="top-nav-button-container">
                                <button onClick={handleLogin} className="gradient-border-button">Login</button>
                            </div>) :
                            (<div className="user-nav-button-container">
                                <div className="div-name-id">
                                    {/* <p style={{ paddingLeft: "15px", margin:"0" }}>{userData?.data?.name}</p>
                                <p style={{ fontSize: "10px", margin:"0" }}>{userData?.data?.email}</p> */}
                                </div>
                                {/* <img src={getProfile?.media[0]?.original_url || blankUser} /> */}

                                <img src={userfetch?.profile_image || userrr} ref={buttonRef} onClick={handleUserIcon} style={{ padding: "0px 0px" }} />
                            </div>)
                        }
                    </div>

                    {/* user icon drop down */}
                    <div
                        ref={dropdownRef} // Ref for dropdown
                        className={`user-icon-bar-${userIcon ? "open" : "close"}`}>
                        <div className="user-info">
                            <img src={getProfile?.media[0]?.original_url || userrr} />
                            <h3>{userData?.name}</h3>
                            <h4>{userData?.email}</h4>
                        </div>

                        <div className="user-icons-items">
                            <ul>
                                <div>

                                    <Link style={{ textDecoration: "none", textAlign: "left" }} to="/customer-dashboard/customer-main-dashboard" > <li> <svg width="19" height="19" viewBox="0 0 19 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.761 11.6126C16.6942 11.6126 18.7257 13.1798 18.7257 15.113V16.6132C18.7257 17.7179 17.8302 18.6134 16.7255 18.6134H2.72387C1.61917 18.6134 0.723633 17.7179 0.723633 16.6132V15.113C0.723633 13.1798 2.79358 11.6126 4.7268 11.6126H14.761ZM4.72036 13.1128C3.10729 13.1128 2.30565 13.9288 2.22929 14.9638L2.22381 15.1131V16.1132C2.22381 16.6261 2.60989 17.0488 3.10729 17.1066L3.22393 17.1133H16.2254C16.7383 17.1133 17.1611 16.7272 17.2188 16.2298L17.2256 16.1132V15.1131C17.2256 14.0586 16.2254 13.1049 14.7508 13.1128C13.2762 13.1208 4.72036 13.1128 4.72036 13.1128ZM9.72469 0.611328C12.4864 0.611328 14.7253 2.85017 14.7253 5.61191C14.7253 8.37366 12.4864 10.6125 9.72469 10.6125C6.96294 10.6125 4.7241 8.37366 4.7241 5.61191C4.7241 2.85017 6.96294 0.611328 9.72469 0.611328ZM9.72428 2.1115C7.79128 2.1115 6.22428 3.67851 6.22428 5.6115C6.22428 7.5445 7.79128 9.1115 9.72428 9.1115C11.6573 9.1115 13.2243 7.5445 13.2243 5.6115C13.2243 3.67851 11.6573 2.1115 9.72428 2.1115Z" />
                                    </svg>
                                        User Dashboard</li></Link>
                                    <br></br>

                                </div>
                                <Link style={{ textDecoration: "none", textAlign: "left" }} to="/dashboard/organization" >
                                    <li>
                                        <svg width="19" height="19" viewBox="0 0 19 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M14.761 11.6126C16.6942 11.6126 18.7257 13.1798 18.7257 15.113V16.6132C18.7257 17.7179 17.8302 18.6134 16.7255 18.6134H2.72387C1.61917 18.6134 0.723633 17.7179 0.723633 16.6132V15.113C0.723633 13.1798 2.79358 11.6126 4.7268 11.6126H14.761ZM4.72036 13.1128C3.10729 13.1128 2.30565 13.9288 2.22929 14.9638L2.22381 15.1131V16.1132C2.22381 16.6261 2.60989 17.0488 3.10729 17.1066L3.22393 17.1133H16.2254C16.7383 17.1133 17.1611 16.7272 17.2188 16.2298L17.2256 16.1132V15.1131C17.2256 14.0586 16.2254 13.1049 14.7508 13.1128C13.2762 13.1208 4.72036 13.1128 4.72036 13.1128ZM9.72469 0.611328C12.4864 0.611328 14.7253 2.85017 14.7253 5.61191C14.7253 8.37366 12.4864 10.6125 9.72469 10.6125C6.96294 10.6125 4.7241 8.37366 4.7241 5.61191C4.7241 2.85017 6.96294 0.611328 9.72469 0.611328ZM9.72428 2.1115C7.79128 2.1115 6.22428 3.67851 6.22428 5.6115C6.22428 7.5445 7.79128 9.1115 9.72428 9.1115C11.6573 9.1115 13.2243 7.5445 13.2243 5.6115C13.2243 3.67851 11.6573 2.1115 9.72428 2.1115Z" />
                                        </svg>
                                        Donation Dashboard
                                    </li>
                                </Link>
                                <br></br>
                                <li onClick={sellerDashboardToggleDown}> <svg width="19" height="19" viewBox="0 0 19 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.761 11.6126C16.6942 11.6126 18.7257 13.1798 18.7257 15.113V16.6132C18.7257 17.7179 17.8302 18.6134 16.7255 18.6134H2.72387C1.61917 18.6134 0.723633 17.7179 0.723633 16.6132V15.113C0.723633 13.1798 2.79358 11.6126 4.7268 11.6126H14.761ZM4.72036 13.1128C3.10729 13.1128 2.30565 13.9288 2.22929 14.9638L2.22381 15.1131V16.1132C2.22381 16.6261 2.60989 17.0488 3.10729 17.1066L3.22393 17.1133H16.2254C16.7383 17.1133 17.1611 16.7272 17.2188 16.2298L17.2256 16.1132V15.1131C17.2256 14.0586 16.2254 13.1049 14.7508 13.1128C13.2762 13.1208 4.72036 13.1128 4.72036 13.1128ZM9.72469 0.611328C12.4864 0.611328 14.7253 2.85017 14.7253 5.61191C14.7253 8.37366 12.4864 10.6125 9.72469 10.6125C6.96294 10.6125 4.7241 8.37366 4.7241 5.61191C4.7241 2.85017 6.96294 0.611328 9.72469 0.611328ZM9.72428 2.1115C7.79128 2.1115 6.22428 3.67851 6.22428 5.6115C6.22428 7.5445 7.79128 9.1115 9.72428 9.1115C11.6573 9.1115 13.2243 7.5445 13.2243 5.6115C13.2243 3.67851 11.6573 2.1115 9.72428 2.1115Z" />
                                </svg>
                                    Seller Dashboard
                                </li>
                                {isDropdownVisible2 && <ul className='topnav-ul-items'>
                                    <Link style={{ textDecoration: "none" }} to="/dashboard/product" >  <li>↪ Product Dashboard</li> </Link>
                                    <Link style={{ textDecoration: "none" }} to="/dashboard/service" >  <li>↪ Service Dashboard</li></Link>
                                </ul>}
                                <br></br>
                                <Link to="/userChat" > <li><svg width="19" height="19" viewBox="0 0 19 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_7_16667)">
                                        <path d="M3.22369 13.8274C3.34345 13.9476 3.43522 14.0928 3.49246 14.2525C3.5497 14.4123 3.57099 14.5827 3.55483 14.7516C3.47354 15.5334 3.31981 16.3059 3.09562 17.0592C4.70518 16.6865 5.68822 16.255 6.13475 16.0289C6.38801 15.9006 6.67968 15.8702 6.95395 15.9435C7.74004 16.1539 8.5505 16.2594 9.36426 16.2573C13.9749 16.2573 17.4409 13.0186 17.4409 9.33447C17.4409 5.65036 13.9749 2.41162 9.36426 2.41162C4.75364 2.41162 1.2876 5.65152 1.2876 9.33447C1.2876 11.0283 1.9995 12.5998 3.22369 13.8274ZM2.65486 18.333C2.38147 18.3872 2.10722 18.4368 1.8322 18.4819C1.60143 18.5188 1.42605 18.2788 1.51721 18.0642C1.61938 17.8225 1.71328 17.5773 1.79873 17.3292L1.8022 17.3177C2.08834 16.4869 2.32141 15.5316 2.40679 14.642C0.991069 13.2228 0.133789 11.3652 0.133789 9.33447C0.133789 4.87385 4.26673 1.25781 9.36426 1.25781C14.4618 1.25781 18.5947 4.87385 18.5947 9.33447C18.5947 13.7951 14.4618 17.4111 9.36426 17.4111C8.44999 17.4132 7.53945 17.2945 6.65627 17.0581C6.05629 17.3615 4.76518 17.9142 2.65486 18.333Z" fill="currentColor" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_7_16667">
                                            <rect width="18.4609" height="18.4609" fill="currentColor" transform="translate(0.133789 0.103516)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                    Chat</li></Link>
                                <br></br>
                                <li onClick={handleLogout}>  <svg width="15" height="18" viewBox="0 0 15 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.208008 2.42249C0.208008 1.40172 1.03669 0.574219 2.05893 0.574219H10.3881C11.4103 0.574219 12.239 1.40172 12.239 2.42249V3.57766C12.239 3.96045 11.9282 4.27076 11.5449 4.27076C11.1616 4.27076 10.8508 3.96045 10.8508 3.57766V3.09081C10.8565 2.21426 10.571 1.99989 9.85216 1.9704L9.59631 1.96677L9.46262 1.96042H5.01578L6.64498 2.85786C7.23521 3.18306 7.60172 3.80299 7.60172 4.47614L7.60152 13.05H9.46262C10.1842 13.05 10.7835 12.7783 10.8508 12.0753L10.8572 11.9418L10.8545 11.4328C10.8526 11.0838 11.1109 10.7939 11.4476 10.7465L11.5449 10.7397C11.9282 10.7397 12.239 11.05 12.239 11.4328V12.588C12.239 13.6087 11.4103 14.4362 10.3881 14.4362H7.60152L7.60172 15.32C7.60172 16.3407 6.77303 17.1682 5.75079 17.1682C5.40692 17.1682 5.06985 17.0726 4.77738 16.892L1.08552 14.6125C0.54002 14.2757 0.208008 13.6809 0.208008 13.0405V2.42249ZM2.52171 2.20013C2.3418 2.20013 2.17388 2.25139 2.0318 2.34009C1.79363 2.56392 1.63544 2.87063 1.6026 3.21387L1.59624 3.34737V12.8524C1.59624 13.1436 1.73344 13.4154 1.96254 13.5888L2.05267 13.6491L4.82905 15.279C4.97123 15.3625 5.13316 15.4065 5.29809 15.4065C5.7727 15.4065 6.16387 15.0498 6.21732 14.5901L6.22355 14.4824V4.83383C6.22355 4.55329 6.09614 4.29029 5.8812 4.11619L5.78384 4.04722L3.00745 2.33766C2.86143 2.24775 2.69326 2.20013 2.52171 2.20013ZM13.1568 5.34166L14.7928 6.97532C15.0392 7.22138 14.9746 7.46592 14.8362 7.66443L14.7874 7.72801L14.4497 8.07192L12.9717 9.57082C12.7006 9.8415 12.2611 9.8415 11.9901 9.57082C11.719 9.30015 11.719 8.8613 11.9901 8.59063L12.6357 7.94549H9.70148C9.31814 7.94549 9.00738 7.77153 9.00738 7.38875C9.00738 7.00596 9.31814 6.79225 9.70148 6.79225H12.6468L12.1752 6.32185C11.9041 6.05118 11.9041 5.61233 12.1752 5.34166C12.4462 5.07099 12.8857 5.07099 13.1568 5.34166Z" />
                                </svg>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>


                    {/* notification dropdown */}
                    <div
                        ref={dropdownRefff} // Ref for dropdown
                        className={`notification-dropdown-${notificationBell ? "main" : "main-close"}`}
                    // className={notificationBell ? "notification-dropdown-main" : "notification-dropdown-main-close"}
                    >
                        <div className="notifications-dropdown-wrapper">
                            <div className='notification-heading-bar'>
                                <div className="notification-title">
                                    <h2>Notifications</h2>
                                    <span className='notification-count'>{getNotification?.count}</span>
                                </div>
                                <div className="all-notifications">
                                    <Link to="/customer-dashboard/customer-notifications"><p>See All</p></Link>
                                </div>
                            </div>

                            <div className="push-notifications-main">

                                <div className='push-notification-text'>
                                    <div className='notification-icon-bell'>
                                        <img src={belle} />
                                        <div className='push-notification-types'>
                                            <h5>Notifications</h5>
                                            <p>Turn Off Your Notification!</p>
                                            {/* <ul>
                                            <input type='radio' /><li>Buying</li>
                                            <input type='radio' /><li>Selling</li>
                                            <input type='radio' /><li>Important</li>
                                        </ul> */}
                                        </div>
                                    </div>

                                </div>
                                <div className='push-notification-toggle'>
                                    <Toogle />
                                </div>
                            </div>

                            <div className="main-notifications-wrapper">
                                <div className="notification-tabs">
                                    <button onClick={() => handleNotificationsTab("")} className={notificationTab === "" ? `notification-btn-active` : `notification-btn`}>All</button>
                                    <button onClick={() => handleNotificationsTab("important")} className={notificationTab === "important" ? `notification-btn-active` : `notification-btn`}>Important</button>
                                    <button onClick={() => handleNotificationsTab("buying")} className={notificationTab === "buying" ? `notification-btn-active` : `notification-btn`}>Buying</button>
                                    <button onClick={() => handleNotificationsTab("selling")} className={notificationTab === "selling" ? `notification-btn-active` : `notification-btn`}>Selling</button>
                                    <button onClick={() => handleNotificationsTab("donation")} className={notificationTab === "donation" ? `notification-btn-active` : `notification-btn`}>Donation</button>
                                    <button onClick={() => handleNotificationsTab("chats")} className={notificationTab === "chats" ? `notification-btn-active` : `notification-btn`}>Chats</button>
                                </div>
                                <hr></hr>

                                {notificationLoading ?
                                    <LoadingComponents /> :
                                    getNotification?.notifications?.length > 0 ?
                                        (<>
                                            {getNotification?.notifications?.map((item, index) => (
                                                <div className="all-notifications-section" key={index}>
                                                    <div className="new-notification-title">
                                                        <p>{item?.title}</p>
                                                        <div className='d-flex align-items-center'>
                                                            <h6>{item?.date}</h6>
                                                            <div className='notification-dot' >
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='notification-text-description' >
                                                        <p>{item?.message}</p>
                                                    </div>
                                                    {/* <div className='notification-view-btn'>
                                        <button>View All</button>
                                    </div> */}
                                                </div>
                                            ))}
                                        </>) : <NoDataFound title="No Notifications Available" />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTop
