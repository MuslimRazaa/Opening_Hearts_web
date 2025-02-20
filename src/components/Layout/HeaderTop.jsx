import React, { useEffect, useRef, useState } from 'react'
import logo from '../../media/images/logo.png';
import cart from '../../media/images/shopping-cart.svg';
import bell from '../../media/images/notification-bing.svg';
import sep from '../../media/images/sepratorNav.svg';
import down from '../../media/images/whiteArrowDown.svg';
import userrr from '../../media/images/userrr.png';
import getDonation from '../../media/images/framee2.svg';
import becomeAseller from '../../media/images/becomeAseller.svg';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL, getProfileDetails } from '../../utils/api';
import axios from 'axios';
import { useUserData } from '../shared/helperMethod';

function HeaderTop() {
    const [userIcon, setUserIcon] = useState(false)
    const [peoductDrop, setProductDrop] = useState(false)
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);
    const [isDropdownVisible3, setIsDropdownVisible3] = useState(false);
    const [count, setCount] = useState(false);
    const [getProfile, setGetProfile] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);

    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);



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



    useEffect(() => {
        fetchCartCountApi();
        FetchGetProfileDetails();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProductDrop(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const sellerDashboardToggleDown = () => {
        setIsDropdownVisible2(!isDropdownVisible2);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        setUserIcon(false)
    }

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

    const handleLogin = () => {
        navigate("/login");
    };

    const handleUserIcon = () => {
        setUserIcon(!userIcon)
    };

    const handleProductDropdown = () => {
        setProductDrop(!peoductDrop)
    };

    const userData = JSON.parse(localStorage.getItem("user_data"))

    const user = useUserData();

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
                            {/* <li className="dropdown" onClick={handleDropdown} ref={buttonRef} >
                                <img src={humb} alt="Menu" /> All Categories
                            </li> */}
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
                            <Link to="/donation-dashboard/donation-dashboard-start"> <img src={getDonation} className="GetDonationIcon" style={{ width: "30px" }} title='Get A Donation' /></Link>
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
                            <img src={bell} alt="Notifications" />
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

                                <img src={getProfile?.media[0]?.original_url || userrr} ref={buttonRef} onClick={handleUserIcon} style={{ padding: "0px 0px" }} />
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

                                    {/* {isDropdownVisible3 && <ul className='topnav-ul-items' >
                                        <Link style={{ textDecoration: "none", textAlign:"left" }} to="/customer-dashboard/customer-main-dashboard" ><li style={{ textDecoration: "none", textAlign:"left" }}>User Dashboard</li></Link>
                                        <li onClick={sellerDashboardToggleDown} style={{ textDecoration: "none", textAlign:"left" }} >Seller Dashboard</li>
                                            {isDropdownVisible2 && <ul className='topnav-ul-items'>
                                            <Link style={{ textDecoration: "none" }} to="/product-dashboard/product-dashboard-start" >  <li>↪ Product Dashboard</li> </Link>
                                            <Link style={{ textDecoration: "none" }} to="/dashboard/service-dashboard" >  <li>↪ Service Dashboard</li></Link>
                                            </ul>}
                                        <Link style={{ textDecoration: "none" , textAlign:"left"  }} to="/donation-dashboard/donation-dashboard-start" >  <li style={{ textDecoration: "none", textAlign:"left" }}>Organization Dashboard</li></Link>
                                    </ul>} */}

                                </div>
                                <Link style={{ textDecoration: "none", textAlign: "left" }} to="/donation-dashboard/donation-dashboard-start" > <li><svg width="19" height="19" viewBox="0 0 19 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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

                                {/* <li>
                                    <svg width="20" height="14" viewBox="0 0 20 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.8239 5.85476C15.9317 5.53149 16.0394 5.20821 16.0394 4.77717C16.0394 2.40647 14.0998 0.466797 11.7291 0.466797C10.1127 0.466797 8.60404 1.43663 7.95748 2.8375C7.63421 2.72974 7.20317 2.62198 6.87989 2.62198C5.37126 2.62198 4.18591 3.80734 4.18591 5.31597C4.18591 5.53149 4.18591 5.74701 4.29367 5.85476C2.354 6.17804 0.953125 7.68667 0.953125 9.62634C0.953125 11.6738 2.67727 13.3979 4.7247 13.3979H15.5006C17.5481 13.3979 19.2722 11.6738 19.2722 9.62634C19.2722 7.68667 17.7636 6.07028 15.8239 5.85476ZM9.03508 12.2126L5.58678 8.76427L7.09541 7.25564L9.03508 9.1953L13.1299 5.10045L14.6386 6.60908L9.03508 12.2126Z" fill="#828D9E" />
                                    </svg>
                                    Saved </li>
                                <li> <svg width="21" height="21" viewBox="0 0 21 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.7673 13.002L18.2789 11.7295C18.3493 11.2977 18.3857 10.8569 18.3857 10.416C18.3857 9.97516 18.3493 9.53431 18.2789 9.10254L19.7673 7.82998C19.8796 7.73387 19.96 7.60587 19.9977 7.46298C20.0355 7.3201 20.0288 7.16911 19.9787 7.03009L19.9582 6.971C19.5485 5.82575 18.9349 4.76408 18.1471 3.83732L18.1062 3.7896C18.0106 3.67723 17.8833 3.59645 17.7409 3.55792C17.5985 3.51938 17.4478 3.52489 17.3086 3.57372L15.4611 4.23045C14.7793 3.67143 14.0181 3.23058 13.1955 2.92153L12.8387 0.989959C12.8118 0.844619 12.7413 0.71091 12.6365 0.606595C12.5318 0.502279 12.3978 0.432296 12.2524 0.405944L12.191 0.394582C11.0071 0.180973 9.76182 0.180973 8.57788 0.394582L8.51652 0.405944C8.37108 0.432296 8.2371 0.502279 8.13238 0.606595C8.02765 0.71091 7.95715 0.844619 7.93023 0.989959L7.57119 2.93062C6.75514 3.23975 5.99519 3.68036 5.32148 4.23499L3.46036 3.57372C3.32121 3.5245 3.17038 3.51879 3.0279 3.55735C2.88543 3.59591 2.75807 3.67692 2.66274 3.7896L2.62183 3.83732C1.83499 4.76475 1.2215 5.82623 0.810703 6.971L0.790251 7.03009C0.687992 7.31414 0.772072 7.63228 1.00159 7.82998L2.50821 9.11618C2.43777 9.5434 2.40368 9.9797 2.40368 10.4137C2.40368 10.85 2.43777 11.2864 2.50821 11.7113L1.00159 12.9975C0.889319 13.0936 0.808968 13.2216 0.771217 13.3645C0.733466 13.5074 0.740105 13.6584 0.790251 13.7974L0.810703 13.8565C1.22201 15.0018 1.83103 16.0585 2.62183 16.9902L2.66274 17.0379C2.7583 17.1502 2.88567 17.231 3.02806 17.2696C3.17044 17.3081 3.32117 17.3026 3.46036 17.2538L5.32148 16.5925C5.99867 17.1492 6.75539 17.5901 7.57119 17.8969L7.93023 19.8375C7.95715 19.9829 8.02765 20.1166 8.13238 20.2209C8.2371 20.3252 8.37108 20.3952 8.51652 20.4215L8.57788 20.4329C9.77269 20.6476 10.9962 20.6476 12.191 20.4329L12.2524 20.4215C12.3978 20.3952 12.5318 20.3252 12.6365 20.2209C12.7413 20.1166 12.8118 19.9829 12.8387 19.8375L13.1955 17.906C14.0177 17.5977 14.7833 17.1554 15.4611 16.597L17.3086 17.2538C17.4477 17.303 17.5985 17.3087 17.741 17.2701C17.8835 17.2316 18.0109 17.1506 18.1062 17.0379L18.1471 16.9902C18.9379 16.0562 19.5469 15.0018 19.9582 13.8565L19.9787 13.7974C20.0809 13.5179 19.9969 13.1997 19.7673 13.002ZM16.6655 9.37069C16.7223 9.71383 16.7518 10.0661 16.7518 10.4183C16.7518 10.7705 16.7223 11.1227 16.6655 11.4659L16.5155 12.3771L18.213 13.8292C17.9557 14.4221 17.6308 14.9833 17.2449 15.5017L15.1361 14.7541L14.4226 15.3404C13.8795 15.7858 13.275 16.1357 12.6205 16.3811L11.7547 16.7061L11.348 18.9104C10.7062 18.9831 10.0582 18.9831 9.41641 18.9104L9.00964 16.7016L8.15066 16.3721C7.50302 16.1266 6.90082 15.7767 6.36226 15.3336L5.64871 14.745L3.52626 15.4994C3.13995 14.9791 2.81726 14.4178 2.5582 13.8269L4.27389 12.3612L4.12618 11.4522C4.07164 11.1136 4.0421 10.7637 4.0421 10.4183C4.0421 10.0706 4.06937 9.72292 4.12618 9.38433L4.27389 8.47535L2.5582 7.00963C2.81499 6.41653 3.13995 5.85751 3.52626 5.33712L5.64871 6.09157L6.36226 5.50301C6.90082 5.05989 7.50302 4.70993 8.15066 4.46451L9.01191 4.13955L9.41868 1.93075C10.0572 1.85803 10.7094 1.85803 11.3502 1.93075L11.757 4.13501L12.6228 4.45996C13.275 4.70539 13.8817 5.05534 14.4248 5.50074L15.1384 6.08703L17.2472 5.3394C17.6335 5.85978 17.9562 6.42107 18.2153 7.01191L16.5178 8.46399L16.6655 9.37069ZM10.3867 6.19156C8.17793 6.19156 6.38725 7.98224 6.38725 10.191C6.38725 12.3998 8.17793 14.1905 10.3867 14.1905C12.5955 14.1905 14.3862 12.3998 14.3862 10.191C14.3862 7.98224 12.5955 6.19156 10.3867 6.19156ZM12.1865 11.9908C11.9504 12.2275 11.6699 12.4153 11.361 12.5432C11.0522 12.6711 10.721 12.7367 10.3867 12.7362C9.70728 12.7362 9.06872 12.4703 8.58697 11.9908C8.35023 11.7548 8.16251 11.4742 8.03459 11.1653C7.90667 10.8565 7.84109 10.5254 7.84161 10.191C7.84161 9.51158 8.10748 8.87303 8.58697 8.39127C9.06872 7.90952 9.70728 7.64592 10.3867 7.64592C11.0662 7.64592 11.7047 7.90952 12.1865 8.39127C12.4232 8.62733 12.611 8.90786 12.7389 9.21674C12.8668 9.52561 12.9324 9.85673 12.9319 10.191C12.9319 10.8705 12.666 11.5091 12.1865 11.9908Z" />
                                </svg>  Setting </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTop
