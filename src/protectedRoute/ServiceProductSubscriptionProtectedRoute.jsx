import { Navigate, Outlet } from "react-router-dom";
import { useUserData } from "../components/shared/helperMethod";
import ProductDeshboardLayout from "../dashboards/Seller/Products/ProductDeshboardLayout/ProductDeshboardLayout";

const ServiceProductSubscriptionProtectedRoute = ({ element }) => {
    const user = useUserData();
    const token = localStorage.getItem("token");
    const isProduct = user.is_product;
    const isProductSubscription = user.is_product_subscription;
    const is_service_subscription = user.is_service_subscription;

    // Check all conditions
    if (isProductSubscription == 1 && is_service_subscription == 1) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default ServiceProductSubscriptionProtectedRoute;