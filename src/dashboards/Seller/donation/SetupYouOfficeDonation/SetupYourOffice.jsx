import React, { useState } from 'react'
import upload from '../../../../media/images/Tem_Images/upload.png'
import arr from '../../../../media/images/Vector.png'
import right from '../../../../media/images/tic.png'
import complete from '../../../../media/images/Tem_Images/lets-icons_done-ring-round.png'
import vid from '../../../../media/images/Tem_Images/basil_video-outline.png'
import img from '../../../../media/images/Tem_Images/mdi_images-outline.png'
import doc from '../../../../media/images/Tem_Images/ion_documents-outline.png'
import l1 from '../../../../media/images/Tem_Images/layout1.png'
import l2 from '../../../../media/images/Tem_Images/layout2.png'
import l3 from '../../../../media/images/Tem_Images/layout3.png'
import master from '../../../../media/images/master.png'
import logoseller from '../../../../media/images/logo-seller-db.png'
import Modal from '../../../../components/Layout/Modal'
import { Link } from 'react-router-dom'


const types = [
    { name: "Bussiness Type" },
    { name: "Type One" },
    { name: "Type Two" },
];
const cats = [
    { name: "Bussiness Catagory" },
    { name: "Catagory one" },
    { name: "Catagory two" },
];

function SetupYourOfficeDonations() {
    const [steps, setSteps] = useState("stepOne")
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [isModalVisible3, setIsModalVisible3] = useState(false);
    const [isModalVisible4, setIsModalVisible4] = useState(false);

    const [dropdownTypeOpen, setDropdownTypeOpen] = useState(false);
    const [selectedType, setSelectedType] = useState(types[0]); // Default selected type

    const [dropdownCatOpen, setDropdownCatOpen] = useState(false);
    const [selectedCat, setSelectedCat] = useState(cats[0]); // Default selected bussiness


    const changeStep = (step) => {
        setSteps(step)
        setIsModalVisible(false);
        setIsModalVisible2(false);
        setIsModalVisible3(false);
    }
    const handleSelect4 = (type) => {
        setSelectedType(type);
        setDropdownTypeOpen(false); // Close dropdown after selection
    };
    const handleSelect5 = (cat) => {
        setSelectedCat(cat);
        setDropdownCatOpen(false); // Close dropdown after selection
    };

    const handleOrderNowClick = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };


    const handleOrderNowClick2 = () => {
        setIsModalVisible2(true);
        setIsModalVisible(false);
    };

    const handleCloseModal2 = () => {
        setIsModalVisible2(false);
    };


    const handleOrderNowClick3 = () => {
        setIsModalVisible3(true);
        setIsModalVisible2(false);
    };

    const handleCloseModal3 = () => {
        setIsModalVisible3(false);
    };

    const handleOrderNowClick4 = () => {
        setIsModalVisible4(true);
        setIsModalVisible3(false);
    };

    const handleCloseModal4 = () => {
        setIsModalVisible4(false);
    };
    return (
        <div>
            <div className="step-form-nav">
                <div className="step-one" onClick={() => changeStep("stepOne")}>
                    {steps === "stepOne" ? (<p>Information</p>) : (<span>Information <img src={complete} /> </span>)}
                    <div className={`step-one-bar ${steps === "stepOne" || steps === "stepTwo" || steps === "customLayout" || steps === "upgradePremium" || steps === "stepThree" ? "active" : "close"}`}>
                    </div>
                </div>
                <div className="step-two" onClick={() => changeStep("stepTwo")}>
                    {steps === "stepOne" || steps === "stepTwo" || steps === "customLayout" || steps === "upgradePremium" ? (<p>Profile Layout</p>) : (<span>Profile Layout <img src={complete} /> </span>)}

                    <div className={`step-two-bar ${steps === "stepTwo" || steps === "customLayout" || steps === "upgradePremium" || steps === "stepThree" ? "active" : "close"}`}>
                    </div>
                </div>
                <div className="step-three" onClick={() => changeStep("stepThree")}>
                    <p>List Service</p>
                    <div className={`step-three-bar ${steps === "stepThree" ? "active" : "close"}`}>
                    </div>
                </div>
            </div>



            {steps === "stepOne" ? (<div className="step-form-content">
                <div className='step-one-main'>
                    <div className="step-one-heading">
                        <h2>Setup Your Office</h2>
                    </div>
                    <div className="step-one-cover-pic">
                        <div className="upload-cover-picture-wrapper">
                            <div className="upload-cover-pic-icon">
                                <img src={upload} />
                                <p>Upload Cover Photo</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="upload-cover-picture-wrapper">
                                <div className="upload-cover-pic-icon">
                                    <img src={upload} />
                                    <p>Upload Profile Photo</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="step-one-form-profile-picture">
                                <div className="s-one-name-phone">
                                    <input type='text' placeholder='Store Name' />
                                    <input type='phone' placeholder='Store Phone' />
                                </div>
                                <div className="s-one-email">
                                    <input type='text' placeholder='Address' />
                                </div>
                                <div className="s-one-address-code">
                                    <input type='email' placeholder='Email Address' />
                                    <input type='text' placeholder='Zip Code' />
                                </div>
                                <div className="s-one-address-code">
                                    <input type='text' placeholder='City' />
                                    <input type='text' placeholder='Country' />
                                </div>


                                <div className="s-one-type-cat">
                                    <div className="custom-dropdown-step-form">
                                        <div
                                            className="dropdown-selected-step-form"
                                            onClick={() => setDropdownTypeOpen(!dropdownTypeOpen)}
                                        >
                                            <div>
                                                <span>{selectedType.name}</span>
                                            </div>

                                            <span className="arrow-step-form"><img src={arr} /></span> {/* Dropdown arrow */}
                                        </div>
                                        {dropdownTypeOpen && (
                                            <div className="dropdown-options-step-form">
                                                {types.map((types, index) => (
                                                    <div
                                                        key={index}
                                                        className="dropdown-option-step-form"
                                                        onClick={() => handleSelect4(types)}
                                                    >
                                                        <span>{types.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="custom-dropdown-step-form">
                                        <div
                                            className="dropdown-selected-step-form"
                                            onClick={() => setDropdownCatOpen(!dropdownCatOpen)}
                                        >
                                            <div>
                                                <span>{selectedCat.name}</span>
                                            </div>

                                            <span className="arrow-step-form"><img src={arr} /></span> {/* Dropdown arrow */}
                                        </div>
                                        {dropdownCatOpen && (
                                            <div className="dropdown-options-step-form">
                                                {cats.map((cats, index) => (
                                                    <div
                                                        key={index}
                                                        className="dropdown-option-step-form"
                                                        onClick={() => handleSelect5(cats)}
                                                    >
                                                        <span>{cats.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* add other images and videos */}
                <div className="step-one-other-images">
                    <div className="step-one-other-images-heading">
                        <h2>Add Other Images & Videos</h2>
                    </div>
                    <div className="input-image-video-document">
                        <div className="add-video-wrapper">
                            <div className="add-video-icon-text">
                                <img src={vid} />
                                <p>Add Video</p>
                            </div>
                        </div>
                        <div className="add-video-wrapper">
                            <div className="add-video-icon-text">
                                <img src={img} />
                                <p>Add Video</p>
                            </div>
                        </div>
                        <div className="add-video-wrapper">
                            <div className="add-video-icon-text">
                                <img src={doc} />
                                <p>Add Video</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* add other images and videos */}
                <div className="step-one-description">
                    <div className="add-description">
                        <h2>Add Description about your Profile</h2>
                    </div>
                    <div className="add-description-input">
                        <textarea
                            placeholder="Write Something..."
                            rows="4"
                            cols="50">
                        </textarea>
                    </div>
                </div>


                {/* add other images and videos */}
                <div className="step-one-button">
                    <div className="seller-service-dashboard-main-right-button">
                        <button onClick={() => changeStep("stepTwo")} style={{ width: "100%" }}>Next Step</button>
                    </div>
                </div>
            </div>) :
                steps === "stepTwo" ? (
                    <div className="step-form-content" >
                        <div className="row">
                            <div className="col-lg-4" onClick={() => changeStep("stepThree")}>
                                <div className="layout-image">
                                    <img src={l1} />
                                </div>
                                <div className="layout-heading">
                                    <h3>Template 01</h3>
                                </div>
                            </div>
                            <div className="col-lg-4" onClick={() => changeStep("stepThree")}>
                                <div className="layout-image">
                                    <img src={l2} />
                                </div>
                                <div className="layout-heading">
                                    <h3>Template 02</h3>
                                </div>
                            </div>
                            <div className="col-lg-4" onClick={() => changeStep("stepThree")}>
                                <div className="layout-image">
                                    <img src={l3} />
                                </div>
                                <div className="layout-heading">
                                    <h3>Template 03</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <div onClick={handleOrderNowClick} className="layout-image">
                                    <div className="add-templete">
                                        <img src={upload} />
                                    </div>
                                    <div className="premium-badge">
                                        Premium
                                    </div>
                                </div>
                                <div className="layout-heading">
                                    <h3>Premium Layout</h3>
                                </div>
                            </div>
                            <div className="col-lg-4">

                            </div>
                            <div className="col-lg-4">

                            </div>
                        </div>
                        {/* add other images and videos */}
                        <div className="step-one-button">
                            <div className="seller-service-dashboard-main-right-button">
                                <button style={{ width: "100%" }}>Next Step</button>
                            </div>
                        </div>
                    </div>
                ) :
                    steps === "customLayout" ? (
                        <div className='custom-layout-main'>
                            <div className="custom-layout-heading">
                                <h2>Custom Layout</h2>
                            </div>
                            <div className="custom-layout-theme-update">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="custom-layout-store-logo">
                                            <img src={logoseller} />
                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="theme-editor">
                                            {/* <ThemeEditor /> */}
                                        </div>
                                    </div>
                                </div>
                                {/* upload cover */}
                                <div className='step-one-main'>
                                    <div className="step-one-heading">
                                        <p>Upload Cover Photo</p>
                                    </div>
                                    <div className="step-one-cover-pic">
                                        <div className="upload-cover-picture-wrapper">
                                            <div className="upload-cover-pic-icon">
                                                <img src={upload} />
                                                <p>Upload Cover Photo</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* add other desccription */}
                                <div className="step-one-description">
                                    <div className="add-description">
                                        <h2>Add Description about your Profile</h2>
                                    </div>
                                    <div className="add-description-input">
                                        <textarea
                                            placeholder="Write Something..."
                                            rows="4"
                                            cols="50">
                                        </textarea>
                                    </div>
                                </div>
                                {/* add other images and videos */}
                                <div className="step-one-other-images">
                                    <div className="step-one-other-images-heading">
                                        <h2>Add Other Images & Videos</h2>
                                    </div>
                                    <div className="input-image-video-document">
                                        <div className="add-video-wrapper">
                                            <div className="add-video-icon-text">
                                                <img src={vid} />
                                                <p>Add Video</p>
                                            </div>
                                        </div>
                                        <div className="add-video-wrapper">
                                            <div className="add-video-icon-text">
                                                <img src={img} />
                                                <p>Add Video</p>
                                            </div>
                                        </div>
                                        <div className="add-video-wrapper">
                                            <div className="add-video-icon-text">
                                                <img src={doc} />
                                                <p>Add Video</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* add next button*/}
                                <div className="step-one-button">
                                    <div className="seller-service-dashboard-main-right-button">
                                        <button onClick={() => changeStep("upgradePremium")} style={{ width: "100%" }}>Buy Premium</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) :
                        steps === "upgradePremium" ? (<div className='upgrade-to-premium'>
                            <div className="upgrade-to-premium-heading">
                                <h2>Upgrade to Premium</h2>
                            </div>
                            <div className="contact-to-bank-main-class">
                                <h1>Connect your bank</h1>
                                <h2>Credit or Debit card</h2>
                                <p>Your payements are secured, Your Details are confedentials</p>
                            </div>
                            <div className="step-form-cards-options-input">
                                <div className="payment-step-form-wrapper">
                                    <div className="step-form-card-detail-inputs">
                                        <div className="bank-select-group">
                                            <select>
                                                <option>Select bank</option>
                                                <option>ABC Bank</option>
                                                <option>XYZ Bank</option>
                                            </select>
                                        </div>
                                        <div className="step-form-card-number-input">
                                            <input type='number' placeholder='Card Number' />
                                        </div>
                                        <div className="step-form-card-credentials-input">
                                            <div className="step-form-card-number-input">
                                                <input type='date' placeholder='Expiration Date' />
                                            </div>
                                            <div className="step-form-card-number-input">
                                                <input type='number' placeholder='CVV' maxLength={3} minLength={3} />
                                            </div>
                                        </div>
                                        <div className="step-form-card-Name-input">
                                            <div className="step-form-card-number-input">
                                                <input type='text' placeholder='Account Holder Name' />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="premium-subscription-step-form">
                                <div className="primium-subscription-top-step-form">
                                    <h2>Premium Subscription</h2>
                                    <p>Subtotal item (Custom Layout) <span style={{ fontWeight: "700" }}>$38.99</span></p>
                                </div>
                                <hr></hr>
                                <div className="primium-subscription-bottom-step-form">
                                    <h3>Sub Total <span style={{ fontWeight: "700", color: "black", fontSize: "24px" }} >$ 38.99</span></h3>
                                    <button onClick={handleOrderNowClick3} >Confirm and Pay</button>
                                </div>
                            </div>
                        </div>
                        ) :
                            steps === "stepThree" ? (
                                <div className='step-three-form-listing'>
                                    <div className="row">
                                        <div className="col-lg-8">
                                            <div className="step-three-heading">
                                                <h2>Start Listing your First Campaign</h2>
                                                <p>This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="primium-subscription-bottom-step-form">
                                                <Link to="/donation-dashboard/form-meal-neighbar" > <button>Add a Campaign</button> </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="step-three-service-part">
                                        <h2>No Service Yet</h2>
                                    </div>

                                    {/* add other images and videos */}
                                    <div className="step-one-button">
                                        <div className="seller-service-dashboard-main-right-button">
                                            <button style={{ width: "100%" }} onClick={handleOrderNowClick4}>Next Step</button>
                                        </div>
                                    </div>
                                </div>
                            ) : ""}




            {/* payment successfull */}
            <Modal isVisible={isModalVisible3} onClose={handleCloseModal3}>
                <div className='modal-content-here'>
                    <div className="modal-success-image">
                        <img src={right} />
                    </div>
                    <div className="modal-content-title">
                        <h2>Payment Successful</h2>
                    </div>
                    <div className="modal-content-buttons">
                        <div className="modal-content-button">
                            <button onClick={() => changeStep("stepThree")}>Start Listing </button>
                        </div>
                    </div>
                </div>
            </Modal>


            {/* premium layout templets here */}
            <Modal isVisible={isModalVisible2} onClose={handleCloseModal2}>
                <div className='modal-content-here'>
                    <div className="modal-content-title">
                        <h2>Upgrade to premium</h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div onClick={() => changeStep("upgradePremium")} className="premium-layout-modal-wrapper">
                                <div className="layout-image">
                                    <img src={l1} />
                                </div>
                                <div className="modal-premium-badge">
                                    Premium
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div onClick={() => changeStep("upgradePremium")} className="premium-layout-modal-wrapper">
                                <div className="layout-image">
                                    <img src={l2} />
                                </div>
                                <div className="modal-premium-badge">
                                    Premium
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div onClick={() => changeStep("upgradePremium")} className="premium-layout-modal-wrapper">
                                <div className="layout-image">
                                    <img src={l1} />
                                </div>
                                <div className="modal-premium-badge">
                                    Premium
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div onClick={() => changeStep("upgradePremium")} className="premium-layout-modal-wrapper">
                                <div className="layout-image">
                                    <img src={l2} />
                                </div>
                                <div className="modal-premium-badge">
                                    Premium
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* upgrade to premium ? */}
            <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                <div className='modal-content-here'>
                    <div className="modal-content-title">
                        <h2>Upgrade to premium</h2>
                    </div>
                    <div className="modal-content-buttons">
                        <div class="modal-content-button" >
                            <button onClick={handleOrderNowClick2}>Use Premium layout</button>
                        </div>
                        <div class="modal-content-button">
                            <button onClick={() => changeStep("customLayout")}>Design a Custom Layout</button>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* payment successfull */}
            <Modal isVisible={isModalVisible4} onClose={handleCloseModal4}>
                <div className='modal-content-here'>
                    <div className="modal-success-image">
                        <img src={right} />
                    </div>
                    <div className="modal-content-title">
                        <h2>Shop Setup Successful</h2>
                    </div>
                    <div className="modal-content-buttons">
                        <div className="modal-content-button">
                            <Link to="/" ><button>Go To Dashboard </button></Link>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default SetupYourOfficeDonations
