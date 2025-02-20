import React, { useState } from 'react';
import right from '../../../media/images/tic.png';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../../components/Layout/Modal';
import { addBank } from '../../../utils/api';
import Swal from 'sweetalert2';

const CustomerBankConnect = () => {
    const [isModalVisible4, setIsModalVisible4] = useState(false);
    const [bankDetails, setBankDetails] = useState({
        bank_name: '',
        account_number: '',
        holder_name: '',
        ibm_number: '',
        routing_number: '',
        type: 'user' // Default type
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBankDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // API Call to store bank details
    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await addBank(bankDetails)

            if (!response.ok) {
                throw new Error('Failed to add bank. Please try again.');
            }

            const data = await response.json();
            console.log('Success:', data);
            await Swal.fire({
                icon: 'success',
                text: 'Bank Created Successfully.',
                timer: 2500,
                confirmButtonText: 'OK',
            });
            setBankDetails("")
            navigate("/customer-dashboard/customer-wallet")
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            await Swal.fire({
                icon: 'error',
                text: error?.response?.data?.message,
                timer: 2500,
                confirmButtonText: 'Back',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="contact-to-bank-main-class">
                <h1>Connect your bank</h1>
                <h2>Credit or Debit card</h2>
                <p>Your payments are secure, and your details are confidential.</p>

                <div className="bank-conect-form">
                    <div className="bank-input-group">
                        <input type="text" name="bank_name" placeholder="Bank Name" className="connect-bank-input" value={bankDetails.bank_name} onChange={handleChange} />
                    </div>
                    <div className="bank-input-group">
                        <input type="text" name="holder_name" placeholder="Account Holder Name" className="connect-bank-input" value={bankDetails.holder_name} onChange={handleChange} />
                    </div>
                    <div className="bank-input-group">
                        <input type="text" name="account_number" placeholder="Bank Account Number" className="connect-bank-input" value={bankDetails.account_number} onChange={handleChange} />
                    </div>
                    <div className="bank-input-group">
                        <input type="text" name="ibm_number" placeholder="IBAN Number" className="connect-bank-input" value={bankDetails.ibm_number} onChange={handleChange} />
                    </div>
                    <div className="bank-input-group">
                        <input type="text" name="routing_number" placeholder="Routing Number" className="connect-bank-input" value={bankDetails.routing_number} onChange={handleChange} />
                    </div>

                    {error && <p className="error-text">{error}</p>}

                    <div className="bank-btn-group">
                        <button type="button" className="btn-add-bank" onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Adding...' : 'Add Bank'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <Modal isVisible={isModalVisible4} onClose={() => setIsModalVisible4(false)}>
                <div className="modal-content-here">
                    <div className="modal-success-image">
                        <img src={right} alt="Success" />
                    </div>
                    <div className="modal-content-here-success">
                        <h2>Bank Successfully Added</h2>
                    </div>
                    <div className="modal-content-buttons">
                        <Link to="/customer-dashboard/customer-wallet">
                            <button className="modal-continue-btn">Continue</button>
                        </Link>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CustomerBankConnect;
