import './media/style/style.css'
import './media/style/style2.css'
import SingUp from './screens/SingUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import Opt from './screens/Opt';
import NewPassword from './screens/NewPassword';
import ProductListing from './screens/ProductListing';
import OrganizationListing from './screens/OrganizationListing';
import ServiceListing from './screens/ServiceListing';
import Home from './screens/Home/Home';
import ProductToExploreDetail from './screens/ProductToExploreDetail';
import TopRatedStoresDetailPage from './screens/TopRatedStoresDetailPage';
import ServiceDetailPage from './screens/ServiceDetailPage';
import DonationDetailPage from './screens/DonationDetailPage';
import Service from './screens/ServiceFlow/Service';
import FeatureProduct from './screens/FeatureProduct/FeatureProduct';
import ProductDetail from './screens/FeatureProduct/ProductDetail/ProductDetail';
import ShoppingCart from './screens/AddToCartFlowForProduct/ShoppingCart';
import CheckOut from './screens/CheckoutFlow/CheckOut';
import OrderTracking from './screens/OrderTracking/OrderTracking';
import AddBillingDetails from './screens/AddBillingDetails/AddBillingDetails';
import PopularService from './screens/ServiceFlow/PopularServiceFlow/PopularService';
import ServiceProvider from './screens/ServiceFlow/ServiceProviderFlow/ServiceProvider';
import ServiceCatagoryDetailPage from './screens/ServiceFlow/ServiceCatagoryDetailPage/ServiceCatagoryDetailPage';
import ServiceBillingDetailPage from './screens/ServiceFlow/ServiceBillingDetailPage';
import SelectYourDomain from './screens/SelectYourDomain';
import RegisterYourEcommerceStore from './screens/RegisterYourEcommerceStore';
import EmailVerfication from './components/Main/EmailVerfication';
import PackagesBecomeSeller from './screens/PackagesBecomeSeller';
import BuyPackage from './screens/BuyPackage';
import FundingCycle from './screens/DonationsFlow/DonationFundingCycle/FundingCycle';
import DonationEvent from './screens/DonationsFlow/DonationsRecentEvent/DonationEvent';
import SingleServiceDetail from './screens/ServiceFlow/SingleServiceDetailPage/SingleServiceDetail';
import SuplierStoreDetailPAge from './screens/FeatureProduct/SuplierStore/SuplierStoreDetailPage';
import SuplierStoreProductPage from './screens/FeatureProduct/SuplierStoreProduct/SuplierStoreProductPage';
import DonationHome from './screens/DonationsHomeFlow/DonationHome';
import ServiceSellProfile from './screens/ServiceFlow/ServiceSellDetailPage/ServiceSellProfile';
import ConfirmAppointment from './screens/ServiceFlow/ConfirmAppointment/ConfirmAppointment';
import DonationNow from './screens/DonationsFlow/DonationNow/DonationNow';
import DonationBeachClean from './screens/DonationsFlow/DonationBeachClean/DonationBeachClean';
import DonateNowForm from './screens/DonationsFlow/DonateNowForm/DonateNowForm';
import BecomeVolunteer from './screens/DonationsFlow/BecomeAVolunteer/BecomeVolunteer';
import DonationFoodDrive from './screens/DonationsFlow/DonationFoodDrive/DonationFoodDrive';
import DonationFundingCycleAll from './screens/DonationsFlow/DonationFundingCycleAll/DonationFundingCycleAll';
import Nonprofit from './dashboards/Seller/organization/NonProfitScreen/Nonprofit';
import NonProfitForm from './dashboards/Seller/organization/NonProfitScreen/NonProfitForm';
import BuymonthlySubcribtion from './dashboards/Seller/organization/BuyMonthlySub/BuymonthlySubcribtion';
import ServiceSelerProfileTwo from './screens/ServiceFlow/ServiceSellDetailPage/ServiceSelerProfileTwo';
import VendorProfilePage from './screens/ServiceFlow/ServiceSellDetailPage/VendorProfilePage';
import ProductChat from './dashboards/Seller/Products/ProductChat/ProductChat';
import ProductPreviewDetailPage from './screens/FeatureProduct/ProductDetail/ProductPreviewDetailPage';
import VolunteerForm from './dashboards/Seller/organization/VolunteerForm/VolunteerForm';
import SetupYourOfficeDonations from './dashboards/Seller/organization/SetupYouOfficeDonation/SetupYourOffice';
import MealFormSec from './dashboards/Seller/organization/MealstoNeighbors/MealFormSec';
import BuyCampaignSubcribtion from './dashboards/Seller/organization/BuycampaignSubs/BuycampaignSubs';
import EmailVerificationDonation from './dashboards/Seller/organization/EmailVerification/EmailVerificationDonation';
import DonationDashSectionOne from './dashboards/Seller/organization/MainDonationDashboard/DonationDashSectionOne';
import CampaignDonationMainSectionOne from './dashboards/Seller/organization/CampaignDonation/CampaignDonationMainSectionOne';
import TotalRevenueDonation from './dashboards/Seller/organization/TotalRevenueDonation/TotalRevenueDonation';
import DonationBankConnect from './dashboards/Seller/organization/ProductWallet/DonationBankConnect';
import DonationWalletDetails from './dashboards/Seller/organization/ProductWallet/DonationWalletDetails';
import WalletDetailAmountBalanceDonation from './dashboards/Seller/organization/ProductWallet/WalletDetailAmountBalanceDonation';
import DonationEventSectionFirst from './dashboards/Seller/organization/DonationEvent/DonationEventSectionFirst';
import DonationDashAddEventSectionFirst from './dashboards/Seller/organization/DonationEvent/DonationDashAddEventSectionFirst';
import VolunteerFormSectionFirst from './dashboards/Seller/organization/VolunteerForm/VolunteerFormSectionFirst';
import VolunteerProfileEditSectionFirst from './dashboards/Seller/organization/VolunteerProfileEdit/VolunteerProfileEditSectionFirst';
import CustomerDashboardDashboard from './dashboards/Customer/CustomerDashboardLayout/CustomerDashboardDashboard';
import CustomerSetting from './dashboards/Customer/CustomerSetting/CustomerSetting';
import CustomerMainDashboard from './dashboards/Customer/CustomerMainDashboard/CustomerMainDashboard';
import CustomerDashboardProductDetails from './dashboards/Customer/CustomerMainDashboard/CustomerDashboardProductDetails';
import CustomerDashDonationDetails from './dashboards/Customer/CustomerMainDashboard/CustomerDashDonationDetails';
import CustomerDashSaveproduct from './dashboards/Customer/CustomerDashSaveproduct/CustomerDashSaveproduct';
import CustomerRecetComptable from './dashboards/Customer/PurchaseHistry/CustomerRecetComptable';
import PurchaseHistrydash from './dashboards/Customer/PurchaseHistry/PurchaseHistrydash';
import CustomerWallet from './dashboards/Customer/CustomerWallet/CustomerWallet';
import ResetPasswordOtp from './screens/ResetPasswordOtp';
import ServiceBillingMain from './screens/ServiceFlow/ServiceSellDetailPage/ServiceBillingMain';
import SipplierProducts from './screens/FeatureProduct/SipplierProducts';
import ProductSubscription from './dashboards/Seller/Products/ProductSubscription/ProductSubscription';
import ProductOrderManagment from './dashboards/Seller/Products/ProductOrderManagment/ProductOrderManagment';
import ProductOrderManagmentDetail from './dashboards/Seller/Products/ProductOrderManagment/ProductOrderManagmentDetail';
import UserChat from './screens/Chat/UserChat';
import CustomerDashRecentproduct from './dashboards/Customer/CustomerDashRecentproduct/CustomerDashRecentproduct';
import CustomerDashWishlistProduct from './dashboards/Customer/CustomerDashWishlistproduct/CustomerDashWishlistProduct';
import ProductSubscriptionBuyAgain from './dashboards/Seller/Products/ProductSubscription/ProductSubscriptionBuyAgain';
import ServiceDashboard from './dashboards/Seller/Service/ServiceDashboard/ServiceDashboard';
import ServicesOrderManagment from './dashboards/Seller/Service/ServicesOrderManagment/ServicesOrderManagment';
import ServiceRevenueManagment from './dashboards/Seller/Service/ServiceRevenueManagment/ServiceRevenueManagment';
import ServiceRevenueManagmentDetail from './dashboards/Seller/Service/ServiceRevenueManagment/ServiceRevenueManagmentDetail';
import ServiceManagment from './dashboards/Seller/Service/ServiceManagment/ServiceManagment';
import AddService from './dashboards/Seller/Service/ServiceManagment/AddService';
import UpdateService from './dashboards/Seller/Service/ServiceManagment/UpdateService';
import ServicesOrderManagmentDetail from './dashboards/Seller/Service/ServicesOrderManagment/ServicesOrderManagmentDetail';
import ServiceSubscription from './dashboards/Seller/Service/ServiceSubscription/ServiceSubscription';
import ServiceWallet from './dashboards/Seller/Service/ServiceWallet/ServiceWallet';
import ServiceChat from './dashboards/Seller/Service/ServiceChat/ServiceChat';
import ServiceBankAccount from './dashboards/Seller/Service/ServiceBankAccount/ServiceBankAccount';
import ServiceProfileSetting from './dashboards/Seller/Service/ServiceSetting/ServiceProfileSetting';
import ServiceNotificationSetting from './dashboards/Seller/Service/ServiceSetting/ServiceNotificationSetting';
import ServiceHelpAndSupport from './dashboards/Seller/Service/ServiceHelpAndSupport/ServiceHelpAndSupport';
import ServiceDeshboardLayout from './dashboards/Seller/Service/ServiceDeshboardLayout/ServiceDeshboardLayout';
import CustomerBankConnect from './dashboards/Customer/CustomerMainDashboard/CustomerBankConnect';
import CustomerDashboardServiceDetails from './dashboards/Customer/CustomerMainDashboard/CustomerDashboardServiceDetails';
import ProtectedRoute from './utils/ProtectedRoute';
import CustomerNotifications from './dashboards/Customer/CustomerNotifications/CustomerNotifications';
import { useEffect, useState } from 'react';
import ProductDeshboardLayout from './dashboards/Seller/Products/ProductDeshboardLayout/ProductDeshboardLayout';
import ProductDashboard from './dashboards/Seller/Products/ProductDashboard/ProductDashboard';
import ProductManagment from './dashboards/Seller/Products/ProductManagment/ProductManagment';
import AddProduct from './dashboards/Seller/Products/ProductManagment/AddProduct';
import UpdateProduct from './dashboards/Seller/Products/ProductManagment/UpdateProduct';
import ProductRevenueManagment from './dashboards/Seller/Products/ProductRevenueManagment/ProductRevenueManagment';
import ProductRevenueManagmentDetail from './dashboards/Seller/Products/ProductRevenueManagment/ProductRevenueManagmentDetail';
import ProductWallet from './dashboards/Seller/Products/ProductWallet/ProductWallet';
import ProductProfileSetting from './dashboards/Seller/Products/ProductSetting/ProductProfileSetting';
import ProductNotificationSetting from './dashboards/Seller/Products/ProductSetting/ProductNotificationSetting';
import ProductHelpAndSupport from './dashboards/Seller/Products/ProductHelpAndSupport/ProductHelpAndSupport';
import ProductOffersAndPromotions from './dashboards/Seller/Products/ProductOffersAndPromotions/ProductOffersAndPromotions';
import CreateProductOffersAndPromotions from './dashboards/Seller/Products/ProductOffersAndPromotions/CreateProductOffersAndPromotions';
import ProductDiscountsAndcoupons from './dashboards/Seller/Products/ProductDiscountsAndcoupons/ProductDiscountsAndcoupons';
import CreateProductDiscountsAndcoupons from './dashboards/Seller/Products/ProductDiscountsAndcoupons/CreateProductDiscountsAndcoupons';
import ProductBankAccount from './dashboards/Seller/Products/ProductBankAccount/ProductBankAccount';
import ProductProtectedRoute from './protectedRoute/ProductProtectedRoute';
import ServiceProtectedRoute from './protectedRoute/ServiceProtectedRoute';
import ServiceProductSubscriptionProtectedRoute from './protectedRoute/ServiceProductSubscriptionProtectedRoute';
import OrganizationDashboardLayout from './dashboards/Seller/organization/OrganizationDashboardLayout/OrganizationDashboardLayout';
import OrganizationProfile from './dashboards/Seller/organization/OrganizationProfile/OrganizationProfile';
import OrganizationDashboard from './dashboards/Seller/organization/OrganizationDashboard/OrganizationDashboard';
import OrganizationCampaignManagement from './dashboards/Seller/organization/OrganizationCampaignManagement/OrganizationCampaignManagement';
import AddCampaign from './dashboards/Seller/organization/OrganizationCampaignManagement/AddCampaign';
import UpdateCampaign from './dashboards/Seller/organization/OrganizationCampaignManagement/UpdateCampaign';
import OrganizationEventManagement from './dashboards/Seller/organization/OrganizationEventManagement/OrganizationEventManagement';
import AddEvent from './dashboards/Seller/organization/OrganizationEventManagement/AddEvent';
import UpdateEvent from './dashboards/Seller/organization/OrganizationEventManagement/UpdateEvent';
import OrganizationDonationManagement from './dashboards/Seller/organization/OrganizationDonationManagement/OrganizationDonationManagement';
import OrganizationDonationManagementDetail from './dashboards/Seller/organization/OrganizationDonationManagement/OrganizationDonationManagementDetail';
import OrganizationBankAccount from './dashboards/Seller/organization/OrganizationBankAccount/OrganizationBankAccount';
import OrganizationWallet from './dashboards/Seller/organization/OrganizationWallet/OrganizationWallet';
import OrganizationChat from './dashboards/Seller/organization/OrganizationChat/OrganizationChat';
import OrganizationHelpAndSupport from './dashboards/Seller/organization/OrganizationHelpAndSupport/OrganizationHelpAndSupport';
import OrganizationProfileSetting from './dashboards/Seller/organization/OrganizationSetting/OrganizationProfileSetting';
import OrganizationNotificationSetting from './dashboards/Seller/organization/OrganizationSetting/OrganizationNotificationSetting';
import OrganizationSubscription from './dashboards/Seller/organization/OrganizationSubscription/OrganizationSubscription';
import OrganizationVolunteer from './dashboards/Seller/organization/OrganizationVolunteer/OrganizationVolunteer';
import OrganizationVolunteerDetail from './dashboards/Seller/organization/OrganizationVolunteer/OrganizationVolunteerDetail';
import OrganizationAddons from './dashboards/Seller/organization/OrganizationAddons/OrganizationAddons';
import OrganizationBlastEmail from './dashboards/Seller/organization/OrganizationBlastEmail/OrganizationBlastEmail';
import OrganizationThankYouEmail from './dashboards/Seller/organization/OrganizationThankYouEmail/OrganizationThankYouEmail';
import { getTokenn, messaging } from './firebase';
import apis from './service';
import Swal from 'sweetalert2';
import { onMessage } from 'firebase/messaging';
import OrganizationProtectedRoute from './protectedRoute/OrganizationProtectedRoute';


