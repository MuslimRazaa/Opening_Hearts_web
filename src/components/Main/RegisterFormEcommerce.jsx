import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import apis from '../../service';
import Swal from 'sweetalert2';
import LoadingComponents from '../shared/loaders/LoadingComponents';

const libraries = ['places'];

function RegisterFormEcommerce() {
  const loginToken = localStorage.getItem('token');
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const type = params.get('type');
  const inputRef = useRef();
  const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES, libraries });
  const [loading, setLoading] = useState(true);
  const [inputError, setInputError] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    country: "",
    city: "",
    zip_code: "",
    lat: "",
    long: "",
    phone_number: "",
    phone_country_code: "",
    phone_code: "",
    type: "",
    password: "",
    password_confirmation: "",
    check: false
  })
  const navigate = useNavigate("");

  const getProfile = async () => {
    try {
      const response = await apis.getProfile();
      setFormData({
        first_name: response?.data?.data?.first_name ? response?.data?.data?.first_name : "",
        last_name: response?.data?.data?.last_name ? response?.data?.data?.last_name : "",
        email: response?.data?.data?.email ? response?.data?.data?.email : "",
        address: response?.data?.data?.address ? response?.data?.data?.address : "",
        country: response?.data?.data?.country ? response?.data?.data?.country : "",
        city: response?.data?.data?.city ? response?.data?.data?.city : "",
        zip_code: response?.data?.data?.zip_code ? response?.data?.data?.zip_code : "",
        lat: response?.data?.data?.lat ? response?.data?.data?.lat : "",
        long: response?.data?.data?.long ? response?.data?.data?.long : "",
        phone_number: response?.data?.data?.phone_number ? response?.data?.data?.phone_number : "",
        phone_country_code: response?.data?.data?.phone_country_code ? response?.data?.data?.phone_country_code : "",
        phone_code: response?.data?.data?.phone_code ? response?.data?.data?.phone_code : "",
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loginToken) {
      getProfile();
    }
  }, [])

  const handlePhoneChange = (value) => {
    if (value) {
      const phoneNumberObject = parsePhoneNumberFromString(value);
      if (phoneNumberObject) {
        setFormData((prev) => ({
          ...prev,
          phone_code: phoneNumberObject.countryCallingCode,
          phone_number: phoneNumberObject.nationalNumber,
          phone_country_code: phoneNumberObject?.country,
        }))
      }
    } else {
      setFormData((prev) => ({ ...prev, phone_code: "", phone_number: "", phone_country_code: "" }))
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      setFormData(prev => ({
        ...prev,
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        long: place.geometry.location.lng(),
        city: place.name
      }));
      let political, administrative_area_level_1, postalCode;

      for (let i = 0; i < place.address_components?.length; i++) {
        const component = place.address_components[i];
        for (let j = 0; j < component.types?.length; j++) {
          if (component.types[j] === 'country') {
            political = component.long_name;
          } else if (component.types[j] === 'administrative_area_level_1') {
            administrative_area_level_1 = component.long_name;
          } else if (component.types[j] === 'postal_code') {
            postalCode = component.long_name;
          }
        }
      }
      setFormData(prev => ({
        ...prev,
        country: political,
        zip_code: postalCode,
      }));

    }
  };

  const register = async (event) => {

    event.preventDefault();
    setInputError(true);
    if (formData?.first_name != "" && formData?.last_name != "" && formData?.address != "" &&
      formData?.country != "" && formData?.city != "" && formData?.zip_code != "" &&
      formData?.phone_number != "" && formData?.email != "" && formData?.check
    ) {
      if (loginToken) {
        setInputError(false);
        setFormLoading(true);
        try {
          const data = {
            first_name: formData?.first_name,
            last_name: formData?.last_name,
            email: formData?.email,
            address: formData?.address,
            country: formData?.country,
            city: formData?.city,
            zip_code: formData?.zip_code,
            lat: formData?.lat,
            long: formData?.long,
            phone_number: formData?.phone_number,
            phone_country_code: formData?.phone_country_code,
            phone_code: formData?.phone_code,
            type: type,
            password: "",
            password_confirmation: ""
          }

          const response = await apis.register(data);
          navigate(`/email-verfication?type=${type}&email=${response?.data?.data?.email}`)

        } catch (error) {
          setFormLoading(false);
          Swal.fire({
            icon: 'error',
            text: error.response?.data?.message || 'Something went wrong!',
          });
        }
      } else {
        if (formData?.password != "" && formData?.password_confirmation != "" && formData?.password === formData?.password_confirmation) {
          setInputError(false);
          setFormLoading(true);
          try {
            const data = {
              first_name: formData?.first_name,
              last_name: formData?.last_name,
              email: formData?.email,
              address: formData?.address,
              country: formData?.country,
              city: formData?.city,
              zip_code: formData?.zip_code,
              lat: formData?.lat,
              long: formData?.long,
              phone_number: formData?.phone_number,
              phone_country_code: formData?.phone_country_code,
              phone_code: formData?.phone_code,
              type: type,
              password: formData?.password,
              password_confirmation: formData?.password_confirmation,
            }
            const response = await apis.register(data);
            navigate(`/email-verfication?type=${type}&email=${response?.data?.data?.email}`)
          } catch (error) {
            setFormLoading(false);
            Swal.fire({
              icon: 'error',
              text: error.response?.data?.message || 'Something went wrong!',
            });
          }
        }
      }

    }
  }

  return (
    <>
      {loading ?
        <LoadingComponents />
        :
        <div className="register-ecommerce-main-form">
          <div className="container">
            <div className="row mt-5 justify-content-center">
              <div className="col-md-7">
                <h1 className="form-title">Register Your<br></br>Ecommerce Store</h1>
                <form onSubmit={register} className="form" >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="first_name"
                          className="form-control ecommerce_name_flied"
                          placeholder="First name"
                          defaultValue={formData?.first_name}
                          onChange={handleChange}
                        />
                        {inputError && formData?.first_name === "" && <div className="error-input-reg">First name is required</div>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          className="form-control ecommerce_name_flied"
                          placeholder="Last name"
                          defaultValue={formData?.last_name}
                          onChange={handleChange}
                        />
                        {inputError && formData?.last_name === "" && <div className="error-input-reg">Last name is required</div>}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Street Address</label>
                    {isLoaded && (
                      <StandaloneSearchBox
                        onLoad={ref => inputRef.current = ref}
                        onPlacesChanged={handlePlaceChanged}
                      >
                        <input
                          type="text"
                          className="form-control ecommerce_name_flied"
                          placeholder={"Enter address"}
                          defaultValue={formData.address}
                          name='address'
                          onChange={handleChange}
                        />
                      </StandaloneSearchBox>
                    )}
                    {inputError && formData?.address === "" && <div className="error-input-reg">Address is required</div>}
                  </div>
                  <div className="form-group">
                    <label>Country / Region</label>
                    <input
                      type="text"
                      name='country'
                      className="form-control ecommerce_name_flied"
                      defaultValue={formData?.country}
                      onChange={handleChange}
                      placeholder="Country / Region"
                    />
                    {inputError && formData?.country === "" && <div className="error-input-reg">Country is required</div>}
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name='city'
                      className="form-control ecommerce_name_flied"
                      defaultValue={formData?.city}
                      onChange={handleChange}
                      placeholder="City"
                    />
                    {inputError && formData?.city === "" && <div className="error-input-reg">City is required</div>}
                  </div>
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      name='zip_code'
                      className="form-control ecommerce_name_flied"
                      defaultValue={formData?.zip_code}
                      onChange={handleChange}
                      placeholder="Zip Code"
                    />
                    {inputError && formData?.zip_code === "" && <div className="error-input-reg">Zip code is required</div>}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    {loginToken ?
                      <input
                        type="email"
                        className="form-control ecommerce_name_flied"
                        placeholder="example@example.com"
                        defaultValue={formData?.email}
                        readOnly
                      />
                      :
                      <>
                        <input
                          type="email"
                          placeholder="example@example.com"
                          name='email'
                          className="form-control ecommerce_name_flied"
                          defaultValue={formData?.email}
                          onChange={handleChange}
                        />
                        {inputError && formData?.email === "" && <div className="error-input-reg">Email is required</div>}
                      </>
                    }
                  </div>
                  {loginToken ?
                    null
                    :
                    <>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          name='password'
                          className="form-control ecommerce_name_flied"
                          placeholder="Set the login password"
                          defaultValue={formData?.password}
                          onChange={handleChange}
                        />
                        {inputError && formData?.password === "" && <div className="error-input-reg">Password is required</div>}
                        {inputError && formData?.password === formData?.password_confirmation && <div className="error-input-reg">Password does not Match</div>}
                      </div>
                      <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                          type="password"
                          name='password_confirmation'
                          className="form-control ecommerce_name_flied"
                          placeholder="Enter the login password again"
                          defaultValue={formData?.password_confirmation}
                          onChange={handleChange} />
                        {inputError && formData?.password_confirmation === "" && <div className="error-input-reg">Confirm password is required</div>}
                      </div>
                    </>
                  }
                  <div className="form-group">
                    <label>Phone</label>
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={formData?.phone_number ? `+${formData?.phone_code}${formData?.phone_number}` : ""}
                      onChange={handlePhoneChange}
                    />
                    {inputError && formData?.phone_number === "" && <div className="error-input-reg">Phone is required</div>}
                  </div>
                  <button className="btn btn-gradient">{formLoading ? "Loading..." : 'Register'}</button>
                  <div className="form-group form-check">
                    <input type="checkbox" checked={formData?.check} onClick={() => { setFormData((prev) => ({ ...prev, check: !formData?.check })) }} className="form-check-input" id="termsCheckbox" />
                    <label style={{ color: "#000", fontFamily: "Poppins", fontSize: "18px", }} className="form-check-label" htmlFor="termsCheckbox">
                      I agree to
                      (a)<Link style={{ color: "#F16522" }}>Free Membership Agreement, </Link>
                      (b)<Link style={{ color: "#F16522" }}>Terms of Use, and </Link>
                      (c)<Link style={{ color: "#F16522" }}>Privacy Policy</Link>.
                      I agree to receive more information from Happy hearts about its products and services.
                    </label>
                  </div>
                  {inputError && !formData?.check && <div className="error-input">Agree terms and condition.</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default RegisterFormEcommerce;