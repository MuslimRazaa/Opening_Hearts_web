import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import Dropdown from 'react-bootstrap/Dropdown';
import search from '../media/images/search.svg'
import aerow from '../media/images/Vector.png'
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Main/Pagination';
import Footer from '../components/Layout/Footer';

function OrganizationListing() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalItems = 40; // example total items

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const stores = Array.from({ length: totalItems }, (_, i) => `Company ${String(i + 1).padStart(2, '0')}`);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close the dropdown after navigation
  };

  // Calculate the start and end indices of the stores to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStores = stores.slice(startIndex, endIndex);

  // Divide the `currentStores` array into rows of two items each
  const storeRows = [];
  for (let i = 0; i < currentStores.length; i += 2) {
    storeRows.push(currentStores.slice(i, i + 2));
  }

  
  return (
    <>
      <Header/>
      <div className='bussiness-product'>
        <div className='container'>
            <div className='listing-top'>
                <h1>OH! Resources</h1>
                <div className='listing-search-bar'>
                    
                   <img src={search} /> <input type='search' placeholder='Search..'/>
                </div>
            </div>
            <div className='listing-bussiness-dropdown'>
            <div className="product-listing-dropdown">
                <button className="product-listing-dropdown-toggle" onClick={toggleDropdown}>
                    Organization <img src={aerow} />
                </button>
                {isOpen && (
                    <div className="product-listing-dropdown-menu">
                    <div className="product-listing-dropdown-item" onClick={() => handleNavigation('/bussiness-service')}>Service</div>
                    <div className="product-listing-dropdown-item" onClick={() => handleNavigation('/bussiness-product')}>Product</div>

                    </div>
                )}
                </div>
            </div>
            <div className="store-listing">
                {storeRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="listing-main">
                    {row.map((store, index) => (
                        <div key={index} className="store-box-detail">
                        {store}
                        </div>
                    ))}
                    </div>
                ))}
                <div className='pagination-wrapper'>
                 <Pagination
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default OrganizationListing
