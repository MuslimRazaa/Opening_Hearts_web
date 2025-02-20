import React, { useEffect, useState } from 'react'
import Modal from '../../../components/Layout/Modal'
import bank from '../../../media/images/Group 1000006194.png'
import right from '../../../media/images/tic.png'
import { Link, useNavigate } from 'react-router-dom'
import CustomerWalletTable from './CustomerWalletTable'
import CustomerBankCardSelect from './CustomerBankCardSelect'
import { getBank, walletValues, withdrawReq } from '../../../utils/api'
import LoadingComponents from '../../../components/shared/loaders/LoadingComponents'


const CustomerWallet = () => {

    const [isModalVisible3, setIsModalVisible3] = useState(false);
    const [isModalVisible4, setIsModalVisible4] = useState(false);
    const [walletValue, setWalletValue] = useState(false);
    const [bankDetails, setBankDetails] = useState([]);
    const [requestedAmount, setRequestedAmount] = useState();
    const [selectedBankId, setSelectedBankId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingValues, setLoadingValues] = useState(false)
    const navigate = useNavigate()

    // Handle bank selection
    const handleBankSelect = (e) => {
        if (e.target.checked) {
            setSelectedBankId(bankDetails?.id); // Assuming bankDetails has an 'id' field
        } else { 
            setSelectedBankId(null); // Unselecting the bank
        }
    };

    const fetchGetBankDetails = async () => {
        setLoadingValues(true)

        try {
            const response = await getBank()
            setBankDetails(response?.data?.data)
            console.log(response?.data?.data, " bank Details")
            setLoadingValues(false)
            if(response?.data?.data?.length <= 0)
            navigate("/customer-dashboard/user-bank-connect")
            }
        catch (error) {
            console.log(error)
            setLoadingValues(false)

        }
    }

    useEffect(() => {
        fetchGetBankDetails();
    }, [])

    const handleReqAmount = (e) => {
        const value = e.target.value;
        setRequestedAmount(value);

        // Check if entered amount is greater than available balance
        if (parseFloat(value) > (walletValue?.amount_balance || 0)) {
            setErrorMessage('Insufficient Balance');
        } else {
            setErrorMessage('');
        }
    };


    const handleSuccess = async () => {
        setLoadingValues(true)
        // Check if a bank is selected
        if (!selectedBankId) {
            setLoadingValues(false)
            alert("Please select a bank before proceeding.");
            return;

        }

        // Check if the amount is valid
        if (!requestedAmount || parseFloat(requestedAmount) <= 0) {
            setLoadingValues(false)
            alert("Please enter a valid amount.");
            return;
        }

        // Check if the requested amount exceeds available balance
        if (parseFloat(requestedAmount) > (walletValue?.amount_balance || 0)) {
            setLoadingValues(false)
            alert("Insufficient balance.");
            return;
        }

        // Proceed with withdrawal
        const data = {
            amount: requestedAmount,
            bank_id: selectedBankId,
        };

        try {
            const response = await withdrawReq(data);
            fetchWalletValues();
            setLoadingValues(false)
            setIsModalVisible4(true);
            setIsModalVisible3(false);

            console.log("Withdrawal Success:", response);
        } catch (error) {
            console.error("Withdrawal Failed:", error);
            setLoadingValues(false)

        }
    };




    const handleOrderNowClick3 = () => {
        setIsModalVisible3(true);
    };

    const handleCloseModal3 = () => {
        setIsModalVisible3(false);
    };
    const handleCloseModal4 = () => {
        setIsModalVisible4(false);
    };



    const fetchWalletValues = async () => {
        setLoadingValues(true)
        try {
            const response = await walletValues();
            setWalletValue(response?.data?.data)
            setLoadingValues(false)
            console.log(walletValue, "Wallet Values count log")
        }
        catch (error) {
            setLoadingValues(false)
            console.log(error)
        }
    }


    useEffect(() => {
        fetchWalletValues();
    }, [])

    console.log(bankDetails?.length == 0, "bank detailsssss----------------")
    console.log(bankDetails , "bank 2222 detailsssss----------------")

        return (
            <>
                {loadingValues ?

                    <div className='main-dash-and-total-data-tabs'>
                        <div className="mian-dashpurchase-histry">
                            <h1>
                                Wallet
                            </h1>
                        </div>
                        <LoadingComponents />
                    </div>
                    :

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
                                                Total Spending
                                            </h2>
                                            <h1>${walletValue?.total_earning}</h1>

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <Link to="" > <div className="wallet-card2" style={{ paddingBottom: '35px', }}>
                                            <select className='this-week' id="">
                                                <option value="">This Week</option>
                                                <option value="">1 Week</option>
                                                <option value="">2 Week</option>
                                                <option value="">3 Week</option>
                                            </select>
                                            <h2>
                                                Credit Amount
                                            </h2>
                                            <h1>${walletValue?.amount_balance}</h1>
                                        </div></Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-7">
                                        {/* tables */}
                                        <CustomerWalletTable />
                                    </div>
                                    <div className="col-md-5">
                                        {/* card */}
                                        <CustomerBankCardSelect handleOrderNowClick3={handleOrderNowClick3} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* payment successfull */}
                        <Modal isVisible={isModalVisible3} onClose={handleCloseModal3}>
                            <div className='wallet-modal-content-here'>
                                <div className="wallet-modal-heading">
                                    <h3>Add Fund</h3>
                                </div>
                                <div className="wallet-modal-form-wrapper">
                                    <form>
                                        <div className="wallet-input-ammount">
                                            <p>Enter Amount</p>
                                            <input type='text' placeholder='$USD' value={requestedAmount} onChange={(e) => handleReqAmount(e)} />
                                            {errorMessage && <p style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</p>}
                                        </div>


                                        <div className="wallet-sellect-bank">
                                            <p>Select Account</p>
                                            <div className="wallet-bank-sellect">
                                                <div className="bank-name-image-wallet">
                                                    <img src={bank} />
                                                    <h3>{bankDetails?.bank_name}</h3>
                                                </div>
                                                <input
                                                    type='checkbox'
                                                    checked={selectedBankId === bankDetails?.id}
                                                    onChange={handleBankSelect}
                                                />
                                            </div>
                                        </div>

                                        <div className="wallet-withdraw-button">
                                            <button type='button' onClick={handleSuccess}>Withdrawl</button>
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
                                    <h2>Fund added Successfully</h2>
                                </div>
                                <div className="modal-content-buttons">

                                </div>
                            </div>
                        </Modal>
                    </>
                }
            </>
        )
}

export default CustomerWallet
