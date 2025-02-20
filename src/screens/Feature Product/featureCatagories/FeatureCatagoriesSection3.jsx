import React, { useState } from "react";
import { Link } from "react-router-dom";
import Filter from "../Filter";
import ifoneee from "../../../media/images/Tem_Images/ifoneee.svg";
import FeatureProductCard from "../../../components/Main/FeatureProductCard";
import Pagination from "../../../components/Main/Pagination";
import FeatureCatagoriesSection2 from "./FeatureCatagoriesSection2";

function FeatureCatagoriesSection3() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 32;
    const totalItems = 150; // Total number of products
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categories = [
        { id: 1, label: "Electronics & Gadgets" },
        { id: 2, label: "Fashion & Apparel" },
        { id: 3, label: "Home & Kitchen" },
        { id: 4, label: "Beauty & Personal Care" },
        { id: 5, label: "Health & Wellness" },
        { id: 6, label: "Sports & Outdoors" },
    ];

    // Generate dummy products for display
    const products = Array.from({ length: totalItems }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        image: ifoneee,
    }));

    // Calculate the products to display for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedProducts = products.slice(startIndex, endIndex);

    // Add category to the selected list on click
    const handleCategoryClick = (category) => {
        if (!selectedCategories.some((c) => c.id === category.id)) {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    // Remove category from the selected list
    const handleRemoveCategory = (categoryId) => {
        setSelectedCategories(selectedCategories.filter((c) => c.id !== categoryId));
    };

    return (
        <div className="filter-container">
            <div className="row justify-content-center">
                <div className="col-lg-3">
                    <div className="filter-inner-pages">
                        <div className="filter-1">
                            <h2>Categories</h2>
                            <ul>
                                {categories.map((category) => (
                                    <li
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category)}
                                        style={{ cursor: "pointer", color: "#007bff" }}
                                    >
                                        {category.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="filter-flags">
                            <Filter />
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <FeatureCatagoriesSection2 />
                    <div className="sub-catagory-button">
                        <button>Category {selectedCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className="selected-category-item"
                                    style={{
                                        display: "inline-block",
                                        padding: "0px 10px",
                                    }}
                                >
                                    {category.label}
                                    <span
                                        onClick={() => handleRemoveCategory(category.id)}
                                        style={{
                                            marginLeft: "10px",
                                            cursor: "pointer",
                                            color: "#ff0066",
                                        }}
                                    >
                                        ✕
                                    </span>
                                </div>
                            ))}</button>
                        <Link>Clear all filters</Link>
                    </div>
                    {/* <div className="sub-category-button">
                        <h4>Selected Categories:</h4>
                        <div className="selected-categories">
                            {selectedCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className="selected-category-item"
                                    style={{
                                        display: "inline-block",
                                        padding: "5px 10px",
                                        margin: "5px",
                                        border: "1px solid #ff0066",
                                        borderRadius: "20px",
                                        backgroundColor: "#f8f9fa",
                                    }}
                                >
                                    {category.label}
                                    <span
                                        onClick={() => handleRemoveCategory(category.id)}
                                        style={{
                                            marginLeft: "10px",
                                            cursor: "pointer",
                                            color: "#ff0066",
                                        }}
                                    >
                                        ✕
                                    </span>
                                </div>
                            ))}
                        </div>
                        {selectedCategories.length > 0 && (
                            <Link to="#" onClick={() => setSelectedCategories([])}>
                                Clear all filters
                            </Link>
                        )}
                    </div> */}
                    <div className="row justify-content-end">
                        {displayedProducts.map((_, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                                <FeatureProductCard image={ifoneee} />
                            </div>
                        ))}
                    </div>
                    <div className="feature-product-pagination">
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

export default FeatureCatagoriesSection3;
