

import axios from 'axios';

const createBackendServer = (baseURL) => {
  const api = axios.create({
    baseURL: `${baseURL}`,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60 * 1000,
  });


  // Add a request interceptor
  api.interceptors.request.use(
    (config) => {
      const logintoken = localStorage.getItem('token');
      if (logintoken) {
        config.headers['Authorization'] = `Bearer ${logintoken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );


  const updatePassword = async (body) => await api.post('user/update-password', body);
  const getProfile = async () => await api.get('user/profile');
  const updateProfile = async (body) => await api.post('user/update-profile', body);
  const getAddresses = async () => await api.get('address');
  const getAddressById = async (id) => await api.get(`address/getById/${id}`);
  const getDefaultAddress = async () => await api.get(`address/default`);
  const deleteAddress = async (id) => await api.get(`address/delete/${id}`);
  const setDefaultAddress = async (id) => await api.get(`address/set-default/${id}`);
  const createAndUpdateAddress = async (body) => await api.post(`address/store-update`, body);
  const checkOutCart = async () => await api.get(`cart/checkout`);
  const updateQuantity = async (body) => await api.post(`cart/update-quantity`, body);
  const register = async (body) => await api.post(`auth/register`, body);
  const resendOtp = async (body) => await api.post(`auth/send-otp`, body);
  const verifyOtp = async (body) => await api.post(`auth/verify-otp`, body);
  const subscriptionPlans = async (type) => await api.get(`plan?type=${type}`);
  const subscriptionBuyPlans = async (type) => await api.get(`subscription/buy-plan?type=${type}`);
  const subscriptionPlanById = async (id) => await api.get(`plan/show/${id}`);
  const buySubscription = async (body) => await api.post(`subscription/buy`, body);
  const updateSubscription = async (body) => await api.post(`subscription/update`, body);
  const getAllCategories = async (type) => await api.get(`categories/all?type=${type}`);
  const createAndUpdateStore = async (body) => await api.post(`seller/store-or-update-seller-data`, body);
  const getProductDashboard = async () => await api.get(`product-dashboard/total-order`);
  const getSellerCategory = async () => await api.get(`seller/get-seller-category`);
  const getSubCategories = async (id) => await api.get(`categories/sub-category-web/${id}`);
  const getBrands = async () => await api.get(`brands/web`);
  const getCategoriesAttributes = async (guid) => await api.get(`categories/attributes/${guid}`);
  const storeColorAttributeImage = async (body) => await api.post(`categories/store-temp-images`, body);


  const getNotificationSetting = async () => await api.get(`user/getNotificationSetting`);
  const updateNotificationSetting = async (body) => await api.post(`user/updateNotificationSetting`, body);


  const getSellerProducts = async (guid, page, page_size) => await api.get(`user-seller/seller-products/${guid}?page=${page}&page_size=${page_size}`);
  const getSellerProductById = async (guid, id) => await api.get(`user-seller/seller-product/${guid}?id=${id}`);
  const createProduct = async (body) => await api.post(`products/store`, body);
  const updateProduct = async (body) => await api.post(`products/update`, body);
  const updateProductStatus = async (body) => await api.post(`products/update-status`, body);

  const getSellerData = async () => await api.get(`seller/get-seller-data`);

  const helpAndSupport = async (body) => await api.post(`user/help`, body);


  //Offers and promotions

  const getOffers = async (banner_type, page, page_size) => await api.get(`banner?banner_type=${banner_type}&page=${page}&page_size=${page_size}`);
  const createAndUpdateOffer = async (body) => await api.post(`banner/store-update-featured`, body);
  const deleteOffer = async (body) => await api.post(`banner/delete`, body);
  const updateOfferStatus = async (body) => await api.post(`banner/status-update`, body);

  //coupon
  const getCoupons = async () => await api.get(`coupon`);
  const getCouponById = async (id) => await api.get(`coupon/getById/${id}`);
  const updateCouponStatus = async (id, body) => await api.post(`coupon/updateStatus/${id}`, body);
  const deleteCoupon = async (id) => await api.post(`coupon/deleteCoupon/${id}`);
  const createCoupon = async (body) => await api.post(`coupon/store`, body);
  const updateCoupon = async (id, body) => await api.post(`coupon/update/${id}`, body);

  //Order Managment

  const productRecentOrder = async () => await api.get(`product-dashboard/recent-order`);
  const productOrderManagment = async (type, search, start_date, end_date, page, page_size) => await api.get(`product-dashboard/order-management?type=${type}&search=${search}&start_date=${start_date}&end_date=${end_date}&page=${page}&page_size=${page_size}`);
  const getProductOrderById = async (id) => await api.get(`product-dashboard/order-get-by-id/${id}`);
  const updateProductOrderStatusById = async (id, body) => await api.post(`seller/order/update-status/${id}`, body);
  const updateProductRefundStatusById = async (body) => await api.post(`product-dashboard/status-refund`, body);
  const ProductOrderManagmentChart = async (type) => await api.get(`product-dashboard/seller-ecom-product-chart?type=${type}`);


  //product chat 
  const getMessagesById = async (room_id) => await api.get(`chat/getById?room_id=${room_id}`);
  const getProductChat = async (id, status) => await api.get(`chat/getChatListBUid?id=${id}&status=${status}`);
  const sendChatMessage = async (body) => await api.post(`chat/sendMessage`, body);
  const createChatRooms = async (body) => await api.post(`chat/createChatRooms`, body);

  //Account
  const getAccounts = async (type) => await api.get(`account?type=${type}`);
  const createAndUpdateAccount = async (body) => await api.post(`account/store-update`, body);

  //Wallet
  const getWalletEarning = async () => await api.get(`product-dashboard/earning`);
  const getOrganizationWalletEarning = async () => await api.get(`organization-dashboard/earning`);
  const getWalletTransactions = async (page, page_size) => await api.get(`product-dashboard/withdraw-transaction-list?page=${page}&page_size=${page_size}`);
  const getOrganizationWalletTransactions = async (page, page_size) => await api.get(`organization-dashboard/withdraw-transaction-list?page=${page}&page_size=${page_size}`);
  const createWithdrawRequest = async (body) => await api.post(`product-dashboard/withdraw-request`, body);
  const createDonationWithdrawRequest = async (body) => await api.post(`organization-dashboard/withdraw-request`, body);

  //Service apis
  const createStore = async (body) => await api.post(`service-store/store`, body);
  const updateStore = async (body) => await api.post(`service-store/store-update`, body);
  const getStore = async () => await api.get(`service-store`);

  const getServiceDashboard = async () => await api.get(`service-dashboard/total-order`);

  const getServiceCategory = async (type) => await api.get(`seller/get-seller-category?type=${type}`);
  const getServiceSubCategories = async (id, type) => await api.get(`categories/sub-category-web/${id}?type=${type}`);

  const createService = async (body) => await api.post(`service-product/store`, body);
  const updateService = async (id, body) => await api.post(`service-product/update/${id}`, body);
  const getSellerService = async (page, page_size) => await api.get(`service-product?page=${page}&page_size=${page_size}`);
  const getSellerServiceById = async (id) => await api.get(`service-product/get-by-id/${id}`);
  const updateSellerServiceStatus = async (id) => await api.post(`service-product/update-status/${id}`);


  const productDashboardRecentOrder = async () => await api.get(`product-dashboard/recent-order`);
  const serviceDashboardRecentOrder = async () => await api.get(`service-dashboard/recent-order`);
  const serviceDashboardChartData = async (type) => await api.get(`service-dashboard/vendorChart?type=${type}`);
  const serviceOrderManagment = async (type, search, start_date, end_date, page, page_size) => await api.get(`service-dashboard/order-management?type=${type}&search=${search}&start_date=${start_date}&end_date=${end_date}&page=${page}&page_size=${page_size}`);
  const getServiceOrderDetail = async (id) => await api.get(`service-dashboard/order-get-by-id/${id}`);
  const updateServiceOrderStatus = async (id, body) => await api.post(`service-dashboard/status-update/${id}`, body);

  const getServiceData = async () => await api.get(`service-store`);

  // Donation Dashboard

  const createDonation = async (body) => await api.post(`organization-store/store`, body);
  const updateDonation = async (body) => await api.post(`organization-store/update`, body);
  const getDonationProfile = async () => await api.get(`organization-store/show`);
  const getDonationDashboard = async () => await api.get(`organization-dashboard/total-order`);
  const getOrganizationCampaignValidate = async (id) => await api.get(`organization-campaign/campaign_validate?campaign_id=${id}`);
  const organizationDonationManagment = async (search, start_date, end_date, page, page_size) => await api.get(`organization-dashboard/organization-management?search=${search}&start_date=${start_date}&end_date=${end_date}&page=${page}&page_size=${page_size}`);
  const createOrganizationCampaign = async (body) => await api.post(`organization-campaign/store`, body);
  const updateOrganizationCampaign = async (id, body) => await api.post(`organization-campaign/update/${id}`, body);
  const getOrganizationCampaigns = async (type, page, page_size) => await api.get(`organization-campaign/show?type=${type}&page=${page}&page_size=${page_size}`);
  const getOrganizationCampaignById = async (id) => await api.get(`organization-campaign/get-by-id/${id}`);
  const deleteOrganizationCampaign = async (id) => await api.get(`organization-campaign/delete-campaign?campaign_id=${id}`);
  const getOrganizationData = async () => await api.get(`organization-store/show`);
  // Organization event
  const getAllOrganizationCampaign = async () => await api.get(`organization-event/campaign-list`);
  const createOrganizationEvent = async (body) => await api.post(`organization-event/store`, body);
  const updateOrganizationEvent = async (id, body) => await api.post(`organization-event/update/${id}`, body);
  const getOrganizationEventById = async (id) => await api.get(`organization-event/get-by-id/${id}`);
  const deleteOrganizationEventById = async (body) => await api.post(`organization-event/delete-event`, body);
  const getOrganizationRecentEvent = async (page, page_size) => await api.get(`organization-event/recent-event?page=${page}&page_size=${page_size}`);
  const getOrganizationUpcomingEvent = async (page, page_size) => await api.get(`organization-event/up-comming-event?page=${page}&page_size=${page_size}`);
  const getOrganizationEndedEvent = async (page, page_size) => await api.get(`organization-event/end-event?page=${page}&page_size=${page_size}`);

  const organizationDonationManagmentChart = async (type) => await api.get(`organization-dashboard/donation-chart?type=${type}`);
  const getOrganizationDonationById = async (id) => await api.get(`organization-dashboard/organization-get-by-id/${id}`);
  const getOrganizationOtherDonationById = async (id, page, page_size) => await api.get(`organization-dashboard/other-doners?campaign_id=${id}&page=${page}&page_size=${page_size}`);

  //volunteer

  const getOrganizationVolunterActive = async (date, page, page_size) => await api.get(`organization-dashboard/organization-volunteer?type=approved&date=${date}&page=${page}&page_size=${page_size}`);
  const getOrganizationVolunterPending = async (date, page, page_size) => await api.get(`organization-dashboard/organization-volunteer?type=pending&date=${date}&page=${page}&page_size=${page_size}`);
  const getOrganizationVolunterChart = async (type) => await api.get(`organization-dashboard/volunteer-chart?type=${type}`);
  const getOrganizationVolunterById = async (id) => await api.get(`organization-dashboard/organization-volunteer-by-id/${id}`);
  const organizationVolunterApproveAndReject = async (body) => await api.post(`organization-dashboard/organization-volunteer-aproved-reject`, body);

  //Addons
  const getOrganizationAddons = async () => await api.get(`organization-addons`);
  const getOrganizationAddonsCampaigns = async () => await api.get(`organization-campaign/show-web`);
  const buyOrganizationAddon = async (body) => await api.post(`addons/buy`, body);
  const getOrganizationUsers = async () => await api.get(`organization-blast-mail/user`);
  const sendOrganizationBlastMail = async (body) => await api.post(`organization-blast-mail/send` , body);
  const sendOrganizationThankYouMail = async (body) => await api.post(`organization-blast-mail/send-thank-you` , body);

  //fcmToken

  const updateFcmToken = async (body) => await api.post(`user/update-fcm-web` , body);

  return {
    updatePassword,
    getProfile,
    updateProfile,
    getAddresses,
    getAddressById,
    getDefaultAddress,
    deleteAddress,
    setDefaultAddress,
    createAndUpdateAddress,
    checkOutCart,
    updateQuantity,
    register,
    resendOtp,
    verifyOtp,
    subscriptionPlans,
    subscriptionBuyPlans,
    subscriptionPlanById,
    buySubscription,
    updateSubscription,
    getAllCategories,
    createAndUpdateStore,
    getProductDashboard,
    getSellerCategory,
    getSubCategories,
    getBrands,
    getCategoriesAttributes,
    storeColorAttributeImage,
    createProduct,
    getSellerProducts,
    getSellerProductById,
    updateProduct,
    updateProductStatus,
    getNotificationSetting,
    updateNotificationSetting,
    getSellerData,
    helpAndSupport,

    //Offers and promotions
    getOffers,
    createAndUpdateOffer,
    deleteOffer,
    updateOfferStatus,

    //coupon
    getCoupons,
    getCouponById,
    updateCouponStatus,
    deleteCoupon,
    createCoupon,
    updateCoupon,

    //Order Managment
    productRecentOrder,
    productOrderManagment,
    getProductOrderById,
    updateProductOrderStatusById,
    updateProductRefundStatusById,
    ProductOrderManagmentChart,

    //product chat
    getMessagesById,
    getProductChat,
    sendChatMessage,
    createChatRooms,

    //Account
    getAccounts,
    createAndUpdateAccount,

    //Wallet
    getWalletEarning,
    getOrganizationWalletEarning,
    getWalletTransactions,
    getOrganizationWalletTransactions,
    createWithdrawRequest,
    createDonationWithdrawRequest,

    //Service apis

    createStore,
    updateStore,
    getStore,

    getServiceDashboard,

    getServiceCategory,
    getServiceSubCategories,

    createService,
    updateService,
    getSellerService,
    getSellerServiceById,
    updateSellerServiceStatus,


    productDashboardRecentOrder,
    serviceDashboardRecentOrder,
    serviceDashboardChartData,
    serviceOrderManagment,
    getServiceOrderDetail,
    updateServiceOrderStatus,

    getServiceData,

    // Donation Dashboard
    createDonation,
    updateDonation,
    getDonationProfile,
    getDonationDashboard,
    getOrganizationCampaignValidate,
    organizationDonationManagment,
    createOrganizationCampaign,
    updateOrganizationCampaign,
    getOrganizationCampaigns,
    getOrganizationCampaignById,
    deleteOrganizationCampaign,
    getOrganizationData,

    // Organization event
    getAllOrganizationCampaign,
    createOrganizationEvent,
    updateOrganizationEvent,
    getOrganizationEventById,
    deleteOrganizationEventById,
    getOrganizationRecentEvent,
    getOrganizationUpcomingEvent,
    getOrganizationEndedEvent,

    organizationDonationManagmentChart,
    getOrganizationDonationById,
    getOrganizationOtherDonationById,

    //volunteer
    getOrganizationVolunterActive,
    getOrganizationVolunterPending,
    getOrganizationVolunterChart,
    getOrganizationVolunterById,
    organizationVolunterApproveAndReject,

    //Addons
    getOrganizationAddons,
    getOrganizationAddonsCampaigns,
    buyOrganizationAddon,
    getOrganizationUsers,
    sendOrganizationBlastMail,
    sendOrganizationThankYouMail,

      //fcmToken

    updateFcmToken
  };
};




const apis = createBackendServer(process.env.REACT_APP_BASE_URL);

export default apis;
