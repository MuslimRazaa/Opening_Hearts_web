import React, { useState } from 'react'
import search from '../../../../media/images/search.svg';
import tb1 from '../../../../media/images/tabletopB1.png'
import tb2 from '../../../../media/images/tabletopB2.png'
import CustomDatePicker from '../../../../components/Main/CalenderDpDown';
import DonationRevenueTable from '../Tables/DonationRevenueTable';
function DonationDashboardTableTab() {
    const [tableTab, setTableTab] = useState("Active")

    const handleTableTabchange = (tab) => {
        setTableTab(tab)
    }
    return (
        <div className='table-tabs-main'>

            <div className="calender-buttons">
                <div className="both-side-calendor">
                    <CustomDatePicker datelabel={false} />
                    <p>Compare To</p>
                    <CustomDatePicker datelabel={false} />
                </div>
            
            </div>
            <div className="table-main-wrapper">
                <DonationRevenueTable link="/donation-dashboard/donation-volunteer-profile-edit" tab={tableTab} />
            </div>
        </div>
    )
}

export default DonationDashboardTableTab
