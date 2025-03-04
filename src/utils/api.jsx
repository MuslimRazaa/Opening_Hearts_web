import axios from 'axios';
import axiosInstance from './axiosIntercet';

// export const BASE_URL = process.env.REACT_APP_BASE_URL;
// export const STRIPE_PUBLISH_KEY = process.env.REACT_APP_STRIPE_PUBLISH_KEY;

export const BASE_URL= "https://openheartsbackend.testingwebsitelink.com/api/"
export const STRIPE_PUBLISH_KEY= "pk_test_51HiCo6EHLDkHxi1YwwTc185yQTBuRIZktAiqLEus7vFq1kKxsrir4UlAUVCP6rRokopLAFCYY1DKowhrjZuLhyv200gfW8PqZc"


  // const token = localStorage.getItem('token'); // Get the token from localStorage
  // const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object



    const token = localStorage.getItem('token'); // Get the token from localStorage
    const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object  
  


  console.log("fetch this page ")

// Function to register user
export const registerUser = async (userData) => await axiosInstance.post(`${BASE_URL}auth/register`, userData);

export const saveProduct = async (data) => await axiosInstance.post(`${BASE_URL}save/product`, data);

export const productWishlist = async (data) => await axiosInstance.post(`${BASE_URL}favourite/store`, data , );

export const verifyOtp = async (data) => await axiosInstance.post(`${BASE_URL}auth/verify-otp`, data);

// export const LoginUser = async (data) => await axiosInstance.post(`${BASE_URL}auth/login`, data);
export const LoginUser = async (data) => {
  return await axiosInstance.post("/auth/login", data);
};

export const ForgetPassword = async (data) => await axiosInstance.post(`${BASE_URL}auth/send-otp`, data);

export const ChangePassword = async (data) => await axiosInstance.post(`${BASE_URL}auth/reset-password`, data);

export const allFeaturedProducts = async (brand, min, max, cat, page, selectedCountry, tabFilter) => await axiosInstance.get(`${BASE_URL}products/filter-product?brand=${brand}&min_price=${min}&max_price=${max}&category=${cat}&page=${page}&city=${selectedCountry}&type=${tabFilter}`);

export const allFeaturedProductsBanner = async () => await axiosInstance.get(`${BASE_URL}banner/product`);
export const allFeaturedServiceBanner = async () => await axiosInstance.get(`${BASE_URL}banner/service`);

// top rated products 
export const homeBanner = async () => await axios.get(`${BASE_URL}banner`, {headers});

// top rated categories 
export const topRatedCategories = async () => await axiosInstance.get(`${BASE_URL}categories/home-category`);

// top rated products 
export const topRatedProducts = async (page, page_size) => await axiosInstance.get(`${BASE_URL}products/top-selling?page=${page}&page_size=${page_size}`);
// top rated stores 
export const topRatedStores = async () => await axiosInstance.get(`${BASE_URL}home/top-rated-store`);

export const topRatedService = async () => await axiosInstance.get(`${BASE_URL}service/popular-services`);

// top rated stores 
export const topRatedCampaings = async () => await axiosInstance.get(`${BASE_URL}organization-user/campaigns`);

// product all categories
export const productAllCategories = async () => await axiosInstance.get(`${BASE_URL}categories`);

export const popularService = async () => await axiosInstance.get(`${BASE_URL}service/popular-services`);

export const topRatedServiceProvider = async () => await axiosInstance.get(`${BASE_URL}service/top-rated-service-provider`);

export const serviceAllCategories = async () => await axiosInstance.get(`${BASE_URL}categories/service`);

export const organizationAllCategories = async () => await axiosInstance.get(`${BASE_URL}organization-category`);

export const fetchProductPageSuplier = async () => await axiosInstance.get(`${BASE_URL}products/filter-supplires`);

export const fetchVendorStore = async (id) => await axiosInstance.get(`${BASE_URL}user-seller/about/${id}`, );

export const fetchVendorRatings = async (id) => await axiosInstance.get(`${BASE_URL}user-seller/feedback/${id}`);

export const fetchVendorStoreProducts = async (id) => await axiosInstance.get(`${BASE_URL}user-seller/products/${id}?page=${1}`);

export const productDetailApi = async (id) => await axiosInstance.get(`${BASE_URL}products/getProductById/${id}`, );

export const productRatingAndReviews = async (id) => await axiosInstance.get(`${BASE_URL}products/product-feedback?product_id=${id}`);

export const relatedproducts = async (id) => await axiosInstance.get(`${BASE_URL}products/related/${id}`);

