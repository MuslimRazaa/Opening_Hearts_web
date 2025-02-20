import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signuplogo from '../media/images/logo-sign-up.png';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ForgetPassword } from '../utils/api';
import Swal from 'sweetalert2';

function ForgotPassword() {
    const navigate = useNavigate(); // Declare navigate hook
    const [loading, setLoading] = useState(false);

    // Initial values for Formik
    const initialValues = {
        email: '',
    };

    // Form validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
    });

    // Handler for form submission
    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const formData = {
                email: values.email,
                type: 1, //0 for email verification 1 for forgot password
                is_user: 1
            };

            const response = await ForgetPassword(formData);

            navigate('/opt', { state: { email: values.email } });

        } catch (err) {
            Swal.fire({
                icon: 'error',
                text: err.response?.data?.message || 'Something went wrong!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sign-up">
            <div className="sign-form-fgp">
                <div className="form-wrapper">
                    <div className="sign-up-image">
                        <Link to="/">
                            <img src={signuplogo} alt="Sign Up Logo" />
                        </Link>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="form-main-forgot-password">
                                <div className="Form-heading-forgot-password">
                                    <h2>Forgot Password</h2>
                                </div>
                                <div>
                                    <p>Email</p>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="example@example.com"
                                    />
                                    <ErrorMessage name="email" component="div" className="error" />
                                </div>
                                <div className="sign-up-form-button">
                                    <button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending ...' : 'Send'}
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

export default ForgotPassword;
