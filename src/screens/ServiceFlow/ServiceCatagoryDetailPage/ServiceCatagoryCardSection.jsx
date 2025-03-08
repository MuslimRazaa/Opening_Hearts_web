import React, { useState } from 'react'
import TopRatedProvidersCard from '../cards/TopRatedProvidersCard'
import Pagination from '../../../components/Main/Pagination';
import cross from '../../../media/images/cross.png'
import pen from '../../../media/images/pen.png'
import { Link } from 'react-router-dom';
import TopRatedProvidersHourly from '../cards/TopRatedProvidersHourly';
import NoDataFound from '../../../components/shared/noDataFound/NoDataFound';

function ServiceCatagoryCardSection({data}) {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 52;
    const totalItems = 150;

    // const cardsArray = Array.from({ length: totalItems }, (_, index) => index + 1);

 

    // Calculate the products to display for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedProducts = data.slice(startIndex, endIndex);

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12">
                    <div className="service-catagory-top-header">
                        <div className="catagory-filter-text">
                            <div className="category-filter-button">
                                    <button className="category-button">
                                        <span className="category-text">{`${data[0]?.category?.name ?  data[0]?.category?.name + `→` : ""}   ${data[0]?.sub_category?.name ? data[0]?.sub_category?.name : "" }`}</span>
                                        <span className="category-results">({data?.length} Result)</span>
                                    </button>
                                {/* <img src={cross} alt="Remove Filter" className="cross-icon" /> */}
                            </div>
                            {data[0]?.sub_category?.description ? <p>{data[0]?.sub_category?.description}</p> : <NoDataFound title="No Data Found" />}
                        </div>
                        <div className="setvice-catagory-image">
                            <img src={pen} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {displayedProducts?.map((card, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                        <TopRatedProvidersHourly card={card} />
                    </div>
                ))}

                {/* {displayedProducts?.length > 0 && <div className="feature-product-paginantion">
                    <Pagination
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
                </div>} */}
            </div>
        </div>
    )
}

export default ServiceCatagoryCardSection