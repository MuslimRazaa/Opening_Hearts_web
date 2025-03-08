import { Navigate, Outlet } from "react-router-dom";
import { useUserData } from "../components/shared/helperMethod";
import ProductDeshboardLayout from "../dashboards/Seller/Products/ProductDeshboardLayout/ProductDeshboardLayout";

const ServiceProtectedRoute = ({element}) => {
    const user = useUserData();
    const token = localStorage.getItem("token");
    const is_service = user.is_service;
    const is_service_subscription = user.is_service_subscription;

    // Check all conditions
    if (!token || is_service == 0 || is_service_subscription == 0) {
        return <Navigate to="/" replace />;
    }

    return element ;
};

export default ServiceProtectedRoute;