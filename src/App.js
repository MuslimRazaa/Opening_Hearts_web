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
import Nonprofit from './dashboards/Seller/donation/NonProfitScreen/Nonprofit';
import NonProfitForm from './dashboards/Seller/donation/NonProfitScreen/NonProfitForm';
import BuymonthlySubcribtion from './dashboards/Seller/donation/BuyMonthlySub/BuymonthlySubcribtion';
import ServiceSelerProfileTwo from './screens/ServiceFlow/ServiceSellDetailPage/ServiceSelerProfileTwo';
import VendorProfilePage from './screens/ServiceFlow/ServiceSellDetailPage/VendorProfilePage';

import ProductManagementLayout from './dashboards/Seller/Products/ProductDashboard/ProductManagementLayout';
import SetupYourOffice from './dashboards/Seller/Products/SetupYouOfficeProduct/SetupYourOffice';
import AddProduct from './dashboards/Seller/Products/AddProduct/AddProduct';
import ProductDashboardScreen from './dashboards/Seller/Products/MainProductDashboard/ProductDashboardScreen';
import ProductWalletDetails from './dashboards/Seller/Products/ProductWallet/ProductWalletDetails';
import ProductChat from './dashboards/Seller/Products/ProductChat/ProductChat';
import ProductPreviewDetailPage from './screens/FeatureProduct/ProductDetail/ProductPreviewDetailPage';
import VolunteerForm from './dashboards/Seller/donation/VolunteerForm/VolunteerForm';
import DonationDashboardLayout from './dashboards/Seller/donation/DonationDashboardLayou/DonationDashboardLayout';
import DonationDashboardStartHere from './dashboards/Seller/donation/DonationDashboardStartHere/DonationDashboardStartHere';
import SetupYourOfficeDonations from './dashboards/Seller/donation/SetupYouOfficeDonation/SetupYourOffice';
import MealFormSec from './dashboards/Seller/donation/MealstoNeighbors/MealFormSec';
import BuyCampaignSubcribtion from './dashboards/Seller/donation/BuycampaignSubs/BuycampaignSubs';
import EmailVerificationDonation from './dashboards/Seller/donation/EmailVerification/EmailVerificationDonation';
import DonationDashSectionOne from './dashboards/Seller/donation/MainDonationDashboard/DonationDashSectionOne';
import CampaignDonationMainSectionOne from './dashboards/Seller/donation/CampaignDonation/CampaignDonationMainSectionOne';
import CompleteDonationSection from './dashboards/Seller/Products/CompleteProductSection/CompleteProductSection';
import TotalRevenueDonation from './dashboards/Seller/donation/TotalRevenueDonation/TotalRevenueDonation';
import DonationBankConnect from './dashboards/Seller/donation/ProductWallet/DonationBankConnect';
import DonationWalletDetails from './dashboards/Seller/donation/ProductWallet/DonationWalletDetails';
import WalletDetailAmountBalanceDonation from './dashboards/Seller/donation/ProductWallet/WalletDetailAmountBalanceDonation';
import DonationEventSectionFirst from './dashboards/Seller/donation/DonationEvent/DonationEventSectionFirst';
import DonationDashAddEventSectionFirst from './dashboards/Seller/donation/DonationEvent/DonationDashAddEventSectionFirst';
import VolunteerFormSectionFirst from './dashboards/Seller/donation/VolunteerForm/VolunteerFormSectionFirst';
import VolunteerProfileEditSectionFirst from './dashboards/Seller/donation/VolunteerProfileEdit/VolunteerProfileEditSectionFirst';
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
import UpdateProduct from './dashboards/Seller/Products/UpdateProduct/UpdateProduct';
import ProfileSetting from './dashboards/Seller/Products/Setting/ProfileSetting';
import NotificationSetting from './dashboards/Seller/Products/Setting/NotificationSetting';
import HelpAndSupport from './dashboards/Seller/Products/HelpAndSupport/HelpAndSupport';
import OffersAndPromotions from './dashboards/Seller/Products/OffersAndPromotions/OffersAndPromotions';
import CreateOffersAndPromotions from './dashboards/Seller/Products/OffersAndPromotions/CreateOffersAndPromotions';
import DiscountsAndcoupons from './dashboards/Seller/Products/DiscountsAndcoupons/DiscountsAndcoupons';
import CreateDiscountsAndcoupons from './dashboards/Seller/Products/DiscountsAndcoupons/CreateDiscountsAndcoupons';
import ProductOrderManagment from './dashboards/Seller/Products/ProductOrderManagment/ProductOrderManagment';
import ProductOrderManagmentDetail from './dashboards/Seller/Products/ProductOrderManagment/ProductOrderManagmentDetail';
import UserChat from './screens/Chat/UserChat';
import CustomerDashRecentproduct from './dashboards/Customer/CustomerDashRecentproduct/CustomerDashRecentproduct';
import CustomerDashWishlistProduct from './dashboards/Customer/CustomerDashWishlistproduct/CustomerDashWishlistProduct';
import RevenueManagment from './dashboards/Seller/Products/RevenueManagment/RevenueManagment';
import RevenueManagmentDetail from './dashboards/Seller/Products/RevenueManagment/RevenueManagmentDetail';
import ProductSubscriptionBuyAgain from './dashboards/Seller/Products/ProductSubscription/ProductSubscriptionBuyAgain';
import BankAccountManagment from './dashboards/Seller/Products/BankAccountManagment/BankAccountManagment';
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
import RowExpansionDemo from './dashboards/Customer/CustomerMainDashboard/FoldedTable';


