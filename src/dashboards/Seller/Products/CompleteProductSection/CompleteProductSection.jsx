import React from 'react'
import BarChart from '../../../Charts/BarChart'
import SemiDoughnutChart from '../../../Charts/SemiDoughnutChart'
import ProductTableTab from '../MainProductDashboard/ProductTableTab'


function CompleteDonationSection() {
  return (
    
        <div>
            <div className="row">
                <div className="col-lg-6">
                    <BarChart />
                </div>
                <div className="col-lg-6">
                    <SemiDoughnutChart/>
                </div>
            </div>
        <div className='orders-table-and-tabs'>
                <div className="orders-table-heading">
                    <h2>Recent Orders</h2>
                </div>
                <ProductTableTab />
              </div>
        </div>  
  )
}

export default CompleteDonationSection
