import React, { useEffect, useState } from "react";
import ifoneee from "../../../media/images/Tem_Images/ifoneee.svg";
import iconGroup from "../../../media/images/busss.png";
import Filter from "../../FeatureProduct/Filter";
import Pagination from "../../../components/Main/Pagination";
import service from '../../../media/images/Tem_Images/service.svg'
import ServicesCard from "../../../components/Main/ServicesCard";
import { popularService } from "../../../utils/api";
import LoadingComponents from "../../../components/shared/loaders/LoadingComponents";

function PopularServiceCardsFilter() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [activeButton, setActiveButton] = useState();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Product");
  const [popSer, setPopSer] = useState([]);

  const itemsPerPage = 12;
  const totalItems = 150; // Total number of products

  // Calculate the products to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = popSer?.slice(startIndex, endIndex);


  const fetchPopularService = async () => {
    setLoading(true)
    try {
      const response = await popularService();
      setPopSer(response?.data?.data?.service); // Adjust based on API response structure
      setLoading(false)

    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false)

    }
  };


  useEffect(() => {
    fetchPopularService();
  }, []);


  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const handleTabClick = (buttonName) => {
    setActiveTab(buttonName);
    setActiveButton("")
  };

  if(loading)
  {
    return(
      <LoadingComponents />
    )
  }
  else{
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="row justify-content-space-between align-items-center py-8">
            <div className="col-lg-4">
              <div className="popular-service-top-heading-title d-flex justify-content-left gap-20 align-items-center">
                <img src={iconGroup} />
                <h2>Popular Services</h2>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="popular-service-top-title-right" style={{ textAlign: "right" }}>
                <h4>(5000) services Available</h4>
              </div>
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
              {displayedProducts.map((product) => (
                <div className="col-lg-4 col-md-2 col-sm-6 " key={product.id} style={{ marginBottom: "50px" }}>
                  <ServicesCard 
                    image={product?.main_image}
                    name={product?.name}
                    cat={product?.category.name}
                    description={product?.category.description}
                    rating={product?.price} 
                    
                    />
                </div>))}
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
      </div>
    );
  }
  
}

export default PopularServiceCardsFilter;
