import React, { useState } from 'react';
import Modal from '../../../components/Layout/Modal';
import right from '../../../media/images/tic.png'
import { Link } from 'react-router-dom';

function BecomeVolunteerForm() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleConfirmClick = () => {
        setIsModalVisible(true);
    }
        return (
            <>
                <div className="become-volunter-form-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="become-volunter-form-head">
                                    <h1>Personal Information</h1>
                                </div>
                                <form action="#" className="form-sec-vol">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="sec-personal-info">
                                                <input type="text" placeholder="First Name" className="inpt-vol" />
                                            </div>
                                            <div className="sec-personal-info">
                                                <input type="text" placeholder="Professional Qualifications" className="inpt-vol" />
                                            </div>
                                            <div className="sec-personal-info">
                                                <select className="inpt-vol">
                                                    <option value="">United States</option>
                                                    <option value="">Canada</option>
                                                    <option value="">Australia</option>
                                                    <option value="">Germany</option>
                                                    <option value="">France</option>
                                                    <option value="">United Kingdom</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="sec-personal-info">
                                                <input type="text" placeholder="Last Name" className="inpt-vol" />
                                            </div>
                                            <div className="sec-personal-info">
                                                <select className="inpt-vol">
                                                    <option value="">Male</option>
                                                    <option value="">Female</option>
                                                </select>
                                            </div>
                                            <div className="sec-personal-info">
                                                <select className="inpt-vol">
                                                    <option value="">New York</option>
                                                    <option value="">London</option>
                                                    <option value="">Tokyo</option>
                                                    <option value="">Sydney</option>
                                                    <option value="">Paris</option>
                                                    <option value="">Dubai</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-md-12">
                                            <div className="become-volunter-form-head">
                                                <h1>Contact Information</h1>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="sec-personal-info">
                                                        <input type="text" placeholder="Phone" className="inpt-vol" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="sec-personal-info">
                                                        <input type="text" placeholder="Email" className="inpt-vol" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-md-12">
                                            <div className="become-volunter-form-head">
                                                <h1>Past Experience</h1>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="sec-personal-info">
                                                        <input type="text" placeholder="Designation" className="inpt-vol" />
                                                    </div>
                                                    <div className="sec-personal-info">
                                                        <input type="text" placeholder="Organization" className="inpt-vol" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="sec-personal-info">
                                                        <input type="text" placeholder="Area of Specialization" className="inpt-vol" />
                                                    </div>
                                                    <div className="sec-personal-info">
                                                        <input type="text" placeholder="Area of Expertise" className="inpt-vol" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-md-12">

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="sec-personal-info">
                                                        <div class="document-upload">
                                                            <label for="file-upload" class="document-label">Documents:</label>
                                                            <input type="file" id="file-upload" class="file-input" />
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-md-12">
                                            <div className="become-volunter-form-head">
                                                <h1>Duration</h1>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="sec-duration-info">
                                                        <button type='button' className='btn duration-btn'>Week</button>
                                                        <button type='button' className='btn duration-btn'>Month</button>
                                                        <button type='button' className='btn duration-btn'>Year</button>
                                                    </div>

                                                </div>

                                            </div>
                                            <div className="row mt-5">
                                                <div className="col-md-12">
                                                    <div className="sec-send-info">
                                                        <button type='button' className='btn send-valen-btn' onClick={handleConfirmClick}>Send</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                            <div className='modal-content-here'>
                                <div className="modal-success-image">
                                    <img src={right} />
                                </div>
                                <div className="modal-content-title">
                                    <h2>Thankyou for your time</h2>
                                    <h3>We will contact you soon!</h3>
                                </div>
                                <div className="modal-content-buttons">
                                    <div class="modal-content-button">
                                        <Link to="/become-a-volunteer" style={{ textDecoration: "none" }}> <button onClick={handleCloseModal}>Back</button></Link>
                                    </div>
                                </div>

                            </div>
                        </Modal>
                    </div>
                </div>
            </>
        );
    }

    export default BecomeVolunteerForm;
