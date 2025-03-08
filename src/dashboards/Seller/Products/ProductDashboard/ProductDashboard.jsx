import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import funnyCartoon from '../../../../media/images/Tem_Images/funny-cartoon-superhero-character-with-mask 1.png'
import vid from '../../../../media/images/Tem_Images/basil_video-outline.png'
import img from '../../../../media/images/Tem_Images/mdi_images-outline.png'
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import Select from 'react-select';
import apis from '../../../../service'
import Swal from 'sweetalert2'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents'
import NoDataFound from '../../../../components/shared/noDataFound/NoDataFound'
import { FaRegEye } from 'react-icons/fa'

const libraries = ['places'];

function ProductDashboard() {
  const user_data = localStorage.getItem('user_data');
  const [inputError, setInputError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFromLoading, setIsFromLoading] = useState(false);
  const userData = JSON.parse(user_data);
  const [show, setShow] = useState(false);
  const inputRef = useRef();
  const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES, libraries });
  const [category, setCategory] = useState([]);
  const [dashboard, setDashboard] = useState("");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const [showFormData, setShopFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    country: "",
    zip_code: "",
    sell: "Product",
    phone_code: "",
    phone_number: "",
    phone_country_code: "",
    cover_image: "",
    edit_cover_image: false,
    profile_image: "",
    edit_profile_image: false,
    other_images: [],
    video: "",
    edit_video: false,
    categories: [],
  })

  const coverImageRef = useRef(null);
  const profileImageRef = useRef(null);

  const handleCoverImageUploadClick = () => {
    coverImageRef.current.click();
  };

  const handleProfileImageUploadClick = () => {
    profileImageRef.current.click();
  };

  const handleCoverImageChange = (e) => {
    return setShopFormData(prev => ({ ...prev, cover_image: e.target.files[0], edit_cover_image: true }));
  };

  const handleProfileImageChange = (e) => {
    return setShopFormData(prev => ({ ...prev, profile_image: e.target.files[0], edit_profile_image: true }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopFormData({
      ...showFormData,
      [name]: value,
    });
  };

  const handlePhoneChange = (value) => {
    if (value) {
      const phoneNumberObject = parsePhoneNumberFromString(value);
      if (phoneNumberObject) {
        setShopFormData((prev) => ({
          ...prev,
          phone_code: phoneNumberObject.countryCallingCode,
          phone_number: phoneNumberObject.nationalNumber,
          phone_country_code: phoneNumberObject?.country,
        }))
      }
    } else {
      setShopFormData((prev) => ({ ...prev, phone_code: "", phone_number: "", phone_country_code: "" }))
    }
  };

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      setShopFormData(prev => ({
        ...prev,
        address: place.formatted_address,
        city: place.name
      }));
      let political, administrative_area_level_1, postalCode;

      for (let i = 0; i < place.address_components?.length; i++) {
        const component = place.address_components[i];
        for (let j = 0; j < component.types?.length; j++) {
          if (component.types[j] === 'country') {
            political = component.long_name;
          } else if (component.types[j] === 'administrative_area_level_1') {
            administrative_area_level_1 = component.long_name;
          } else if (component.types[j] === 'postal_code') {
            postalCode = component.long_name;
          }
        }
      }
      setShopFormData(prev => ({
        ...prev,
        country: political,
        zip_code: postalCode,
      }));

    }
  };

  const videoInputRef = useRef(null);

  const handleVideoUploadClick = () => {
    videoInputRef.current.click();
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        text: "File size must be less than 5MB"
      });
      e.target.value = null;
      return;
    }

    setShopFormData({ ...showFormData, video: file, edit_video: true });
    e.target.value = null;
  };

  const deleteSelectedVideo = () => {
    setShopFormData({ ...showFormData, video: "", edit_video: false });
  }

  const otherImageInputRef = useRef(null);

  const handleOtherImageClick = () => {
    otherImageInputRef.current.click();
  };

  const handleOtherImageFileChange = (e) => {
    const maxAllowedFiles = 3;
    const selectedFiles = Array.from(e.target.files);

    setShopFormData(prev => {
      const totalFiles = prev.other_images.length + selectedFiles.length;

      if (totalFiles > maxAllowedFiles) {
        Swal.fire({
          icon: 'error',
          text: "You can only upload more then 3 images."
        });
        return prev; // Do not update state if limit is exceeded
      }

      return { ...prev, other_images: [...prev.other_images, ...selectedFiles] };
    });
  };

  const handleDeleteImage = (index) => {
    const updatedFiles = [...showFormData.other_images];
    updatedFiles.splice(index, 1);
    setShopFormData(prev => ({ ...prev, other_images: updatedFiles }));
  };

  const getAllCategories = async () => {
    try {
      const response = await apis.getAllCategories();
      let temp = [];
      for (let i = 0; i < response?.data?.data.length; i++) {
        temp.push({ label: response?.data?.data[i].name, value: response?.data?.data[i].id })
      }
      setCategory(temp)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error.response?.data?.message
      });
    }
  }

  const getProductDashboard = async () => {
    setLoading(true)
    try {
      const response = await apis.getProductDashboard();
      setDashboard(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false)
      Swal.fire({
        icon: 'error',
        text: error.response?.data?.message
      });
    }
  }

  const productOrderManagment = async (orderType, search, startDate, endDate, page, page_size) => {
    try {
      const response = await apis.productOrderManagment(orderType, search, startDate, endDate, page, page_size);
      setOrders(response?.data?.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      Swal.fire({
        icon: 'error',
        text: error.response?.data?.message,
      });
    }
  }

  useEffect(() => {
    if (userData.is_product == 1) {
      getProductDashboard();
      productOrderManagment(null, null, null, null, 1, 5);
    }
  }, [])

  useEffect(() => {
    getAllCategories();
  }, [])



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setInputError(true)
    if (showFormData?.name != "" && showFormData?.profile_image != "" && showFormData?.cover_image != ""
      && showFormData?.address != "" && showFormData?.zip_code != "" && showFormData?.city != ""
      && showFormData?.country != "" && showFormData?.phone_number != "" && showFormData?.categories.length > 0
    ) {
      setIsFromLoading(true)
      const data = new FormData();
      data.append("name", showFormData?.name);
      data.append("description", showFormData?.description);
      data.append("address", showFormData?.address);
      data.append("city", showFormData?.city);
      data.append("state", showFormData?.state);
      data.append("country", showFormData?.country);
      data.append("zip_code", showFormData?.zip_code);
      data.append("phone_code", showFormData?.phone_code);
      data.append("phone_number", showFormData?.phone_number);
      data.append("sell", showFormData?.sell);
      data.append("phone_country_code", showFormData?.phone_country_code);
      data.append("cover_image", showFormData?.cover_image);
      data.append("profile_image", showFormData?.profile_image);
      showFormData.other_images.forEach((other_image) => {
        data.append("other_images[]", other_image);
      });
      data.append("video", showFormData?.video);
      const tempCate = [];
      for (let i = 0; i < showFormData.categories.length; i++) {
        tempCate.push(showFormData.categories[i].value)
      }

      data.append("categories", JSON.stringify(tempCate));
      try {
        const response = await apis.createAndUpdateStore(data);
        localStorage.setItem('user_data', JSON.stringify(response?.data?.data))
        window.location.reload();
      } catch (error) {
        setIsFromLoading(false)
        Swal.fire({
          icon: 'error',
          text: error.response?.data?.message
        });
      }
    }
  }

  return (
    <>
      {
        userData.is_product_subscription == 0 ?
          <>
            <div>
              <div className="seller-service-dashboard-main-right">
                <h2>Welcome to Opening Heart Digital Gateway Product-seller HUB</h2>
                <p>This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32</p>
                <div className="seller-service-dashboard-main-right-button">
                  <Link to="/become-seller" style={{ textDecoration: "none" }}><button>Lets Get Started</button></Link>
                </div>
              </div>
              <div className="seller-service-dashboard-main-image"><img src={funnyCartoon} /></div>
            </div>
          </>
          :
          <>
            {userData.is_product == 0 ?
              <>
                {!show ?
                  <div>
                    <div className="seller-service-dashboard-main-right">
                      <h2>Welcome to Opening Heart Digital Gateway Product-seller HUB</h2>
                      <p>This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32</p>
                      <div className="seller-service-dashboard-main-right-button">
                        <button onClick={() => { setShow(true) }}>Lets Get Started</button>
                      </div>
                    </div>
                    <div className="seller-service-dashboard-main-image">
                      <img src={funnyCartoon} />
                    </div>
                  </div>
                  :
                  <>
                    <form onSubmit={handleFormSubmit}>
                      <div className='step-one-main'>
                        <div className="step-one-heading">
                          <h2>Setup Your Office</h2>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            {showFormData?.edit_profile_image ?
                              <div className="upload-cover-picture-wrapper-image" onClick={handleProfileImageUploadClick}>
                                <img src={URL.createObjectURL(showFormData?.profile_image)} />
                              </div>
                              :
                              <div className="upload-cover-picture-wrapper" onClick={handleProfileImageUploadClick}>
                                <div className="upload-cover-pic-icon">
                                  <img src={img} />
                                  <p>Upload Profile Photo</p>
                                </div>
                              </div>
                            }
                            <input
                              type="file"
                              ref={profileImageRef}
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={handleProfileImageChange}
                            />
                            {inputError && showFormData.profile_image === '' && <div className="error-input-reg">Profile image is required</div>}
                          </div>
                          <div className="col-lg-6">
                            <div className="step-one-cover-pic" onClick={handleCoverImageUploadClick}>
                              {showFormData?.edit_cover_image ?
                                <div className="upload-cover-picture-wrapper-image">
                                  <img src={URL.createObjectURL(showFormData?.cover_image)} />
                                </div>
                                :
                                <div className="upload-cover-picture-wrapper">
                                  <div className="upload-cover-pic-icon">
                                    <img src={img} />
                                    <p>Upload Cover Photo</p>
                                  </div>
                                </div>
                              }
                              <input
                                type="file"
                                ref={coverImageRef}
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleCoverImageChange}
                              />
                            </div>
                            {inputError && showFormData.cover_image === '' && <div className="error-input-reg">Cover image is required</div>}
                          </div>

                          <div className="col-lg-12">
                            <div className="step-one-form-profile-picture">
                              <div className="s-one-name-phone">
                                <div className="s-one-name-phone-wrap">
                                  <input
                                    type='text'
                                    placeholder='Store Name'
                                    name='name'
                                    value={showFormData?.name}
                                    onChange={handleChange}
                                    className='input'
                                  />
                                  {inputError && showFormData.name === '' && <div className="error-input">Name is required</div>}
                                </div>
                                <div className="s-one-name-phone-wrap">
                                  <input
                                    type='email'
                                    placeholder='Email Address'
                                    className='input'
                                    value={userData?.email}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="s-one-name-phone">
                                <div className="s-one-name-phone-wrap">
                                  {isLoaded && (
                                    <StandaloneSearchBox
                                      onLoad={ref => inputRef.current = ref}
                                      onPlacesChanged={handlePlaceChanged}
                                    >
                                      <input
                                        type="text"
                                        className="input"
                                        placeholder={"Enter address"}
                                        defaultValue={showFormData.address}
                                        name='address'
                                        onChange={handleChange}
                                        style={{ width: '100%' }}
                                      />
                                    </StandaloneSearchBox>
                                  )}
                                  {inputError && showFormData.address === '' && <div className="error-input">Address is required</div>}
                                </div>
                                <div className="s-one-name-phone-wrap">
                                  <input
                                    type='text'
                                    placeholder='Zip Code'
                                    className='input'
                                    name='zip_code'
                                    value={showFormData?.zip_code}
                                    onChange={handleChange} />
                                  {inputError && showFormData.zip_code === '' && <div className="error-input">Zip code is required</div>}
                                </div>
                              </div>
                              <div className="s-one-address-code">
                                <div className="s-one-name-phone-wrap">
                                  <input
                                    type='text'
                                    placeholder='City'
                                    className='input'
                                    name='city'
                                    value={showFormData?.city}
                                    onChange={handleChange}
                                  />
                                  {inputError && showFormData.city === '' && <div className="error-input">City is required</div>}
                                </div>
                                <div className="s-one-name-phone-wrap">
                                  <input
                                    type='text'
                                    placeholder='Country'
                                    className='input'
                                    name='country'
                                    value={showFormData?.country}
                                    onChange={handleChange}
                                  />
                                  {inputError && showFormData.country === '' && <div className="error-input">Country is required</div>}
                                </div>
                              </div>
                              <div className="s-one-address-code">
                                <div className="s-one-name-phone-wrap">
                                  <PhoneInput
                                    placeholder="Enter phone number"
                                    className='create-shop-number-field'
                                    value={showFormData?.phone_number ? `+${showFormData?.phone_code}${showFormData?.phone_number}` : ""}
                                    onChange={handlePhoneChange}
                                  />
                                  {inputError && showFormData.phone_number === '' && <div className="error-input">Phone number is required</div>}
                                </div>
                                <div className="s-one-name-phone-wrap">
                                  <input
                                    type='text'
                                    className='input'
                                    value={`Sell ${showFormData?.sell}`}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="c-s-s-c">
                                <Select
                                  defaultValue={showFormData?.categories}
                                  onChange={(e) => { setShopFormData((prev) => ({ ...prev, categories: e })) }}
                                  options={category}
                                  isMulti
                                />
                                {inputError && showFormData.categories.length === 0 && <div className="error-input">Category is required</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="step-one-other-images">
                        <div className="step-one-other-images-heading">
                          <h2>Add Video</h2>
                        </div>
                        <div className="input-image-video-document">
                          {!showFormData?.edit_video ?
                            <>
                              <div className="add-video-wrapper">
                                <div className="add-video-icon-text" onClick={handleVideoUploadClick}>
                                  <img src={vid} />
                                  <p>Add Video</p>
                                </div>
                                <input
                                  type="file"
                                  ref={videoInputRef}
                                  accept="video/*"
                                  style={{ display: 'none' }}
                                  onChange={handleVideoChange}
                                />
                              </div>
                            </>
                            :
                            <div className="selected-videos-box">
                              <video width="100%" controls>
                                <source src={URL.createObjectURL(showFormData?.video)} />
                                Your browser does not support the video tag.
                              </video>
                              <span onClick={() => { deleteSelectedVideo() }}><CiEdit /></span>
                            </div>
                          }
                        </div>
                      </div>
                      <div className="step-one-other-images">
                        <div className="step-one-other-images-heading">
                          <h2>Add Other Images</h2>
                        </div>
                        <div className="input-image-video-document" onClick={handleOtherImageClick}>
                          <div className="add-video-wrapper">
                            <div className="add-video-icon-text">
                              <img src={img} />
                              <p>Add Image</p>
                              <input
                                type="file"
                                ref={otherImageInputRef}
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleOtherImageFileChange}
                                multiple
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {showFormData?.other_images?.length > 0 ?
                        <div className="selected-images">
                          <div className="row">
                            {showFormData?.other_images.map((image, index) => {
                              return (
                                <div className="col-lg-2" key={index}>
                                  <div className="selected-images-box">
                                    <img src={URL.createObjectURL(image)} alt="" />
                                    <span onClick={() => { handleDeleteImage(index) }}><MdDelete /></span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                        : null}
                      <div className="step-one-description">
                        <div className="add-description">
                          <h2>Add Description about your Profile</h2>
                        </div>
                        <div className="add-description-input">
                          <textarea
                            placeholder="Write description..."
                            rows="4"
                            cols="50"
                            name='description'
                            value={showFormData?.description}
                            onChange={handleChange} />
                        </div>
                      </div>
                      <div className="step-one-button">
                        <div className="seller-service-dashboard-main-right-button">
                          <button type='submit' style={{ width: "100%" }} disabled={isFromLoading}>{isFromLoading ? "Loading..." : "Submit"}</button>
                        </div>
                      </div>
                    </form>
                  </>
                }
              </>
              :
              loading ?
                <LoadingComponents />
                :
                <>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="seller-db-box-TO">
                        <h3>Total Revenue </h3>
                        <h2>${dashboard?.total_revenue}</h2>
                        <p>{dashboard?.total_revenue_per}% month over month</p>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="seller-db-box-TO">
                        <h3>Total Orders</h3>
                        <h2>${dashboard?.total_order}</h2>
                        <p>{dashboard?.total_order_per}% month over month</p>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="seller-db-box-TO">
                        <h3>Completed Orders</h3>
                        <h2>${dashboard?.total_complete_order}</h2>
                        <p>{dashboard?.total_complete_order_per}% month over month</p>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="seller-db-box-TO">
                        <h3>Cancel Orders</h3>
                        <h2>${dashboard?.total_cancel_order}</h2>
                        <p>{dashboard?.total_cancel_order_per}% month over month</p>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="seller-db-box-TO">
                        <h3>Active Orders</h3>
                        <h2>${dashboard?.total_accepted_order}</h2>
                        <p>{dashboard?.total_accepted_order_per}% month over month</p>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="seller-db-box-TO">
                        <h3>Refund Orders</h3>
                        <h2>${dashboard?.total_refund_order}</h2>
                        <p>{dashboard?.total_refund_order_per}% month over month</p>
                      </div>
                    </div>
                    
                  </div>
                  <div className='orders-table-and-tabs'>
                    <div className="orders-table-heading">
                      <h2>Recent Orders</h2>
                    </div>
                    <div className="donation-detail-page-search-bar-table-tab"></div>
                    <div className='table-tabs-main'>
                      <div className="table-main-wrapper">
                        <div className='table-main-wrapper'>
                          <div className="order-table">
                            <div className="table-header">
                              <div><p>Orders</p></div>
                              <div><p>Date & Time</p></div>
                              <div><p>Product Count</p></div>
                              <div><p>Amount</p></div>
                              <div><p>Status</p></div>
                              <div><p>Action</p></div>
                            </div>
                            {orders?.order?.length > 0 ?
                              orders?.order?.map((order, index) => (
                                <div className="table-row" key={index}>
                                  <div><p>{order.orderid}</p></div>
                                  <div><p>{order.date}</p></div>
                                  <div><p>{order.order_product_ids?.length}</p></div>
                                  <div><p>{order?.subtotal_price}</p></div>
                                  <div>
                                    <p>
                                      {order?.order_product_ids?.map((pro, i) => {
                                        return (
                                          <span key={i}>{pro?.status}{order?.order_product_ids?.length - 1 === i ? "" : ", "}</span>
                                        )
                                      })}
                                    </p>
                                  </div>
                                  <div><span className='delete' onClick={() => { navigate(`/dashboard/product-order-detail?id=${order?.id}`) }}><FaRegEye /></span></div>
                                </div>
                              ))
                              :
                              <NoDataFound title={'No dat found'} />
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
            }
          </>
      }
    </>
  )
}

export default ProductDashboard
