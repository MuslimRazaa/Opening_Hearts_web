import React from 'react'
import Fundinlogo from '../../../../media/images/Funding Circle log.png'
import materialsymbols from '../../../../media/images/material-symbols_edit.png'
import { Link } from 'react-router-dom'
const EditOrganizationInfoSectionFirst = () => {
    return (
        <>
            <div className="main-edit-organization-information">
                <div className="edit-organization-information-card">
                <div className="edit-organization-information-text">
                <h2>
                        Organization Information
                    </h2>
                    <img src={Fundinlogo} alt="" />
                    <Link to="">Change Photo</Link>
                </div>

                    <div className="edit-organization-information-address">
                    <p style={{ color: 'orangered', fontWeight: '700', }}>LOCATION:<span> Washington, D.C. - USA EIN: 30-0108263</span></p>
                    <p style={{ color: 'orangered', fontWeight: '700', }}>WEBSITE:<span> ​www.Funding cirlce.org</span></p>
                    <p style={{ color: 'orangered', fontWeight: '700', }}>FACEBOOK:<span> Facebook Page</span></p>
                    <p style={{ color: 'orangered', fontWeight: '700', }}>TWITTER:<span> @GlobalGiving</span></p>
                    <div className="edit-pen">
                    <img src={materialsymbols} alt="" />
                    </div>
                </div>
                </div>
               
              


            </div>
        </>
    )
}

export default EditOrganizationInfoSectionFirst
