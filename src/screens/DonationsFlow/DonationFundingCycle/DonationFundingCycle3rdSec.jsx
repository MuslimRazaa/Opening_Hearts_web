import React from 'react'

function DonationFundingCycleSec({data}) {
  return (
    <div className='3rd-sec-fund-dona mb-5'>
       <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="third-section-card">
              <div className="locations-sec">
                   <h2>Locations</h2>
                   <p>
                   {data?.street_address}
                   </p>
              </div>
              <div className="website-sec">
                   <h2>Website</h2>
                   <p>
                   {data?.website}
                   </p>
              </div>
              <div className="established-sec">
                   <h2>Year Established</h2>
                   <p>
                   {data?.year_established}
                   </p>
              </div>


            </div>
          </div>
        </div>
       </div>
    </div>
  )
}

export default DonationFundingCycleSec
