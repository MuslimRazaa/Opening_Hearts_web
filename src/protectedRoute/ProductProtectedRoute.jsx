import { Navigate, Outlet } from "react-router-dom";
import { useUserData } from "../components/shared/helperMethod";
import ProductDeshboardLayout from "../dashboards/Seller/Products/ProductDeshboardLayout/ProductDeshboardLayout";

const ProductProtectedRoute = ({element}) => {
    const user = useUserData();
    const token = localStorage.getItem("token");
    const isProduct = user.is_product;
    const isProductSubscription = user.is_product_subscription;

    // Check all conditions
    if (!token || isProduct == 0 || isProductSubscription == 0) {
        return <Navigate to="/" replace />;
    }

    return element ;
};

export default ProductProtectedRoute;