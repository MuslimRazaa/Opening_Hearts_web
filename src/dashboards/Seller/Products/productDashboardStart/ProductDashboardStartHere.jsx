import React from 'react'
import funnyCartoon from '../../../../media/images/Tem_Images/funny-cartoon-superhero-character-with-mask 1.png'
import { Link } from 'react-router-dom'


function ProductDashboardStartHere() {
  return (
    <div>
      <div className="seller-service-dashboard-main-right">
        <h2>Welcome to Opening Heart Digital Gateway Product-seller HUB</h2>
        <p>This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32</p>
        <div className="seller-service-dashboard-main-right-button">
          <Link to="/become-seller" style={{ textDecoration: "none" }}>
            <button>Lets Get Started</button>
          </Link>
        </div>
      </div>
      <div className="seller-service-dashboard-main-image">
        <img src={funnyCartoon} />
      </div>
    </div>
  )
}

export default ProductDashboardStartHere