export const removeCart = async (id) => await axiosInstance.post(`${BASE_URL}cart/delete?cart_id=${id}`);

export const serviceDetail = async (id) => await axiosInstance.get(`${BASE_URL}service/service-by-id/${id}`, );

export const getCampaign = async (id) => await axiosInstance.get(`${BASE_URL}organization-user/get-by-id-campaign?campaign_id=${id}`, );

export const ourPartners = async () => await axiosInstance.get(`${BASE_URL}organization-user/partners`);

export const  newsAndMedia = async () => await axiosInstance.get(`${BASE_URL}organization-user/news-media`);

export const  donationsHomeOrganization = async () => await axiosInstance.get(`${BASE_URL}organization-user/organization`);

export const  getChatList = async (type) => await axiosInstance.get(`${BASE_URL}chat/get-chat-list?type=${type}`, );

export const  getCreatedChatList = async (id, type, get_status) => await axiosInstance.get(`${BASE_URL}chat/getChatListBUid?id=${id}&type=${type}&status=${get_status}`, );

export const  createChatRoom = async (data) => await axiosInstance.post(`${BASE_URL}chat/createChatRooms`, data );

export const  askForRefund = async (formdata) => await axiosInstance.post(`${BASE_URL}order/refund`, formdata );

export const  addBank = async (data) => await axiosInstance.post(`${BASE_URL}account/store-update`, data );

export const  getBank = async () => await axiosInstance.get(`${BASE_URL}account?type=user`);

export const  withdrawReq = async (data) => await axiosInstance.post(`${BASE_URL}user-dashboard/Withdraw-request`, data );

export const  walletValues = async () => await axiosInstance.get(`${BASE_URL}user-dashboard/earning` );

export const  ChatBox = async (id) => await axiosInstance.get(`${BASE_URL}chat/getById?room_id=${id}`);

export const  sendMessage = async (data) => await axiosInstance.post(`${BASE_URL}chat/sendMessage` , data);

// export const  userDashboardRecentOrdersCurrent = async () => await axiosInstance.get(`${BASE_URL}user-dashboard/recent-order?type=pending&date=${currentDate}` , );
// export const  userDashboardRecentServicesCurrent = async () => await axiosInstance.get(`${BASE_URL}user-dashboard/recent-order-service?type=pending&date=${currentDate}` , );
// export const  userDashboardRecentDonationsCurrent = async () => await axiosInstance.get(`${BASE_URL}user-dashboard/recent-order-donation?date=${currentDate}` , );

export const  userDashboardRecentOrders = async (tab) => await axiosInstance.get(`${BASE_URL}user-dashboard/recent-order?type=${tab}`);

export const  userDashboardRecentServices = async (tab) => await axiosInstance.get(`${BASE_URL}user-dashboard/recent-order-service?type=${tab}`);
export const  userDashboardRecentDonations = async () => await axiosInstance.get(`${BASE_URL}user-dashboard/recent-order-donation`);

export const  userDashboardProductCount = async () => await axiosInstance.get(`${BASE_URL}user-dashboard/total-order` );
export const  userDashboardServiceCount = async () => await axiosInstance.get(`${BASE_URL}user-dashboard/total-order-service`);
export const  userDashboardDonationsCount = async () => await axiosInstance.get(`${BASE_URL}user-dashboard/total-order-donation`);

export const  productOrderDetail = async (id) => await axiosInstance.get(`${BASE_URL}user-dashboard/order-get-by-id/${id}` );
export const  productOrderDetailService = async (id) => await axiosInstance.get(`${BASE_URL}user-dashboard/order-get-by-id-service/${id}` );

export const  getAddress = async () => await axiosInstance.get(`${BASE_URL}address` );

export const  addOrupdateAddress = async (data) => await axiosInstance.post(`${BASE_URL}address/store-update` , data);

export const  deleteAddress = async (id) => await axiosInstance.delete(`${BASE_URL}address/delete/${id}`);

export const  getDefaultAddress = async () => await axiosInstance.get(`${BASE_URL}address/default`, );

export const  setDefaultAddress = async (id) => await axiosInstance.post(`${BASE_URL}address/set-default/${id}`, {} );

export const  changeInAppPassword = async (data) => await axiosInstance.post(`${BASE_URL}user/update-password`, data );

export const  updateProfile = async (data) => await axiosInstance.post(`${BASE_URL}user/update-profile`, data);

export const  getProfileDetails = async () => await axiosInstance.get(`${BASE_URL}user/profile`);


// save
export const  getSaveProducts = async () => await axiosInstance.get(`${BASE_URL}save/product-list?type=1`);
export const  getSaveSuppliers = async () => await axiosInstance.get(`${BASE_URL}save/product-list?type=2`);

