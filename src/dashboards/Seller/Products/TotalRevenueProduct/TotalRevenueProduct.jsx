import React from 'react'
import ProductTableTab from '../MainProductDashboard/ProductTableTab'
import SemiDoughnutChart from '../../../Charts/SemiDoughnutChart'
import LineChart from '../../../Charts/LineChart'


function TotalRevenueProduct() {
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
                    <ProductTableTab />
                  </div>
            </div>  
      )
}

export default TotalRevenueProduct
