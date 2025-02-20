import React, { useState } from 'react'

import right from '../../../../media/images/tic.png'

import Modal from '../../../../components/Layout/Modal';
import { Link } from 'react-router-dom';

const FormNonPro = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const handleOrderNowClick = () => {
        setIsModalVisible(true);
    };
    const handleOrderNowClick2 = () => {
        setIsModalVisible2(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setIsModalVisible2(false);
    };
    return (
        <>
            <div className='form-non-section'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-head-nonpro">
                                <h1>Please fill this form</h1>
                            </div>

                                <div className="input-sec-form">
                                    <label htmlFor="YourName">Your Name</label>
                                    <input type="text" placeholder='Adam Roberson' className='input-form-non-profit' />

                                </div>
                                <div className="input-sec-form">
                                    <label htmlFor="YourName">Organization Name</label>
                                    <input type="text" placeholder='Funding Circle' className='input-form-non-profit' />

                                </div>
                                <div className="input-sec-form">
                                    <label htmlFor="YourName">Organization Email Address</label>
                                    <input type="text" placeholder='Funding.circle@yahoo.com' className='input-form-non-profit' />

                                </div>
                                <div className="input-sec-form-full">

                                    <input type="text" placeholder='Please share the link to your primary web presence https://' className='input-form-non-profit' />

                                </div>
                                <div className="input-sec-form-select">
                                    <div class="question">
                                        How would you describe your organization's visibility and credibility at this time?
                                    </div>
                                    <div class="dropdown">
                                        <select>
                                            <option>1 to 10</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="input-sec-form">
                                    <label htmlFor="YourName">Organization Phone </label>
                                    <input type="text" placeholder='+1 84992 1215481' className='input-form-non-profit' />

                                </div>

                                <div className="input-sec-form">
                                    <label htmlFor="YourName">Organization  Address</label>
                                    <input type="text" placeholder='---------------------------' className='input-form-non-profit' />

                                </div>
                                <div className="input-sec-form-full">

                                    <input type="text" placeholder='Where is your organization registered?' className='input-form-non-profit' />

                                </div>

                                <div class="non-form-row">
                                    <div class="non-input-wrapper">
                                        <select>
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>United Kingdom</option>
                                        </select>
                                    </div>
                                    <div class="non-input-wrapper">
                                        <select>
                                            <option>New York</option>
                                            <option>Los Angeles</option>
                                            <option>Chicago</option>
                                        </select>
                                    </div>
                                    <div class="non-input-wrapper">
                                        <select>
                                            <option>********</option>
                                            <option>Password1</option>
                                            <option>Password2</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="input-sec-form-full">

                                    <input type="text" placeholder='Project Location' className='input-form-non-profit' />

                                </div>

                                <div class="non-form-row">
                                    <div class="non-input-wrapper">
                                        <select>
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>United Kingdom</option>
                                        </select>
                                    </div>
                                    <div class="non-input-wrapper">
                                        <select>
                                            <option>New York</option>
                                            <option>Los Angeles</option>
                                            <option>Chicago</option>
                                        </select>
                                    </div>
                                    <div class="non-input-wrapper">
                                        <select>
                                            <option>********</option>
                                            <option>Password1</option>
                                            <option>Password2</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="input-sec-form-select-lab">
                                    <label htmlFor="YourName">Primary Organizational Focus </label>

                                    <div class="non-input-wrapper">
                                        <select>
                                            <option>Disaster</option>
                                            <option>Disaster</option>
                                            <option>Disaster</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="bugut-sec-form">

                                    <select name="" id="" className='select-bugut'>
                                        <option value="">Annual Operating Budget (USD)</option>
                                        <option value="budget-1">$0 - $50,000</option>
                                        <option value="budget-2">$50,001 - $100,000</option>
                                        <option value="budget-3">$100,001 - $500,000</option>
                                        <option value="budget-4">$500,001 - $1,000,000</option>
                                        <option value="budget-5">Over $1,000,000</option>
                                    </select>

                                </div>


                                <div className="bugut-sec-form">

                                    <select name="" id="" className='select-bugut'>
                                        <option value="">What stage best describes your organization right now?</option>
                                        <option value="budget-1">$0 - $50,000</option>
                                        <option value="budget-2">$50,001 - $100,000</option>
                                        <option value="budget-3">$100,001 - $500,000</option>
                                        <option value="budget-4">$500,001 - $1,000,000</option>
                                        <option value="budget-5">Over $1,000,000</option>
                                    </select>

                                </div>
                                <div className="bugut-sec-form">

                                    <select name="" id="" className='select-bugut'>
                                        <option value="">Does your organization support other organizations in ways beyond funding, such as training, advocacy, or networking?</option>
                                        <option value="budget-1">$0 - $50,000</option>
                                        <option value="budget-2">$50,001 - $100,000</option>
                                        <option value="budget-3">$100,001 - $500,000</option>
                                        <option value="budget-4">$500,001 - $1,000,000</option>
                                        <option value="budget-5">Over $1,000,000</option>
                                    </select>

                                </div>
                                <div className="non-bothbtn">
                                    <button type='button' className='non-yes-nobtn'>Yes</button>
                                    <button type='button' className='non-yes-nobtn'>No</button>
                                </div>
                                <div className="bugut-sec-form">

                                    <select name="" id="" className='select-bugut'>
                                        <option value="">What is the size of your network?</option>
                                        <option value="budget-1">$0 - $50,000</option>
                                        <option value="budget-2">$50,001 - $100,000</option>
                                        <option value="budget-3">$100,001 - $500,000</option>
                                        <option value="budget-4">$500,001 - $1,000,000</option>
                                        <option value="budget-5">Over $1,000,000</option>
                                    </select>

                                </div>
                                <div className="non-bothbtn">
                                    <button type='button' className='non-yes-nobtn'>Fewer than 10</button>
                                    <button type='button' className='non-yes-nobtn'>10-100</button>
                                    <button type='button' className='non-yes-nobtn'>100-500</button>
                                    <button type='button' className='non-yes-nobtn'>500+</button>
                                </div>
                                <div className="bugut-sec-form">

                                    <select name="" id="" className='select-bugut'>
                                        <option value="">How many years of fundraising experience do you have?</option>
                                        <option value="budget-1">$0 - $50,000</option>
                                        <option value="budget-2">$50,001 - $100,000</option>
                                        <option value="budget-3">$100,001 - $500,000</option>
                                        <option value="budget-4">$500,001 - $1,000,000</option>
                                        <option value="budget-5">Over $1,000,000</option>
                                    </select>

                                </div>
                                <div className="bugut-sec-form">

                                    <select name="" id="" className='select-bugut'>
                                        <option value="">How many online donors do you already have?</option>
                                        <option value="budget-1">$0 - $50,000</option>
                                        <option value="budget-2">$50,001 - $100,000</option>
                                        <option value="budget-3">$100,001 - $500,000</option>
                                        <option value="budget-4">$500,001 - $1,000,000</option>
                                        <option value="budget-5">Over $1,000,000</option>
                                    </select>

                                </div>
                                <div className="bugut-sec-form">

                                    <select name="" id="" className='select-bugut'>
                                        <option value="">how much do you hope to raise on GlobalGiving in your first year?</option>
                                        <option value="budget-1">$0 - $50,000</option>
                                        <option value="budget-2">$50,001 - $100,000</option>
                                        <option value="budget-3">$100,001 - $500,000</option>
                                        <option value="budget-4">$500,001 - $1,000,000</option>
                                        <option value="budget-5">Over $1,000,000</option>
                                    </select>

                                </div>
                                <div className="non-bothbtn">
                                    <button type='button' className='non-yes-nobtn'>Less than 1$</button>
                                    <button type='button' className='non-yes-nobtn'>1K$-5K$</button>
                                    <button type='button' className='non-yes-nobtn'>5K$-50K$</button>
                                    <button type='button' className='non-yes-nobtn'>100K$+</button>
                                </div>
                                <div className="input-sec-form">
                                    <label htmlFor="YourName">Zip Code</label>
                                    <input type="text" placeholder='---------------------------' className='input-form-non-profit' />

                                </div>
                                <div className="input-sec-form">
                                    <label htmlFor="YourName">Password</label>
                                    <input type="text" placeholder='************************' className='input-form-non-profit' />

                                </div>

                                <div className="change-pass-text">
                                    <p>Change Password</p>
                                </div>

                                <div className="save-and-changesbtn">
                                    <button type='submit' className='btn-submit-non-profit' onClick={handleOrderNowClick} >Save & Continue</button>
                                </div>

                        </div>
                    </div>
                </div>
                <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                    <div className='modal-content-here'>
                        <div className="modal-success-image">
                            <img src={right} />
                        </div>
                        <div className="modal-content-title">
                            <h2>Thankyou for your time</h2>
                            <p>We will contact you soon!</p>

                        </div>
                        <div className="modal-content-buttons">
                            <div class="modal-content-button">
                                <button onClick={handleOrderNowClick2}>Back</button>
                            </div>
                        </div>

                    </div>
                </Modal>
                <Modal isVisible={isModalVisible2} onClose={handleCloseModal}>
                    <div className='modal-content-here'>
                        <div className="modal-success-image">
                            <img src={right} />
                        </div>
                        <div className="modal-content-title">
                            <h2>Congratulations</h2>
                            <p>Admin has approved your request</p>

                        </div>
                        <div className="modal-content-buttons">
                            <div class="modal-content-button">
                              <Link to="/buy-monthly-subcribtion" >  <button>Buy Subscription</button></Link>
                            </div>
                        </div>

                    </div>
                </Modal>
            </div>



        </>
    )
}

export default FormNonPro
