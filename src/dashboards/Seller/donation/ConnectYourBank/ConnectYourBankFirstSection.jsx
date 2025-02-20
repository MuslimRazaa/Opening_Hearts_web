import React from 'react'

const ConnectYourBankFirstSection = () => {
    return (
        <>
            <div className="contact-to-bank-main-class">
                <h1>Connect your bank</h1>
                <p>Your payements are secured, Your Details are confedentials</p>


                <div className="bank-conect-form">
                    <form action="">
                        <div className="bank-input-group">
                            <input type="text" placeholder='Account Holder Name' className='connect-bank-input' />
                        </div>
                        <div className="bank-select-group">
                            <select>
                                <option>Select bank</option>
                                <option>ABC Bank</option>
                                <option>XYZ Bank</option>
                            </select>
                        </div>

                        <div className="bank-input-group">
                            <input type="text" placeholder='Bank Account / IBAN' className='connect-bank-input' />
                        </div>
                        <div className="bank-input-group">
                            <input type="text" placeholder='SWIFT/ Routing Number' className='connect-bank-input' />
                        </div>
                        <div className="bank-btn-group ">
                           <button type="button" className='btn-add-bank'>Add Bank</button>
                        </div>


                    </form>
                </div>
            </div>

        </>
    )
}

export default ConnectYourBankFirstSection
