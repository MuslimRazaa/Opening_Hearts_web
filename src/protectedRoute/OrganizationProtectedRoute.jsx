import { Navigate, Outlet } from "react-router-dom";
import { useUserData } from "../components/shared/helperMethod";
import ProductDeshboardLayout from "../dashboards/Seller/Products/ProductDeshboardLayout/ProductDeshboardLayout";

const OrganizationProtectedRoute = ({ element }) => {
    const user = useUserData();
    const token = localStorage.getItem("token");
    const is_organization = user.is_organization;
    const is_organization_subscription = user.is_organization_subscription;

    // Check all conditions
    if (!token || is_organization == 0 || is_organization_subscription == 0) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default OrganizationProtectedRoute;