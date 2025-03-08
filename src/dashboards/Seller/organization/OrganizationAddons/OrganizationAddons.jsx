import React, { useEffect, useState } from 'react'
import visa from '../../../../media/images/Tem_Images/visa.svg';
import mastercard from '../../../../media/images/Tem_Images/mastercard.svg';
import paypal from '../../../../media/images/Tem_Images/paypal.svg';
import discover from '../../../../media/images/Tem_Images/discover.svg';
import amex from '../../../../media/images/Tem_Images/amex.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Form from "react-bootstrap/Form";
import apis from '../../../../service';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';
import HeaderTop from '../../../../components/Layout/HeaderTop';
import Footer from '../../../../components/Layout/Footer';
import Select from 'react-select';

const stripePromise = loadStripe('pk_test_51HiCo6EHLDkHxi1YwwTc185yQTBuRIZktAiqLEus7vFq1kKxsrir4UlAUVCP6rRokopLAFCYY1DKowhrjZuLhyv200gfW8PqZc');

const convertToNumber = (amount) => { return parseFloat(amount.replace(/,/g, '')); }


const PaymentForm = ({ campaigns, formData, setFormData, inputError, setInputError }) => {
    const stripe = useStripe();
    const elements = useElements();
    const loginUserData = localStorage.getItem('user_data');
    const userData = JSON.parse(loginUserData);
    const email = userData?.email;
    const [error, setError] = useState(null);
    const [cardError, setCardError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setInputError(true)
        if (formData.campaign_id === "") {
            setLoading(false);
            return false
        }

        if (formData.additional_days === "" && formData.additional_email === "" && formData.promotion === "") {
            setLoading(false);
            return false
        }

        if (formData.promotion != "" && formData.addon_subCategory_id === "") {
            setLoading(false);
            return false
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: { email },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        const paymentData = {
            campaign_id: formData.campaign_id?.value,
            addons_id: JSON.stringify([formData.additional_days, formData.additional_email, formData.promotion]),
            addon_subCategory_id: formData.addon_subCategory_id,
            payment_intent: paymentMethod.id
        }

        try {
            const response = await apis.buyOrganizationAddon(paymentData);
            // localStorage.setItem('user_data', JSON.stringify(response?.data?.data))
            navigate('/dashboard/organization')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message,
            });
        }
        setLoading(false);
    };

    const handleCardChange = (event) => {
        if (event.error) {
            setCardError(event.error.message)
        } else {
            setCardError('')
        }
    };

    return (

        <Form onSubmit={handleSubmit}>
            <div className="addon-campaign">
                <Select
                    options={campaigns}
                    value={formData?.campaign_id}
                    onChange={(e) => { setFormData((prev) => ({ ...prev, campaign_id: e })) }}
                    placeholder="Select campaign"
                    className="select-addon-campaign"
                />
                {formData?.campaign_id === '' && inputError && (<p className="error-input">Campaign is required</p>)}
            </div>
            <div className="card-element-container">
                <CardElement className="card-element" options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#000',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                    hidePostalCode: true,
                }}
                    onChange={handleCardChange}
                />
                <p className="input-error-show">{cardError}</p>
            </div>
            <div className="cart-button-btn-cpn cart-button-btn-div  cart-button-btn-div01">
                <button className='proceedCheckout3 mt-2' type="submit" disabled={!stripe || loading}>
                    {loading ? 'Loading...' : 'Confirm & Pay'}
                </button>
            </div>
        </Form>
    );
};