export const  getSaveService = async () => await axiosInstance.get(`${BASE_URL}save/service-list?type=1`);
export const  getSaveProviders = async () => await axiosInstance.get(`${BASE_URL}save/service-list?type=2` );

export const  getSaveCampaign = async () => await axiosInstance.get(`${BASE_URL}save/organization-list?type=1` );
export const  getSaveOrganizations = async () => await axiosInstance.get(`${BASE_URL}save/organization-list?type=2` );

// recent
export const  getRecentProducts = async () => await axiosInstance.get(`${BASE_URL}recent_view/product-get`  );
export const  DeleteProducts = async () => await axiosInstance.post(`${BASE_URL}recent_view/product-delete`, "");

export const  getRecentVendors = async () => await axiosInstance.get(`${BASE_URL}recent_view/vendor-get` );
export const  DeleteVendors = async () => await axiosInstance.post(`${BASE_URL}recent_view/vendor-delete`,"" );

export const  getRecentServiceProviders = async () => await axiosInstance.get(`${BASE_URL}recent_view/service-provider-get` );
export const  DeleteServiceProviders = async () => await axiosInstance.post(`${BASE_URL}recent_view/service-provider-delete`,"" );

export const  getRecentCampaign = async () => await axiosInstance.get(`${BASE_URL}recent_view/campaign-get`);
export const  DeleteCampaign = async () => await axiosInstance.post(`${BASE_URL}recent_view/campaign-delete`,"" );

export const  getRecentOrganization = async () => await axiosInstance.get(`${BASE_URL}recent_view/organization-get`  );
export const  DeleteOrganization = async () => await axiosInstance.post(`${BASE_URL}recent_view/organization-delete`,"" );

// wishlist
export const  getWishlistProduct = async () => await axiosInstance.get(`${BASE_URL}favourite?type=1`,  );

export const checkOutCart = async () => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object

  try {
    const response = await axiosInstance.get(`${BASE_URL}cart/checkout`);
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
    const response = await axiosInstance.get(`${BASE_URL}service-cart/get-cart`);
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
    const response = await axiosInstance.get(`${BASE_URL}cart/seller-product-cart`);
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
    const response = await axiosInstance.get(`${BASE_URL}buy-now/get-cart`);
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
    // Change axiosInstance.get to axiosInstance.post and include data in the body
    const response = await axiosInstance.post(`${BASE_URL}order`, data);
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
    // Change axiosInstance.get to axiosInstance.post and include data in the body
    const response = await axiosInstance.get(`${BASE_URL}organization-home/home?store_id=${id}`, { headers });
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
    // Change axiosInstance.get to axiosInstance.post and include data in the body
    const response = await axiosInstance.get(`${BASE_URL}organization-home/campaigns?store_id=${id}`);
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
    // Change axiosInstance.get to axiosInstance.post and include data in the body
    const response = await axiosInstance.get(`${BASE_URL}organization-home/events?store_id=${id}&type=recent`);
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
    // Change axiosInstance.get to axiosInstance.post and include data in the body
    const response = await axiosInstance.get(`${BASE_URL}organization-home/events?store_id=${id}&type=up-coming`);
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
    // Change axiosInstance.get to axiosInstance.post and include data in the body
    const response = await axiosInstance.get(`${BASE_URL}organization-home/event-detail?event_id=${id}`);
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
    // Change axiosInstance.get to axiosInstance.post and include data in the body
    const response = await axiosInstance.post(`${BASE_URL}organization-user/donation`, data);
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
    // Change axiosInstance.get to axiosInstance.post and include data in the body
    const response = await axiosInstance.post(`${BASE_URL}buy-now/checkout`, data);
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
    // Change axiosInstance.get to axiosInstance.post and include data in the body
    const response = await axiosInstance.post(`${BASE_URL}service-cart/add-to-cart`, data );
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
    // Change axiosInstance.get to axiosInstance.post and include data in the body
    const response = await axiosInstance.post(`${BASE_URL}buy-now/add-to-cart`, data );
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
    // Change axiosInstance.get to axiosInstance.post and include data in the body
    const response = await axiosInstance.post(`${BASE_URL}service-cart/remove-cart-by-id/${id}`, {});
    return response; // Return the response from the API
  } catch (error) {
    console.error('Error during checkout:', error); // Handle the error
    throw error;
  }
};


export const addToCartApi = async (formData) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header as an object


  await axiosInstance.post(`${BASE_URL}cart/store-update`, formData);

}




