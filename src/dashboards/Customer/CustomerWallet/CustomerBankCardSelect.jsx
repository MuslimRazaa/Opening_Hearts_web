import React, { useEffect, useState } from 'react';
import bankimg from '../../../media/images/bankimg.png';
import amercalogo from '../../../media/images/bankamericalogo.png'
import citybank from '../../../media/images/citybank.png'
import { Link } from 'react-router-dom';
import { getBank } from '../../../utils/api';

const CustomerBankCardSelect = ({ handleOrderNowClick3 }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [isSelected2, setIsSelected2] = useState(false);
    const [bankDetails , setBankDetails ] = useState();

    // Toggle selection state
    const handleToggle = () => {
        setIsSelected(!isSelected);
    };
    const handleToggle2 = () => {
        setIsSelected2(!isSelected2);
    };


    const fetchGetBankDetails = async () => {
        try {
            const response = await getBank()
            setBankDetails(response?.data?.data)
            console.log(response?.data?.data, " bank Details")
        }
        catch (error) {
            console.log(error)
        }
    }

        useEffect(() => {
            fetchGetBankDetails();
        }, [])


        return (
        <>
            <div className='main-Bank-card'>
                {/* Bank image and buttons */}
                <div className="bank-img-btn">
                    <img src={bankimg} alt="Bank" className="bank-main-img" />
                    <div className="bank-btn-group-card">
                        {/* <button type='button' className='outline-btn-bank'>Send</button> */}
                        <button type='button' className='full-btn-bank' onClick={handleOrderNowClick3}>Withdrawl</button>
                    </div>
                </div>
               
                <div className="bank-check-box-card">
                    <div className={`bank-card ${isSelected ? "selected" : ""}`}>
                        <img src={amercalogo} alt="Bank Logo" className="bank-logo" />
                        <span className="bank-name">{bankDetails?.bank_name}</span>

                        {/* Edit Icon */}
                        <label className="edit-checkbox">
                            <input type="checkbox" checked={isSelected} onChange={handleToggle} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                <div className="bank-main-card-btn">
                    <Link to="/customer-dashboard/user-bank-connect" ><button type='button' className='btn-last-bank-card'>Add new Bank</button></Link>
                </div>
            </div>
        </>
    );
};

export default CustomerBankCardSelect;

