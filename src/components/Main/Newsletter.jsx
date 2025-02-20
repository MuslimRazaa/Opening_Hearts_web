import React from 'react'
import env from '../../media/images/🦆 icon _email outline_.svg'
import arrr from '../../media/images/aaaa.png'
import aw from '../../media/images/arrWi.svg'

function Newsletter() {
  return (
    <div className="newsletter">
        <div className="container">
            <div className="newsletter-wrapper">
                <div className="newsletter-top">
                    <h2>Get Help You Need</h2>
                    <p>Visit Our Resources And Get Any Business Info </p>
                    {/* <div className="newsletter-top-buton-icon">
                        <button>View Resources </button>
                        <img src={aw} />
                    </div> */}
                    <div className="newsletter-bottom-button" style={{ width: "25%"}} >
                        <div className="newsletter-email d-flex justify-content-left align-items-center gap-20">
                            <p className='newsletter-vr-p' >View Resources</p>
                        </div>
                        <img src={aw} />
                    
                    </div>
                </div>
                <div className="newsletter-mid">
                    <hr></hr>
                </div>
                <div className="newsletter-bottom">
                    <h2>Subscribe To Newsletter </h2>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ustrud e</p>
                    <div className="newsletter-bottom-button">
                        <div className="newsletter-email d-flex justify-content-left align-items-center gap-20">
                            <img src={env} />
                            <input type='text' placeholder='Your Email Address' />
                            {/* <p className='newsletter-email-p' >Your Email Address</p> */}
                        </div>
                    <div className="newsletter-bottom-arrow">
                        <img src={arrr} />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Newsletter
