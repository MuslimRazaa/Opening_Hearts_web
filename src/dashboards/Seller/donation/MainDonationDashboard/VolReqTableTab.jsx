import React, { useState } from 'react'
import search from '../../../../media/images/search.svg';
import tb1 from '../../../../media/images/tabletopB1.png'
import tb2 from '../../../../media/images/tabletopB2.png'
import CustomDatePicker from '../../../../components/Main/CalenderDpDown';
import DonationRevenueTable from '../Tables/DonationRevenueTable';
import RecentVolReqTable from './RecentVolReqTable';
function VolReqTableTab() {
    const [tableTab, setTableTab] = useState("Active")

    const handleTableTabchange = (tab) => {
        setTableTab(tab)
    }
    return (
        <div className='table-tabs-main'>
            {/* <div className="tabs-button-wrapper">
                <button className={tableTab === "All" ? "active" : ""} onClick={() => handleTableTabchange("All")}>All</button>
                <button className={tableTab === "Active" ? "active" : ""} onClick={() => handleTableTabchange("Active")}>Active</button>
                <button className={tableTab === "Complete" ? "active" : ""} onClick={() => handleTableTabchange("Complete")}>Completed</button>
                <button className={tableTab === "Cancel" ? "active" : ""} onClick={() => handleTableTabchange("Cancel")}>Cancelled</button>
            </div> */}

          
            <div className="table-main-wrapper">
                <RecentVolReqTable tab={tableTab} />
            </div>
        </div>
    )
}

export default VolReqTableTab
