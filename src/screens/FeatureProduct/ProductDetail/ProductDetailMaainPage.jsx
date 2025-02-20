import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import mask from '../../../media/images/stripe.png'
import delivery from '../../../media/images/busss.png'
import sec from '../../../media/images/secure.png'
import imgStars from '../../../media/images/stars.png'
import dp from '../../../media/images/dpdn.png'
import dpl from '../../../media/images/arlef.png'
import ref from '../../../media/images/refund.png'
import DetailPageGallery from './DetailPageGallery'
import ProductOptions from './ProductOptions'
import s from '../../../media/images/singleStar.png'
import ReviewComponent from './ReviewComponent'
import Pagination from '../../../components/Main/Pagination'
import { addToCartApi, productDetailApi, productRatingAndReviews, saveProduct } from '../../../utils/api'
import { useLocation } from 'react-router-dom';
import Modal from '../../../components/Layout/Modal'
import ReviewForm from './slider_other-recomendations/AddReview'
import Swal from 'sweetalert2'
import { Spinner } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'

function ProductDetailMaainPage({ guid }) {
    const [activeSection, setActiveSection] = useState([]); // Set default open section
    const [productDetails, setProductDetails] = useState();
    const [stars, setStars] = useState(0);
    const [productRatingDetails, setProductRatingDetails] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState();
    const [selectedSize, setSelectedSize] = useState();
    const [loading, setLoading] = useState(false);

    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);



    const toggleSection = (section) => {
        setActiveSection(prevSections => {
            if (prevSections.includes(section)) {
                return prevSections.filter(item => item !== section); // Remove section if already active
            } else {
                return [...prevSections, section]; // Add section to active list
            }
        });
    };
    const ratings = [
        { label: "Supplier service", score: productDetails?.seller?.rating },
        { label: "On-time shipment", score: productDetails?.shipment_rating },
        { label: "Product quality", score: productDetails?.rating },
    ];

    const fetchProductDetails = async () => {
        try {
            const response = await productDetailApi(guid);
            setProductDetails(response?.data?.data?.product); // Adjust based on API response structure
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    // attributes



    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    useEffect(() => {
        if (productDetails?.new_attributes?.length > 0) {
            const sizeAttribute = productDetails?.new_attributes.find((attr) => attr.key === "Size");
            const colorAttribute = productDetails?.new_attributes.find((attr) => attr.key === "Colors");

            setSize(sizeAttribute?.value || []);
            setColor(colorAttribute?.value || []);
        }
    }, [productDetails?.new_attributes]);



    // end





    const fetchProductRating = async () => {
        try {
            const response = await productRatingAndReviews(productDetails?.id);
            setProductRatingDetails(response?.data?.data); // Adjust based on API response structure
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    // const handleColorChange = (color) => {
    //     setSelectedColor(color);
    // };

    // const handleSizeChange = (size) => {
    //     setSelectedSize(size?.id);
    // };

    // const formdata = {
    //     product_id: productDetails?.id,
    //     quantity: "1",
    //     attributes: [
    //         { key: "Color", value: selectedColor },
    //         { key: "Size", value: selectedSize },
    //     ],
    // };


    const handleAddToCart = async (e) => {
        setLoading(true)
        const formData = new FormData();

        // Use actual valid IDs for testing
        formData.append('product_id', productDetails?.id); // Replace with a valid product ID
        formData.append('quantity', "1"); // Replace with the desired quantity
        formData.append(
            'attributes',
            JSON.stringify(
                [
                    selectedColor && { attribute_id: selectedColor }, // Include selectedColor if it exists
                    selectedSize && { attribute_id: selectedSize }, // Include selectedSize if it exists
                ].filter(Boolean) // Remove null/undefined values
            )
        );

        if (productDetails?.new_attributes?.length > 0) {
            if (color?.length > 0 && size?.length > 0) {
                if (selectedColor && selectedSize) {
                    try {
                        const result = await addToCartApi(formData);
                        setLoading(false)

                        // await Swal.fire({
                        //     icon: 'success',
                        //     text: 'Add to Cart Successfully',
                        //     timer: 1500,
                        // });
                        toast.success('Add to Cart Successfully !');


                    } catch (error) {
                        console.error('Error adding to cart:', error);
                        setLoading(false)
                        // await Swal.fire({
                        //     icon: 'error',
                        //     text: 'Something Went Wrong',
                        //     timer: 1500,
                        //     confirmButtonText: 'Back',
                        // });
                            await Swal.fire({
                                icon: 'error',
                                text: error.response.data.message,
                                timer: 1500,
                                confirmButtonText: 'Back',
                            });
                    }
                }
                else {
                    await Swal.fire({
                        icon: 'error',
                        text: 'Attribute Not Selected',
                        timer: 1500,
                        confirmButtonText: 'Back',
                    });
                    // toast.error('Attribute Not Selected !');

                }

            }
            else if (color?.length > 0 || size?.length > 0) {
                if (selectedColor || selectedSize) {
                    try {
                        const result = await addToCartApi(formData);
                        setLoading(false)

                        await Swal.fire({
                            icon: 'success',
                            text: 'Add to Cart Successfully',
                            timer: 1500,
                        });
                        // toast.success('Add to Cart Successfully !');


                    } catch (error) {
                        console.error('Error adding to cart:', error);
                        setLoading(false)
                        await Swal.fire({
                            icon: 'error',
                            text: 'Something Went Wrong',
                            timer: 1500,
                            confirmButtonText: 'Back',
                        });
                    }
                }
                else {
                    await Swal.fire({
                        icon: 'error',
                        text: 'Attribute Not Selected',
                        timer: 1500,
                        confirmButtonText: 'Back',
                    });
                }
            }
            else {
                await Swal.fire({
                    icon: 'error',
                    text: 'Attribute Not Selected',
                    timer: 1500,
                    confirmButtonText: 'Back',
                });
                // toast.error('Attribute Not Selected !');

            }
        }
        else {
            try {
                const result = await addToCartApi(formData);
                setLoading(false)

                await Swal.fire({
                    icon: 'success',
                    text: 'Add to Cart Successfully',
                    timer: 1500,
                });
                // toast.success('Add to Cart Successfully !');

            } catch (error) {
                console.error('Error adding to cart:', error);
                setLoading(false)
                    await Swal.fire({
                        icon: 'error',
                        text: error.response.data.message,
                        timer: 1500,
                        confirmButtonText: 'Back',
                    });
            
            }
        }

        setLoading(false)
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleStars = (stars) => {
        setStars(stars)
    }


    const handleSaveProduct = async (e) => {
        const data =
        {
            "seller_favourite_against_id": e,
            "seller_type": 1   // 1 for products 
        }

        try {
            const response = await saveProduct(data);
            // await Swal.fire({
            //     icon: 'success',
            //     text: 'Add to Saved Products',
            //     timer: 1500,
            // });
            toast.success('Products Saved Successfully !');

        } catch (error) {
            // await Swal.fire({
            //     icon: 'error',
            //     text: 'Something Went Wrong',
            //     timer: 1500,
            //     confirmButtonText: 'Back',
            // });
            toast.error(`Something went wrong ! ${error.response.data.message}`);
            console.error('Error fetching categories:', error);
        }
    }


    const handleConfirmClick = () => {
        setIsModalVisible(true);
    }
    useEffect(() => {
        fetchProductDetails();
        fetchProductRating()
    }, [guid, productDetails?.id]);





    return (
        <div className='container'>
            <ToastContainer />
            <div className="row">
                {/* left screen */}
                <div className="col-lg-6">
                    <div className="product-detail-title">
                        <h2>{productDetails?.title}</h2>
                    </div>
                    <div className="detail-page-gallery">
                        <DetailPageGallery id={productDetails?.guid} media={productDetails?.media} />
                    </div>
                    <div className="container mt-4">
                        {[{
                            title: "Key Attributes",
                            content: (
                                <div className='keyAtt-tab'>
                                    <ul>
                                        <li>Height: {productDetails?.height}</li>
                                        <li>Weight: {productDetails?.weight}</li>
                                        <li>Length: {productDetails?.length}</li>
                                        <li>Width: {productDetails?.width}</li>
                                    </ul>
                                </div>
                            ),
                        },
                        {
                            title: "Packaging and Delivery",
                            content: (
                                <div className='packaging-tab'>
                                    <p>Packaging Price : {productDetails?.packaging_price || "Not available"} </p>
                                </div>
                            ),
                        },
                        {
                            title: "Lead Time",
                            content: (
                                <div className='detail-table'>
                                    <table className="table table-bordered mt-3">
                                        <thead>
                                            <tr>
                                                <th>Quantity</th>
                                                {productDetails?.lead_time.map((qty) => (
                                                    <th>{qty?.quantity}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Lead Days</td>
                                                {productDetails?.lead_time.map((lead) => (
                                                    <td>{lead?.lead_Day}</td>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ),
                        },
                        {
                            title: "Customization",
                            content: (
                                <div className='customization-tab'>
                                    <p>For More customization details,<span style={{ color: "pink" }}> Message Supplier </span></p>
                                </div>
                            ),
                        },
                        ].map((section, index) => (
                            <div key={index}>
                                <div
                                    className="d-flex justify-content-between align-items-center py-2 my-4"
                                    onClick={() => toggleSection(section.title)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="d-flex align-items-center">
                                        <h6 className={`detail-page-drop-down-items mb-0 me-2`} style={{ fontWeight: "700px" }}>
                                            {section.title}
                                        </h6>
                                    </div>
                                    <span>
                                        {activeSection.includes(section.title) ? (
                                            <img src={dp} alt="icon" style={{ width: "20px", height: "20px" }} />
                                        ) : (
                                            <img src={dpl} alt="icon" style={{ width: "20px", height: "20px" }} />
                                        )}
                                    </span>
                                </div>
                                {activeSection.includes(section.title) && (
                                    <div className="mt-2">{section.content || ""}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {/* right screen */}
                <div className="col-lg-6 mb-4">
                    <div className="product-detail-top-text-right">
                        <p onClick={(e) => handleSaveProduct(productDetails?.id)}>Save this Product</p>
                    </div>
                    <div className="product-detail-description">
                        <div className="detail-price">
                            <h2>Price:</h2>
                            <h3>$ {productDetails?.discount_price}</h3>
                        </div>
                        <div className="detail-description">
                            {productDetails?.category?.description}
                        </div>
                        <div className="detail-colors-size">
                            <div className="d-flex align-items-center gap-4">
                                {/* Colors Section */}
                                {color?.length > 0 && (<div className="d-flex align-items-center">
                                    <span className="me-2">Colours:</span>
                                    {color?.map((color) => (
                                        <div
                                            key={color?.id}
                                            className="rounded-circle me-2"
                                            style={{
                                                width: "25px",
                                                height: "25px",
                                                backgroundColor: color?.color_code,
                                                border: selectedColor === color?.id ? `3px solid black` : "1px solid #ccc",
                                                cursor: "pointer",
                                                transform: selectedColor === color?.id ? "scale(1.2)" : "scale(1)", // Slightly enlarge the selected color
                                                transition: "all 0.2s ease",
                                            }}
                                            onClick={() => handleColorChange(color?.id)}
                                        ></div>
                                    ))}
                                </div>)}

                                {/* Sizes Section */}
                                {size?.length > 0 ? (
                                    <div className="d-flex align-items-center">
                                        <span className="me-2">Size:</span>
                                        {size?.map((size) => (
                                            <button
                                                key={size}
                                                className={`detail-size-btn btn ${selectedSize === size?.id ? "btn-primary text-white" : "btn-outline-secondary"
                                                    }`}
                                                style={{
                                                    fontWeight: selectedSize === size?.id ? "bold" : "normal",
                                                    borderWidth: selectedSize === size?.id ? "2px" : "1px",
                                                }}
                                                onClick={() => handleSizeChange(size?.id)}
                                            >
                                                {size?.name || "Not Available"}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        {/* <div className="detail-shipping">
                            <h3>Shipping:</h3>
                            <p>US $22.00 Expedited International Shipping. See details for shipping
                                International shipment of items may be subject to customs processing and additional charges.
                                Located in:  Michigan, United States</p>
                        </div>
                        <div className="detail-delvery">
                            <h3>Delivery::</h3>
                            <p>US $22.00 Expedited International Shipping. See details for shipping
                                International shipment of items may be subject to customs processing and additional charges.
                                Located in:  Michigan, United States</p>
                        </div>
                        <div className="detail-returns">
                            <h3>Returns:</h3>
                            <p>US $22.00 Expedited International Shipping. See details for shipping
                                International shipment of items may be subject to customs processing and additional charges.
                                Located in:  Michigan, United States</p>
                        </div> */}
                        <div className="detail-payments">
                            <h3>Payments:</h3>
                            <div className="detail-payment-cards">
                                <img src={mask} />
                            </div>
                        </div>

                        <div className="detail-buttons">
                            <div class="f-service-detail-page-top-button">
                                <button onClick={() => handleAddToCart(productDetails?.id)} style={{ fontSize: "16px" }}>    {loading ? <Spinner animation="border" role="status" /> : "Add to Cart"} </button>
                            </div>
                        </div>
                        <h4 className='protections-for-product'>Protections for this product</h4>
                        <div className="detail-icon-delivery">
                            <h3><img src={delivery} style={{ marginRight: "10px" }} /> Delivery:</h3>
                            <p style={{ padding: "0px 0px 0px 40px" }}>US $22.00 Expedited International Shipping. See details for shipping
                                International shipment of items may be subject to customs processing and additional charges.
                                Located in:  Michigan, United States</p>
                        </div>
                        <div className="detail-icon-secure-payment">
                            <h3> <img src={sec} style={{ marginRight: "10px" }} /> Secure Payment:</h3>
                            <p style={{ padding: "0px 0px 0px 40px" }}>US $22.00 Expedited International Shipping. See details for shipping
                                International shipment of items may be subject to customs processing and additional charges.
                                Located in:  Michigan, United States</p>
                        </div>
                        <div className="detail-icon-refund-policy">
                            <h3> <img src={ref} style={{ marginRight: "10px" }} /> Refund Policy:</h3>
                            <p style={{ padding: "0px 0px 0px 40px" }}>US $22.00 Expedited International Shipping. See details for shipping
                                International shipment of items may be subject to customs processing and additional charges.
                                Located in:  Michigan, United States</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="rating-header">
                        <h2>Ratings & Reviews</h2>
                        <img src={imgStars} />
                    </div>
                    <div className="rating-details-top">
                        <h2>
                            {productDetails?.rating}/
                            <span style={{ fontSize: "19px", fontWeight: "400px", color: "gray" }}>
                                {Math.floor(productDetails?.rating) > 0 && Math.floor(productDetails?.rating) <= 2
                                    ? "Not satisfied"
                                    : Math.floor(productDetails?.rating) > 2 && Math.floor(productDetails?.rating) < 4
                                        ? "Satisfied"
                                        : Math.floor(productDetails?.rating) >= 4
                                            ? "Very Satisfied"
                                            : ""}
                            </span>
                        </h2>                    </div>
                    <div className="detail-rating-bars">
                        <div className="container mt-4 p-0">
                            {ratings.map((item, index) => (
                                <div
                                    key={index}
                                    className="d-flex justify-content-between align-items-center mb-3"
                                >
                                    <span className="text-secondary">{item.label}</span>
                                    <div className="flex-grow-1 mx-3" style={{ height: "1px", background: "linear-gradient(90deg, #FF512F, #F09819)" }}></div>
                                    <span className="text-dark">{item.score}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">

                </div>
            </div>
            <div className="comments-reviews">
                <div className="coments-filter-tabs">
                    <div class="f-service-detail-page-top-button">
                        <button onClick={() => handleStars(0)} style={{ fontSize: "12px", padding: "5px 30px", fontWeight: "400" }}>All</button>
                    </div>
                    <div class="f-service-detail-page-top-button" >
                        <button onClick={() => handleStars(1)} style={{ fontSize: "12px", padding: "5px 30px", fontWeight: "400" }}>
                            {Array.from({ length: 1 }).map((_, idx) => (
                                <img
                                    key={`filled-star-${idx}`}
                                    src={s}
                                    alt="filled star"
                                    style={{ width: "16px", height: "16px", marginRight: "2px" }}

                                />
                            ))}</button>
                    </div>
                    <div class="f-service-detail-page-top-button" >
                        <button onClick={() => handleStars(2)} style={{ fontSize: "12px", padding: "5px 30px", fontWeight: "400" }}>
                            {Array.from({ length: 2 }).map((_, idx) => (
                                <img
                                    key={`filled-star-${idx}`}
                                    src={s}
                                    alt="filled star"
                                    style={{ width: "16px", height: "16px", marginRight: "2px" }}
                                />
                            ))}</button>
                    </div>
                    <div class="f-service-detail-page-top-button" >
                        <button onClick={() => handleStars(3)} style={{ fontSize: "12px", padding: "5px 30px", fontWeight: "400" }}>
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <img
                                    key={`filled-star-${idx}`}
                                    src={s}
                                    alt="filled star"
                                    style={{ width: "16px", height: "16px", marginRight: "2px" }}
                                />
                            ))}</button>
                    </div>
                    <div class="f-service-detail-page-top-button" >
                        <button onClick={() => handleStars(4)} style={{ fontSize: "12px", padding: "5px 30px", fontWeight: "400" }}>
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <img
                                    key={`filled-star-${idx}`}
                                    src={s}
                                    alt="filled star"
                                    style={{ width: "16px", height: "16px", marginRight: "2px" }}
                                />
                            ))}</button>
                    </div>
                    <div class="f-service-detail-page-top-button" onClick={() => handleStars(5)}>
                        <button style={{ fontSize: "12px", padding: "5px 30px", fontWeight: "400" }}>
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <img
                                    key={`filled-star-${idx}`}
                                    src={s}
                                    alt="filled star"
                                    style={{ width: "16px", height: "16px", marginRight: "2px" }}
                                />
                            ))}</button>
                    </div>
                </div>
                <div className='add-review'>
                    <button onClick={handleConfirmClick}>Write Review</button>
                </div>
                <ReviewComponent stars={stars} ratings={productRatingDetails} />
            </div>
            <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                <ReviewForm />
            </Modal>

        </div>

    )
}

export default ProductDetailMaainPage
