import React, { useState } from 'react'
import search from '../../../../media/images/search.svg';
import tb1 from '../../../../media/images/tabletopB1.png'
import tb2 from '../../../../media/images/tabletopB2.png'
import ProductRevenueTable from '../Tables/ProductRevenueTable';
import CustomDatePicker from '../../../../components/Main/CalenderDpDown';
function ProductTableTab() {
    const [tableTab, setTableTab] = useState("Active")

    const handleTableTabchange = (tab) => {
        setTableTab(tab)
    }
    return (
        <div className='table-tabs-main'>
            <div className="tabs-button-wrapper">
                <button className={tableTab === "All" ? "active" : ""} onClick={() => handleTableTabchange("All")}>All</button>
                <button className={tableTab === "Pending" ? "active" : ""} onClick={() => handleTableTabchange("Active")}>Pending</button>
                <button className={tableTab === "Active" ? "active" : ""} onClick={() => handleTableTabchange("Active")}>Active</button>
                <button className={tableTab === "Complete" ? "active" : ""} onClick={() => handleTableTabchange("Complete")}>Completed</button>
                <button className={tableTab === "Cancel" ? "active" : ""} onClick={() => handleTableTabchange("Cancel")}>Refunded</button>
                <button className={tableTab === "Cancel" ? "active" : ""} onClick={() => handleTableTabchange("Cancel")}>Rejected</button>
            </div>
            <div className='donation-detail-page-search-bar-table-tab'>
                <img src={search} alt="Search icon" />
                <input type='search' placeholder='Search..' />
            </div>

            <div className="calender-buttons">
                <div className="both-side-calendor">
                    <CustomDatePicker datelabel={false} />
                    <p>To</p>
                    <CustomDatePicker datelabel={false} />
                </div>
                <div className='d-flex justify-content-center align-items-center gap-20'>
                    <img src={tb1} />
                    <img src={tb2} />
                </div>
            </div>
            <div className="table-main-wrapper">
                <ProductRevenueTable tab={tableTab} />
            </div>
        </div>
    )
}

export default ProductTableTab
