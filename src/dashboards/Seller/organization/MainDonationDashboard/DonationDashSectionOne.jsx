import React from 'react'
import SearchBar from '../../../../components/Main/SearchBar'
import { Link } from 'react-router-dom'
import DonationTableTab from './DonationTableTab'
import DonationDashboardTableTab from './DonationDashboardTableTab'

function DonationDashSectionOne() {
  return (
<>
              <div className="row">
                <div className="col-lg-4">
                    <div className="seller-db-box-TO">
                        <h3>Total Orders</h3>
                        <h2>500</h2>
                        <p>+33% month over month</p>
                    </div>
                </div>
                <div className="col-lg-4">
                <Link to="/donation-dashboard/total-donation-revenue-detail" style={{textDecoration:"none", color:"black"}} > <div className="seller-db-box-TO">
                        <h3>Total Revenue </h3>
                        <h2>$20,900</h2>
                        <p>+33% month over month</p>
                    </div></Link>
                </div>
                <div className="col-lg-4">
               <Link to="/donation-dashboard/complete-donation-detail" style={{textDecoration:"none", color:"black"}} ><div className="seller-db-box-TO">
                        <h3>Completed Services</h3>
                        <h2>200</h2>
                        <p>+33% month over month</p>
                    </div></Link>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                <div className="seller-db-box-TO">
                        <h3>Cancel Services</h3>
                        <h2>50</h2>
                        <p>+33% month over month</p>
                    </div>
                </div>
                <div className="col-lg-4">
                <div className="seller-db-box-TO">
                        <h3>Active Services</h3>
                        <h2>35</h2>
                        <p>+33% month over month</p>
                    </div>
                </div>
                <div className="col-lg-4">
                <div className="seller-db-box-TO">
                        <h3>Number of Listed Services</h3>
                        <h2>30</h2>
                        <p>+33% month over month</p>
                    </div>
                </div>
              </div>
              <div className='orders-table-and-tabs'>
                <div className="orders-table-heading">
                    <h2>Recent Donations</h2>
                </div>
                <DonationDashboardTableTab />
              </div>
      </>
  )
}

export default DonationDashSectionOne
