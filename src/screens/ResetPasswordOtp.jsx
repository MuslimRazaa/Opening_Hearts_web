import React, { useState } from 'react';
import { OtpInput } from 'reactjs-otp-input';
import signuplogo from '../media/images/logo-sign-up.png';
import { Link, useNavigate } from 'react-router-dom';
import { verifyOtp } from '../utils/api'; // Import API utility
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

function ResetPasswordOtp() {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false); // For button loading state
    const [error, setError] = useState(''); // To display any errors
    const navigate = useNavigate();

    const handleChange = (otp) => setOtp(otp);

    const location = useLocation();
    const email = location.state?.email || ''; // Get the email from state


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (otp?.length < 5) {
            Swal.fire({
                icon: 'error',
                text: 'Enter OTP',
            })
            setLoading(false);
        }
        else {
            const formData = {
                email: email, // Replace with actual email from state/context
                otp,
                type: 0, // For email verification
                is_user: 1,
            };

            try {
                const response = await verifyOtp(formData);
                // Show success alert
                await Swal.fire({
                    icon: 'success',
                    text: 'Your account has been verified successfully.',
                    confirmButtonText: 'OK',
                });
                // Redirect on success
                navigate('/login');
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    text: err.response?.data?.message || 'Something went wrong!',
                });
                setError(err.response?.data?.message || 'Failed to verify OTP. Please try again.');
            } finally {
                setLoading(false);
            }
        }

    };

    return (
        <div className="sign-up">
            <div className="sign-form-fgp">
                <div className="form-wrapper">
                    <div className="sign-up-image">
                        <Link to="/"><img src={signuplogo} alt="Logo" /></Link>
                    </div>
                    <form onSubmit={handleSubmit} className="form-main-forgot-password">
                        <div className="Form-heading-otp">
                            <p>
                                Now Enter Your 5 Digit Code We’ve Sent You On The Email<br />
                                {email}
                            </p>
                        </div>
                        <div className="OTP-holder">
                            <OtpInput
                                value={otp}
                                onChange={handleChange}
                                numInputs={5}
                                placeholder="_____"
                                separator={<span> </span>}
                                inputStyle={styles.input}
                            />
                        </div>
                        <div className="sign-up-form-button">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Verifying...' : 'Confirm'}
                                </button> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const styles = {
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
};

export default ResetPasswordOtp;
