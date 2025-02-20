import React, { useState } from "react";
import sampleImage from "../../../media/images/Rectangle 18258.png"; // Replace with your image path
import user from "../../../media/images/methewSmall.png"; // Replace with your image path
import userChatIcon from "../../../media/images/chat.png"; // Replace with your chat icon
import afg from "../../../media/images/Afghanistan (AF).png"; // Replace with your chat icon
import tim from "../../../media/images/ion_time-outline.png"; // Replace with your chat icon
import rev from '../../../media/images/bx_revision.png'
import { Link } from "react-router-dom";
import ReviewSliderMain from "../../../screens/ServiceFlow/ServiceSellDetailPage/ReviewSliderMain";

function PackageSecMain() {

    const imageGallery = [
        sampleImage, sampleImage, sampleImage, sampleImage, sampleImage, sampleImage
    ]; // Replace with actual image paths


    const testimonials = [
        {
            name: "Mathew",
            countryFlag: afg, // Replace with the actual image or emoji
            image: user, // Placeholder for profile image
            stars: 5,
            text: "Boost brand exposure during our biggest sourcing events and online trade shows, including Super September and March Expo.",
        },
    ]

    return (

        <div className="container">
            <div className="appointment-card">

                <div className="row">

                    {/* Left Section - Image and Gallery */}
                    <div className="col-lg-6">
                        <div className="image-section">
                            <img src={sampleImage} alt="Main Display" className="main-image" />
                            <div className="gallery">
                                {imageGallery.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="gallery-image"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Content */}
                    <div className="col-lg-6">
                        <div className="packages-table-preview-page-wrapper">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="basic-package-col-preview-page">
                                        <h3>Basic</h3>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="basic-package-col-preview-page">
                                        <h3>Standard</h3>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="basic-package-col-preview-page">
                                        <h3>Advance</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="packages-detail-preview-page">
                                <h3>Basic</h3>
                                <p>Boost brand exposure during our biggest sourcing events and online trade shows, including Super September and March Expo. </p>
                                <h2>$ 38.99</h2>
                            </div>
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="bottom-package-col-preview-page ">
                                        <img src={tim} />
                                        <p>1-day delivery</p>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="bottom-package-col-preview-page ">
                                        <img src={rev} />
                                        <p>03 Revision</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="bottom-package-col-preview-page ">
                                        <p>Payment Upfront</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                <div className="book-now-btn">
                                  <Link to="/serviceBilling" > <button>Buy Now</button></Link> 
                                </div>
                                </div>
                                <div className="col-lg-6">
                                <div className="View-Packages-btn">
                                    <button>View Packages</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
            <div className="reviwe-slider">
                <div className="row">
                    <div className="col-lg-12">
                        <ReviewSliderMain />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PackageSecMain
