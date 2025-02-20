import React from 'react'
import amercalogo from '../../../../media/images/bankamericalogo.png'

const DonationTransactionTable = () => {
    return (
        <>
            <div className='transactions-table'>
                <h1>
                    Transactions
                </h1>
                <div className="table-container">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Donate Amount</th>
                                <th>Bank</th>
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> 22/03/2024</td>
                                <td>$22,000 </td>
                                <td><img style={{width:'33.99px',height:'35.88px'}} src={amercalogo} alt="" /></td>
                                <td>Approved</td>
                            </tr>
                            <tr>
                                <td> 22/03/2024</td>
                                <td>$22,000 </td>
                                <td><img style={{width:'33.99px',height:'35.88px'}} src={amercalogo} alt="" /></td>
                                <td>Approved</td>
                            </tr>
                            <tr>
                                <td> 22/03/2024</td>
                                <td>$22,000 </td>
                                <td><img style={{width:'33.99px',height:'35.88px'}} src={amercalogo} alt="" /></td>
                                <td>Approved</td>
                            </tr>
                            <tr>
                                <td> 22/03/2024</td>
                                <td>$22,000 </td>
                                <td><img style={{width:'33.99px',height:'35.88px'}} src={amercalogo} alt="" /></td>
                                <td>Approved</td>
                            </tr>
                            <tr>
                                <td> 22/03/2024</td>
                                <td>$22,000 </td>
                                <td><img style={{width:'33.99px',height:'35.88px'}} src={amercalogo} alt="" /></td>
                                <td>Approved</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DonationTransactionTable
