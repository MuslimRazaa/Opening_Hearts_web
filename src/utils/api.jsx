import axios from 'axios';

// export const BASE_URL = process.env.REACT_APP_BASE_URL;
// export const STRIPE_PUBLISH_KEY = process.env.REACT_APP_STRIPE_PUBLISH_KEY;

export const BASE_URL= "https://openheartsbackend.testingwebsitelink.com/api/"
export const STRIPE_PUBLISH_KEY= "pk_test_51HiCo6EHLDkHxi1YwwTc185yQTBuRIZktAiqLEus7vFq1kKxsrir4UlAUVCP6rRokopLAFCYY1DKowhrjZuLhyv200gfW8PqZc"


const token = localStorage.getItem('token'); // Get the token from localStorage
const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object
// const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    


// Function to register user
export const registerUser = async (userData) => await axios.post(`${BASE_URL}auth/register`, userData);

export const saveProduct = async (data) => await axios.post(`${BASE_URL}save/product`, data , {headers});

export const productWishlist = async (data) => await axios.post(`${BASE_URL}favourite/store`, data , {headers});

export const verifyOtp = async (data) => await axios.post(`${BASE_URL}auth/verify-otp`, data);

export const LoginUser = async (data) => await axios.post(`${BASE_URL}auth/login`, data);

export const ForgetPassword = async (data) => await axios.post(`${BASE_URL}auth/send-otp`, data);

export const ChangePassword = async (data) => await axios.post(`${BASE_URL}auth/reset-password`, data);

export const allFeaturedProducts = async (brand, min, max, cat, page, selectedCountry, tabFilter) => await axios.get(`${BASE_URL}products/filter-product?brand=${brand}&min_price=${min}&max_price=${max}&category=${cat}&page=${page}&city=${selectedCountry}&type=${tabFilter}`);

export const allFeaturedProductsBanner = async () => await axios.get(`${BASE_URL}banner/product`);
export const allFeaturedServiceBanner = async () => await axios.get(`${BASE_URL}banner/service`);

// top rated products 
export const homeBanner = async () => await axios.get(`${BASE_URL}banner`);

// top rated categories 
export const topRatedCategories = async () => await axios.get(`${BASE_URL}categories/home-category`);

// top rated products 
export const topRatedProducts = async (page, page_size) => await axios.get(`${BASE_URL}products/top-selling?page=${page}&page_size=${page_size}`);
// top rated stores 
export const topRatedStores = async () => await axios.get(`${BASE_URL}home/top-rated-store`);

export const topRatedService = async () => await axios.get(`${BASE_URL}service/popular-services`);

// top rated stores 
export const topRatedCampaings = async () => await axios.get(`${BASE_URL}organization-user/campaigns`);

// product all categories
export const productAllCategories = async () => await axios.get(`${BASE_URL}categories`);

export const popularService = async () => await axios.get(`${BASE_URL}service/popular-services`);

export const topRatedServiceProvider = async () => await axios.get(`${BASE_URL}service/top-rated-service-provider`);

export const serviceAllCategories = async () => await axios.get(`${BASE_URL}categories/service`);

export const organizationAllCategories = async () => await axios.get(`${BASE_URL}organization-category`);

export const fetchProductPageSuplier = async () => await axios.get(`${BASE_URL}products/filter-supplires`);

export const fetchVendorStore = async (id) => await axios.get(`${BASE_URL}user-seller/about/${id}`, {headers});

export const fetchVendorRatings = async (id) => await axios.get(`${BASE_URL}user-seller/feedback/${id}`);

export const fetchVendorStoreProducts = async (id) => await axios.get(`${BASE_URL}user-seller/products/${id}?page=${1}`);

export const productDetailApi = async (id) => await axios.get(`${BASE_URL}products/getProductById/${id}`, {headers});

export const productRatingAndReviews = async (id) => await axios.get(`${BASE_URL}products/product-feedback?product_id=${id}`);

