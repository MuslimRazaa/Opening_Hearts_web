import React, { useState } from "react";
import ifoneee from "../../media/images/Tem_Images/ifoneee.svg";
import Filter from "./Filter";
import Pagination from "../../components/Main/Pagination";
import FeatureProductSec2 from "./FeatureProductSec2";
import FeatureProductCard from "../../components/Main/FeatureProductCard";
import search from '../../media/images/search.svg'
import FeatureSupplierCards from "../../components/Main/FeatureSupplierCards";

function FeatureProductSec3() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [activeButton, setActiveButton] = useState();
  const [activeTab, setActiveTab] = useState("Product");

  const itemsPerPage = 20;
  const totalItems = 150; // Total number of products

  const itemsPerPage2 = 7;
  const totalItems2 = 35; // Total number of products

  // Generate dummy products for display
  const products = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    image: ifoneee,
  }));


  const suppliers = Array.from({ length: totalItems2 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    image: ifoneee,
  }));

  // Calculate the products to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);



  // for supplier
  const startIndex2 = (currentPage2 - 1) * itemsPerPage2;
  const endIndex2 = startIndex2 + itemsPerPage2;
  const displayedSupplier = suppliers.slice(startIndex2, endIndex2);



  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const handleTabClick = (buttonName) => {
    setActiveTab(buttonName);
    setActiveButton("")
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-3">
            <div className="filter-switch-tabs">
              <button
                className={activeTab === "Product" ? "active" : ""}
                onClick={() => handleTabClick("Product")}
              >
                Product
              </button>
              <button
                className={activeTab === "Suppliers" ? "active" : ""}
                onClick={() => handleTabClick("Suppliers")}
              >
                Suppliers
              </button>
            </div>
          </div>
          <div className="col-lg-9">
            {activeTab === "Product" ? (
              <FeatureProductSec2 />
            ) : (
              <div className="row row d-flex justify-content-space-between align-items-center py-4 ">
                <div className="col-lg-6">

                </div>
                <div className="col-lg-6">
                  <div className='donation-detail-page-search-bar'>
                    <img src={search} alt="Search icon" />
                    <input type='search' placeholder='Search..' />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

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
            {activeTab === "Product" ? (
              <>
                {displayedProducts.map((product) => (
                  <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                    <FeatureProductCard image={product.image} />
                  </div>
                ))}
              </>
            ) : (
              <>
                {displayedSupplier.map((supplier) => (
                  <div key={supplier.id}>
                    <FeatureSupplierCards image={supplier.image} />
                  </div>
                ))}
              </>
            )}
          </div>
          {activeTab === "Product" ?
            <div className="feature-product-paginantion">
              <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div> :
              <div className="feature-product-paginantion">
                <Pagination
                  totalItems={totalItems2}
                  itemsPerPage={itemsPerPage2}
                  onPageChange={setCurrentPage2}
                />
              </div>}
        </div>
      </div>
    </div>
  );
}

export default FeatureProductSec3;
