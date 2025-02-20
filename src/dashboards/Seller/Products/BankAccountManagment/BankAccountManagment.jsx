import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import apis from '../../../../service';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';

const BankAccountManagment = () => {
    const type = "seller"
    const [banks, setBanks] = useState([
        { label: "ABC Bank", value: 1 },
        { label: "XYZ Bank", value: 2 },
    ]);
    const [formData, setFormData] = useState(
        {
            bank_name: "",
            account_number: "",
            holder_name: "",
            ibm_number: "",
            routing_number: "",
            type: "seller"
            //organization / provider /seller
        }
    )
    const [loading, setLoading] = useState(true);
    const [inputError, setInputError] = useState(false);
    const [fullScreenLoader, setFullScreenLoader] = useState(false);
    const getAccounts = async (type) => {
        try {
            const response = await apis.getAccounts(type);
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
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.messsage);
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
                setFullScreenLoader(false)
            } catch (error) {
                setFullScreenLoader(false)
                Swal.fire({
                    icon: 'error',
                    text: error.response?.data?.message
                });
            }

        }


    };
    return (
        <>
            {fullScreenLoader &&
                <div className="full-screen-loader">
                    <LoadingComponents />
                </div>
            }
            {loading ?
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
        </>
    )
}

export default BankAccountManagment
