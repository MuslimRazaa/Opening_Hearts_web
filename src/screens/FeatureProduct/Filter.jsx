import React, { useState } from "react";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import down from '../../media/images/arrowDown.png'
import search from '../../media/images/search.svg'
import ind from '../../media/images/India (IN).png'
import pak from '../../media/images/Pakistan (PK).png'
import afg from '../../media/images/Afghanistan (AF).png'
import arg from '../../media/images/Argentina (AR).png'
import "./Filter.css"; // Add your custom styles here

const Filter = ({onCountryId} ) => {
    const [isCountryOpen, setCountryOpen] = useState(true);
    const [isPriceOpen, setPriceOpen] = useState(true);
    const [isBrandOpen, setBrandOpen] = useState(true);

    const [isSizeOpen, setSizeOpen] = useState(false);
    const [isSaleOpen, setSaleOpen] = useState(false);
    const [isTargetOpen, setTargetOpen] = useState(false);
    const [isRatingOpen, setRatingOpen] = useState(false);

    const [priceRange, setPriceRange] = useState([5, 500]);
    const [searchText, setSearchText] = useState("");

    const countries = [
        { name: "USA", flag: ind , id: 1},
        { name: "Afghanistan", flag: afg ,id: 2},
        { name: "Argentina", flag: arg , id: 3},

    ];

    const brands = ["Nike", "Levi's", "Gucci", "Calvin Klein", "Louis Vuitton"];

    const toggleDropdown = (dropdown) => {
        if (dropdown === "country") setCountryOpen(!isCountryOpen);
        if (dropdown === "price") setPriceOpen(!isPriceOpen);
        if (dropdown === "brand") setBrandOpen(!isBrandOpen);
    };

    const handleSearchChange = (e) => setSearchText(e.target.value);

    const handleRangeChange = (e, index) => {
        const updatedRange = [...priceRange];
        updatedRange[index] = parseInt(e.target.value);
        setPriceRange(updatedRange);
    };

    const handleCountryChange = (id, isChecked) => {
        if (isChecked) {
            if (id === 1) onCountryId("USA");
            if (id === 2) onCountryId("Afghanistan");
            if (id === 3) onCountryId("Argentina");
        } else {
            onCountryId(null); // Agar unchecked ho, toh null bheje
        }
    };

    return (
        <div className="filter-dropdown">
            {/* Supplier Country */}
            <div className="filter-section">
                <div className="filter-titles-and-arrow">
                    <h4>
                    Supplier Country
                    </h4>
                    {isCountryOpen ? <img src={down} onClick={() => toggleDropdown("country")} style={{
                        width: "10px", cursor: "pointer"
                    }} /> : <img src={down} onClick={() => toggleDropdown("country")} style={{
                        width: "10px", cursor: "pointer"
                    }} />}
                </div>
                {isCountryOpen && (
                    <div className="dropdown-content">
                        <div className="filter-search-wrapper">
                            <img src={search} />
                            <input
                                type="search"
                                placeholder="Search"
                                value={searchText}
                                onChange={handleSearchChange}
                                className="search-box"
                            />
                        </div>
                        {countries
                            .filter((country) =>
                                country.name.toLowerCase().includes(searchText.toLowerCase())
                            )
                            .map((country, index) => (
                                <label key={index} className="checkbox-item">
                                    <input type="checkbox" onClick={(e) => handleCountryChange(country.id, e.target.checked)}/>
                                    <span><img src={country.flag} /> {country.name}</span>
                                </label>
                            ))}
                    </div>
                )}
            </div>

            {/* Price Range */}
            <div className="filter-section">
                <div className="filter-titles-and-arrow">

                    <h4>
                        Price
                    </h4>
                    {isPriceOpen ? <img src={down} onClick={() => toggleDropdown("price")} style={{
                        width: "10px", cursor: "pointer"
                    }} /> : <img src={down} onClick={() => toggleDropdown("price")} style={{
                        width: "10px", cursor: "pointer"
                    }} />}
                </div>

                {isPriceOpen && (
                    <>
                        <div className="filter-price-text">
                            <p>$5</p>
                            <p>$500</p>
                        </div>
                        <div className="dropdown-content">
                            <RangeSlider />
                        </div>
                    </>
                )}
            </div>

            {/* Brands */}
            <div className="filter-section">
                <div className="filter-titles-and-arrow">

                    <h4>
                        Brand
                    </h4>
                    {isBrandOpen ? <img src={down} onClick={() => toggleDropdown("brand")} style={{
                        width: "10px", cursor: "pointer"
                    }} /> : <img src={down} onClick={() => toggleDropdown("brand")} style={{
                        width: "10px", cursor: "pointer"
                    }} />}
                </div>

                {isBrandOpen && (
                    <div className="dropdown-content">
                        <div className="filter-search-wrapper">
                            <img src={search} />
                            <input
                                type="search"
                                placeholder="Search"
                                value={searchText}
                                onChange={handleSearchChange}
                                className="search-box"
                            />
                        </div>
                        {brands
                            .filter((brand) =>
                                brand.toLowerCase().includes(searchText.toLowerCase())
                            )
                            .map((brand, index) => (
                                <label key={index} className="checkbox-item">
                                    <input type="checkbox" />
                                    <span>{brand}</span>
                                </label>
                            ))}
                    </div>
                )}
            </div>

            {/* Size */}
            <div className="filter-section">
                <div className="filter-titles-and-arrow">

                    <h4>
                        Size
                    </h4>
                    {isSizeOpen ? <img src={down} onClick={() => toggleDropdown("size")} style={{
                        width: "10px", cursor: "pointer"
                    }} /> : <img src={down} onClick={() => toggleDropdown("size")} style={{
                        width: "10px", cursor: "pointer"
                    }} />}
                </div>

                {isSizeOpen && (
                    <div className="dropdown-content">
                        <div className="filter-search-wrapper">
                            <img src={search} />
                            <input
                                type="search"
                                placeholder="Search"
                                value={searchText}
                                onChange={handleSearchChange}
                                className="search-box"
                            />
                        </div>
                        {brands
                            .filter((brand) =>
                                brand.toLowerCase().includes(searchText.toLowerCase())
                            )
                            .map((brand, index) => (
                                <label key={index} className="checkbox-item">
                                    <input type="checkbox" />
                                    <span>{brand}</span>
                                </label>
                            ))}
                    </div>
                )}
            </div>
            {/* Rating */}
            <div className="filter-section">
                <div className="filter-titles-and-arrow">

                    <h4>
                        Rating
                    </h4>
                    {isRatingOpen ? <img src={down} onClick={() => toggleDropdown("rating")} style={{
                        width: "10px", cursor: "pointer"
                    }} /> : <img src={down} onClick={() => toggleDropdown("rating")} style={{
                        width: "10px", cursor: "pointer"
                    }} />}
                </div>

                {isRatingOpen && (
                    <div className="dropdown-content">
                        <div className="filter-search-wrapper">
                            <img src={search} />
                            <input
                                type="search"
                                placeholder="Search"
                                value={searchText}
                                onChange={handleSearchChange}
                                className="search-box"
                            />
                        </div>
                        {brands
                            .filter((brand) =>
                                brand.toLowerCase().includes(searchText.toLowerCase())
                            )
                            .map((brand, index) => (
                                <label key={index} className="checkbox-item">
                                    <input type="checkbox" />
                                    <span>{brand}</span>
                                </label>
                            ))}
                    </div>
                )}
            </div>
            {/* Sale */}
            <div className="filter-section">
                <div className="filter-titles-and-arrow">

                    <h4>
                    Sale
                    </h4>
                    {isSaleOpen ? <img src={down} onClick={() => toggleDropdown("sale`")} style={{
                        width: "10px", cursor: "pointer"
                    }} /> : <img src={down} onClick={() => toggleDropdown("sale`")} style={{
                        width: "10px", cursor: "pointer"
                    }} />}
                </div>

                {isSaleOpen && (
                    <div className="dropdown-content">
                        <div className="filter-search-wrapper">
                            <img src={search} />
                            <input
                                type="search"
                                placeholder="Search"
                                value={searchText}
                                onChange={handleSearchChange}
                                className="search-box"
                            />
                        </div>
                        {brands
                            .filter((brand) =>
                                brand.toLowerCase().includes(searchText.toLowerCase())
                            )
                            .map((brand, index) => (
                                <label key={index} className="checkbox-item">
                                    <input type="checkbox" />
                                    <span>{brand}</span>
                                </label>
                            ))}
                    </div>
                )}
            </div>
            {/* Target Group */}
            <div className="filter-section">
                <div className="filter-titles-and-arrow">

                    <h4>
                    Target Group
                    </h4>
                    {isTargetOpen ? <img src={down} onClick={() => toggleDropdown("Target")} style={{
                        width: "10px", cursor: "pointer"
                    }} /> : <img src={down} onClick={() => toggleDropdown("Target")} style={{
                        width: "10px", cursor: "pointer"
                    }} />}
                </div>

                {isTargetOpen && (
                    <div className="dropdown-content">
                        <div className="filter-search-wrapper">
                            <img src={search} />
                            <input
                                type="search"
                                placeholder="Search"
                                value={searchText}
                                onChange={handleSearchChange}
                                className="search-box"
                            />
                        </div>
                        {brands
                            .filter((brand) =>
                                brand.toLowerCase().includes(searchText.toLowerCase())
                            )
                            .map((brand, index) => (
                                <label key={index} className="checkbox-item">
                                    <input type="checkbox" />
                                    <span>{brand}</span>
                                </label>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filter;
