import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import signuplogo from '../media/images/logo-sign-up.png';
import eye from '../media/images/eye.svg';
import eyeHide from '../media/images/eyeHide.svg';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChangePassword } from '../utils/api';
import Swal from 'sweetalert2';

function NewPassword() {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || ''; // Retrieve the email from the location state

    // Toggle visibility of the new password field
    const togglePasswordVisibility = () => {
        setShowNewPassword((prev) => !prev);
    };

    // Toggle visibility of the confirm password field
    const togglePasswordVisibility2 = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    // Validation schema for form fields
    const validationSchema = Yup.object({
        newPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('New Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    // Handler for form submission
    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true);

        try {
            const formData = {
                email: email, // Use email from location state
                password: values.newPassword,
                new_password: values.confirmPassword, // Update API parameter
                is_user: 1,
            };

            const response = await ChangePassword(formData);

            // Show success alert
            await Swal.fire({
                icon: 'success',
                text: 'Your password has been changed successfully.',
                confirmButtonText: 'OK',
            });

            // Navigate to home on success
            navigate('/');
        } catch (err) {
            Swal.fire({
                icon: 'error',
                text: err.response?.data?.message || 'Something went wrong!',
            });
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <div className="sign-up">
            <div className="sign-form-fgp">
                <div className="form-wrapper">
                    <div className="sign-up-image">
                        <Link to="/"><img src={signuplogo} alt="Sign Up Logo" /></Link>
                    </div>
                    <Formik
                        initialValues={{
                            newPassword: '',
                            confirmPassword: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="form-main-forgot-password">
                                <div style={{ position: 'relative' }}>
                                    <p>New Password</p>
                                    <Field
                                        type={showNewPassword ? "text" : "password"}
                                        name="newPassword"
                                        placeholder="*************"
                                    />
                                    <ErrorMessage name="newPassword" component="div" className="error" />
                                    <img
                                        src={showNewPassword ? eye : eyeHide}
                                        alt="Toggle Password Visibility"
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            width: "35px",
                                            position: 'absolute',
                                            right: "1.5rem",
                                            top: "3.8rem",
                                            cursor: 'pointer',
                                        }}
                                    />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <p>Confirm Password</p>
                                    <Field
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="*************"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="error" />
                                    <img
                                        src={showConfirmPassword ? eye : eyeHide}
                                        alt="Toggle Confirm Password Visibility"
                                        onClick={togglePasswordVisibility2}
                                        style={{
                                            width: "35px",
                                            position: 'absolute',
                                            right: "1.5rem",
                                            top: "3.8rem",
                                            cursor: 'pointer',
                                        }}
                                    />
                                </div>
                                <div className="sign-up-form-New-password-button">
                                    <button type="submit" disabled={isSubmitting || loading}>
                                        {loading ? 'Confirming...' : 'Confirm'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default NewPassword;
