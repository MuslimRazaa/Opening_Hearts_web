import React from 'react'

import DonationTableTab from '../MainDonationDashboard/DonationTableTab'
import LineChart from '../../../Charts/LineChart'
import SemiDoughnutChart from '../../../Charts/SemiDoughnutChart'


function TotalRevenueDonation() {
    return (
        <div>
                <div className="row">
                    <div className="col-lg-6">
                        <LineChart />
                    </div>
                    <div className="col-lg-6">
                        <SemiDoughnutChart/>
                    </div>
                </div>
            <div className='orders-table-and-tabs'>
                    <div className="orders-table-heading">
                        <h2>Recent Orders</h2>
                    </div>
                    <DonationTableTab />
                  </div>
            </div>  
      )
}

export default TotalRevenueDonation
