import React from 'react'
import SearchBar from '../../../../components/Main/SearchBar'
import SideBar from '../../../../components/Layout/SideBar'
import funnyCartoon from '../../../../media/images/Tem_Images/funny-cartoon-superhero-character-with-mask 1.png'
import { Link, Outlet } from 'react-router-dom'
import HeaderTop from '../../../../components/Layout/HeaderTop'
import Footer from '../../../../components/Layout/Footer'
import ProductSidebar from '../../../../components/Layout/ProductSidebar/ProductSidebar'

function ProductManagementLayout() {
  return (
    <>
      <HeaderTop />
      <div className='container'>
        <div className="dashboard-seller-service">
          <div className="row">
            <div className="col-lg-4">
              <ProductSidebar />
            </div>
            <div className="col-lg-8">
              <Outlet />
            </div>
          </div>
        </div >
      </div>
      <Footer />
    </>
  )
}

export default ProductManagementLayout
