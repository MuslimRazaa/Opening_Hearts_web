import React, { useState } from 'react'
import uploadicon from '../../../../media/images/uploadicon.png';
import uploadgalleryicon from '../../../../media/images/uploadgalleryicon.png';
import right from '../../../../media/images/tic.png'

import CustomDatePicker from '../../../../components/Main/CalenderDpDown';
import { Link } from 'react-router-dom';
import Modal from '../../../../components/Layout/Modal';
const DonationDashAddEventSectionFirst = () => {

        const [isModalVisible, setIsModalVisible] = useState(false);
    
        const handleOrderNowClick = () => {
          setIsModalVisible(true);
        };
      
        const handleCloseModal = () => {
          setIsModalVisible(false);
        };
    return (
        <>
            <div className="donation-dash-add-event">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Upload an event</h2>
                    </div>
                </div>

                <form className="donation-add-event-form">
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <div className="upload-add-event">

                                <img src={uploadicon} alt="" />
                                <p>
                                    Upload Event Cover Photo
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <div className="event-input-group">
                                <label htmlFor="">Display Name</label>
                                <input type="text" className='event-input-flied' />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <div className="event-input-group">
                                <label htmlFor="">Start Date</label>
                                <CustomDatePicker />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="event-input-group">
                                <label htmlFor="">End Date</label>
                                <CustomDatePicker />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="event-input-group">
                                <label htmlFor="">Time</label>
                                <input type="time" name="" className='time-set' id="" />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="event-input-group">
                                <label htmlFor="">Program Overview</label>
                                <textarea name="" id="" rows={8} cols={20} className='meal-input-flied'></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="event-input-group">
                                <label htmlFor="">Objectives</label>
                                <input type="text" placeholder='To engage the community in environmental conservation efforts.' className='event-input-flied' />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <div className="event-input-group">
                                <label htmlFor="">Add Gallery Photos</label>
                                <div className="add-gallery-meal">
                                    <img src={uploadgalleryicon} alt="" srcset="" />
                                    <p>Add Images</p>
                                    <Link to="">Browze</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="meal-input-group">
                                <button onClick={handleOrderNowClick} type='button' className='meal-btn-form'>Confirm</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                <div className='modal-content-here'>
                    <div className="modal-success-image">
                        <img src={right} />
                    </div>
                    <div className="modal-content-title">
                        <h2>Your Event has been Uploaded!</h2>
                        {/* <p>Your are now Successfully Registered as Seller!</p> */}
                        </div>
                    <div className="modal-content-buttons">
                        <div class="modal-content-button">
                            <Link to="" style={{ textDecoration: "none" }}> <button>Upload Again</button></Link>
                        </div>
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default DonationDashAddEventSectionFirst
