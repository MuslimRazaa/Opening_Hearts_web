import React, { useEffect, useState } from "react";
import sampleImage from "../../../media/images/Rectangle 18258.png"; // Replace with your image path
import user from "../../../media/images/methewSmall.png"; // Replace with your image path
import userChatIcon from "../../../media/images/chat.png"; // Replace with your chat icon
import afg from "../../../media/images/Afghanistan (AF).png"; // Replace with your chat icon
import tim from "../../../media/images/ion_time-outline.png"; // Replace with your chat icon
import ReviewSliderMain from "./ReviewSliderMain";
import rev from '../../../media/images/bx_revision.png'
import { Link, useNavigate } from "react-router-dom";
import Calender from "../Service_Calender/Calender";
import { addServiceToCart, BASE_URL, buyNowService } from "../../../utils/api";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";
import axios from "axios";

const ServiceSellerGallery = ({ data, data_review }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageShow, setImageShow] = useState(sampleImage);
    const [planTab, setPlanTab] = useState("Bs");
    const [count, setCount] = useState();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    // const handleOrderNowClick = () => {
    //   setIsModalVisible(true);
    // };

    const navigate = useNavigate()

    const fetchCartCountApi = async () => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object
        try {
            const response = await axios.get(`${BASE_URL}cart/count`, { headers });
            setCount(response?.data.data)
        } catch (error) {
            console.error('Error fetching top-rated products:', error);
        }
    }


    useEffect(() => {
        fetchCartCountApi();
    }, []);

    
    const handelBuyNowService = async (id, p_id) => {
        setLoading(true)
        const data = {
            service_product_id: id,
            service_plan_id: p_id,
        }
        try {
            const response = await buyNowService(data);
            await Swal.fire({
                icon: 'success',
                text: 'Success, Are You Sure to Continue?',
                confirmButtonText: 'Yes',
            });
            navigate('/serviceBilling');

        } catch (error) {
            await Swal.fire({
                icon: 'error',
                text: error.message,
                confirmButtonText: 'Back',
            });
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false)
        }
    };


    const handelAddService = async (id, p_id) => {
        setLoading(true)
        const data = {
            service_product_id: id,
            service_plan_id: p_id,
        }
        try {
            const response = await addServiceToCart(data);
            await Swal.fire({
                icon: 'success',
                text: 'Service Added to the Cart Successfully',
                confirmButtonText: 'OK',
            });
            navigate('/ShoppingCart');

        } catch (error) {
            await Swal.fire({
                icon: 'error',
                text: error.message,
                confirmButtonText: 'Back',
            });
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false)
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleImageSet = (img) => {
        setImageShow(img)
    }
    const handlePlanTab = (tab) => {
        setPlanTab(tab)
    }
    

    return (
        <div className="container">
            <div className="appointment-card">

                <div className="row">

                    {/* Left Section - Image and Gallery */}
                    <div className="col-lg-6">
                        <div className="image-section">
                            <img src={imageShow} alt="Main Display" className="main-image" />
                            <div className="gallery">
                                {data?.images?.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        onClick={() => handleImageSet(img)}
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
                                        <h3 onClick={() => handlePlanTab("Bs")}>Basic</h3>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="basic-package-col-preview-page">
                                        <h3 onClick={() => handlePlanTab("St")}>Standard</h3>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="basic-package-col-preview-page">
                                        <h3 onClick={() => handlePlanTab("Ad")}>Advance</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="packages-detail-preview-page">
                                {planTab === "Bs" ? 
                                (<>
                                <h3>Basic</h3>
                                <p>Boost brand exposure during our biggest sourcing events and online trade shows, including Super September and March Expo. </p>
                                <h2>${data?.service_plan[0]?.plan_price}</h2>
                                </>)
                                : planTab === "St" ? 
                                (<>
                                <h3>Standard</h3>
                                <p>Boost brand exposure during our biggest sourcing events and online trade shows, including Super September and March Expo. </p>
                                <h2>${data?.service_plan[1]?.plan_price}</h2>
                                </>)
                                :
                                planTab === "Ad" ? 
                                (<>
                                <h3>Advance</h3>
                                <p>Boost brand exposure during our biggest sourcing events and online trade shows, including Super September and March Expo. </p>
                                <h2>${data?.service_plan[2]?.plan_price}</h2>
                                </>)
                                : ""}
                            </div>
                            {planTab === "Bs" ? 
                            (<div className="row">
                                <div className="col-lg-3">
                                    <div className="bottom-package-col-preview-page ">
                                        <img src={tim} />
                                        <p>{data?.service_plan[0]?.delivery_time} delivery</p>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="bottom-package-col-preview-page ">
                                        <img src={rev} />
                                        <p>{data?.service_plan[0]?.revision}</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="bottom-package-col-preview-page ">
                                        <p>Payment Upfront</p>
                                    </div>
                                </div>
                            </div>) :
                            planTab === "St" ? 
                            (<div className="row">
                                <div className="col-lg-3">
                                    <div className="bottom-package-col-preview-page ">
                                        <img src={tim} />
                                        <p>{data?.service_plan[1]?.delivery_time} delivery</p>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="bottom-package-col-preview-page ">
                                        <img src={rev} />
                                        <p>{data?.service_plan[1]?.revision}</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="bottom-package-col-preview-page ">
                                        <p>Payment Upfront</p>
                                    </div>
                                </div>
                            </div>) :
                            planTab === "Ad" ? 
                            (<div className="row">
                                <div className="col-lg-3">
                                    <div className="bottom-package-col-preview-page ">
                                        <img src={tim} />
                                        <p>{data?.service_plan[2]?.delivery_time} delivery</p>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="bottom-package-col-preview-page ">
                                        <img src={rev} />
                                        <p>{data?.service_plan[2]?.revision}</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="bottom-package-col-preview-page ">
                                        <p>Payment Upfront</p>
                                    </div>
                                </div>
                            </div>) : "" }
                            <div className="row">
                                <div className="col-lg-5">
                                    {count?.productCount === 0 ?
                                    <div className="book-now-btn">
                                         {planTab === "Bs" ? <button onClick={() => handelBuyNowService(data?.id ,data?.service_plan[0]?.id)}>{loading2 ? <Spinner animation="border" role="status" /> : "Hire Now"}</button>
                                            :
                                            planTab === "St" ?  <button onClick={() => handelBuyNowService(data?.id ,data?.service_plan[1]?.id)}>{loading2 ? <Spinner animation="border" role="status" /> : "Hire Now"}</button>
                                                :
                                                planTab === "Ad" ?<button onClick={() => handelBuyNowService(data?.id ,data?.service_plan[2]?.id)}>{loading2 ? <Spinner animation="border" role="status" /> : "Hire Now"}</button> : ""}
                                    </div> : 
                                    <div className="book-now-btn">
                                         {planTab === "Bs" ? <button onClick={() => handelAddService(data?.id ,data?.service_plan[0]?.id)}>{loading2 ? <Spinner animation="border" role="status" /> : "Add to Cart"}</button>
                                            :
                                            planTab === "St" ?  <button onClick={() => handelAddService(data?.id ,data?.service_plan[1]?.id)}>{loading2 ? <Spinner animation="border" role="status" /> : "Add to Cart"}</button>
                                                :
                                                planTab === "Ad" ?<button onClick={() => handelAddService(data?.id ,data?.service_plan[2]?.id)}>{loading2 ? <Spinner animation="border" role="status" /> : "Add to Cart"}</button> : ""}
                                    </div>
                                    }
                                </div>
                                <div className="col-lg-4">
                                    <div className="View-Packages-btn">
                                      <a href="#packages"><button>View Packages</button></a>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    
                                </div>
                               

                            </div>
                        </div>
                    </div>


                    {/* Right Section - Content */}
                    {/* <div className="col-lg-6">
                        <div className="content-section">
                            <h2 className="appointment-title">Book an appointment</h2>
                            <p className="appointment-text">Choose a preferred date and time</p>
                            <button className="appointment-button" onClick={handelAddService}>{loading ? <Spinner animation="border" role="status" /> : "Hire Now"}</button>
                            <div className="working-hours">
                                <h3 className="working-title">Working Hours</h3>
                                <p className="working-time">UTC {data?.select_available_time}</p>
                                <p className="working-days">{data?.select_avaiable_day}</p>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="chat-section">
                                        <img src={userChatIcon} alt="Chat Icon" className="chat-icon" />
                                        <p className="chat-text">Chat with Mathew</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="hourly-rate">
                                        <p>${data?.set_price}/{data?.delivery_time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Calender isVisible={isModalVisible} onClose={handleCloseModal} />
                    </div> */}


                </div>
            </div>
            <div className="reviwe-slider">
                <div className="row">
                    <div className="col-lg-12">
                        <ReviewSliderMain data_review={data_review} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ServiceSellerGallery;
