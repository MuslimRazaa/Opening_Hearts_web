import React from 'react'
import ssbanner from '../../../media/images/singleServiceBanner.png'
function SingleServiceBanner({data}) {
  return (
    <>
        <div className="single-service-detail-page-banner">
            <div className="singlie-service-banner-content">
            <h2>{data[0]?.category?.name || "No Category Available"}</h2>
            <p>{data[0]?.category?.description || "" }</p>
            </div>
        </div> 
    </>
  )
}

export default SingleServiceBanner
