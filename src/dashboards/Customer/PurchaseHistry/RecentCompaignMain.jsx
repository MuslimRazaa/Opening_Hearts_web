import React, { useState } from 'react'
import search from '../../../media/images/search.svg';
import tb1 from '../../../media/images/tabletopB1.png'
import tb2 from '../../../media/images/tabletopB2.png'
import CustomDatePicker from '../../../components/Main/CalenderDpDown'
import TableRecontCompaign from './TableRecontCompaign';

const RecentCompaignMain = () => {
    return (
        <div className='table-tabs-main'>



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
                <TableRecontCompaign />
            </div>
        </div>
    )
}

export default RecentCompaignMain
