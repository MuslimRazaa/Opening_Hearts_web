import React from 'react';

function AboutMethew({ data }) {
    return (
        <div className='container'>
            <div className="horizontal-line-service-profile-page">
                <hr />
            </div>
            <div className="row">
            {data?.experiences ?  <div className="col-lg-6">
                    <div className="about-user-title">
                        <h2>About Mathew</h2>
                    </div>
                    <div className="about-user-list">
                        {/* Render the experiences content passed from the data prop */}
                    <div 
                            dangerouslySetInnerHTML={{ __html: data?.experiences }} 
                        /> 
                    
                    </div>    
                </div>: ""
                }
                <div className="col-lg-6"></div>
            </div>
            <div className="horizontal-line-service-profile-page">
                <hr />
            </div>
        </div>
    );
}

export default AboutMethew;