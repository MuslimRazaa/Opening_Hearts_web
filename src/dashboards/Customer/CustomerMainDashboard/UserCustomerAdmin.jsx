import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import image from '../../../media/images/userprofileAdmin.png'
import Toogle from '../../../components/Main/Toogle'
import LineChart from '../../Charts/LineChart'

const UserCustomerAdmin = () => {
    const [active, setActive] = useState("products")   // hook useState


    const handleTabClick = (tab) => {
        setActive(tab)
    }
    return (
        <>
            <div className="admin-user-line-chart">
                <LineChart/>
            </div>
            <div className='main-dash-and-total-data-tabs'>
                <div className="customer-dash-buttons-tabs-class">
                    <button className={active === "products" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button' onClick={() => handleTabClick("products")} >Ecommerce</button>
                    <button className={active === "services" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button' onClick={() => handleTabClick("services")} >Services Sector</button>
                    <button className={active === "donations" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button' onClick={() => handleTabClick("donations")}>Organization</button>
                </div>

                {active === "products" ? <div className="di">
                    <div className="mian-sub-content">
                        <div className="recent-data-tabel">
                            <h2>Customers</h2>
                            <div className="row">
                                <div className="col-lg-6 my-4">
                                    <div className="admin-customer-profile-card-main">
                                        <div className="admin-customer-profile-card-active-status">
                                            <div class="toggle-container-T">
                                            <span class="label-T inactive">In Active</span>
                                                <label class="toggle-switch-T">
                                                    <input type="checkbox" />
                                                    <span class="slider-T"></span>
                                                </label>
                                                <span class="label-T active">Active</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="admin-customer-profile-card-profile-image">
                                                    <img src={image} />
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="admin-customer-profile-card-profile-details">
                                                    <h1>Lily Ann</h1>
                                                    <p><span>Customer ID:</span> #34091</p>
                                                    <p><span>User since: </span> June 20, 2020</p>
                                                    <button>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 my-4">
                                    <div className="admin-customer-profile-card-main">
                                        <div className="admin-customer-profile-card-active-status">
                                            <div class="toggle-container-T">
                                            <span class="label-T inactive">In Active</span>
                                                <label class="toggle-switch-T">
                                                    <input type="checkbox" />
                                                    <span class="slider-T"></span>
                                                </label>
                                                <span class="label-T active">Active</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="admin-customer-profile-card-profile-image">
                                                    <img src={image} />
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="admin-customer-profile-card-profile-details">
                                                    <h1>Lily Ann</h1>
                                                    <p><span>Customer ID:</span> #34091</p>
                                                    <p><span>User since: </span> June 20, 2020</p>
                                                    <button>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 my-4">
                                    <div className="admin-customer-profile-card-main">
                                        <div className="admin-customer-profile-card-active-status">
                                            <div class="toggle-container-T">
                                            <span class="label-T inactive">In Active</span>
                                                <label class="toggle-switch-T">
                                                    <input type="checkbox" />
                                                    <span class="slider-T"></span>
                                                </label>
                                                <span class="label-T active">Active</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="admin-customer-profile-card-profile-image">
                                                    <img src={image} />
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="admin-customer-profile-card-profile-details">
                                                    <h1>Lily Ann</h1>
                                                    <p><span>Customer ID:</span> #34091</p>
                                                    <p><span>User since: </span> June 20, 2020</p>
                                                    <button>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 my-4">
                                    <div className="admin-customer-profile-card-main">
                                        <div className="admin-customer-profile-card-active-status">
                                            <div class="toggle-container-T">
                                            <span class="label-T inactive">In Active</span>
                                                <label class="toggle-switch-T">
                                                    <input type="checkbox" />
                                                    <span class="slider-T"></span>
                                                </label>
                                                <span class="label-T active">Active</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="admin-customer-profile-card-profile-image">
                                                    <img src={image} />
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="admin-customer-profile-card-profile-details">
                                                    <h1>Lily Ann</h1>
                                                    <p><span>Customer ID:</span> #34091</p>
                                                    <p><span>User since: </span> June 20, 2020</p>
                                                    <button>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div></div> :
                    active === "services" ? <div className="di">
                        <div className="mian-sub-content">

                            <div className="recent-data-tabel">
                                <h2>Customers</h2>
                                <div className="row">
                                <div className="col-lg-6 my-4">
                                    <div className="admin-customer-profile-card-main">
                                        <div className="admin-customer-profile-card-active-status">
                                            <div class="toggle-container-T">
                                            <span class="label-T inactive">In Active</span>
                                                <label class="toggle-switch-T">
                                                    <input type="checkbox" />
                                                    <span class="slider-T"></span>
                                                </label>
                                                <span class="label-T active">Active</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="admin-customer-profile-card-profile-image">
                                                    <img src={image} />
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="admin-customer-profile-card-profile-details">
                                                    <h1>Max Ryder</h1>
                                                    <p><span>Customer ID:</span> #34091</p>
                                                    <p><span>User since: </span> June 20, 2020</p>
                                                    <button>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 my-4">
                                    <div className="admin-customer-profile-card-main">
                                        <div className="admin-customer-profile-card-active-status">
                                            <div class="toggle-container-T">
                                            <span class="label-T inactive">In Active</span>
                                                <label class="toggle-switch-T">
                                                    <input type="checkbox" />
                                                    <span class="slider-T"></span>
                                                </label>
                                                <span class="label-T active">Active</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="admin-customer-profile-card-profile-image">
                                                    <img src={image} />
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="admin-customer-profile-card-profile-details">
                                                    <h1>Max Ryder</h1>
                                                    <p><span>Customer ID:</span> #34091</p>
                                                    <p><span>User since: </span> June 20, 2020</p>
                                                    <button>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 my-4">
                                    <div className="admin-customer-profile-card-main">
                                        <div className="admin-customer-profile-card-active-status">
                                            <div class="toggle-container-T">
                                            <span class="label-T inactive">In Active</span>
                                                <label class="toggle-switch-T">
                                                    <input type="checkbox" />
                                                    <span class="slider-T"></span>
                                                </label>
                                                <span class="label-T active">Active</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="admin-customer-profile-card-profile-image">
                                                    <img src={image} />
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="admin-customer-profile-card-profile-details">
                                                    <h1>Max Ryder</h1>
                                                    <p><span>Customer ID:</span> #34091</p>
                                                    <p><span>User since: </span> June 20, 2020</p>
                                                    <button>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 my-4">
                                    <div className="admin-customer-profile-card-main">
                                        <div className="admin-customer-profile-card-active-status">
                                            <div class="toggle-container-T">
                                            <span class="label-T inactive">In Active</span>
                                                <label class="toggle-switch-T">
                                                    <input type="checkbox" />
                                                    <span class="slider-T"></span>
                                                </label>
                                                <span class="label-T active">Active</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="admin-customer-profile-card-profile-image">
                                                    <img src={image} />
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="admin-customer-profile-card-profile-details">
                                                    <h1>Max Ryder</h1>
                                                    <p><span>Customer ID:</span> #34091</p>
                                                    <p><span>User since: </span> June 20, 2020</p>
                                                    <button>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            </div>
                        </div></div> :
                        active === "donations" ? <div className="di">
                            <div className="mian-sub-content">

                                <div className="recent-data-tabel">
                                    <h2>Customers</h2>
                                    <div className="row">
                                <div className="col-lg-6 my-4">
                                    <div className="admin-customer-profile-card-main">
                                        <div className="admin-customer-profile-card-active-status">
                                            <div class="toggle-container-T">
                                            <span class="label-T inactive">In Active</span>
                                                <label class="toggle-switch-T">
                                                    <input type="checkbox" />
                                                    <span class="slider-T"></span>
                                                </label>
                                                <span class="label-T active">Active</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="admin-customer-profile-card-profile-image">
                                                    <img src={image} />
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="admin-customer-profile-card-profile-details">
                                                    <h1>Lily Ann</h1>
                                                    <p><span>Customer ID:</span> #34091</p>
                                                    <p><span>User since: </span> June 20, 2020</p>
                                                    <button>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 my-4">
                                    <div className="admin-customer-profile-card-main">
                                        <div className="admin-customer-profile-card-active-status">
                                            <div class="toggle-container-T">
                                            <span class="label-T inactive">In Active</span>
                                                <label class="toggle-switch-T">
                                                    <input type="checkbox" />
                                                    <span class="slider-T"></span>
                                                </label>
                                                <span class="label-T active">Active</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="admin-customer-profile-card-profile-image">
                                                    <img src={image} />
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="admin-customer-profile-card-profile-details">
                                                    <h1>Lily Ann</h1>
                                                    <p><span>Customer ID:</span> #34091</p>
                                                    <p><span>User since: </span> June 20, 2020</p>
                                                    <button>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 my-4">
                                    <div className="admin-customer-profile-card-main">
                                        <div className="admin-customer-profile-card-active-status">
                                            <div class="toggle-container-T">
                                            <span class="label-T inactive">In Active</span>
                                                <label class="toggle-switch-T">
                                                    <input type="checkbox" />
                                                    <span class="slider-T"></span>
                                                </label>
                                                <span class="label-T active">Active</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="admin-customer-profile-card-profile-image">
                                                    <img src={image} />
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="admin-customer-profile-card-profile-details">
                                                    <h1>Lily Ann</h1>
                                                    <p><span>Customer ID:</span> #34091</p>
                                                    <p><span>User since: </span> June 20, 2020</p>
                                                    <button>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 my-4">
                                    <div className="admin-customer-profile-card-main">
                                        <div className="admin-customer-profile-card-active-status">
                                            <div class="toggle-container-T">
                                            <span class="label-T inactive">In Active</span>
                                                <label class="toggle-switch-T">
                                                    <input type="checkbox" />
                                                    <span class="slider-T"></span>
                                                </label>
                                                <span class="label-T active">Active</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="admin-customer-profile-card-profile-image">
                                                    <img src={image} />
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="admin-customer-profile-card-profile-details">
                                                    <h1>Lily Ann</h1>
                                                    <p><span>Customer ID:</span> #34091</p>
                                                    <p><span>User since: </span> June 20, 2020</p>
                                                    <button>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                                </div>
                            </div></div> :

                            ""}

            </div>
        </>
    )
}

export default UserCustomerAdmin
