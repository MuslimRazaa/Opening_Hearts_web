import React from 'react'
import DonationTransactionTable from './DonationTransactionTable'

function WalletDetailAmountBalanceDonation() {
  return (
    <>
    <div className="wallet-main-class">
                <div className="wallet-card-section">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="wallet-card">
                                <select className='this-week' id="">
                                    <option value="">This Week</option>
                                    <option value="">1 Week</option>
                                    <option value="">2 Week</option>
                                    <option value="">3 Week</option>
                                </select>
                                <h2>
                                    Total Earning
                                </h2>
                                <h1>$1,500.90</h1>

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="wallet-card2">
                                <select className='this-week' id="">
                                    <option value="">This Week</option>
                                    <option value="">1 Week</option>
                                    <option value="">2 Week</option>
                                    <option value="">3 Week</option>
                                </select>
                                <h2>
                                    Amount Balance
                                </h2>
                                <h1>$500.90</h1>
                                <p>$300 Amount Pending</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {/* tables */}
                            <DonationTransactionTable />
                        </div>
                        
                    </div>
                </div>
            </div>
   </>
     )
}

export default WalletDetailAmountBalanceDonation