export const relatedproducts = async (id) => await axios.get(`${BASE_URL}products/related/${id}`);

export const removeCart = async (id) => await axios.post(`${BASE_URL}cart/delete?cart_id=${id}`);

export const serviceDetail = async (id) => await axios.get(`${BASE_URL}service/service-by-id/${id}`, {headers});

export const getCampaign = async (id) => await axios.get(`${BASE_URL}organization-user/get-by-id-campaign?campaign_id=${id}`, {headers});

export const ourPartners = async () => await axios.get(`${BASE_URL}organization-user/partners`);

export const  newsAndMedia = async () => await axios.get(`${BASE_URL}organization-user/news-media`);

export const  donationsHomeOrganization = async () => await axios.get(`${BASE_URL}organization-user/organization`);

export const  getChatList = async (type) => await axios.get(`${BASE_URL}chat/get-chat-list?type=${type}`, {headers});

export const  getCreatedChatList = async (id, type, get_status) => await axios.get(`${BASE_URL}chat/getChatListBUid?id=${id}&type=${type}&status=${get_status}`, {headers});

export const  createChatRoom = async (data) => await axios.post(`${BASE_URL}chat/createChatRooms`, data , {headers});

export const  askForRefund = async (formdata) => await axios.post(`${BASE_URL}order/refund`, formdata , {headers});

export const  addBank = async (data) => await axios.post(`${BASE_URL}account/store-update`, data , {headers});

export const  getBank = async () => await axios.get(`${BASE_URL}account?type=user`, {headers});

export const  withdrawReq = async (data) => await axios.post(`${BASE_URL}user-dashboard/Withdraw-request`, data ,  {headers});

export const  walletValues = async () => await axios.get(`${BASE_URL}user-dashboard/earning` , {headers});

export const  ChatBox = async (id) => await axios.get(`${BASE_URL}chat/getById?room_id=${id}` , {headers});

export const  sendMessage = async (data) => await axios.post(`${BASE_URL}chat/sendMessage` , data,  {headers});

// export const  userDashboardRecentOrdersCurrent = async () => await axios.get(`${BASE_URL}user-dashboard/recent-order?type=pending&date=${currentDate}` , {headers});
// export const  userDashboardRecentServicesCurrent = async () => await axios.get(`${BASE_URL}user-dashboard/recent-order-service?type=pending&date=${currentDate}` , {headers});
// export const  userDashboardRecentDonationsCurrent = async () => await axios.get(`${BASE_URL}user-dashboard/recent-order-donation?date=${currentDate}` , {headers});

export const  userDashboardRecentOrders = async (tab) => await axios.get(`${BASE_URL}user-dashboard/recent-order?type=${tab}` , {headers});
export const  userDashboardRecentServices = async (tab) => await axios.get(`${BASE_URL}user-dashboard/recent-order-service?type=${tab}` , {headers});
export const  userDashboardRecentDonations = async () => await axios.get(`${BASE_URL}user-dashboard/recent-order-donation` , {headers});

export const  userDashboardProductCount = async () => await axios.get(`${BASE_URL}user-dashboard/total-order` , {headers});
export const  userDashboardServiceCount = async () => await axios.get(`${BASE_URL}user-dashboard/total-order-service` , {headers});
export const  userDashboardDonationsCount = async () => await axios.get(`${BASE_URL}user-dashboard/total-order-donation` , {headers});

export const  productOrderDetail = async (id) => await axios.get(`${BASE_URL}user-dashboard/order-get-by-id/${id}` , {headers});
export const  productOrderDetailService = async (id) => await axios.get(`${BASE_URL}user-dashboard/order-get-by-id-service/${id}` , {headers});

export const  getAddress = async () => await axios.get(`${BASE_URL}address` , {headers});

export const  addOrupdateAddress = async (data) => await axios.post(`${BASE_URL}address/store-update` , data , {headers});

