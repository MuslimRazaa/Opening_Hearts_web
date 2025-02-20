import React, { useState } from 'react'
import TopRatedProvidersCard from '../cards/TopRatedProvidersCard'
import Pagination from '../../../components/Main/Pagination';

function ServiceProviderCardsSection() {
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
                    <div className="service-provider-top-title-cards-section">
                    <h2>(48500+ Result)</h2>
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

export default ServiceProviderCardsSection