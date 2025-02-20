import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleServiceCustomTabs({data}) {
  return (
  <>
    <Link to={`/serviceCatagory?id=${data?.id}`} style={{textDecoration:"none"}}>
    <div className='single-service-tab'>
        <p>{data?.name}</p>
    </div></Link>
  </>    

)
}
