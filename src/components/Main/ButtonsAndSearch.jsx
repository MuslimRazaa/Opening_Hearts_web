import React, { useEffect, useRef, useState } from 'react'
import search from '../../media/images/search.svg';

function ButtonsAndSearch() {
    const [types, setTypes] = useState(false);

    const handleTypesDropdown = () => {
        setTypes(!types);
    }

    // Reference for dropdown to check if the click is inside
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const buttonLabels = [
        'Programming', 'Designing', 'Animation', 'Mechanic', 'Programming', 'Designing', 'Animation', 'Mechanic', 
        'Programming', 'Designing', 'Animation', 'Mechanic', 'Programming', 'Designing', 'Animation', 'Mechanic',
        'Programming', 'Designing', 'Animation', 'Mechanic', 'Programming', 'Designing', 'Animation', 'Mechanic',
        'Programming', 'Designing', 'Animation', 'Mechanic', 'Programming', 'Designing', 'Animation', 'Mechanic',
        'Programming', 'Designing', 'Animation', 'Mechanic', 'Programming', 'Designing', 'Animation', 'Mechanic',
        'Programming', 'Designing', 'Animation', 'Mechanic', 'Programming', 'Designing', 'Animation', 'Mechanic',
        'Programming', 'Designing', 'Animation', 'Mechanic', 'Programming', 'Designing', 'Animation', 'Mechanic',
        'Programming', 'Designing', 'Animation', 'Mechanic', 'Programming', 'Designing', 'Animation', 'Mechanic',
    ];

    useEffect(() => {
        // Scroll to top when the page loads
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        // Close the dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setTypes(false); // Close the dropdown
            }
        };

        document.addEventListener('click', handleClickOutside);

        // Cleanup event listener when component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


  return (
    <div className='container'>
        <div className='cards-detail-page-top'>
                    <div className="class-flex">
                        <div 
                            className="service-detail-page-top-button" >
                            <button>All</button>
                        </div>
                        <div className="service-detail-page-top-button">
                            <button>Programming</button>
                        </div>
                        <div className="service-detail-page-top-button">
                            <button>Design</button>
                        </div>
                        <div className="service-detail-page-top-button">
                            <button>Mechanic</button>
                        </div>
                        <div className="service-detail-page-top-button">
                            <button>Animation</button>
                        </div>
                        <div className="service-detail-page-top-button" 
                         onClick={handleTypesDropdown}
                         ref={buttonRef}>
                            <button>More</button>
                        </div>
                    </div>
                    <div className='donation-detail-page-search-bar'>
                        <img src={search} alt="Search icon" />
                        <input type='search' placeholder='Search..' />
                    </div>

                    {/* Hover div on All button */}
                    <div
                        ref={dropdownRef} // Ref for dropdown
                        className={`service-tabs-all-types ${types ? 'open' : 'close'}`}
                    >
                        {buttonLabels.map((label, index) => (
                            <div key={index} className="service-detail-page-types-button">
                                <button>{label}</button>
                            </div>
                        ))}
                    </div>
            </div>
    </div>
  )
}

export default ButtonsAndSearch
