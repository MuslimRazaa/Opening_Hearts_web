import React, { useEffect, useState } from 'react'
import Modal from '../../../../components/Layout/Modal'
import bank from '../../../../media/images/Group 1000006194.png'
import right from '../../../../media/images/tic.png'
import { Link } from 'react-router-dom'
import ProductTransactionTable from './ProductTransactionTable'
import ProductBankCardSelect from './ProductBankCardSelect'
import apis from '../../../../service'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';
import Select from 'react-select';

const PageNumbers = ({
    totalPages,
    page_size,
    getWalletTransactions,
    pagination }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className='all-pages'>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}
                        className={`${(+pagination?.page) === number ? 'active' : ''}`}
                        onClick={() => {
                            getWalletTransactions(
                                number,
                                page_size,
                            )
                        }}>
                        {number}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const convertToNumber = (amount) => {
    return parseFloat(amount.replace(/,/g, ''));
}

const ProductWalletDetails = () => {
    const [isModalVisible3, setIsModalVisible3] = useState(false);
    const page_size = 10;
    const type = "seller";


    const handleOrderNowClick3 = () => { setIsModalVisible3(true); };

    const handleCloseModal3 = () => { setIsModalVisible3(false); };



    const [banks, setBanks] = useState([{ label: "ABC Bank", value: 1 }, { label: "XYZ Bank", value: 2 }]);

    const [formData, setFormData] = useState(
        {
            bank_name: "", account_number: "", holder_name: "", ibm_number: "", routing_number: "", type: "seller"//organization / provider /seller
        }
    )
    const [withdrawformData, setWithdrawFormData] = useState({ amount: "", bank_id: "" })
    const [account, setAccount] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [earning, setEarning] = useState("");
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState("");
    const [inputError, setInputError] = useState(false);
    const [fullScreenLoader, setFullScreenLoader] = useState(false);

    const getAccounts = async (type) => {
        try {
            const response = await apis.getAccounts(type);
            setAccount([response?.data?.data])
            let selectedBank = "";
            for (let i = 0; i < banks.length; i++) {
                if (banks[i].label == response?.data?.data?.bank_name) {
                    selectedBank = banks[i]
                }
            }
            setFormData({
                id: response?.data?.data?.id,
                bank_name: selectedBank,
                account_number: response?.data?.data?.account_number,
                holder_name: response?.data?.data?.holder_name,
                ibm_number: response?.data?.data?.ibm_number,
                routing_number: response?.data?.data?.routing_number,
                type: "seller"
            })
            setTimeout(() => {
                setFullScreenLoader(false)
                setLoading(false);
            }, 1500);
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    }

    useEffect(() => {
        getAccounts(type)
    }, [])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleWithdrawChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setWithdrawFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setWithdrawFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInputError(true);
        if (formData.bank_name != "" && formData.account_number != "" && formData.holder_name != "" &&
            formData.ibm_number != "" && formData.routing_number != "") {
            setFullScreenLoader(true);
            const data = new FormData();
            data.append('bank_name', formData.bank_name?.label);
            data.append('account_number', formData.account_number);
            data.append('holder_name', formData.holder_name);
            data.append('ibm_number', formData.ibm_number);
            data.append('routing_number', formData.routing_number);
            data.append('type', formData.type);
            try {
                const response = await apis.createAndUpdateAccount(data);
                getAccounts(type);
            } catch (error) {
                setFullScreenLoader(false)
                Swal.fire({
                    icon: 'error',
                    text: error.response?.data?.message
                });
            }

        }


    };

    const handleWithdrawSubmit = async (e) => {
        e.preventDefault();
        setInputError(true);
        console.log(withdrawformData.amount, convertToNumber(earning?.amount_balance));
        console.log(withdrawformData.amount <= (+earning?.amount_balance));

        if (withdrawformData.amount != "" && withdrawformData.bank_id != "" && (withdrawformData.amount <= convertToNumber(earning?.amount_balance))) {
            setFullScreenLoader(true);
            const data = new FormData();
            data.append('amount', withdrawformData.amount);
            data.append('bank_id', withdrawformData.bank_id);
            try {
                const response = await apis.createWithdrawRequest(data);
                getWalletEarning();
                getWalletTransactions();
                setIsModalVisible3(false);
                setFullScreenLoader(false);
                setInputError(false);
                setWithdrawFormData({
                    amount: "",
                    bank_id: ""
                })
                Swal.fire({
                    icon: 'success',
                    text: response?.data?.message
                });
            } catch (error) {
                setFullScreenLoader(false)
                Swal.fire({
                    icon: 'error',
                    text: error.response?.data?.message
                });
            }

        }


    };

    const getWalletEarning = async () => {
        try {
            const response = await apis.getWalletEarning();
            setEarning(response?.data?.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    }

    useEffect(() => {
        getWalletEarning();
    }, [])


    const getWalletTransactions = async (page, page_size) => {
        try {
            const response = await apis.getWalletTransactions(page, page_size);
            setTransactions(response?.data?.data?.transaction);
            setPagination(response?.data?.data?.pagination)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    }

    useEffect(() => {
        getWalletTransactions(1, page_size);
    }, [])

    return (
        <>
            {fullScreenLoader &&
                <div className="full-screen-loader">
                    <LoadingComponents />
                </div>
            }
            {account?.[0]?.id ?
                <div className="wallet-main-class">
                    <div className="wallet-card-section">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="wallet-card">
                                    <h2>Total Earning</h2>
                                    <h1>${earning?.total_earning}</h1>

                                </div>
                            </div>
                            <div className="col-md-6">
                                <Link to="/product-dashboard/amount-balance-wallet-product" > <div className="wallet-card2">
                                    <h2>Amount Balance</h2>
                                    <h1>${earning?.amount_balance}</h1>
                                    <p>${earning?.pending_amount} Amount Pending</p>
                                </div></Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <ProductTransactionTable handleOrderNowClick3={handleOrderNowClick3} transactions={transactions} />
                                <div className="product-detail-review-pagination">
                                    {pagination?.total_pages > 1 &&
                                        <div className="page-pagination filter">
                                            <div className="previous-page"
                                                style={{ pointerEvents: (+pagination?.page) === 1 ? 'none' : 'auto' }}
                                                onClick={() => {
                                                    getWalletTransactions(
                                                        (+pagination?.page) - 1,
                                                        page_size
                                                    )
                                                }}
                                            >Previous</div>
                                            {pagination?.total_pages > 12 ?
                                                <div className="all-pages">
                                                    <ul>
                                                        <li className={`${(+pagination?.page) === 1 ? 'active' : ''}`}
                                                            onClick={() => {
                                                                getWalletTransactions(
                                                                    1,
                                                                    page_size
                                                                )
                                                            }}
                                                        >1</li>
                                                        <li className={`${(+pagination?.page) === 2 ? 'active' : ''}`}
                                                            onClick={() => {
                                                                getWalletTransactions(
                                                                    2,
                                                                    page_size
                                                                )
                                                            }}
                                                        >2</li>
                                                        <li className={`${(+pagination?.page) === 3 ? 'active' : ''}`}
                                                            onClick={() => {
                                                                getWalletTransactions(
                                                                    3,
                                                                    page_size
                                                                )
                                                            }}
                                                        >3</li>
                                                        <li>
                                                            <svg width="33" height="3" viewBox="0 0 33 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0.39853 3V0.202939H2.61842V3H0.39853ZM5.38461 3V0.202939H7.6045V3H5.38461ZM10.3707 3V0.202939H12.5906V3H10.3707ZM15.3568 3V0.202939H17.5767V3H15.3568ZM20.3429 3V0.202939H22.5627V3H20.3429ZM25.3289 3V0.202939H27.5488V3H25.3289ZM30.315 3V0.202939H32.5349V3H30.315Z" fill="#A7A7A7" />
                                                            </svg>
                                                        </li>
                                                        <li className={`${(+pagination?.page) === pagination?.total_pages ? 'active' : ''}`}
                                                            onClick={() => {
                                                                getWalletTransactions(
                                                                    pagination?.total_pages,
                                                                    page_size
                                                                )
                                                            }}
                                                        >{pagination?.total_pages}</li>
                                                    </ul>
                                                </div>
                                                :
                                                <PageNumbers
                                                    totalPages={pagination?.total_pages}
                                                    page_size={page_size}
                                                    getWalletTransactions={getWalletTransactions}
                                                    pagination={pagination}
                                                />
                                            }
                                            <div className="next-page"
                                                style={{ pointerEvents: (+pagination?.page) === pagination?.total_pages ? 'none' : 'auto' }}
                                                onClick={() => {
                                                    getWalletTransactions(
                                                        (+pagination?.page) + 1,
                                                        page_size
                                                    )
                                                }}
                                            >Next</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                loading ?
                    <LoadingComponents />
                    :
                    <div className="contact-to-bank-main-class">
                        <h1>Connect your bank</h1>
                        <h2>Credit or Debit card</h2>
                        <p>Your payements are secured, Your Details are confedentials</p>
                        <div className="bank-conect-form">
                            <form onSubmit={handleSubmit}>
                                <div className="bank-input-group">
                                    <Select
                                        options={banks}
                                        defaultValue={formData?.bank_name}
                                        value={formData?.bank_name}
                                        onChange={(e) => { setFormData((prev) => ({ ...prev, bank_name: e })) }}
                                        placeholder="Select bank"
                                    // className="select-brand"
                                    />
                                    {formData.bank_name === '' && inputError && (<p className="error-input-reg">Bank name is required</p>)}
                                </div>
                                <div className="bank-input-group">
                                    <input
                                        type="text"
                                        name='account_number'
                                        placeholder='Account Number'
                                        className='connect-bank-input'
                                        defaultValue={formData?.account_number}
                                        onChange={handleChange}
                                    />
                                    {formData.account_number === '' && inputError && (<p className="error-input-reg">Account no is required</p>)}
                                </div>
                                <div className="bank-input-group">
                                    <input
                                        type="text"
                                        name='holder_name'
                                        placeholder='Account Holder name'
                                        className='connect-bank-input'
                                        defaultValue={formData?.holder_name}
                                        onChange={handleChange}
                                    />
                                    {formData.holder_name === '' && inputError && (<p className="error-input-reg">Account Holder name is required</p>)}
                                </div>
                                <div className="bank-input-group">
                                    <input
                                        type="text"
                                        name='routing_number'
                                        placeholder='SWIFT/ Routing Number'
                                        className='connect-bank-input'
                                        defaultValue={formData?.routing_number}
                                        onChange={handleChange}
                                    />
                                    {formData.routing_number === '' && inputError && (<p className="error-input-reg">Routing no is required</p>)}
                                </div>
                                <div className="bank-input-group">
                                    <input
                                        type="text"
                                        name='ibm_number'
                                        placeholder='Bank Account / IBAN'
                                        className='connect-bank-input'
                                        defaultValue={formData?.ibm_number}
                                        onChange={handleChange}
                                    />
                                    {formData.ibm_number === '' && inputError && (<p className="error-input-reg">IBAN is required</p>)}
                                </div>
                                <div className="bank-btn-group ">
                                    <button type="submit" className='btn-add-bank'>{formData?.id ? "Update Bank" : "Add Bank"}</button>
                                </div>
                            </form>
                        </div>
                    </div>

            }

            {/* payment successfull */}
            <Modal isVisible={isModalVisible3} onClose={handleCloseModal3}>
                <div className='wallet-modal-content-here'>
                    <div className="wallet-modal-heading">
                        <h3>Withdraw</h3>
                    </div>
                    <div className="wallet-modal-form-wrapper">
                        <form onSubmit={handleWithdrawSubmit}>
                            <div className="wallet-input-ammount">
                                <p>Enter Amount</p>
                                <input
                                    type='number'
                                    name='amount'
                                    placeholder=''
                                    defaultValue={withdrawformData.amount}
                                    onChange={handleWithdrawChange}
                                />
                                {withdrawformData.amount === '' && inputError && (<p className="error-input-reg">Amount is required</p>)}
                                {withdrawformData.amount != '' && inputError && withdrawformData.amount > convertToNumber(earning?.amount_balance) && (<p className="error-input-reg">Withdraw amount can't be greater then {account?.amount_balance}</p>)}
                            </div>

                            <div className="wallet-sellect-bank">
                                <p>Select Account</p>
                                {account?.map((acc, index) => {
                                    return (
                                        <div className="wallet-bank-sellect" key={index}
                                            onClick={() => { setWithdrawFormData((prev) => ({ ...prev, bank_id: acc?.id })) }}
                                        >
                                            <div className="bank-name-image-wallet">
                                                <img src={bank} />
                                                <h3>{acc?.bank_name}</h3>
                                            </div>
                                            <input type='checkbox' checked={acc?.id === withdrawformData?.bank_id} />
                                        </div>
                                    )
                                })}
                                {withdrawformData.bank_id === '' && inputError && (<p className="error-input-reg">Bank is required</p>)}
                            </div>

                            <div className="wallet-withdraw-button">
                                <button type='submit'>Withdraw</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ProductWalletDetails
