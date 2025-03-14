import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import mask from '../../../media/images/massk.png'
import delivery from '../../../media/images/busss.png'
import sec from '../../../media/images/secure.png'
import right from '../../../media/images/tic.png'
import stars from '../../../media/images/stars.png'
import dp from '../../../media/images/dpdn.png'
import dpl from '../../../media/images/arlef.png'
import ref from '../../../media/images/refund.png'
import DetailPageGallery from './DetailPageGallery'
import ProductOptions from './ProductOptions'
import ReviewComponent from './ReviewComponent'
import Pagination from '../../../components/Main/Pagination'
import Modal from '../../../components/Layout/Modal'

function ProductPriviewComponent() {
    const [activeSection, setActiveSection] = useState("Lead Time"); // Set default open section
    const [isModalVisible4, setIsModalVisible4] = useState(false);

    const handleCloseModal4 = () => {
        setIsModalVisible4(false);
    };
    const handleSuccess = () => {
        setIsModalVisible4(true);
    };
    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? "" : section);
    };
    const ratings = [
        { label: "Supplier service", score: 5.0 },
        { label: "On-time shipment", score: 5.0 },
        { label: "Product quality", score: 5.0 },
    ];

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12">
                    <div className="add-product-preview-page">
                        <button className='add-product-preview' onClick={handleSuccess}>Activate Product</button>
                        <Link to='/dashboard/add-product' ><button className='edit-product-preview'>Edit</button></Link>
                    </div>
                </div>
            </div>



            <div className="row">
                {/* left screen */}
                <div className="col-lg-6">
                    <div className="product-detail-title">
                        <h2>Nike Dunk Low</h2>
                    </div>
                    <div className="detail-page-gallery">
                        <DetailPageGallery />
                    </div>
                    <div className="container mt-4">
                        {[
                            { title: "Key Attributes" },
                            { title: "Packaging and Delivery" },
                            {
                                title: "Lead Time",
                                content: (
                                    <div className='detail-table'>
                                        <table className="table table-bordered mt-3">
                                            <thead>
                                                <tr>
                                                    <th>Quantity</th>
                                                    <th>1-100</th>
                                                    <th>1-100</th>
                                                    <th>1-100</th>
                                                    <th>1-100</th>
                                                    <th>1-100</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Lead Days</td>
                                                    <td>
                                                        <span className="text-primary">3 Days</span>
                                                    </td>
                                                    <td>3 Days</td>
                                                    <td>3 Days</td>
                                                    <td>3 Days</td>
                                                    <td>3 Days</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ),
                            },
                            { title: "Customization" },
                            { title: "Others Attributes" },
                            { title: "Sample" },
                        ].map((section, index) => (
                            <div key={index}>
                                <div
                                    className="d-flex justify-content-between align-items-center py-4"
                                    onClick={() => toggleSection(section.title)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="d-flex align-items-center">
                                        <h6
                                            className={`detail-page-drop-down-items mb-0 me-2`}
                                            style={{ fontWeight: "700px" }}
                                        >
                                            {section.title}
                                        </h6>
                                    </div>
                                    <span>
                                        {activeSection === section.title ? (
                                            <img src={dp} alt="icon" style={{ width: "20px", height: "20px" }} />

                                        ) : (
                                            <img src={dpl} alt="icon" style={{ width: "20px", height: "20px" }} />

                                        )}
                                    </span>
                                </div>
                                {activeSection === section.title && (
                                    <div className="mt-2">{section.content || ""}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {/* right screen */}
                <div className="col-lg-6">
                    <div className="product-detail-top-text-right">
                        <Link to="" ><p>Save this Product</p></Link>
                    </div>
                    <div className="product-detail-description">
                        <div className="detail-price">
                            <h2>Price:</h2>
                            <h3>$ 38.99</h3>
                        </div>
                        <div className="detail-description">
                            PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.
                        </div>
                        <div className="detail-colors-size">
                            <ProductOptions />
                        </div>
                        <div className="detail-shipping">
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
                        </div>
                        <div className="detail-payments">
                            <h3>Payments:</h3>
                            <div className="detail-payment-cards">
                                <img src={mask} />
                                <img src={mask} />
                                <img src={mask} />
                                <img src={mask} />
                                <img src={mask} />
                                <img src={mask} />
                                <img src={mask} />
                                <img src={mask} />
                            </div>
                        </div>

                        <div className="detail-buttons">
                            {/* <div class="f-service-detail-page-top-button">
                                <button style={{ fontSize: "16px" }}>By It now</button>
                            </div>  <div class="f-service-detail-page-top-button">
                                <Link to="/ShoppingCart" style={{ textDecoration: "none" }}><button style={{ fontSize: "16px" }}>Add to Cart</button></Link>
                            </div> */}
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
            <Modal isVisible={isModalVisible4} onClose={handleCloseModal4}>
                <div className='modal-content-here'>
                    <div className="modal-success-image">
                        <img src={right} />
                    </div>
                    <div className="modal-content-here-success">
                        <h2>Product Listed Sucessfully !</h2>
                        <p>We hope you enjoy selling on our platform</p>
                    </div>
                    <div style={{textAlign:"center"}} >
                    <div class="modal-content-button" >
                        <Link to="/dashboard/product" style={{ textDecoration: "none" }}> <button>Go To Dashboard</button></Link>
                    </div>
                    </div>
                </div>
            </Modal>
        </div>

    )
}

export default ProductPriviewComponent