function App() {
  const [isTokenFound, setTokenFound] = useState(false);
  const [fcmToken, setFcmToken] = useState('');
  getTokenn(setTokenFound, setFcmToken);

  const token = localStorage.getItem('token')
  const fcm_token = localStorage.getItem('fcm_token')
  const updateFcmToken = () => {
    if (token != null) {
      if (fcmToken != fcm_token && fcmToken != '') {
        apis.updateFcmToken({ fcm_token: fcmToken })
          .then((response) => {
            localStorage.setItem('fcm_token', fcmToken)
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              text: error.response?.data?.message
            });
          });
      }
    }
  }

  useEffect(() => {
    updateFcmToken()
  }, [token, fcm_token, fcmToken])

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* <div id="google_translate_element"></div> */}
      {/* <textarea readOnly value={fcmToken} style={{ width: "100%", height: "100px" }} /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Login Registration */}

          <Route path="/register" element={<SingUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          {/* <Route path="/opt" element={<Opt />} /> */}
          <Route path="/opt" element={<ProtectedRoute> <Opt /> </ProtectedRoute>} />
          <Route path="/reset-password-otp" element={<ResetPasswordOtp />} />
          <Route path="/newpassword" element={<NewPassword />} />
          {/* Home Routes */}
          {/* <Route path="/userChat" element={<UserChat />} /> */}
          <Route path="/userChat" element={<ProtectedRoute> <UserChat /> </ProtectedRoute>} />
          <Route path="/bussiness-product" element={<ProductListing />} />
          <Route path="/bussiness-service" element={<ServiceListing />} />
          <Route path="/bussiness-organization" element={<OrganizationListing />} />
          <Route path="/product-detail" element={<ProductToExploreDetail />} />
          <Route path="/store-detail" element={<TopRatedStoresDetailPage />} />
          <Route path="/service-detail" element={<ServiceDetailPage />} />
          <Route path="/donation-detail" element={<DonationDetailPage />} />
          {/* service flow */}

          <Route path="/service" element={<Service />} />
          <Route path="/popularService" element={<PopularService />} />
          <Route path="/serviceProvider" element={<ServiceProvider />} />
          <Route path="/serviceCatagory" element={<ServiceCatagoryDetailPage />} />
          <Route path="/serviceBilling" element={<ServiceBillingMain />} />
          <Route path="/serviceBillingDetail" element={<ServiceBillingDetailPage />} />
          <Route path="/singleServiceDetail" element={<SingleServiceDetail />} />
          <Route path="/Service-Seller-Profile" element={<ServiceSellProfile />} />
          <Route path="/Service-Seller-Profile-two" element={<ServiceSelerProfileTwo />} />
          <Route path="/confirmAppointment" element={<ConfirmAppointment />} />
          <Route path="/vandor-profile" element={<VendorProfilePage />} />
          {/* Feature Product Flow */}

          <Route path="/featureProduct" element={<FeatureProduct />} />
          <Route path="/SuplierProduct" element={<SipplierProducts />} />
          <Route path="/productDetail" element={<ProductDetail />} />
          {/* <Route path="/ShoppingCart" element={<ShoppingCart />} /> */}
          {/* <Route path="/CheckOut" element={<CheckOut />} /> */}
          {/* <Route path="/orderTracking" element={<OrderTracking />} /> */}
          {/* <Route path="/addBillingDetails" element={<AddBillingDetails />} /> */}
          <Route path="/ShoppingCart" element={<ProtectedRoute> <ShoppingCart /> </ProtectedRoute>} />
          <Route path="/CheckOut" element={<ProtectedRoute> <CheckOut /> </ProtectedRoute>} />
          <Route path="/orderTracking" element={<ProtectedRoute> <OrderTracking /> </ProtectedRoute>} />
          <Route path="/addBillingDetails" element={<ProtectedRoute> <AddBillingDetails /> </ProtectedRoute>} />
          <Route path="/SuplierStore" element={<SuplierStoreDetailPAge />} />
          <Route path="/SuplierStoreProduct" element={<SuplierStoreProductPage />} />
          {/* Donations */}
          <Route path="/donation-now" element={<DonationNow />} />
          {/* <Route path="/funding-cycle" element={<FundingCycle />} /> */}
          <Route path="/funding-cycle-all" element={<DonationFundingCycleAll />} />
          <Route path="/donation-event" element={<DonationEvent />} />
          <Route path="/donation-beach-clean" element={<DonationBeachClean />} />
          {/* <Route path="/donate-form" element={<DonateNowForm />} /> */}
          {/* <Route path="/become-a-volunteer" element={<BecomeVolunteer />} /> */}
          <Route path="/donate-form" element={<ProtectedRoute> <DonateNowForm /> </ProtectedRoute>} />
          <Route path="/become-a-volunteer" element={<ProtectedRoute> <BecomeVolunteer /> </ProtectedRoute>} />

          <Route path="/donation-food-drive" element={<DonationFoodDrive />} />
          <Route path="/funding-cycle" element={<FundingCycle />} />
          {/* Become a seller Flow */}

          <Route path="/become-seller" element={<DonationHome />} />
          <Route path="/select-your-domain" element={<ServiceProductSubscriptionProtectedRoute element={<SelectYourDomain />} />} />
          <Route path="/register-your-ecommerce-store" element={<ServiceProductSubscriptionProtectedRoute element={<RegisterYourEcommerceStore />} />} />
          <Route path="/email-verfication" element={<ServiceProductSubscriptionProtectedRoute element={<EmailVerfication />} />} />
          <Route path="/packages" element={<ServiceProductSubscriptionProtectedRoute element={<PackagesBecomeSeller />} />} />
          <Route path="/buy-package" element={<ServiceProductSubscriptionProtectedRoute element={<BuyPackage />} />} />
          <Route path="/buy-package-again" element={<ProductSubscriptionBuyAgain />} />
          <Route path="/select-your-domain" element={<SelectYourDomain />} />
          <Route path="/register-your-ecommerce-store" element={<RegisterYourEcommerceStore />} />
          <Route path="/email-verfication" element={<EmailVerfication />} />
          {/* Service Dashboard  (Seller-Side)  */}
          <Route path="/organization-addons" element={<OrganizationAddons />} />

          {/*  All  Dashboards  routes start from here */}

          {/* Seller-Side */}

          <Route path="/dashboard" element={<ServiceDeshboardLayout />}>
            <Route path="service" element={<ServiceDashboard />} />
            <Route path="service-managment" element={<ServiceProtectedRoute element={<ServiceManagment />} />} />
            <Route path="add-service" element={<ServiceProtectedRoute element={<AddService />} />} />
            <Route path="update-service" element={<ServiceProtectedRoute element={<UpdateService />} />} />
            <Route path="service-order-managment" element={<ServiceProtectedRoute element={<ServicesOrderManagment />} />} />
            <Route path="service-order-detail" element={<ServiceProtectedRoute element={<ServicesOrderManagmentDetail />} />} />
            <Route path="service-revenue-managment" element={<ServiceProtectedRoute element={<ServiceRevenueManagment />} />} />
            <Route path="service-revenue-detail" element={<ServiceProtectedRoute element={<ServiceRevenueManagmentDetail />} />} />
            <Route path="service-subscription" element={<ServiceProtectedRoute element={<ServiceSubscription />} />} />
            <Route path="service-wallet" element={<ServiceProtectedRoute element={<ServiceWallet />} />} />
            <Route path="service-bank-account" element={<ServiceProtectedRoute element={<ServiceBankAccount />} />} />
            <Route path="service-chat" element={<ServiceProtectedRoute element={<ServiceChat />} />} />
            <Route path="service-profile-setting" element={<ServiceProtectedRoute element={<ServiceProfileSetting />} />} />
            <Route path="service-notification-setting" element={<ServiceProtectedRoute element={<ServiceNotificationSetting />} />} />
            <Route path="service-support" element={<ServiceProtectedRoute element={<ServiceHelpAndSupport />} />} />
          </Route>

          {/* End Seller-Side */}

          <Route path="/dashboard" element={<ProductDeshboardLayout />}>
            <Route path="product" element={<ProductDashboard />} />
            <Route path="product-managment" element={<ProductProtectedRoute element={<ProductManagment />} />} />
            <Route path="add-product" element={<ProductProtectedRoute element={<AddProduct />} />} />
            <Route path="update-product" element={<ProductProtectedRoute element={<UpdateProduct />} />} />
            <Route path="product-order-managment" element={<ProductProtectedRoute element={<ProductOrderManagment />} />} />
            <Route path="product-order-detail" element={<ProductProtectedRoute element={<ProductOrderManagmentDetail />} />} />
            <Route path="produts-revenue-managment" element={<ProductProtectedRoute element={<ProductRevenueManagment />} />} />
            <Route path="produts-revenue-detail" element={<ProductProtectedRoute element={<ProductRevenueManagmentDetail />} />} />
            <Route path="product-wallet" element={<ProductProtectedRoute element={<ProductWallet />} />} />
            <Route path="product-bank-account" element={<ProductProtectedRoute element={<ProductBankAccount />} />} />
            <Route path="product-Chat" element={<ProductProtectedRoute element={<ProductChat />} />} />
            <Route path="product-profile-setting" element={<ProductProtectedRoute element={<ProductProfileSetting />} />} />
            <Route path="product-notification-setting" element={<ProductProtectedRoute element={<ProductNotificationSetting />} />} />
            <Route path="product-support" element={<ProductProtectedRoute element={<ProductHelpAndSupport />} />} />
            <Route path="product-promotions" element={<ProductProtectedRoute element={<ProductOffersAndPromotions />} />} />
            <Route path="product-promotion-create" element={<ProductProtectedRoute element={<CreateProductOffersAndPromotions />} />} />
            <Route path="product-coupons" element={<ProductProtectedRoute element={<ProductDiscountsAndcoupons />} />} />
            <Route path="product-coupon-create" element={<ProductProtectedRoute element={<CreateProductDiscountsAndcoupons />} />} />
            <Route path="product-subscription" element={<ProductProtectedRoute element={<ProductSubscription />} />} />
          </Route>
          <Route path="preview-detail-product" element={<ProductPreviewDetailPage />} />

          {/* End ---------------- Product Dashboard  (Seller-Side)

          Get Donation Dashboard (Seller-Side) */}

          <Route path="/dashboard" element={<OrganizationDashboardLayout />}>
            <Route path="organization" element={<OrganizationDashboard />} />
            <Route path="organization-campaign-management" element={<OrganizationProtectedRoute element={<OrganizationCampaignManagement />} />} />
            <Route path="add-organization-campaign" element={<OrganizationProtectedRoute element={<AddCampaign />} />} />
            <Route path="update-organization-campaign" element={<OrganizationProtectedRoute element={<UpdateCampaign />} />} />
            <Route path="organization-donation-management" element={<OrganizationProtectedRoute element={<OrganizationDonationManagement />} />} />
            <Route path="organization-donation-detail" element={<OrganizationProtectedRoute element={<OrganizationDonationManagementDetail />} />} />
            <Route path="organization-wallet" element={<OrganizationProtectedRoute element={<OrganizationWallet />} />} />
            <Route path="organization-bank-account" element={<OrganizationProtectedRoute element={<OrganizationBankAccount />} />} />
            <Route path="organization-chat" element={<OrganizationProtectedRoute element={<OrganizationChat />} />} />
            <Route path="organization-events-management" element={<OrganizationProtectedRoute element={<OrganizationEventManagement />} />} />
            <Route path="organization-add-event" element={<OrganizationProtectedRoute element={<AddEvent />} />} />
            <Route path="organization-update-event" element={<OrganizationProtectedRoute element={<UpdateEvent />} />} />
            <Route path="organization-volunteer" element={<OrganizationProtectedRoute element={<OrganizationVolunteer />} />} />
            <Route path="organization-volunteer-detail" element={<OrganizationProtectedRoute element={<OrganizationVolunteerDetail />} />} />
            <Route path="organization-profile" element={<OrganizationProtectedRoute element={<OrganizationProfile />} />} />
            <Route path="organization-support" element={<OrganizationProtectedRoute element={<OrganizationHelpAndSupport />} />} />
            <Route path="organization-profile-setting" element={<OrganizationProtectedRoute element={<OrganizationProfileSetting />} />} />
            <Route path="organization-notification-setting" element={<OrganizationProtectedRoute element={<OrganizationNotificationSetting />} />} />
            <Route path="organization-subscription" element={<OrganizationProtectedRoute element={<OrganizationSubscription />} />} />
            <Route path="organization-blast-email" element={<OrganizationProtectedRoute element={<OrganizationBlastEmail />} />} />
            <Route path="organization-thank-you-email" element={<OrganizationProtectedRoute element={<OrganizationThankYouEmail />} />} />

            {/* <Route path="donation-dashboard-screen" element={<DonationDashSectionOne />} /> */}
            {/* <Route path="campaign-Donation" element={<CampaignDonationMainSectionOne />} /> */}
            {/* <Route path="complete-donation-detail" element={<CompleteDonationSection />} /> */}
            {/* <Route path="total-donation-revenue-detail" element={<TotalRevenueDonation />} /> */}
            {/* <Route path="donation-bank-connect" element={<DonationBankConnect />} /> */}
            {/* <Route path="wallet-description-donation" element={<DonationWalletDetails />} /> */}
            {/* <Route path="amount-balance-wallet-donation" element={<WalletDetailAmountBalanceDonation />} /> */}
            {/* <Route path="product-profile-settings" element={<SettingsServiceSection />} /> */}
            {/* <Route path="product-notification-setting" element={<NOtificationsSettingSectionMain />} /> */}
            {/* <Route path="support" element={<HelpSupport />} /> */}
            {/* <Route path="product-appearance" element={<AppearanceSetting />} /> */}

            {/* <Route path="donation-volunteer-form" element={<VolunteerFormSectionFirst />} /> */}
            {/* <Route path="donation-volunteer-form-submit" element={<VolunteerForm />} /> */}
            {/* <Route path="donation-volunteer-profile-edit" element={<VolunteerProfileEditSectionFirst />} /> */}

          </Route>
          <Route path="/non-profit" element={<Nonprofit />} />
          <Route path="/non-profit-form" element={<NonProfitForm />} />
          <Route path="/buy-monthly-subcribtion" element={<BuymonthlySubcribtion />} />
          <Route path="/buy-campaign-subcribtion" element={<BuyCampaignSubcribtion />} />
          <Route path="/email-verfication-donation" element={<EmailVerificationDonation />} />

          {/* Customer-Side  */}
          {/* <Route path="/customer-dashboard" element={<CustomerDashboardDashboard />}>
            <Route path="customer-setting" element={<CustomerSetting />} />
            <Route path="customer-main-dashboard" element={<CustomerMainDashboard />} />
            <Route path="customer-dashboard-product-detail" element={<CustomerDashboardProductDetails />} />
            <Route path="customer-dashboard-service-detail" element={<CustomerDashboardServiceDetails />} />
            <Route path="customer-dashboard-donation-detail" element={<CustomerDashDonationDetails />} />
            <Route path="customer-dashboard-save-products" element={<CustomerDashSaveproduct />} />
            <Route path="customer-dashboard-recent-products" element={<CustomerDashRecentproduct />} />
            <Route path="customer-dashboard-wishlist-products" element={<CustomerDashWishlistProduct />} />
            <Route path="customer-recent-history" element={<CustomerRecetComptable />} />
            <Route path="customer-purchase-history" element={<PurchaseHistrydash />} />
            <Route path="user-bank-connect" element={<CustomerBankConnect />} />
            <Route path="customer-wallet" element={<CustomerWallet />} />
          </Route> */}

          {/* Customer-Side protected  */}
          <Route path="/customer-dashboard" element={<ProtectedRoute> <CustomerDashboardDashboard /> </ProtectedRoute>} >
            <Route path="customer-setting" element={<ProtectedRoute> <CustomerSetting /> </ProtectedRoute>} />
            <Route path="customer-main-dashboard" element={<ProtectedRoute> <CustomerMainDashboard /> </ProtectedRoute>} />
            <Route path="customer-dashboard-product-detail" element={<ProtectedRoute> <CustomerDashboardProductDetails /> </ProtectedRoute>} />
            <Route path="customer-dashboard-service-detail" element={<ProtectedRoute> <CustomerDashboardServiceDetails /> </ProtectedRoute>} />
            <Route path="customer-dashboard-donation-detail" element={<ProtectedRoute> <CustomerDashDonationDetails /> </ProtectedRoute>} />
            <Route path="customer-dashboard-save-products" element={<ProtectedRoute> <CustomerDashSaveproduct /> </ProtectedRoute>} />
            <Route path="customer-dashboard-recent-products" element={<ProtectedRoute> <CustomerDashRecentproduct /> </ProtectedRoute>} />
            <Route path="customer-dashboard-wishlist-products" element={<ProtectedRoute> <CustomerDashWishlistProduct /> </ProtectedRoute>} />
            <Route path="customer-recent-history" element={<ProtectedRoute> <CustomerRecetComptable /> </ProtectedRoute>} />
            <Route path="customer-notifications" element={<ProtectedRoute> <CustomerNotifications /> </ProtectedRoute>} />
            <Route path="customer-purchase-history" element={<ProtectedRoute> <PurchaseHistrydash /> </ProtectedRoute>} />
            <Route path="user-bank-connect" element={<ProtectedRoute> <CustomerBankConnect /> </ProtectedRoute>} />
            <Route path="customer-wallet" element={<ProtectedRoute> <CustomerWallet /> </ProtectedRoute>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
