import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderTop from '../../../../components/Layout/HeaderTop'
import Footer from '../../../../components/Layout/Footer'
import ProductSidebar from '../../../../components/Layout/ProductSidebar/ProductSidebar'

function ProductDeshboardLayout() {
  return (
    <>
      <HeaderTop />
      <div className='container'>
        <div className="dashboard-seller-service">
          <div className="row">
            <div className="col-lg-3">
              <ProductSidebar />
            </div>
            <div className="col-lg-9">
              <Outlet />
            </div>
          </div>
        </div >
      </div>
      <Footer />
    </>
  )
}

export default ProductDeshboardLayout
