import React, { useState } from 'react';
import bankimg from '../../../../media/images/bankimg.png';
import amercalogo from '../../../../media/images/bankamericalogo.png'
import citybank from '../../../../media/images/citybank.png'
import { Link } from 'react-router-dom';

const DonationBankCardSelect = ({handleOrderNowClick3}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [isSelected2, setIsSelected2] = useState(false);

    // Toggle selection state
    const handleToggle = () => {
        setIsSelected(!isSelected);
    };
    const handleToggle2 = () => {
        setIsSelected2(!isSelected2);
    };

    return (
        <>
            <div className='main-Bank-card'>
                {/* Bank image and buttons */}
                <div className="bank-img-btn">
                    <img src={bankimg} alt="Bank" className="bank-main-img" />
                    <div className="bank-btn-group-card">
                        <button type='button' className='outline-btn-bank'>Send</button>
                        <button type='button' className='full-btn-bank' onClick={handleOrderNowClick3}>Withdraw</button>
                    </div>
                </div>

                {/* Bank card with selection feature */}
                <div className="bank-check-box-card">
                    <div className={`bank-card ${isSelected ? "selected" : ""}`}>
                        <img src={amercalogo} alt="Bank Logo" className="bank-logo" />
                        <span className="bank-name">Bank of America</span>

                        {/* Edit Icon */}
                        <label className="edit-checkbox">
                            <input type="checkbox" checked={isSelected} onChange={handleToggle} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                <div className="bank-check-box-card">
                    <div className={`bank-card ${isSelected2 ? "selected" : ""}`}>
                        <img src={citybank} alt="Bank Logo" className="bank-logo" />
                        <span className="bank-name">Citi Bank</span>

                        {/* Edit Icon */}
                        <label className="edit-checkbox">
                            <input type="checkbox" checked={isSelected2} onChange={handleToggle2} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                <div className="bank-main-card-btn">
                   <Link to="/donation-dashboard/donation-bank-connect" ><button type='button' className='btn-last-bank-card'>Add new Bank</button> </Link> 
                </div>
            </div>
        </>
    );
};

export default DonationBankCardSelect;
