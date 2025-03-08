import React from 'react'
import img1 from '../../media/images/Group.png'

function ServiceSection5() {
  return (
    <div className='service-section-5'>
        <h2>The Solution of any <br></br> problem at your fingertips</h2>
        <div className="section-5-options">
          <div className="service-section-5-catagories">
            <img src={img1} />
            <p>Over 140+ Categories</p>
          </div>
          <div className="service-section-5-catagories">
          <img src={img1} />
          <p>Over 140+ Categories</p>
          </div>
        </div>
        {/* <div className="container">
          <div className="looking-for">
            <h4>Did you find what you were looking for？ </h4>
            <div className="looking-for-buttons">
              <button>
                Yes
              </button>
              <button>
                No
              </button>
              </div>
          </div>
        </div> */}
    </div>
  )
}

export default ServiceSection5
