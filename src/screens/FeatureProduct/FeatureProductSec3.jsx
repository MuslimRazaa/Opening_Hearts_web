import React, { useEffect, useState } from "react";
import ifoneee from "../../media/images/Tem_Images/ifoneee.svg";
import Filter from "./Filter";
import Pagination from "../../components/Main/Pagination";
import FeatureProductCard from "../../components/Main/FeatureProductCard";
import search from '../../media/images/search.svg'
import FeatureSupplierCards from "../../components/Main/FeatureSupplierCards";
import { allFeaturedProducts, fetchProductPageSuplier, productAllCategories } from "../../utils/api";
import { Spinner } from "react-bootstrap";

function FeatureProductSec3() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [activeButton, setActiveButton] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [pagination, setPagination] = useState();
  const [tabFilter, setTabFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [allSuplier, setAllSuplier] = useState()
  const [allCat, setAllCat] = useState([]);
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("Product");

  const itemsPerPage = pagination?.page_size;
  const totalItems = pagination?.total; // Total number of products

  const itemsPerPage2 = 7;
  const totalItems2 = 35; // Total number of products

  const brand = ""
  const min = ""
  const max = ""


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTabClick = (buttonName) => {
    setActiveTab(buttonName);
    setActiveButton("")
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country); // Parent state ko update karega
  };

  const handleCatSelected = (id, title) => {
    setCategory(id);
  };

  const handleTabFilter = (tab) => {
    setTabFilter(tab)
  }

  const fetchAllFeaturedProducts = async () => {
    setLoading(true);
    try {
      const response = await allFeaturedProducts(brand, min, max, category, currentPage, selectedCountry, tabFilter);
      setAllProducts(response?.data?.data?.products); // Adjust based on API response structure
      setPagination(response?.data?.data?.pagination); // Adjust based on API response structure
    } catch (error) {
      console.error('Error fetching top-rated products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductAllCategories = async () => {
    try {
      const response = await productAllCategories();
      setAllCat(response?.data?.data?.categories); // Adjust based on API response structure
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const FetchProductPageSuplier = async () => {
    try {
      const response = await fetchProductPageSuplier();
      setAllSuplier(response?.data?.data?.suppliers); // Adjust based on API response structure
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  useEffect(() => {
    FetchProductPageSuplier();
  }, []);

  useEffect(() => {
    fetchAllFeaturedProducts();
  }, [category, selectedCountry, currentPage, tabFilter]);

  useEffect(() => {
    fetchProductAllCategories();
  }, []);


  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 my-4">
          <div className='donation-detail-page-search-bar'>
            <img src={search} alt="Search icon" />
            <input type='search' placeholder='Search..' />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">

        <div className="row justify-content-center align-items-center">
          <div className="col-lg-3">
            {/* <div className="filter-switch-tabs">
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
            </div> */}
          </div>
          <div className="col-lg-9">
            {activeTab === "Product" ? (
              <div className='container'>
                <div className="row row d-flex justify-content-space-between align-items-center py-4 ">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="feature-product-top-button" >
                          <button className={tabFilter === "" ? `active` : ""} onClick={() => handleTabFilter("")}>All</button>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div
                          className="feature-product-top-button" >
                          <button className={tabFilter === "top_ranking" ? `active` : ""} onClick={() => handleTabFilter("top_ranking")}>Top Ranking</button>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div
                          className="feature-product-top-button" >
                          <button className={tabFilter === "new_arrivals" ? `active` : ""} onClick={() => handleTabFilter("new_arrivals")}>New Arrivals</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-6">
                    <div className='donation-detail-page-search-bar'>
                      <img src={search} alt="Search icon" />
                      <input type='search' placeholder='Search..' />
                    </div>
                  </div> */}
                </div>
              </div>


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
              <div className="filter-titles-and-arrow">
                <h4>
                  Catagories
                </h4>
              </div>
              <ul>
                {allCat?.map((allCat) => (
                  <li
                    className={category === allCat.id ? 'active' : ""}
                    key={allCat.id}
                    onClick={() => handleCatSelected(allCat.id, allCat.name)}
                  >
                    {allCat.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="filter-flags">
              <Filter onCountryId={handleCountryChange} />
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="row justify-content-start">
            {activeTab === "Product" ? (
              allProducts?.length > 0 ? (<>
                {allProducts?.map((product) => (
                  <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                    <FeatureProductCard image={product?.media[0]?.original_url} name={product?.title} Category={product?.category?.name} price={product?.price} discounted_price={product?.discount_price} guid={product?.guid} />
                  </div>
                ))}
              </>) :
                (<div className="no-product-ava">
                  {loading ? (<div className='centered-spinner'>
                    <Spinner animation="border" role="status" />
                  </div>) :
                    (<h1>No Products available</h1>)}
                </div>)
            ) : (
              <>
                {allSuplier?.map((supplier) => (
                  <div key={supplier.id}>
                    <FeatureSupplierCards allSuplier={allSuplier} />
                  </div>
                ))}
              </>
            )}
          </div>
          {activeTab === "Product" && allProducts?.length > 0 ?
            <div className="feature-product-paginantion">
              <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </div> :
            activeTab === "supplier" && allProducts?.length > 0 ?
              <div className="feature-product-paginantion">
                <Pagination
                  totalItems={totalItems2}
                  itemsPerPage={itemsPerPage2}
                  onPageChange={setCurrentPage2}
                />
              </div> : ""}
        </div>
      </div>
    </div>
  );
}

export default FeatureProductSec3;
