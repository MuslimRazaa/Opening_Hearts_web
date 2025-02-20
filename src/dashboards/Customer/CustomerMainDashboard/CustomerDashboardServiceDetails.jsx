import React, { useEffect, useState } from 'react'
import upload from '../../../media/images/Tem_Images/upload.png'
import Modal from '../../../components/Layout/Modal'
import right from '../../../media/images/tic.png'
import { Link, useLocation } from 'react-router-dom';
import { askForRefund, productOrderDetail, productOrderDetailService } from '../../../utils/api'
import LoadingComponents from '../../../components/shared/loaders/LoadingComponents';

const CustomerDashboardServiceDetails = () => {
    const [isModalVisible3, setIsModalVisible3] = useState(false);
    const [isModalVisible4, setIsModalVisible4] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [productOrderDetails, setProductOrderDetails] = useState();
    const [selectedReason, setSelectedReason] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [mainImage, setMainImage] = useState([]); // State for main image

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');


    const fetchProductOrderDetails = async () => {
        setIsLoading(true)
        try {
            const response = await productOrderDetailService(id)
            setProductOrderDetails(response?.data?.data)
            setIsLoading(false)
        }
        catch (error) {
            console.log(error)
            setIsLoading(false)

        }
    }
    const handleOrderNowClick3 = () => {
        setIsModalVisible3(true);
    };
    const handleSuccess = async () => {
        setIsLoading(true)

        if (!selectedReason) {
            alert("Please select a reason for the refund.");
            setIsLoading(false)
            return;
        }
        const formData = new FormData();
        formData.append('order_id', productOrderDetails?.seller_data[0]?.products[0]?.order_id);
        formData.append('product_id', productOrderDetails?.seller_data[0]?.products[0]?.product?.id);
        formData.append('order_product_id', productOrderDetails?.seller_data[0]?.products[0]?.id);
        formData.append('reason', selectedReason);



        formData.append(`images[]`, selectedImages);

        // selectedImages.forEach((image, index) => {
        //     formData.append(`images[${index}]`, image);
        //     console.log(image, "image upload")
        // });
        try {
            const response = await askForRefund(formData);
            console.log("Refund Request Sent Successfully:", response.data);
            setIsLoading(false)
            setIsModalVisible4(true);
            setIsModalVisible3(false);
        } catch (error) {
            console.error("Error sending refund request:", error);
            alert("Failed to send refund request. Please try again.");
            setIsLoading(false)

        }

        setIsModalVisible4(true);
        setIsModalVisible3(false);
        setIsLoading(false)

    };
    const handleCloseModal3 = () => {
        setIsModalVisible3(false);
    };
    const handleCloseModal4 = () => {
        setIsModalVisible4(false);
    };
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setMainImage((prevImages) => prevImages.concat(imageUrls));
        setSelectedImages([...event.target.files]);
      };

    useEffect(() => {
        fetchProductOrderDetails();
    }, [])


    return (
        <>
        {isLoading ? 
            <LoadingComponents />    
        :
        <>
        {productOrderDetails?.provider_data?.length > 0 ? 
            <div className='service-detail-wrapper-dashboard-side'>
            <div className="service-detail-service-dashboard-heading">
                <h2>Order Details</h2>
                <p>Order ID : #{productOrderDetails?.order?.orderid}</p>
            </div>
            <>
                <div className="row">
                    {productOrderDetails?.provider_data?.map((seller, index) => (
                        <div className="order-container">
                            <div className="order-store-header">
                                <div className="order-store-profile">
                                    <img src={seller?.profile_image} className="order-store-img" />
                                    <p className="order-store-name">{seller?.provider_name}</p>
                                </div>
                                <div className="visit-store">
                                    <Link to={`/Service-Seller-Profile?id=${seller?.service[0]?.service_product_id}`}> <p>Visit Store</p></Link>
                                </div>
                            </div>

                            {/* Product Cards */}
                            <div className="order-product-list">
                                {seller?.service?.map((product, index) => (
                                    <div className="order-card" key={index}>
                                        <img src={product?.service_product?.media[0]?.original_url} className="order-product-img" />
                                        <div className="order-card-content">
                                            <h5 className="order-product-name">{product?.service_product?.name}</h5>
                                            <p className="order-status">
                                                <strong>Status:</strong>{" "}
                                                <span className={product.status === "pending" ? "text-warning" : "text-danger"}>
                                                    {product.status}
                                                </span>
                                            </p>
                                            <p className="order-quantity">
                                                <span>Plan:</span> <span className="order-badge">{product.serviceplan?.plan_type}</span>
                                            </p>
                                            <p className="order-price">
                                                <span>Price: </span>
                                                <span className="order-new-price">${product.serviceplan?.plan_price}</span>
                                            </p>
                                            {/* <button className="order-refund-btn" onClick={handleOrderNowClick3}>
                                                <i className="bi bi-arrow-clockwise"></i> Ask for Refund
                                            </button> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>))}

                    <div className="row px-4">
                        <div className="col-lg-6">
                            <div className="order-tracking-item-calculation">
                                <p>Subtotal (1 item)</p>
                                <p>Shipping</p>
                                <p>Discount</p>
                                <br />
                                <h3>Order Total</h3>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="order-tracking-item-calculation-values">
                                <p>${productOrderDetails?.subtotal}</p>
                                <p>$0</p>
                                <p>${productOrderDetails?.discount}</p>
                                <br />
                                <h3>${productOrderDetails?.total_price}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            <Modal isVisible={isModalVisible3} onClose={handleCloseModal3}>
                <div className='wallet-modal-content-here'>
                    <div className="wallet-modal-heading-ask">
                        <h3>Ask for a Refund</h3>
                    </div>
                    <div className="wallet-modal-form-wrapper">
                        <div class="ask-for-return-main">
                            <div className="radio-group">
                                <label>
                                    <input type="radio" name="reason" value="quality" /> Quality
                                </label>
                                <span> Not What Was Advertised, Did Not Function</span>
                                <label>
                                    <input type="radio" name="reason" value="like" /> Like
                                </label>
                                <span> But Not for Me, Did Not Fit</span>
                                <label>
                                    <input type="radio" name="reason" value="dislike" /> Dislike
                                </label>
                                <span>The Product Is What Was Advertised, But Not What I Expected</span>
                                <label>
                                    <input type="radio" name="reason" value="broken" /> Broken
                                </label>
                                <span>I Received the Package, But It Was Broken or Torn</span>
                            </div>

                            <h2>Refund Reason Images <small>(1 Image)</small></h2>
                            <div className="upload-section">
                                <div className="upload-box">
                                    <img src={upload} alt="" />
                                    <input type='file' multiple onChange={handleFileChange} style={{ opacity: "0" }} />
                                    <span> Upload Images</span>
                                </div>
                                {mainImage && (
                                    <img
                                        src={mainImage}
                                        alt="Main Upload"
                                        className="uploaded-image"
                                    />
                                )}
                                <small>Give Clear Image of a Damaged Product</small>
                            </div>

                            <h2>Reason</h2>
                            <textarea
                                placeholder="Write Reason..."
                                onChange={(e) => setSelectedReason(e.target.value)}

                            ></textarea>
                            <small>Make sure the reason you give should be genuine; otherwise your refund will be rejected</small>

                            <button type="button" onClick={handleSuccess} className="submit-btn">Send</button>
                        </div>
                    </div>
                </div>
            </Modal>


            <Modal isVisible={isModalVisible4} onClose={handleCloseModal4}>
                <div className='modal-content-here'>
                    <div className="modal-success-image">
                        <img src={right} />
                    </div>
                    <div className="modal-content-here-success">
                        <h2>Request Successfully Sent</h2>
                    </div>
                    <div className="modal-content-buttons">

                    </div>
                </div>
            </Modal>
            </div>
            :
             <div className="service-detail-service-dashboard-heading">
                <h2>No Details Found</h2>
            </div>
        }
        </>}
        </>
    )
}

export default CustomerDashboardServiceDetails
