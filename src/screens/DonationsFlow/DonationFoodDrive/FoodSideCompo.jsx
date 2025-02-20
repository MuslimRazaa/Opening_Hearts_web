import React, { useState } from "react";
import arr from "../../../media/images/rarrow.png"
import { Link } from "react-router-dom";
const FoodSideCompo = ({data}) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  
  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(""); 
  };

  return (
    <div className="donation-food-sidebar">
      <div className="side-progress-section">
        <h1 className="food-raised-amount">
          ${data?.receive_amount} <span>raised of ${data?.fund_required} goal</span>
        </h1>
        <div class="side-progress-bar-container">
        <div class="progress-bar-fill" style={{width: data?.percentage+"%" }}></div>
        <div class="progress-bar-light-fill" style={{width: data?.percentage+"%" + 5+"%"}}></div>
        </div>  
       <Link to={`/donate-form?data=${data?.id}`} style={{textDecoration:"none"}} ><button className='side-donate-btn'>Donate Now</button></Link> 
        <div className="side-progress-info">
          <p>785 donations</p>
          <p>$4,700,751 to go</p>
        </div>
      </div>

      <div className="side-donation-options">
        {data?.amount_descriptions?.map((amount) => (
        <Link to={`/donate-form?data=${data?.id}&amount=${amount?.price}`}>
            <div
            key={amount}
            className={`side-donation-option ${
              selectedAmount === amount ? "selected" : ""
            }`}
            onClick={() => handleSelectAmount(amount)}
          >
            <h2>${amount?.price}</h2>
            <p>{amount?.title}</p>
            <span className="arrow"><img src={arr} /></span>
          </div></Link>
        ))}

       <div className="side-donation-buttons">
      <Link to={`/donate-form?type=${1}&data=${data?.id}`}>  <button className="side-donate-once">Donate Once</button></Link>
      <Link to={`/donate-form?type=${0}&data=${data?.id}`}>  <button className="side-donate-monthly">Donate Monthly</button></Link>
      </div>

      </div>

       <div className="text-become-vol">
      <Link to="/become-a-volunteer" style={{textDecoration:"none"}}><h2>Become a Volunteer</h2></Link> 
       </div>

      

     
    </div>
  );
};

export default FoodSideCompo;