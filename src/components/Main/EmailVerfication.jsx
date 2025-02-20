import React, { useState } from 'react'
import { OtpInput } from 'reactjs-otp-input';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import apis from '../../service';
import Swal from 'sweetalert2';

function EmailVerfication() {
    const [otp, setOtp] = useState('');
    const [formLoading, setFormLoading] = useState(false);
    const [formData, setFormData] = useState("");
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const type = params.get('type');
    const email = params.get('email');
    const handleChange = (otp) => setOtp(otp);
    const navigate = useNavigate();


    const handleSubmit = async () => {
        if (otp.length === 5) {
            setFormLoading(true)
            try {
                const response = await apis.verifyOtp({
                    email: email,
                    otp: otp,
                    type: 0
                })
                localStorage.setItem('token', response?.data?.data?.token)
                localStorage.setItem('user_data', JSON.stringify(response?.data?.data))
                navigate(`/packages?type=${type}`)
            } catch (error) {
                setFormLoading(false)
                Swal.fire({
                    icon: 'error',
                    text: error.response?.data?.message,
                });
            }

        }

        // You could send formData to an API or use it in other ways
    };

    const resendOtp = async () => {
        try {
            const response = await apis.resendOtp({
                email: email,
                type: 0
            })
            Swal.fire({
                icon: 'success',
                text: response?.data?.message,
                confirmButtonText: 'OK',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message,
            });
        }
    }
    return (

        <div className='sign-up'>
            <div className='sign-form-other' >
                <div className='form-wrapper'>
                    <div className='sign-up-image'>
                    </div>
                    <div className='form-main-forgot-password'>
                        <div className='verify_email_otp_heading'>
                            <h1 className='verify_email_otp_mainhead'>Email Verification</h1>
                            <p>Enter 6 digits code<br></br>
                            </p>
                        </div>
                        <div className='verify_email_otp'>
                            <OtpInput
                                value={otp}
                                onChange={handleChange}
                                numInputs={5}
                                placeholder="_____"
                                separator={<span></span>}
                                inputStyle={styles.input}
                            />
                        </div>
                        <div className='sign-up-form-button'>
                            <div className="both_btn_verify">
                                <p style={{ color: "#000" }}>Didn’t Receive the  code?</p>
                                <p onClick={() => resendOtp()} style={{ color: '#C96767', fontSize: "18px", cursor: 'pointer' }}>Resend</p>
                            </div>
                            <button type="submit" onClick={() => { handleSubmit() }}>{formLoading ? "Loading..." : "Verify"}</button>
                        </div>
                    </div>
                </div>
            </div>
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
export default EmailVerfication
