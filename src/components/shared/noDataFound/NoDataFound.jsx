import React from 'react'
import NoData from '../../../media/images/do-data-found.png'

function NoDataFound({title , height}) {
    return (
        <div className='no-data-found' style={{height : height}}>
            <img src={NoData} alt="" />
            <p>{title}</p>
        </div>
    )
}

export default NoDataFound