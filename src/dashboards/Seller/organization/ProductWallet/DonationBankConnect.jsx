import React, { useState } from 'react'
import Modal from '../../../../components/Layout/Modal'
import right from '../../../../media/images/tic.png'
import { Link } from 'react-router-dom';

const DonationBankConnect = () => {
    const [isModalVisible4, setIsModalVisible4] = useState(false);

    const handleCloseModal4 = () => {
        setIsModalVisible4(false);
    };
    const handleSuccess = () => {
        setIsModalVisible4(true);
    };
    return (
        <>
            <div className="contact-to-bank-main-class">
                <h1>Connect your bank</h1>
                <h2>Credit or Debit card</h2>
                <p>Your payements are secured, Your Details are confedentials</p>


                <div className="bank-conect-form">
                    <form action="">
                        <div className="bank-input-group">
                            <input type="text" placeholder='Account Holder Name' className='connect-bank-input' />
                        </div>
                        <div className="bank-select-group">
                            <select>
                                <option>Select bank</option>
                                <option>ABC Bank</option>
                                <option>XYZ Bank</option>
                            </select>
                        </div>

                        <div className="bank-input-group">
                            <input type="text" placeholder='Bank Account / IBAN' className='connect-bank-input' />
                        </div>
                        <div className="bank-input-group">
                            <input type="text" placeholder='SWIFT/ Routing Number' className='connect-bank-input' />
                        </div>
                        <div className="bank-btn-group ">
                           <button type="button" className='btn-add-bank' onClick={handleSuccess}>Add Bank</button>
                        </div>


                    </form>
                </div>
            </div>
            <Modal isVisible={isModalVisible4} onClose={handleCloseModal4}>
                <div className='modal-content-here'>
                    <div className="modal-success-image">
                        <img src={right} />
                    </div>
                    <div className="modal-content-here-success">
                        <h2>Bank Successfully Added</h2>
                    </div>
                    <div className="modal-content-buttons">
                        <Link to="/donation-dashboard/wallet-description-donation" > <button className='modal-continue-btn'>Continue</button> </Link> 
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default DonationBankConnect
