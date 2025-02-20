import React, { useEffect, useState } from 'react'
import imagecartpro from "../../../media/images/image-cart3.png";
import cart from '../../../media/images/carttt.svg';
import image from '../../../media/images/🤖 AI Generated Avatars_ Amir Fakhri.png';
import arg from '../../../media/images/Argentina (AR).png';
import mask from '../../../media/images/Mask group.png';
import mask2 from '../../../media/images/Rectangle 17922.png';
import stars from '../../../media/images/stars.png';
import time from '../../../media/images/subway_time-3.png';
import { Link } from 'react-router-dom';
import img1 from '../../../media/images/fiver.png';
import userr from '../../../media/images/userrr.png';
import flag from '../../../media/images/United Kingdom (GB).png';
import star from '../../../media/images/star.svg';
import imageServe from '../../../media/images/ser-card-img.png';
import star2 from '../../../media/images/star.svg';
import donacardimg from '../../../media/images/don-card-img.png';
import fundlogo from '../../../media/images/Funding Circle log.png'
import { getSaveCampaign, getSaveOrganizations, getSaveProducts, getSaveProviders, getSaveService, getSaveSuppliers } from '../../../utils/api';
import LoadingComponents from '../../../components/shared/loaders/LoadingComponents';


const CustomerDashSaveproduct = () => {
  const [active, setActive] = useState("ecommerce")   // hook useState
  const [loading, setLoading] = useState(false)   // hook useState
  const [loading2, setLoading2] = useState(false)   // hook useState

  const [products, setProducts] = useState([])   // Saved Product useState
  const [suplier, setSuplier] = useState([])   // Saved suplier  useState

  const [service, setService] = useState([])   // Saved service   useState
  const [provider, setProvider] = useState([])   // Saved provider  useState

  const [campaign, setCampaign] = useState([])   // Saved  campaign useState
  const [organization, setOrganization] = useState([])   // Saved organization useState

  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 80;  // Adjust this value as needed

  // Toggle the expanded state
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };


  const fetchSavedProducts = async () => {
    setLoading(true)
    try {
      const response = await getSaveProducts();
      setProducts(response?.data?.data?.save)
      setLoading(false)
    }
    catch (err) {
      console.error(err)
    }
  }
  const fetchSavedSuplier = async () => {
    setLoading2(true)
    try {
      const response = await getSaveSuppliers();
      setSuplier(response?.data?.data?.save)
      setLoading2(false)
    }
    catch (err) {
      console.error(err)
    }
  }
  const fetchSavedService = async () => {
    setLoading(true)
    try {
      const response = await getSaveService();
      setService(response?.data?.data?.save)
      setLoading(false)
    }
    catch (err) {
      console.error(err)
      setLoading(false)

    }
  }
  const fetchSavedProviders = async () => {
    setLoading2(true)
    try {
      const response = await getSaveProviders();
      setProvider(response?.data?.data?.save)
      setLoading2(false)
    }
    catch (err) {
      console.error(err)
      setLoading2(false)
    }
  }
  const fetchSavedCampaigns = async () => {
    setLoading(true)
    try {
      const response = await getSaveCampaign();
      setCampaign(response?.data?.data?.save)
      setLoading(false)
    }
    catch (err) {
      console.error(err)
      setLoading(false)
    }
  }
  const fetchSavedOrganization = async () => {
    setLoading2(true)
    try {
      const response = await getSaveOrganizations();
      setOrganization(response?.data?.data?.save)
      setLoading2(false)
    }
    catch (err) {
      console.error(err)
      setLoading2(false)
    }
  }


  useEffect(() => {
    fetchSavedProducts()
    fetchSavedSuplier()
    fetchSavedService()
    fetchSavedProviders()
    fetchSavedCampaigns()
    fetchSavedOrganization()
  }, [])


  const handleTabClick = (tab) => {
    setActive(tab)
  }

  return (
    <>
      <div className="customer-dash-save-products-main">

        <div className="customer-dash-buttons-tabs-class">
          <button className={active === "ecommerce" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button' onClick={() => handleTabClick("ecommerce")} >E-Commerce</button>
          <button className={active === "servicessector" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button' onClick={() => handleTabClick("servicessector")} >Services Sector</button>
          <button className={active === "organizations" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button' onClick={() => handleTabClick("organizations")}>Organizations</button>
        </div>
        {/* save-pro */}
        {active === "ecommerce" ? (
          <div className="save-product-class-active">
            <div className="heading-side-customer-pro-dash">
              <div>
                <h2>Saved (Products)</h2>
                <p>{products?.length} Saved Products</p>
              </div>
              <div className="save-pro-btn-div">
                <button type='button' className='save-btn-cus-dash'>Clear All</button>
              </div>
            </div>
            {loading ?
              <LoadingComponents /> :
              (<div className="row mt-5">
                {products?.map((item) => (
                  <div className="col-md-4">
                    <div className='product-card'>
                      <Link to={`/productDetail?guid=${item?.product?.guid}`}><div className='product-card-wrapper'>
                        <div className='product-card-image'>
                          <img src={item?.product?.media[0]?.original_url} />
                        </div>
                        <div className='feature-product-card-content'>
                          <div className='prodduct-card-content-main'>
                            <div className='product-card-title'>
                              <h4>{item?.product?.title}</h4>
                            </div>
                            <div className='product-card-catagory'>
                              <h4>Category: {item?.product?.category?.name}</h4>
                            </div>
                            <div className="feature-product-card-add-to-cart">
                              <div className='product-card-price'>
                                <div className='product-card-actual-price' >
                                  <h4>${Math.floor(item?.product?.discount_price)}</h4>
                                </div>
                                <div className='product-card-cut-price' >
                                  <h4>${Math.floor(item?.product?.price)}</h4>
                                </div>
                              </div>
                              <div className='feature-prodduct-card-icon'>
                                <div className='feature-product-card-icon-wrapper'>
                                  <img src={cart} />
                                  <p>Add to Cart</p>
                                </div>
                              </div>
                            </div>

                          </div>


                        </div>
                      </div></Link>
                    </div>
                  </div>))}
              </div>)}

            <div className="heading-side-customer-pro-dash mt-5">
            <div>
              <h2>Saved (Suppliers)</h2>
              <p>{suplier?.length} Saved</p>
            </div>
            
            </div>
            <div className="row mt-5">
              <div className="col-md-12">
                {loading2 ? <LoadingComponents /> :
                  (<div className="supplier-cards-container">
                    {suplier?.map((item, index) => (
                      <div className="supplier-card-main" key={suplier?.id}>
                        <div className="supplier-card-top-sec">
                          <div className="supplier-card-name-plate d-flex">
                            <div className="supplier-profile-image">
                              <img src={item?.seller?.profile_image} alt="Profile" />
                            </div>
                            <div className="supplier-profile-name-city">
                              <h2>{item?.seller?.shop_name}</h2>
                              <h5>
                                {/* <img src={suplier?.seller?.flagImage} className="supplier-flag-image" alt="Flag" />*/} {item?.seller?.year} Years
                              </h5>
                            </div>
                          </div>
                          <div className="supplier-card-buttons">
                            <div className="f-service-detail-page-top-button">
                              {/* <button style={{ fontSize: "12px" }}>Contact</button> */}
                            </div>
                            <div className="f-service-detail-page-top-button">
                              <Link to={`/SuplierStore?guid=${item?.seller?.guid}`}>
                                <button style={{ fontSize: "12px" }}>View Store</button>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="supplier-card-bottm-sec">
                          <div className="supplier-card-rating-main">
                            <div className="supplier-rating">
                              <h3>
                                Rating and Review <img src={stars} alt="Stars" />
                              </h3>
                              <p>
                                {item?.seller?.rating}/5 <span>({item?.seller?.rating_count} Reviews)</span>
                              </p>
                            </div>
                            {/* <div className="supplier-response">
                            <h3>
                              Response Time <img src={time} alt="Response" />
                            </h3>
                            <p>{suplier.responseTime}</p>
                          </div> */}
                            <div className="supplier-deals">
                              <h3>Deals In</h3>
                              {item?.seller?.category?.map((item) => (
                                <p>{item?.name}</p>
                              ))}
                            </div>
                          </div>
                          <div className="supplier-card-images">
                            <div className="row">
                              {item?.seller?.products?.slice(0, 3).map((item, i) => (
                                <div className={`col-lg-${i === 2 ? 6 : 3}`} key={i}>
                                  <img src={item?.media?.[0]?.original_url} alt="Product" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>)}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {/* end */}
        {/* save-serv */}
        {active === "servicessector" ? (
          <div className="save-product-class-active">
            <div className="heading-side-customer-pro-dash">
            <div>
              <h2>Saved (Services)</h2>
              <p>{service?.length} Saved</p>
              </div>
              <div className="save-pro-btn-div">
                <button type='button' className='save-btn-cus-dash'>Clear All</button>
              </div>
              </div>
            {loading ? <LoadingComponents /> :
              (<div className="row mt-4 mb-3">
                {service?.map((item) => (
                  <div className="col-md-4">
                    <div className='service-card'>
                      <div className='service-card-image'>
                        <img src={item?.service?.cover_image} />
                        <div className='service-card-content'>
                          <div className='service-card-title-rating'>
                            <h1>{item?.service?.name}</h1>
                            <div className='service-card-rating'>
                              <img src={star} />
                              <h3> 4.3</h3>
                            </div>
                          </div>
                          <h2>Categories : {item?.service?.category?.name}</h2>
                          <p>
                            {isExpanded ? item?.service?.description : `${item?.service?.description?.slice(0, maxLength)}......`}
                            <button onClick={toggleReadMore} style={{ background: 'none', border: 'none', color: '#ff6464', cursor: 'pointer', fontFamily: 'Poppins' }}>
                              {isExpanded ? 'Read Less' : 'Read More'}
                            </button>
                          </p>
                          <div className='service-card-button'>
                            <button>Get Service</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>))}
              </div>)}

            <div className="heading-side-customer-pro-dash mt-5">
            <div>
              <h2>Saved (Providers)</h2>
              <p>{provider?.length} Saved</p>
            </div>
            </div>
            {loading2 ? <LoadingComponents /> :

              (<div className="row mt-2">
                {provider?.map((item) => (
                  <div className="col-md-4">
                    <div className='topRatedServiceCardMain' style={{ width: 'unset', }}>
                      <Link to="/Service-Seller-Profile" > <div className="top-rated-service-img">
                        <img src={item?.provider?.cover_image} />
                      </div></Link>
                      <div className="top-rated-card-profile">
                        <div className="row justify-content-space-between align-item-center">
                          <div className="col-lg-7">
                            <div className="top-ratet-user-details">
                              <img src={userr} />
                              <h3>{item?.provider?.store_name}</h3>
                              {/* <img src={flag} style={{ width: "25px", height: "20px" }} /> */}
                            </div>
                          </div>
                          <div className="col-lg-3">
                            {/* <button className='top-rated-button'>Top Rated</button> */}
                          </div>
                        </div>
                      </div>
                      <div className="top-rated-card-description">
                        <p>{item?.provider?.description}</p>
                      </div>
                      <div className="top-rated-card-rating">
                        <div className="top-rated-star">
                          <img src={star2} style={{ width: "18px" }} />
                        </div>
                        <div className="top-rated-rating">
                          <h4>{item?.provider?.rating}<span style={{ fontWeight: "100px", color: "gray", fontSize: "13px" }}>/5 (78)</span> </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>)}
          </div>
        ) : (
          <div></div>
        )}
        {/* end */}

        {/* save-serv */}
        {active === "organizations" ? (
          <div className="save-product-class-active">
            <div className="heading-side-customer-pro-dash">
            <div>

              <h2>Saved (Campaigns)</h2>
              <p>{campaign?.length} Saved</p>

            </div>
            <div className="save-pro-btn-div">
                <button type='button' className='save-btn-cus-dash'>Clear All</button>
              </div>
            </div>
            {loading ? <LoadingComponents /> :

              (<div className="row mt-4 mb-3">
                {campaign?.map((item, index) => (
                  <div className="col-md-4" key={index}>
                    <div className='Donation-card'>
                      <div className='donation-card-image'>
                        <img src={item?.campaign?.cover_image} />
                      </div>
                      <div className='donation-card-title'>
                        <h1>{item?.campaign?.name}</h1>
                      </div>
                      <div className='donation-card-content'>
                        <p>{item?.campaign?.desctiption}</p>
                      </div>
                      <div class="progress-bar-container">
                        <div class="progress-bar-fill" style={{ width: `${item?.campaign?.percentage}%` }}></div>
                        <div class="progress-bar-light-fill" style={{ width: `${item?.campaign?.percentage < 100 ? item?.campaign?.percentage + 8 : item?.campaign?.percentage}px` }}></div>
                      </div>
                      <div className='donation-card-price'>
                        <div className='donation-card-price-tag-one'>
                          <h1>${item?.campaign?.receive_amount}</h1>
                          <h4>Raised So far</h4>
                        </div>
                        <div className='donation-card-price-tag-two'>
                          <h1>${item?.campaign?.fund_required}</h1>
                          <h4>Amount Required</h4>
                        </div>
                      </div>
                      <div className='donation-card-button'>
                        <div className='service-card-button'>
                          <Link to={`/donation-food-drive?campaign_id=${item?.campaign?.id}`} > <button>Donate Now</button></Link>
                        </div>
                      </div>
                    </div>
                  </div>))}
              </div>)}

            <div className="heading-side-customer-pro-dash mt-5">
            <div>

              <h2>Saved (Organizations)</h2>
              <p>{organization?.length} Saved</p>

            </div>
            </div>
            <div className="row mt-2">
              {organization?.map((item, index) => (
                <div className="col-lg-4 my-4">
                  <div className="org-profile-card">

                    <div className='org-profile-name'>
                      <div className='org-profile-img'>
                        <img src={item?.company?.profile_image} />
                      </div>
                      <div className="org-profile-name">
                        <h2>{item?.company?.organization_name}</h2>
                      </div>
                    </div>

                    <div className="org-profile-data">
                      <p style={{ color: 'orangered', fontWeight: '600', }}>Loc icon:<span> {item?.company?.street_address}</span></p>
                      <p style={{ color: 'orangered', fontWeight: '600', }}>EIN icon:<span> {item?.company?.phone}</span></p>
                      <p style={{ color: 'orangered', fontWeight: '600', }}>web icon:<span> {item?.company?.website}</span></p>
                    </div>

                    <div className='vist-org-btn'>
                      <Link to={`/funding-cycle?id=${item?.company?.id}`} > <button>Follow</button> </Link>
                    </div>

                  </div>
                </div>))}

            </div>
            {/* <div className="row mt-2">
      <div className="col-md-9">
        <div className="mian-card-don-info-dash-cus">
          <div className='donation-card-image'>
            <img src={donacardimg} />
          </div>
          <div className="card-set-info-don-dash-cus">
            <div className='donation-card-title'>
              <h1>Food Drive in Wiscosin By Feed the Children</h1>
            </div>
            <div className='donation-card-content'>
              <p>FashionForAll is a platform that helps to make fashion accessible to all. It brings fashion to your doorstep!</p>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill"></div>
              <div class="progress-bar-light-fill"></div>
            </div>
            <div className='donation-card-price'>
              <div className='donation-card-price-tag-one'>
                <h1>$ 450.50</h1>
                <h4>Raised So far</h4>
              </div>
              <div className='donation-card-price-tag-two'>
                <h1>$ 450.50</h1>
                <h4>Amount Required</h4>
              </div>
            </div>
          </div>
        </div>


      </div>

    </div> */}
          </div>
        ) : (
          <div></div>
        )}
        {/* end */}
      </div>
    </>
  )
}

export default CustomerDashSaveproduct




// {organization?.map((item, index) => (
//   <div className="col-md-9" key={index}>
//     <div className="funding-cycle-card-main-cus-dash">
//       <div className="organization-card-cus-dash-dona">
//         <div className="organization-card-cus-dash-information">
//           <img width={130.5} src={item?.company?.profile_image} alt="" srcset="" />
//           <h2>{item?.company?.organization_name}</h2>
//         </div>
//         <div className="organization-card-cus-dash-adress">
//           <p style={{ color: 'orangered', fontWeight: '600', }}>LOCATION:<span> {item?.company?.street_address}<br />EIN: {item?.company?.phone}</span></p>
//           <p style={{ color: 'orangered', fontWeight: '600', }}>WEBSITE:<span> {item?.company?.website}</span></p>
//           {/* <p style={{ color: 'orangered', fontWeight: '600', }}>FACEBOOK:<span> Facebook Page</span></p> */}
//           {/* <p style={{ color: 'orangered', fontWeight: '600', }}>TWITTER:<span> @GlobalGiving</span></p> */}
//         </div>
//       </div>

//     </div>
//   </div>))}
