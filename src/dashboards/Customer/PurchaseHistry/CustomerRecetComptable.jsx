import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PuschaseTableMian from './RecentCompaignMain'
import colorfullarrow from '../../../media/images/arrow-color-full.png'
import arrowwhite from '../../../media/images/arrow-white.png'
import RecentCompaignMain from './RecentCompaignMain'

const CustomerRecetComptable = () => {
  return (
    <>
  <div className="row">
                      <div className="col-lg-6">
                          <div className="customer-card-dash">
                              <h3>Donations</h3>
                              <h2>4 Times</h2>
                              <div className="total-uper-arrow">
                                  <p>+20% month over month</p>
                                  <img src={colorfullarrow} className='color-full-arrow ' alt="" />
                                  <img src={arrowwhite} className='white-arrow ' alt="" />
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-6">
                          <div className="customer-card-dash">
                              <h3>Amount Donate</h3>
                              <h2>$500.90</h2>
                              <div className="total-uper-arrow">
                                  <p>+33% month over month</p>
                                  <img src={colorfullarrow} className='color-full-arrow ' alt="" />
                                  <img src={arrowwhite} className='white-arrow ' alt="" />
                              </div>
                          </div>
  
                      </div>
  
                  </div>
    <div className='orders-table-and-tabs'>
      <div className="orders-table-heading">
          <h2>Recent Campaigns</h2>
      </div>
      <RecentCompaignMain />
    </div>
</>
  )
}

export default CustomerRecetComptable
