import React, { useState } from "react";
import CustomDatePicker from '../../../../components/Main/CalenderDpDown'
import { Link } from 'react-router-dom'
import uploadicon from '../../../../media/images/uploadicon.png';
import uploadgalleryicon from '../../../../media/images/uploadgalleryicon.png';


const MealtoNeighbarScreenTwoForm = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };
    return (
        <>
            <div className="meal-form">
                <div className="row">
                    <div className="first-sec-meal-text">
                        <h1>Every $1 donated provides 4 meals to neighbors in need.</h1>
                    </div>
                    <form className='form-sec-meal'>

                        <div className="row mt-4">
                            <div className="col-md-12">
                                <div className="upload-meal-drive">

                                    <img src={uploadicon} alt="" />
                                    <p>
                                        Upload Campaign Photo
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-12">
                                <div className="meal-input-group">
                                    <label htmlFor="">Display Name</label>
                                    <input type="text" className='meal-input-flied' />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-12">
                                <div className="meal-input-group">
                                    <label htmlFor="">Fund Required</label>
                                    <input type="text" placeholder='$5,00,000' className='meal-input-flied' />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-6">
                                <div className="meal-input-group">
                                    <label htmlFor="">Amount Description</label>
                                    <input type="text" placeholder='Enter Amount ($5)' className='meal-input-flied' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="meal-input-group">
                                    <label htmlFor=""></label>
                                    <input type="text" placeholder='Will help (save child life)' style={{ marginTop: '1.6rem', }} className='meal-input-flied' />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <CustomDatePicker />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-12">
                                <div className="meal-input-group">
                                    <label htmlFor="">Description</label>
                                    <textarea className='meal-input-flied' rows={8} cols={20} name="" id=""></textarea>

                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-12">
                                <div className="meal-input-group">
                                    <div className="send-notification-to-previousdonors">

                                        <p>Send Notification to Previous Donors</p>
                                        <label className="switch">
                                            <input type="checkbox" checked={isChecked} onChange={handleToggle} />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-12">
                                <div className="meal-input-group">
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
                                    <button className='meal-btn-form'>Confirm</button>
                                </div>
                            </div>
                        </div>


                    </form>
                </div>
            </div>

        </>
    )
}

export default MealtoNeighbarScreenTwoForm