function App() {

  return (
    <>
      <div id="google_translate_element"></div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Login Registration */}
          <Route path="/register" element={<SingUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/opt" element={<Opt />} />
          <Route path="/reset-password-otp" element={<ResetPasswordOtp />} />
          <Route path="/newpassword" element={<NewPassword />} />

          {/* Home Routes */}
          <Route path="/userChat" element={<UserChat />} />
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
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
          <Route path="/CheckOut" element={<CheckOut />} />
          <Route path="/orderTracking" element={<OrderTracking />} />
          <Route path="/addBillingDetails" element={<AddBillingDetails />} />
          <Route path="/SuplierStore" element={<SuplierStoreDetailPAge />} />
          <Route path="/SuplierStoreProduct" element={<SuplierStoreProductPage />} />

          {/* Donations */}

          <Route path="/donation-now" element={<DonationNow />} />
          <Route path="/funding-cycle" element={<FundingCycle />} />
          <Route path="/funding-cycle-all" element={<DonationFundingCycleAll />} />
          <Route path="/donation-event" element={<DonationEvent />} />
          <Route path="/donation-beach-clean" element={<DonationBeachClean />} />
          <Route path="/donate-form" element={<DonateNowForm />} />
          <Route path="/become-a-volunteer" element={<BecomeVolunteer />} />
          <Route path="/donation-food-drive" element={<DonationFoodDrive />} />
          <Route path="/funding-cycle" element={<FundingCycle />} />



          {/* Become a seller Flow */}
          <Route path="/become-seller" element={<DonationHome />} />
          <Route path="/select-your-domain" element={<SelectYourDomain />} />
          <Route path="/register-your-ecommerce-store" element={<RegisterYourEcommerceStore />} />
          <Route path="/email-verfication" element={<EmailVerfication />} />
          <Route path="/packages" element={<PackagesBecomeSeller />} />
          <Route path="/buy-package" element={<BuyPackage />} />
          <Route path="/buy-package-again" element={<ProductSubscriptionBuyAgain />} />
          <Route path="/select-your-domain" element={<SelectYourDomain />} />
          <Route path="/register-your-ecommerce-store" element={<RegisterYourEcommerceStore />} />
          <Route path="/email-verfication" element={<EmailVerfication />} />



          {/*  All  Dashboards  routes start from here */}



          {/* (Seller-Side)
               Service Dashboard  (Seller-Side) */}


          <Route path="/dashboard" element={<ServiceDeshboardLayout />}>
            <Route path="service" element={<ServiceDashboard />} />
            <Route path="service-managment" element={<ServiceManagment />} />
            <Route path="add-service" element={<AddService />} />
            <Route path="update-service" element={<UpdateService />} />
            <Route path="service-order-managment" element={<ServicesOrderManagment />} />
            <Route path="service-order-detail" element={<ServicesOrderManagmentDetail />} />
            <Route path="service-revenue-managment" element={<ServiceRevenueManagment />} />
            <Route path="service-revenue-detail" element={<ServiceRevenueManagmentDetail />} />
            <Route path="service-subscription" element={<ServiceSubscription />} />
            <Route path="service-wallet" element={<ServiceWallet />} />
            <Route path="service-bank-account" element={<ServiceBankAccount />} />
            <Route path="service-chat" element={<ServiceChat />} />
            <Route path="service-profile-setting" element={<ServiceProfileSetting />} />
            <Route path="service-notification-setting" element={<ServiceNotificationSetting />} />
            <Route path="service-support" element={<ServiceHelpAndSupport />} />
          </Route>

          {/* End ---------------- Service Dashboard  (Seller-Side) 


           Product Dashboard  (Seller-Side) */}

          <Route path="/dashboard" element={<ProductManagementLayout />}>
            {/* Child routes for dynamic content */}
            {/* <Route path="product-dashboard-start" element={<ProductDashboardStartHere />} /> */}
            <Route path="product" element={<ProductDashboardScreen />} />
            <Route path="product-managment" element={<SetupYourOffice />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="update-product" element={<UpdateProduct />} />
            <Route path="product-order-managment" element={<ProductOrderManagment />} />
            <Route path="product-order-detail" element={<ProductOrderManagmentDetail />} />
            <Route path="produts-revenue-managment" element={<RevenueManagment />} />
            <Route path="produts-revenue-detail" element={<RevenueManagmentDetail />} />
            <Route path="product-wallet" element={<ProductWalletDetails />} />
            <Route path="product-bank-account" element={<BankAccountManagment />} />
            {/* <Route path="wallet-description-product" element={<ProductWalletDetails />} /> */}
            {/* <Route path="amount-balance-wallet-product" element={<WalletDetailAmountBalanceProduct />} /> */}
            <Route path="product-Chat" element={<ProductChat />} />
            <Route path="product-profile-setting" element={<ProfileSetting />} />
            <Route path="product-notification-setting" element={<NotificationSetting />} />
            {/* <Route path="product-appearance" element={<AppearanceSetting />} /> */}
            <Route path="product-support" element={<HelpAndSupport />} />
            <Route path="product-promotions" element={<OffersAndPromotions />} />
            <Route path="product-promotion-create" element={<CreateOffersAndPromotions />} />
            <Route path="product-coupons" element={<DiscountsAndcoupons />} />
            <Route path="product-coupon-create" element={<CreateDiscountsAndcoupons />} />
            {/* <Route path="product-layout" element={<ProductDashbaordLayout />} /> */}
            <Route path="product-subscription" element={<ProductSubscription />} />
          </Route>

          <Route path="preview-detail-product" element={<ProductPreviewDetailPage />} />

          {/* End ---------------- Product Dashboard  (Seller-Side)




          Get Donation Dashboard (Seller-Side) */}

          <Route path="/donation-dashboard" element={<DonationDashboardLayout />}>
            {/* Child routes for dynamic content */}
            <Route path="donation-dashboard-start" element={<DonationDashboardStartHere />} />
            <Route path="setup-your-office-donation" element={<SetupYourOfficeDonations />} />
            <Route path="form-meal-neighbar" element={<MealFormSec />} />
            <Route path="donation-dashboard-screen" element={<DonationDashSectionOne />} />
            <Route path="campaign-Donation" element={<CampaignDonationMainSectionOne />} />
            <Route path="complete-donation-detail" element={<CompleteDonationSection />} />
            <Route path="total-donation-revenue-detail" element={<TotalRevenueDonation />} />
            <Route path="donation-bank-connect" element={<DonationBankConnect />} />
            <Route path="wallet-description-donation" element={<DonationWalletDetails />} />
            <Route path="amount-balance-wallet-donation" element={<WalletDetailAmountBalanceDonation />} />
            {/* <Route path="product-profile-settings" element={<SettingsServiceSection />} /> */}
            {/* <Route path="product-notification-setting" element={<NOtificationsSettingSectionMain />} /> */}
            {/* <Route path="product-appearance" element={<AppearanceSetting />} /> */}
            {/* <Route path="support" element={<HelpSupport />} /> */}
            <Route path="donation-events" element={<DonationEventSectionFirst />} />
            <Route path="donation-add-events" element={<DonationDashAddEventSectionFirst />} />
            <Route path="donation-volunteer-form" element={<VolunteerFormSectionFirst />} />
            <Route path="donation-volunteer-form-submit" element={<VolunteerForm />} />
            <Route path="donation-volunteer-profile-edit" element={<VolunteerProfileEditSectionFirst />} />
          </Route>


          <Route path="/non-profit" element={<Nonprofit />} />
          <Route path="/non-profit-form" element={<NonProfitForm />} />
          <Route path="/buy-monthly-subcribtion" element={<BuymonthlySubcribtion />} />
          <Route path="/buy-campaign-subcribtion" element={<BuyCampaignSubcribtion />} />
          <Route path="/email-verfication-donation" element={<EmailVerificationDonation />} />

          {/*End-- Get Donation Dashboard (Seller-Side) */}


          {/* Customer-Side  */}
          <Route path="/customer-dashboard" element={<CustomerDashboardDashboard />}>
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

            {/* admin page */}
            {/* <Route path="user-customer" element={<UserCustomerAdmin />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