export const  deleteAddress = async (id) => await axios.delete(`${BASE_URL}address/delete/${id}`, {headers});

export const  getDefaultAddress = async () => await axios.get(`${BASE_URL}address/default`, {headers});

export const  setDefaultAddress = async (id) => await axios.post(`${BASE_URL}address/set-default/${id}`, {} , {headers});

export const  changeInAppPassword = async (data) => await axios.post(`${BASE_URL}user/update-password`, data , {headers});

export const  updateProfile = async (data) => await axios.post(`${BASE_URL}user/update-profile`, data , {headers});

export const  getProfileDetails = async () => await axios.get(`${BASE_URL}user/profile`,  {headers});


// save
export const  getSaveProducts = async () => await axios.get(`${BASE_URL}save/product-list?type=1`,  {headers});
export const  getSaveSuppliers = async () => await axios.get(`${BASE_URL}save/product-list?type=2`,  {headers});

export const  getSaveService = async () => await axios.get(`${BASE_URL}save/service-list?type=1`,  {headers});
export const  getSaveProviders = async () => await axios.get(`${BASE_URL}save/service-list?type=2`,  {headers});

export const  getSaveCampaign = async () => await axios.get(`${BASE_URL}save/organization-list?type=1`,  {headers});
export const  getSaveOrganizations = async () => await axios.get(`${BASE_URL}save/organization-list?type=2`,  {headers});

// recent
export const  getRecentProducts = async () => await axios.get(`${BASE_URL}recent_view/product-get`,  {headers});
export const  DeleteProducts = async () => await axios.post(`${BASE_URL}recent_view/product-delete`, "", {headers});

export const  getRecentVendors = async () => await axios.get(`${BASE_URL}recent_view/vendor-get`,  {headers});
export const  DeleteVendors = async () => await axios.post(`${BASE_URL}recent_view/vendor-delete`,"",  {headers});

export const  getRecentServiceProviders = async () => await axios.get(`${BASE_URL}recent_view/service-provider-get`,  {headers});
export const  DeleteServiceProviders = async () => await axios.post(`${BASE_URL}recent_view/service-provider-delete`,"",  {headers});

export const  getRecentCampaign = async () => await axios.get(`${BASE_URL}recent_view/campaign-get`,  {headers});
export const  DeleteCampaign = async () => await axios.post(`${BASE_URL}recent_view/campaign-delete`,"",  {headers});

export const  getRecentOrganization = async () => await axios.get(`${BASE_URL}recent_view/organization-get`,  {headers});
export const  DeleteOrganization = async () => await axios.post(`${BASE_URL}recent_view/organization-delete`,"",  {headers});

// wishlist
export const  getWishlistProduct = async () => await axios.get(`${BASE_URL}favourite?type=1`,  {headers});

export const checkOutCart = async () => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object

  try {
    const response = await axios.get(`${BASE_URL}cart/checkout`, { headers });
    return response; // Return the response from the API
  } catch (error) {
    console.error('Error during checkout:', error); // Handle the error
    throw error;
  }
};

export const checkOutServiceCart = async () => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object

  try {
    const response = await axios.get(`${BASE_URL}service-cart/get-cart`, { headers });
    return response; // Return the response from the API
  } catch (error) {
    console.error('Error during checkout:', error); // Handle the error
    throw error;
  }
};

export const checkOutBothPrice = async () => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object

  try {
    const response = await axios.get(`${BASE_URL}cart/seller-product-cart`, { headers });
    return response; // Return the response from the API
  } catch (error) {
    console.error('Error during checkout:', error); // Handle the error
    throw error;
  }
};

export const buyNowGetCart = async () => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object

  try {
    const response = await axios.get(`${BASE_URL}buy-now/get-cart`, { headers });
    return response; // Return the response from the API
  } catch (error) {
    console.error('Error during checkout:', error); // Handle the error
    throw error;
  }
};

