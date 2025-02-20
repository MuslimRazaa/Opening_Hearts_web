import React from 'react'
import isellservice from '../../media/images/isSellService.png'
import isellproduct from '../../media/images/isellproduct.png'
import { Link } from 'react-router-dom'
import { useUserData } from '../shared/helperMethod';

function SelectYourDomainCards() {
  const user = useUserData();
  return (
    <div className='select-your-domain-card-section'>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="select-your-domain-card-txt-sec">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-5 justify-content-center">
          {user?.is_service_subscription == 1 ?
          null :
            <div className="col-md-6">
              <Link to="/register-your-ecommerce-store?type=service" >
                <div className="card-select-your-domain">
                  <div className="do-card-both">
                    <img src={isellservice} alt="" />
                    <p>I Offer Services</p>
                  </div>
                </div>
              </Link>
            </div>
          }
          {user?.is_product_subscription == 1 ?
          null :
            <div className="col-md-6">
              <Link to="/register-your-ecommerce-store?type=product">
                <div className="card-select-your-domain">
                  <div className="do-card-both">
                    <img src={isellproduct} alt="" />
                    <p>I Sell Products</p>
                  </div>
                </div>
              </Link>
            </div>
            }
        </div>
      </div>
    </div>
  )
}

export default SelectYourDomainCards