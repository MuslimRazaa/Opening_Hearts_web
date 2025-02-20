import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/ContextApi/AppContext";
import { BASE_URL, checkOutCart } from "../../utils/api";
import apis from "../../service";
import { Spinner } from "react-bootstrap";

const CartItemCounter = ({ fetchCheckOutBothPrice, item, itemId }) => {
  const { state, initCounter, increment, decrement } = useContext(AppContext);

  // Local state for the counter (this is where you'll manage item quantity)
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false); // Loader state

  // Initialize counter when the component mounts or when itemId changes
  useEffect(() => {
    initCounter(itemId);  // Initializes the counter
    setQuantity(item.quantity); // Syncs with the backend quantity on initial render
  }, [itemId]); // Only depend on itemId to avoid unnecessary updates

  // Function to update the quantity in the backend
  const fetchQuantityUpdate = async (newQuantity) => {
    setLoading(true); // Show loader
    try {
      await apis.updateQuantity({
        quantity: newQuantity,
        cart_id: item?.id,
      });
      await fetchCheckOutBothPrice(); // Wait for the response
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };


  // Handlers for the buttons
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);  // Update local quantity
    fetchQuantityUpdate(newQuantity); // Call API to update quantity
    increment(itemId); // Update local state in AppContext if needed
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);  // Update local quantity
      fetchQuantityUpdate(newQuantity); // Call API to update quantity
      decrement(itemId); // Update local state in AppContext if needed
    }
  };

  return (
    <div className="counter-container">
    <button className="counter-btn" onClick={handleDecrement}  disabled={loading || quantity <= 1} > 

      −
    </button>
    {loading ? (
      <span className="loader"><div className="spinQty"><Spinner animation="border" role="status" /></div></span> // Loader UI
    ) : (
      <span className="counter-value">{quantity.toString().padStart(2, "0")}</span>
    )}
    <button className="counter-btn" onClick={handleIncrement} disabled={loading}>
      +
    </button>

  </div>
  );
};






export default CartItemCounter;
