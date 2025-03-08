import React from 'react'
import fundlogo from '../../media/images/Funding Circle log.png'
import shareicon from '../../media/images/share-icon.svg'
import hearticon from '../../media/images/heart-icon.svg'

function FundingCycleHeader({ funding, data }) {
  return (
    <div className='funding-cycle-main'>
      <div className="container">
        <div className="row">
          <div className="col-md-12">

            <div className="fund-inner-main">
              <div className="funding-logo">
                <img width={108.83} src={data?.profile_image} alt="" srcset="" />
              </div>
              <div className="funding-card">
                {funding === "true" ? (
                  <h4 className='sav-organization'>Save this Organization</h4>) : ""}
                <div className="insidecard-txt">
                  <h3>{data?.organization_name}</h3>
                  <p>Non-Profit Organization</p>

                </div>
                <div className="found-card-icon">
                  <img width={31.24} src={shareicon} alt="" srcset="" />
                  <img width={31.24} src={hearticon} alt="" srcset="" />
                  <p>{data?.year}<span>Years</span></p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FundingCycleHeader
