import React from 'react'
import donation from '../../media/images/Tem_Images/donationCard.svg'
import { Link } from 'react-router-dom'

function DonationCard({image, name, description, req_amt, dnt_amt, percentage, id}) {

    function stripHtmlTags(input) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(input, 'text/html');
        return doc.body.textContent || "";
      }

      const toatal_percentage = (dnt_amt / req_amt) * 100 ;

  return (
    <div className='Donation-card'>
        <div className='donation-card-image'>
            <img src={image} />
        </div>
        <div className='donation-card-title'>
            <h1>{name}</h1>
        </div>
        <div className='donation-card-content'>
            <p>{stripHtmlTags(description)}</p>
        </div>
        <div class="progress-bar-container">
        <div class="progress-bar-fill" style={{width: percentage }}></div>
        <div class="progress-bar-light-fill" style={{width: percentage + 5}}></div>
        </div>        
        <div className='donation-card-price'>
            <div className='donation-card-price-tag-one'>
                <h1>$ {dnt_amt}</h1>
                <h4>Raised So far</h4>
            </div>
            <div className='donation-card-price-tag-two'>
            <h1>$ {req_amt}</h1>
            <h4>Amount Required</h4>
            </div>
        </div>
        <div className='donation-card-button'>
        <div className='service-card-button'>
           <Link to={`/donation-food-drive?campaign_id=${id}`} > <button>Donate Now</button></Link>
            </div>
        </div>
    </div>
  )
}

export default DonationCard
