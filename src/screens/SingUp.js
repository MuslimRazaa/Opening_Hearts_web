import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GoogleMap, useLoadScript, Autocomplete } from '@react-google-maps/api'; // Import for Google Places
import Swal from 'sweetalert2';
import signuplogo from '../media/images/logo-sign-up.png';
import eye from '../media/images/eye.svg';
import eyeHide from '../media/images/eyeHide.svg';
import { registerUser } from '../utils/api';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const navigate = useNavigate();

  const [autocomplete, setAutocomplete] = useState(null);

  // Google Places API Key from .env
  const googlePlacesApiKey = "AIzaSyDg6Ci3L6yS5YvtKAkWQjnodGUtlNYHw9Y";
  // const googlePlacesApiKey = process.env.REACT_GOOGLE_PLACES;

  // Load the Google Places script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googlePlacesApiKey, // Add your API key here
    libraries: ['places'], // Load Places library
  });


  // Set autocomplete instance
  const handleAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };


  const handlePlaceChanged = (setFieldValue) => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
  
      if (place) {
        const address = place.formatted_address || '';
        const lat = place.geometry?.location?.lat();
        const lng = place.geometry?.location?.lng();
        const addressComponents = place.address_components || [];
        let country = '';
        let city = '';
        let zip_code = '';
  
        // Extract address components
        addressComponents.forEach((component) => {
          const types = component.types;
          if (types.includes('country')) {
            country = component.long_name;
          }
          if (types.includes('locality')) {
            city = component.long_name;
          }
          if (types.includes('postal_code')) {
            zip_code = component.long_name;
          }
        });
  
        // Set values in the form
        setFieldValue('address', address);
        setFieldValue('lat', lat || '');
        setFieldValue('lng', lng || '');
        setFieldValue('city', city || '');
        setFieldValue('country', country || '');
        setFieldValue('zip_code', zip_code || '');
      }
    }
  };
  



  // Validation schema using Yup
  const validationSchema = Yup.object({
    first_name: Yup.string().required('first_name is required'),
    last_name: Yup.string().required('last_name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    address: Yup.string().required('Address is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  // Initial form values
  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    zip_code: '',
    city: '',
    country: '',
    lat: '',
    lng: '',
    password: '',
    password_confirmation: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await registerUser({
        ...values,
        is_user: 1,
        package_id: 1,
      });
  
      // Show success alert
      await Swal.fire({
        icon: 'success',
        text: 'Your account has been created successfully.',
        confirmButtonText: 'OK',
      });
  
      // Navigate on success
      navigate('/reset-password-otp', { state: { email: values.email } });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        text: err.message || 'Something went wrong!',
      });
    } finally {
      setSubmitting(false);
    }
  };


  if (!isLoaded) return <div>Loading...</div>; // Show loading state while the script is loading

  return (
    <div className="sign-up">
      <div className="sign-form">
        <div className="form-wrapper">
          <div className="sign-up-image">
            <Link to="/"><img src={signuplogo} alt="Sign Up Logo" /></Link>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="form-main-signup">
                <div>
                  <p>First Name</p>
                  <Field
                    type="text"
                    name="first_name"
                    placeholder="Example"
                  />
                  <ErrorMessage name="first_name" component="div" className="error" />
                </div>
                <div>
                  <p>Last Name</p>
                  <Field
                    type="text"
                    name="last_name"
                    placeholder="Example"
                  />
                  <ErrorMessage name="last_name" component="div" className="error" />
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

                <div>
                  <p>Address</p>
                  <Autocomplete
                    onLoad={handleAutocompleteLoad}
                    onPlaceChanged={() => handlePlaceChanged(setFieldValue)}
                  >
                    <Field
                      type="text"
                      name="address"
                      placeholder="Search your address"
                    />
                  </Autocomplete>
                  <ErrorMessage name="address" component="div" className="error" />
                </div>

                <div style={{ position: 'relative' }}>
                  <p>Password</p>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="*************"
                  />
                  <img
                    src={showPassword ? eye : eyeHide}
                    onClick={() => setShowPassword((prev) => !prev)}
                    alt="Toggle Password"
                    style={{
                      width: "35px",
                      position: 'absolute',
                      right: '1.5rem',
                      top: '4.8rem',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#888',
                    }}
                  />
                  <ErrorMessage name="password" component="div" className="error" />
                </div>

                <div style={{ position: 'relative' }}>
                  <p>Confirm Password</p>
                  <Field
                    type={showCPassword ? "text" : "password"}
                    name="password_confirmation"
                    placeholder="*************"
                  />
                  <img
                    src={showCPassword ? eye : eyeHide}
                    onClick={() => setShowCPassword((prev) => !prev)}
                    alt="Toggle Password"
                    style={{
                      width: "35px",
                      position: 'absolute',
                      right: '1.5rem',
                      top: '4.8rem',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#888',
                    }}
                  />
                  <ErrorMessage name="password_confirmation" component="div" className="error" />
                </div>

                <div className="signup-bottom-text">
                  <p>Already Registered? <Link to="/login" className="link">Login</Link></p>
                </div>

                <div className="sign-up-form-button">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
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

export default SignUp;
