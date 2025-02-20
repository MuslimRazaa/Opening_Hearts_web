import React, { useState } from 'react'

import Modal from '../../../../components/Layout/Modal'
import bank from '../../../../media/images/Group 1000006194.png'
import right from '../../../../media/images/tic.png'
import { Link } from 'react-router-dom'
import ProductBankCardSelect from './ProductBankCardSelect'
import ProductTransactionTable from './ProductTransactionTable'

const ProductWalletDetails = () => {

    const [isModalVisible3, setIsModalVisible3] = useState(false);
    const [isModalVisible4, setIsModalVisible4] = useState(false);


    const handleOrderNowClick3 = () => {
        setIsModalVisible3(true);
    };
    const handleSuccess = () => {
        setIsModalVisible4(true);
        setIsModalVisible3(false);

    };
    const handleCloseModal3 = () => {
        setIsModalVisible3(false);
    };
    const handleCloseModal4 = () => {
        setIsModalVisible4(false);
    };
    
    return (
        <>
            <div className="wallet-main-class">
                <div className="wallet-card-section">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="wallet-card">
                                <select className='this-week' id="">
                                    <option value="">This Week</option>
                                    <option value="">1 Week</option>
                                    <option value="">2 Week</option>
                                    <option value="">3 Week</option>
                                </select>
                                <h2>
                                    Total Earning
                                </h2>
                                <h1>$1,500.90</h1>

                            </div>
                        </div>
                        <div className="col-md-6">
                           <Link to="/product-dashboard/amount-balance-wallet-product" > <div className="wallet-card2">
                                <select className='this-week' id="">
                                    <option value="">This Week</option>
                                    <option value="">1 Week</option>
                                    <option value="">2 Week</option>
                                    <option value="">3 Week</option>
                                </select>
                                <h2>
                                    Amount Balance
                                </h2>
                                <h1>$500.90</h1>
                                <p>$300 Amount Pending</p>
                            </div></Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-7">
                            {/* tables */}
                            <ProductTransactionTable />
                        </div>
                        <div className="col-md-5">
                            {/* card */}
                            <ProductBankCardSelect handleOrderNowClick3={handleOrderNowClick3} />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* payment successfull */}
            <Modal isVisible={isModalVisible3} onClose={handleCloseModal3}>
                <div className='wallet-modal-content-here'>
                    <div className="wallet-modal-heading">
                        <h3>Withdraw</h3>
                    </div>
                    <div className="wallet-modal-form-wrapper">
                        <form>
                            <div className="wallet-input-ammount">
                            <p>Enter Amount</p>
                            <input type='text' placeholder='$USD'/>
                            </div>


                            <div className="wallet-sellect-bank">
                            <p>Select Account</p>
                            <div className="wallet-bank-sellect">
                                <div className="bank-name-image-wallet">
                                    <img src={bank} />
                                    <h3>Bank NAME</h3>
                                </div>
                                <input type='checkbox' />
                            </div>
                            <div className="wallet-bank-sellect">
                                <div className="bank-name-image-wallet">
                                    <img src={bank} />
                                    <h3>Bank NAME</h3>
                                </div>
                                <input type='checkbox' />
                            </div>
                            </div>

                            <div className="wallet-withdraw-button">
                                <button type='button' onClick={handleSuccess}>Withdraw</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>


            <Modal isVisible={isModalVisible4} onClose={handleCloseModal4}>
                <div className='modal-content-here'>
                    <div className="modal-success-image">
                        <img src={right} />
                    </div>
                    <div className="modal-content-here-success">
                        <h2>Withdrawal Request sent Successfully</h2>
                    </div>
                    <div className="modal-content-buttons">
                       
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ProductWalletDetails
