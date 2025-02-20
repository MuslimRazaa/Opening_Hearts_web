import React from 'react'
import SideBar from '../../../../components/Layout/SideBar'
import ConnectYourBankFirstSection from './ConnectYourBankFirstSection'

const ConnectYourBankSectionTwo = () => {
    return (
        <>
        <div className="container">
            <div className="dashboard-seller-service">
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-8">
                        {/* <SearchBar /> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <SideBar />
                    </div>
                    <div className="col-lg-8">
                     <ConnectYourBankFirstSection/>
                    </div>
                </div>
            </div >
            </div>
        </>
    )
}

export default ConnectYourBankSectionTwo
