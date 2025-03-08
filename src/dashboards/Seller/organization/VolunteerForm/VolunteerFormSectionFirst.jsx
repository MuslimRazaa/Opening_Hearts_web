import React, { useState } from "react";
import { Link } from "react-router-dom";

const VolunteerFormSectionFirst = () => {
    const [isChecked, setIsChecked] = useState(false);
    const handleToggle = () => {
        setIsChecked(!isChecked);
    };
    return (
        <>
            <div className='volunter-form-main-class'>
                <div className="row">
                    <div className="col-md-12">
                        <h1>Create Volunteer Form</h1>
                    </div>
                </div>

                <div className="donation-volunter-form">
                    <form action="">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="input-group-volentor">
                                    <label htmlFor="">Form Name</label>
                                    <input type="text" placeholder='Form Name' className='input-volentor-feild' />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <div className="head-label-volentor">
                                    <h2>Personal Information</h2>
                                </div>
                            </div>

                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="input-group-volentor">
                                    <input type="text" placeholder='First Name' className='input-volentor-feild' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="input-group-volentor">
                                    <input type="text" placeholder='Last Name' className='input-volentor-feild' />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="input-group-volentor">
                                    <input type="text" placeholder='Professional Qualifications' className='input-volentor-feild' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="select-group-volentor">
                                    <select name="" className='volentor-select' id="">

                                        <option>Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="select-group-volentor">
                                    <select name="" className='volentor-select' id="">
                                        <option>Country</option>
                                        <option>USA</option>
                                        <option>UK</option>
                                        <option>Poland</option>
                                        <option></option>
                                    </select>


                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="select-group-volentor">
                                    <select name="" className='volentor-select' id="">
                                        <option>City</option>
                                        <option>London</option>
                                        <option>New York</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-12">
                                <div className="head-label-volentor">
                                    <h2>Contact Information</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="input-group-volentor">
                                    <input type="text" placeholder='Phone' className='input-volentor-feild' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="input-group-volentor">
                                    <input type="text" placeholder='Email' className='input-volentor-feild' />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <div className="head-label-volentor">
                                    <h2>Past Experience</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="input-group-volentor">
                                    <input type="text" placeholder='Designation' className='input-volentor-feild' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="input-group-volentor">
                                    <input type="text" placeholder='Designation' className='input-volentor-feild' />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="input-group-volentor">
                                    <input type="text" placeholder='Area of specialization' className='input-volentor-feild' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="input-group-volentor">
                                    <input type="text" placeholder='Area of expertise' className='input-volentor-feild' />
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
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <div className="select-group-volentor">
                                    <select name="" className='volentor-select' id="">
                                        <option>Durations</option>
                                        <option>Weekly</option>
                                        <option>Monthly</option>
                                        <option>Yearly</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-12">
                               <Link to="/donation-dashboard/donation-volunteer-form-submit" ><button type="button" className="btn-send-vol">Send</button></Link>
                            </div>
                        </div>





                    </form>
                </div >
            </div >
        </>
    )
}

export default VolunteerFormSectionFirst