function OrganizationAddons() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const type = params.get('type');
    const planId = params.get('planId');
    const [addons, setAddons] = useState([]);
    const [loader, setLoader] = useState(true);
    const [campaigns, setCampaigns] = useState([]);
    const [inputError, setInputError] = useState(false);
    const [formData, setFormData] = useState({
        additional_days: "",
        additional_email: "",
        promotion: "",
        campaign_id: "",
        addon_subCategory_id: "",
        amount: 0,
        sub_amount: 0,
    });

    const getOrganizationAddons = async () => {
        try {
            const response = await apis.getOrganizationAddons();
            setAddons(response?.data?.data);
            getOrganizationAddonsCampaigns();
        } catch (error) {
            setLoader(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message,
            });
        }
    }

    useEffect(() => {
        getOrganizationAddons()
    }, [])

    const getOrganizationAddonsCampaigns = async () => {
        try {
            const response = await apis.getOrganizationAddonsCampaigns();
            let tampCampaign = []
            for (let i = 0; i < response?.data?.data.length; i++) {
                tampCampaign.push({ label: response?.data?.data[i].name, value: response?.data?.data[i].id })
            }
            setCampaigns(tampCampaign)
            setLoader(false)
        } catch (error) {
            setLoader(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message,
            });
        }
    }

    return (
        <>
            <HeaderTop />
            {loader ?
                <LoadingComponents />
                :
                <>
                    <div className='main-buy-packages'>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="buy-package-head">
                                        <h1>Additional Add Ons</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="with-pay">
                                        <div className="payment-container">
                                            <h4>Pay with</h4>
                                            <p className="mb-2"><small>Credit or Debit card</small></p>
                                            <p><small style={{ fontWeight: '500', color: '#848484' }}>Your payments are secured, Your details are confidential.</small></p>

                                            <div className="stripe-payment-card">
                                                <Elements stripe={stripePromise}>
                                                    <PaymentForm
                                                        campaigns={campaigns}
                                                        formData={formData}
                                                        setFormData={setFormData}
                                                        inputError={inputError}
                                                        setInputError={setInputError}
                                                    />
                                                </Elements>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="price_strip_sec">
                                        <div>
                                            <div className="organization-addons">
                                                <ul>
                                                    {addons?.map((addon, a) => {
                                                        return (
                                                            <li key={a}>
                                                                <div className="one">

                                                                    {a === 0 ?
                                                                        <>
                                                                            <div className="left">
                                                                                <div className="title">{addon?.description}</div>
                                                                                <div className="price">${addon?.amount}</div>
                                                                            </div>
                                                                            <div className="Right">
                                                                                <input type="checkbox" checked={formData.additional_days} onChange={() => {
                                                                                    if (formData.additional_days) {
                                                                                        setFormData((prev) => ({ ...prev, additional_days: "", amount: formData.amount - convertToNumber(addon?.amount) }))
                                                                                    } else {
                                                                                        setFormData((prev) => ({ ...prev, additional_days: addon.id, amount: formData.amount + convertToNumber(addon?.amount) }))
                                                                                    }
                                                                                }} />
                                                                            </div>
                                                                        </>
                                                                        :
                                                                        null
                                                                    }
                                                                    {a === 1 ?
                                                                        <>
                                                                            <div className="left">
                                                                                <div className="title">{addon?.description}</div>
                                                                                <div className="price">${addon?.amount}</div>
                                                                            </div>
                                                                            <div className="Right">
                                                                                <input type="checkbox" checked={formData.additional_email} onChange={() => {
                                                                                    if (formData.additional_email) {
                                                                                        setFormData((prev) => ({ ...prev, additional_email: "", amount: formData.amount - convertToNumber(addon?.amount) }))
                                                                                    } else {
                                                                                        setFormData((prev) => ({ ...prev, additional_email: addon.id, amount: formData.amount + convertToNumber(addon?.amount) }))
                                                                                    }
                                                                                }} />
                                                                            </div>
                                                                        </>
                                                                        :
                                                                        null
                                                                    }
                                                                    {a === 2 ?
                                                                        <>
                                                                            <div className="left">
                                                                                <div className="title">{addon?.description}</div>
                                                                                {formData.promotion && formData.addon_subCategory_id ?
                                                                                    addon?.subCategory?.map((subCat, sc) => {
                                                                                        return (
                                                                                            subCat.id === formData.addon_subCategory_id ?
                                                                                                < div className="price">${subCat?.amount}</div>
                                                                                                :
                                                                                                null
                                                                                        )
                                                                                    })
                                                                                    :
                                                                                    null
                                                                                }
                                                                            </div>
                                                                            <div className="Right">
                                                                                <input type="checkbox" checked={formData.promotion} onChange={() => {
                                                                                    if (formData.promotion) {
                                                                                        setFormData((prev) => ({ ...prev, promotion: "", addon_subCategory_id: "", sub_amount: 0 }))
                                                                                    } else {
                                                                                        setFormData((prev) => ({ ...prev, promotion: addon.id }))
                                                                                    }
                                                                                }} />
                                                                            </div>
                                                                        </>
                                                                        :
                                                                        null
                                                                    }
                                                                </div>
                                                                {
                                                                    addon?.subCategory?.length > 0 && formData.promotion ?
                                                                        <div className="two">
                                                                            <ul>
                                                                                {addon?.subCategory?.map((subCat, sc) => {
                                                                                    return (
                                                                                        <li key={sc}>
                                                                                            <input type="radio" checked={formData.addon_subCategory_id === subCat.id} onChange={() => {
                                                                                                if (formData.addon_subCategory_id === subCat.id) {
                                                                                                    setFormData((prev) => ({ ...prev, addon_subCategory_id: "", sub_amount: convertToNumber(subCat?.amount) }))
                                                                                                } else {
                                                                                                    setFormData((prev) => ({ ...prev, addon_subCategory_id: subCat.id, sub_amount: convertToNumber(subCat?.amount) }))
                                                                                                }
                                                                                            }} />
                                                                                            {subCat?.promotion_days} days
                                                                                        </li>
                                                                                    )
                                                                                })}
                                                                            </ul>
                                                                        </div>
                                                                        :
                                                                        null
                                                                }
                                                            </li>
                                                        )
                                                    })}
                                                    {formData?.additional_days === '' && formData?.additional_email === '' && formData?.promotion === '' && inputError && (<p className="error-input">Select atleast one is required</p>)}
                                                    {formData?.promotion != '' && formData?.addon_subCategory_id === '' && inputError && (<p className="error-input">Select days is required</p>)}
                                                </ul>
                                            </div>
                                            <div className="promo-code-main" style={{ borderBottom: '1px solid #6B6767' }}>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="sub-main">
                                                <div className="text-sub-price">
                                                    <p>Sub Total</p>
                                                    <h3>${formData?.amount + formData.sub_amount}</h3>
                                                </div>
                                                <div className="img-payment">
                                                    <img src={visa} alt="Visa" />
                                                    <img src={mastercard} alt="MasterCard" />
                                                    <img src={paypal} alt="PayPal" />
                                                    <img src={discover} alt="Discover" />
                                                    <img src={amex} alt="Amex" />
                                                    <img src={paypal} alt="PayPal" />
                                                    <img src={visa} alt="Visa" />
                                                    <img src={mastercard} alt="MasterCard" />
                                                    <img src={amex} alt="Amex" />
                                                </div>

                                                {/* <div className="confirm-and-pay">
                                                <button className='btn btn-confirmpay' onClick={handleOrderNowClick}>Confirm and Pay</button>
                                            </div> */}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            <Footer />
        </>
    )
}

export default OrganizationAddons
