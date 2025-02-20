import React, { useState } from 'react'
import tb1 from '../../../media/images/tabletopB1.png'
import tb2 from '../../../media/images/tabletopB2.png'
import CustomDatePicker from '../../../components/Main/CalenderDpDown';
import PurchaseHistoryTable from './PurchaseHistoryTable';

function PurchaseHistoryTabs() {
    const [tableTab, setTableTab] = useState("Active")

    const handleTableTabchange = (tab) => {
        setTableTab(tab)
    }
    return (
        <div className='table-tabs-main'>
            <div className="tabs-button-wrapper">
                <button className={tableTab === "All" ? "active" : ""} onClick={() => handleTableTabchange("All")}>All</button>
                <button className={tableTab === "In Process" ? "active" : ""} onClick={() => handleTableTabchange("In Process")}>In Process</button>
                <button className={tableTab === "Shipped" ? "active" : ""} onClick={() => handleTableTabchange("Shipped")}>Shipped</button>
                <button className={tableTab === "Delivered" ? "active" : ""} onClick={() => handleTableTabchange("Delivered")}>Delivered</button>
                <button className={tableTab === "Refund" ? "active" : ""} onClick={() => handleTableTabchange("Refund")}>Refund</button>
            </div>
          
            <div className="calender-buttons">
                <div className="both-side-calendor">
                    <CustomDatePicker datelabel={false} />
                   
                </div>
                <div className='d-flex justify-content-center align-items-center gap-20'>
                    <img src={tb1} />
                    <img src={tb2} />
                </div>
            </div>
            <div className="table-main-wrapper">
            <PurchaseHistoryTable tab={tableTab} />
            </div>
        </div>
    )
}

export default PurchaseHistoryTabs
