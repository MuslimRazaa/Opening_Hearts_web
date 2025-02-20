import React, { useState } from 'react'
import Header from '../../../components/Layout/Header'
import ReviewSliderMain from "./ReviewSliderMain";
import sampleImage from "../../../media/images/Rectangle 18258 (1).png"; // Replace with your image path
import user from "../../../media/images/methewSmall.png"; // Replace with your image path
import userChatIcon from "../../../media/images/chat.png"; // Replace with your chat icon
import afg from "../../../media/images/Afghanistan (AF).png"; // Replace with your chat icon
import ServiceSellerProfileTop from './ServiceSellerProfileTop';
import GetToKnowAbtMethew from './GetToKnowAbtMethew';
import Footer from '../../../components/Layout/Footer';
import OtherRecomendationsForSeller from './OtherRecomendationsForSeller';
import SingleServiceFaqs from '../SingleServiceDetailPage/SingleServiceFaqs';
import PopularServiceCardSec from '../PopularServiceCardSec';


function VendorProfilePage() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOrderNowClick = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };



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
        <div>
            <Header />
            <ServiceSellerProfileTop available={false} />


            {/* Gallery Section */}
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
                            <div className="content-section">
                                <p className="vendor-text">This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                            </div>
                            <div className="content-section">
                                <p className="vendor-text">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
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

            {/* end */}





            {/* about matheww  */}
            <div className="container">

                <div className="row">
                    <div className="col-lg-6">
                        <div className="about-user-title">
                            <h2>We are offering </h2>
                        </div>
                        <div className="about-user-list">
                            <ul>
                                <li>Web banner</li>
                                <li>Brochure</li>
                                <li>Flyer</li>
                                <li>Poster</li>
                                <li> business card</li>
                                <li> Logo design</li>
                                <li> Illustrations</li>
                                <li> Infographic</li>
                                <li> Vector tracing</li>
                                <li>Photoshop editing</li>
                                <li>social media artworks</li>
                            </ul>
                            <p>and much more</p>
                        </div>
                    </div>
                    <div className="col-lg-6"></div>
                </div>

            {/* end */}

            {/* get to know */}
                                    
            <div className="get-to-know-table">
                <div className="from">
                    <p className='table-tt'>Form</p>
                    <p className='table-td'>United State</p>
                </div>
                <div className="from">
                <p className='table-tt'>Average Response Time</p>
                    <p className='table-td'>01/Hr</p>
                </div>
                <div className="from">
                <p className='table-tt'>Since </p>
                    <p className='table-td'>17 Feb 2015</p>
                </div>
                <div className="from">
                <p className='table-tt'>Last Delivery </p>
                    <p className='table-td'>Yesterday</p>
                </div>
                <div className="from">
                <p className='table-tt'>Language</p>
                    <p className='table-td'>English</p>
                </div>
            </div>
            {/* end */}
            
            {/* Experience Include */}
            <div className="row">
                <div className="col-lg-6">
                    <div className="about-user-title">
                        <h2>My Experiences Include</h2>
                    </div>
                    <div className="about-user-list">
                        <ul>
                            <li>Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign)</li>
                            <li>Strong understanding of typography, color theory, and composition</li>
                            <li>Ability to create visually appealing logos, illustrations, and layouts</li>
                            <li>Experience with both print and digital design projects</li>
                            <li>Knowledge of industry-standard design principles and trends</li>
                            <li>Excellent communication and collaboration skills</li>
                            <li>Time management and ability to meet deadlines consistentlyc</li>
                            <li>Flexibility and willingness to adapt to project requirements</li>
                            <li>Attention to detail and commitment to quality assurance</li>
                            <li>Problem-solving skills to address design challenges effectively</li>
                        </ul>
                        <p>and much more</p>
                    </div>
                </div>
                <div className="col-lg-6"></div>
            </div>
            {/* end */}
            </div>
            
            <PopularServiceCardSec/>
            <SingleServiceFaqs />
        <OtherRecomendationsForSeller/>
        <Footer/>
        </div>
    )
}

export default VendorProfilePage
