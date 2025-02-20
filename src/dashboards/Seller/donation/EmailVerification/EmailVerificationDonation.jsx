import React, { useState } from 'react'
import { OtpInput } from 'reactjs-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import right from '../../../../media/images/tic.png'
import Footer from '../../../../components/Layout/Footer';
import HeaderTop from '../../../../components/Layout/HeaderTop';
import Modal from '../../../../components/Layout/Modal';


function EmailVerificationDonation() {
    const [otp, setOtp] = useState('');
    const [formData, setFormData] = useState("");
    const [isModalVisible4, setIsModalVisible4] = useState(false);
    
    const handleChange = (otp) => setOtp(otp);
    const handleCloseModal4 = () => {
        setIsModalVisible4(false);
    };
    const navigate = useNavigate();  // Declare navigate hook here


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsModalVisible4(true);

        // You could send formData to an API or use it in other ways
    };
  return (

    <div className='sign-up'>
        <HeaderTop/>
    <div className='sign-form-other' >
        <div className='form-wrapper'>
            <div className='sign-up-image'>
            </div>
            <form onSubmit={handleSubmit} className='form-main-forgot-password'>
                <div className='verify_email_otp_heading'>
                    <h1 className='verify_email_otp_mainhead'>Email Verification</h1>
                  <p>Enter 6 digits code<br></br> 
                   </p>
                </div>
                <div className='verify_email_otp'>
                    <OtpInput
                                value={otp}
                                onChange={handleChange}
                                numInputs={6}
                                placeholder="______"
                                separator={<span> </span>}
                                inputStyle={styles.input}
                    />
                    </div>
                <div className='sign-up-form-button'>
                    <div className="both_btn_verify">
                        <p style={{color:"#000"}}>Didn’t Receive the  code?</p>
                        <a href="#" style={{color:'#C96767',fontSize:"18px",}}>Resend</a>
                    </div>
                    <button type="submit">Verify</button>
                </div>
            </form>
        </div>
    </div>
    <Footer/>

    <Modal isVisible={isModalVisible4} onClose={handleCloseModal4}>
                <div className='modal-content-here'>
                    <div className="modal-success-image">
                        <img src={right} />
                    </div>
                    <div className="modal-content-here-success">
                        <h2>Your Campaign has been Uplaoded</h2>
                    </div>
                    <div className="modal-content-buttons">
                        <Link to="/donation-dashboard/donation-dashboard-screen" > <button className='modal-continue-btn'>Continue</button> </Link> 
                    </div>
                </div>
            </Modal>

</div>
  )
}
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
    },
    input: {
        width: '82px',
        height: '92px',
        fontSize: '50px',
        borderRadius: '15px',
        border: 'none',
        backgroundColor: '#E6E6E66B',
        margin: '0 5px',
        padding: '0px',
        color: '#000000B2',  
    },
    placeholder: {
        color: '#0000',
    }
};
export default EmailVerificationDonation
