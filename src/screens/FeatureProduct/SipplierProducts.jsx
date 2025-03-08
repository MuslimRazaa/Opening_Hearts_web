import React, { useEffect, useState } from "react";
import ifoneee from "../../media/images/Tem_Images/ifoneee.svg";
import Filter from "./Filter";
import Pagination from "../../components/Main/Pagination";
import FeatureProductCard from "../../components/Main/FeatureProductCard";
import search from '../../media/images/search.svg'
import FeatureSupplierCards from "../../components/Main/FeatureSupplierCards";
import { allFeaturedProducts, fetchProductPageSuplier, productAllCategories } from "../../utils/api";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import LoadingComponents from "../../components/shared/loaders/LoadingComponents";

function SipplierProducts() {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [activeButton, setActiveButton] = useState();
    const [allProducts, setAllProducts] = useState([]);
    const [pagination, setPagination] = useState();
    const [tabFilter, setTabFilter] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [allSuplier, setAllSuplier] = useState([])
    const [allCat, setAllCat] = useState([]);
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);

    const [activeTab, setActiveTab] = useState("Product");

    // const itemsPerPage = pagination?.page_size;
    // const totalItems = pagination?.total; // Total number of products

    // const itemsPerPage2 = 7;
    // const totalItems2 = 35; // Total number of products

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
        setLoading2(true)
        try {
            const response = await productAllCategories();
            setAllCat(response?.data?.data?.categories); // Adjust based on API response structure
            setLoading2(false)
        } catch (error) {
            console.error('Error fetching categories:', error);
            setLoading2(false)
        }
    };

    const FetchProductPageSuplier = async () => {
        setLoading3(true)
        try {
            const response = await fetchProductPageSuplier(category);
            setAllSuplier(response?.data?.data?.seller); // Adjust based on API response structure
            console.log(allSuplier, "all suppliers here")
            setLoading3(false)
        } catch (error) {
            console.error('Error fetching categories:', error);
            setLoading3(false)
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


    if (loading && loading2 && loading3) {
        return (
            <>
                <Header />
                <LoadingComponents />
                <Footer />
            </>
        )
    }
    else {
        return (
            <>

                <Header />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-3">

                            </div>
                            <div className="col-lg-9">
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
                                <>
                                    {allSuplier?.map((supplier) => (
                                        <div key={supplier.id}>
                                            <FeatureSupplierCards suplier={supplier} />
                                        </div>
                                    ))}
                                </>
                            </div>
                            <div className="feature-product-paginantion">
                                {/* <Pagination
                                totalItems={totalItems2}
                                itemsPerPage={itemsPerPage2}
                                onPageChange={setCurrentPage2}
                            /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>

        );
    }




}

export default SipplierProducts;
