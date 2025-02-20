
import React, { useState } from "react";
import { Link } from "react-router-dom";

function BillingDetailsForm() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="billing-details-container">
      <form className="billing-form">
        <div className="name-email-billing">
          <input type="text" placeholder="First Name*" required style={{width:"80%"}}/>
          <input type="text" placeholder="Last Name*" required style={{width:"80%"}}/>
        </div>
        <input type="email" placeholder="Email*" required />
        <input type="text" placeholder="Street Address*" required />
        <div className="city-zip-billing">
          <input type="text" placeholder="City*" required style={{width:"80%"}}/>
          <input type="text" placeholder="Zip Code*" required style={{width:"80%"}}/>
        </div>
        <input type="text" placeholder="Phone Number*" required />
        <div className="save-checkbox">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          <p>Save this information for faster check-out next time</p>
        </div>
       <Link to='/checkOut' style={{textDecoration:"none"}}> <button type="submit" className="confirm-button">
          Confirm
        </button></Link>
      </form>
    </div>
  );
}

export default BillingDetailsForm;