export const order = async (data) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object

  try {
    // Change axios.get to axios.post and include data in the body
    const response = await axios.post(`${BASE_URL}order`, data, { headers });
    return response; // Return the response from the API
  } catch (error) {
    console.error('Error during checkout:', error); // Handle the error
    throw error;
  }
};

export const OrganizationHome = async (id) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object
  try {
    // Change axios.get to axios.post and include data in the body
    const response = await axios.get(`${BASE_URL}organization-home/home?store_id=${id}`, { headers });
    return response; // Return the response from the API
  } catch (error) {
    console.error('Error during checkout:', error); // Handle the error
    throw error;
  }
};

export const OrganizationHomeCampaigns = async (id) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object
  try {
    // Change axios.get to axios.post and include data in the body
    const response = await axios.get(`${BASE_URL}organization-home/campaigns?store_id=${id}`, { headers });
    return response; // Return the response from the API
  } catch (error) {
    console.error('Error during checkout:', error); // Handle the error
    throw error;
  }
};

export const OrganizationEventsRecents = async (id) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object
  try {
    // Change axios.get to axios.post and include data in the body
    const response = await axios.get(`${BASE_URL}organization-home/events?store_id=${id}&type=recent`, { headers });
    return response; // Return the response from the API
  } catch (error) {
    console.error('Error during checkout:', error); // Handle the error
    throw error;
  }
};

export const OrganizationEventsUpcommimg = async (id) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object
  try {
    // Change axios.get to axios.post and include data in the body
    const response = await axios.get(`${BASE_URL}organization-home/events?store_id=${id}&type=up-coming`, { headers });
    return response; // Return the response from the API
  } catch (error) {
    console.error('Error during checkout:', error); // Handle the error
    throw error;
  }
};

export const OrganizationEventDetail = async (id) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object
  try {
    // Change axios.get to axios.post and include data in the body
    const response = await axios.get(`${BASE_URL}organization-home/event-detail?event_id=${id}`, { headers });
    return response; // Return the response from the API
  } catch (error) {
    console.error('Error during checkout:', error); // Handle the error
    throw error;
  }
};

export const DonationCheckout = async (data) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object

  try {
    // Change axios.get to axios.post and include data in the body
    const response = await axios.post(`${BASE_URL}organization-user/donation`, data, { headers });
    return response; // Return the response from the API
  } catch (error) {
    console.error('Error during checkout:', error); // Handle the error
    throw error;
  }
};

export const orderService = async (data) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object

  try {
    // Change axios.get to axios.post and include data in the body
    const response = await axios.post(`${BASE_URL}buy-now/checkout`, data, { headers });
    return response; // Return the response from the API
  } catch (error) {
    console.error('Error during checkout:', error); // Handle the error
    throw error;
  }
};

export const addServiceToCart = async (data) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object

  try {
    // Change axios.get to axios.post and include data in the body
    const response = await axios.post(`${BASE_URL}service-cart/add-to-cart`, data , { headers });
    return response; // Return the response from the API
  } catch (error) {
    console.error('Error during checkout:', error); // Handle the error
    throw error;
  }
};

export const buyNowService = async (data) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object

  try {
    // Change axios.get to axios.post and include data in the body
    const response = await axios.post(`${BASE_URL}buy-now/add-to-cart`, data , { headers });
    return response; // Return the response from the API
  } catch (error) {
    console.error('Error during checkout:', error); // Handle the error
    throw error;
  }
};

export const removeServiceCart = async (id) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object

  try {
    // Change axios.get to axios.post and include data in the body
    const response = await axios.post(`${BASE_URL}service-cart/remove-cart-by-id/${id}`, {},  { headers });
    return response; // Return the response from the API
  } catch (error) {
    console.error('Error during checkout:', error); // Handle the error
    throw error;
  }
};


export const addToCartApi = async (formData) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object


  await axios.post(`${BASE_URL}cart/store-update`, formData, { headers });

}




