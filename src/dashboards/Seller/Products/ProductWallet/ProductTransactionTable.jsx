import React, { useEffect, useState } from 'react'
import amercalogo from '../../../../media/images/bankamericalogo.png'
import apis from '../../../../service';
import Swal from 'sweetalert2';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';
import NoDataFound from '../../../../components/shared/noDataFound/NoDataFound';

const ProductTransactionTable = ({ handleOrderNowClick3, transactions }) => {

    return (
        <>

            <div className='transactions-table'>
                <div className="top">
                    <h1>Transactions</h1>
                    <button onClick={handleOrderNowClick3}>Withdraw</button>
                </div>
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
                        {transactions?.length > 0 ?
                            <tbody>
                                {transactions?.map((transaction, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{transaction?.date}</td>
                                            <td>${transaction?.amount}</td>
                                            <td>{transaction?.bank?.bank_name}</td>
                                            <td>{transaction?.status}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            :
                            null}
                    </table>
                </div>
                {transactions?.length === 0 ?
                    <NoDataFound title={'No data found'} />
                    :
                    null
                }
            </div>

        </>
    )
}

export default ProductTransactionTable
