import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import DonationSideBar from '../../../components/Layout/DonationSideBar/DonationSideBar'
import Footer from '../../../components/Layout/Footer'
import HeaderTop from '../../../components/Layout/HeaderTop'
import CustomerSideBar from '../../../components/Layout/CustomerSideBar/CustomerSideBar'


function CustomerDashboardDashboard() {
  const [userData, setUserData] = useState(null);

  // Function to update user data when API is called
  const updateUserData = (newData) => {
    setUserData(newData);
  };
  return (
    <>
      <HeaderTop RefetchuserData={userData}/>
    
    <div className='container'>
      <div className="dashboard-seller-service">

      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-8">
          {/* <SearchBar /> */}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <CustomerSideBar RefetchuserData={userData}/>
        </div>
        <div className="col-lg-8">
        <Outlet context={{ updateUserData }}/>
        </div>  
        </div>
      </div >
      </div>

      <Footer/>
      </>
  )
}

export default CustomerDashboardDashboard
