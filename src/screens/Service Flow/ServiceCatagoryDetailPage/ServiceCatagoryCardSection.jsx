import React, { useState } from 'react'
import TopRatedProvidersCard from '../cards/TopRatedProvidersCard'
import Pagination from '../../../components/Main/Pagination';
import cross from '../../../media/images/cross.png'
import pen from '../../../media/images/pen.png'
import { Link } from 'react-router-dom';

function ServiceCatagoryCardSection() {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 52;
    const totalItems = 150; 

    const cardsArray = Array.from({ length: totalItems }, (_, index) => index + 1);

  // Calculate the products to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = cardsArray.slice(startIndex, endIndex);

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12">
                    <div className="service-catagory-top-header">
                        <div className="catagory-filter-text">
                            <div className="catagory-filter-button">
                            <Link to='/serviceBilling' >     <button>Logo Designing <span style={{color:"gray"}}>(2500+ Result)</span></button></Link> 
                        <img src={cross} />
                            </div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley </p>
                        </div>
                        <div className="setvice-catagory-image">
                            <img src={pen} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {displayedProducts.map((card, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                       <TopRatedProvidersCard />
                    </div>
                ))}

                <div className="feature-product-paginantion">
                    <Pagination
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default ServiceCatagoryCardSection