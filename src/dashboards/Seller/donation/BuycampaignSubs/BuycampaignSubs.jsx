import React from 'react'
import Footer from '../../../../components/Layout/Footer'
import BuySubFrom from '../BuyMonthlySub/BuySubFrom'
import HeaderTop from '../../../../components/Layout/HeaderTop'



function BuyCampaignSubcribtion() {
    return (
        <div>
            <HeaderTop />
            <BuySubFrom heading={"Buy Campaign Subscription"} link={true} verification={true}/>
            <Footer />
        </div>
    )
}

export default BuyCampaignSubcribtion
