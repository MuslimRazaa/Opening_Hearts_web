import React, { useEffect, useRef, useState } from 'react'
import servicebanner from '../../media/images/service-banner.png'
import { Link } from 'react-router-dom';

function ServiceBanner() {
    const [resourceStatus, setResourceStatus] = useState(false)
    const resourceRef = useRef(null); // Create a ref for the resource element
    const handleResourceMenu =()=>{
        setResourceStatus(!resourceStatus)
    }
    useEffect(() => {
        // Function to handle clicks outside of the resource element
        const handleClickOutside = (event) => {
            if (resourceRef.current && !resourceRef.current.contains(event.target)) {
                setResourceStatus(false); // Set status to false if clicked outside
            }
        };

        // Bind the event listener to document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

  return (
    <>
      <div className='service-landing-page'>
            <img src={servicebanner} />
       <div className="container">
           <div className="service-banner-content">
                <h3> One Stop Solution <span 
                style={{
                   fontWeight:"400" , 
                   marginLeft:"15px",
                   fontFamily:"openSans"
                }}>
                    For all of your</span></h3>
                <h2 className='service-heading-problem' style={{fontSize:"110px" , }} >PROBLEM</h2>
           </div>
        </div>
      </div>
    </>
  )
}

export default ServiceBanner
