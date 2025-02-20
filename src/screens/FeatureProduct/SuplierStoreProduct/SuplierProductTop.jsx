import React, { useState } from 'react'
import FeatureProductSec2 from '../FeatureProductSec2'
import Filter from '../Filter'
import FeatureProductCard from '../../../components/Main/FeatureProductCard';
import Pagination from '../../../components/Main/Pagination';
import ifoneee from "../../../media/images/Tem_Images/ifoneee.svg";

function SuplierProductTop({vendorProducts, guid}) {
    const [activeButton, setActiveButton] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 20;
    const totalItems = 150; // Total number of products

    // const products = Array.from({ length: totalItems }, (_, i) => ({
    //     id: i + 1,
    //     name: `Product ${i + 1}`,
    //     image: ifoneee,
    //   }));
    // Calculate the products to display for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedProducts = vendorProducts?.slice(startIndex, endIndex);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
      };
  return (
    <div className='container'>
      <div className="row">
        <div className="col-lg-3">
            
        </div>
        <div className="col-lg-9">
        <FeatureProductSec2/>
        </div>
      </div>
      <div className="row">
      <div className="col-lg-3">
          <div className="filter-inner-pages">
            <div className="filter-1">
              <h2>Categories</h2>
              <ul>
                <li
                  className={activeButton === "Electronics" ? "active" : ""}
                  onClick={() => handleButtonClick("Electronics")}
                >
                  Electronics & Gadgets
                </li>
                <li
                  className={activeButton === "Fashion" ? "active" : ""}
                  onClick={() => handleButtonClick("Fashion")}
                >
                  Fashion & Apparel
                </li>
                <li
                  className={activeButton === "Kitchen" ? "active" : ""}
                  onClick={() => handleButtonClick("Kitchen")}
                >
                  Home & Kitchen
                </li>
                <li
                  className={activeButton === "Beauty" ? "active" : ""}
                  onClick={() => handleButtonClick("Beauty")}
                >
                  Beauty & Personal Care
                </li>
                <li
                  className={activeButton === "Health" ? "active" : ""}
                  onClick={() => handleButtonClick("Health")}
                >
                  Health & Wellness
                </li>
                <li
                  className={activeButton === "Sports" ? "active" : ""}
                  onClick={() => handleButtonClick("Sports")}
                >
                  Sports & Outdoors
                </li>
                <li
                  className={activeButton === "Books" ? "active" : ""}
                  onClick={() => handleButtonClick("Books")}
                >
                  Books & Stationery
                </li>
                <li
                  className={activeButton === "Toys" ? "active" : ""}
                  onClick={() => handleButtonClick("Toys")}
                >
                  Toys & Games
                </li>
                <li
                  className={activeButton === "Pet" ? "active" : ""}
                  onClick={() => handleButtonClick("Pet")}
                >
                  Pet Supplies
                </li>
              </ul>
            </div>
            <div className="filter-flags">
              <Filter />
            </div>
          </div>
        </div>
        <div className="col-lg-9">
        <div className="row justify-content-start">

        {displayedProducts?.map((product) => (

                  <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                    <FeatureProductCard image={product?.media[0]?.original_url} name={product?.title} Category={product?.category?.name} price={product?.price} discounted_price={product?.discount_price} guid={product?.guid} />
                  </div>
                ))}
        </div>
        </div>
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

export default SuplierProductTop
