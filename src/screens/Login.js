import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import signuplogo from '../media/images/logo-sign-up.png';
import fb from '../media/images/fb.png';
import google from '../media/images/google.png';
import eye from '../media/images/eye.svg';
import eyeHide from '../media/images/eyeHide.svg';
import { LoginUser } from '../utils/api';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Form validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            setRememberMe(true);
        }
    }, []);



    // Handle form submission
    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const formData = {
                email: values.email,
                password: values.password,
                is_user: 1,
            };
            const response = await LoginUser(formData);
            
            // If "Remember Me" is checked, save email to local storage
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', values.email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            localStorage.setItem('user_data', JSON.stringify(response?.data?.data));
            localStorage.setItem('token', response?.data?.data?.token);
            // Show success alert
            await Swal.fire({
                icon: 'success',
                text: 'Login successfully.',
                confirmButtonText: 'OK',
                timer: 2000
            });
            
            navigate('/'); // Redirect after successful login
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
            <div className="sign-form">
                <div className="form-wrapper">
                    <div className="sign-up-image">
                        <Link to="/">
                            <img src={signuplogo} alt="Sign Up Logo" />
                        </Link>
                    </div>
                    <Formik
                        initialValues={{
                            email: localStorage.getItem('rememberedEmail') || '',
                            password: '',
                        }} validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="form-main-login">
                                <div className="Form-heading">
                                    <h2>WELCOME BACK</h2>
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="example@example.com"
                                    />
                                    <ErrorMessage name="email" component="div" className="error" />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="*************"
                                    />
                                    <ErrorMessage name="password" component="div" className="error" />
                                    <img
                                        src={showPassword ? eye : eyeHide}
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            width: '35px',
                                            position: 'absolute',
                                            right: '1.5rem',
                                            top: '3.8rem',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                            color: '#888',
                                        }}
                                        alt="Toggle Password Visibility"
                                    />
                                </div>
                                <div className="flex-container">
                                    <div className="remember-me">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <p>Remember me?</p>
                                    </div>
                                    <Link to="/forgotPassword">
                                        <h2 className="forget-password">Forgot Password?</h2>
                                    </Link>
                                </div>
                                <div className="sign-up-form-button">
                                    <button type="submit" disabled={loading || isSubmitting}>
                                        {loading ? 'Logging in...' : 'Login'}
                                    </button>
                                </div>
                                <div className="login-form-bottom">
                                    <div>
                                        <p>
                                            Not Registered? <Link to="/register" className="link">Sign up</Link>
                                        </p>
                                    </div>
                                    <div className="login-icons">
                                        <p>Or you can login with</p>
                                        <div className="social-icons">
                                            <img src={fb} alt="Facebook" />
                                            <img src={google} alt="Google" />
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Login;
