import React, { useEffect, useRef, useState } from 'react'

import right from '../../../../media/images/tic.png'

import Modal from '../../../../components/Layout/Modal';
import { Link, useNavigate } from 'react-router-dom';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import apis from '../../../../service';
import Swal from 'sweetalert2';
import Select from 'react-select';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';

const libraries = ['places'];

const FormNonPro = () => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [isModalVisible2, setIsModalVisible2] = useState(true);

    const handleOrderNowClick = () => {
        setIsModalVisible(true);
    };

    const handleOrderNowClick2 = () => {
        setIsModalVisible2(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setIsModalVisible2(false);
    };

    const loginToken = localStorage.getItem('token');
    const inputRef = useRef();
    const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES, libraries });
    const [loading, setLoading] = useState(true);
    const [inputError, setInputError] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [approveStatus, setApproveStatus] = useState("");
    const type = 'organization';
    const organizationFocus = [
        { value: 1, label: 'Home less people' },
        { value: 2, label: 'Old age people' },
        { value: 3, label: 'Natural desaster' }
    ]

    const [formData, setFormData] = useState({
        name: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone_code: "",
        phone_number: "",
        phone_country_code: "",
        zip_code: "",
        address: "",
        city: "",
        state: "",
        country: "",
        lat: "",
        long: "",
        describe: "",
        focus: "",
        budget: "",
        stage: "",
        beyond_funding: "",
        network_size: "",
        experience: "",
        donors: "",
        yearly_earning: "",
        link: "",
        type: "organization",
        ein_number: ""
    })

    const navigate = useNavigate("");

    const getProfile = async () => {
        try {
            const response = await apis.getProfile();
            setApproveStatus(response?.data?.data?.organization?.approved_status)
            setFormData((prev) => ({
                ...prev,
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
            }))
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
        if (formData?.first_name != "" && formData?.last_name != "" && formData?.name != "" && formData?.ein_number != "" &&
            formData?.email != "" && formData?.link != "" && formData?.describe != "" &&
            formData?.phone_number != "" && formData?.address != "" && formData?.city != "" &&
            formData?.country != "" && formData?.zip_code != "" && formData?.focus != "" &&
            formData?.budget != "" && formData?.stage != "" && formData?.beyond_funding != "" &&
            formData?.network_size != "" && formData?.experience != "" && formData?.donors != "" && formData?.yearly_earning != ""
        ) {
            if (loginToken) {
                setInputError(false);
                setFormLoading(true);
                try {
                    const data = {
                        first_name: formData?.first_name,
                        last_name: formData?.last_name,
                        name: formData?.name,
                        email: formData?.email,
                        link: formData?.link,
                        describe: formData?.describe,
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
                        focus: formData?.focus?.value,
                        budget: formData?.budget,
                        stage: formData?.stage,
                        beyond_funding: formData?.beyond_funding,
                        network_size: formData?.network_size,
                        experience: formData?.experience,
                        donors: formData?.donors,
                        yearly_earning: formData?.yearly_earning,
                        ein_number: formData?.ein_number,
                        password: "",
                        password_confirmation: ""
                    }

                    const response = await apis.register(data);
                    navigate(`/email-verfication?type=${type}&email=${formData?.email}`)

                } catch (error) {
                    setFormLoading(false);
                    Swal.fire({
                        icon: 'error',
                        text: error.response?.data?.message,
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
                            name: formData?.name,
                            email: formData?.email,
                            link: formData?.link,
                            describe: formData?.describe,
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
                            focus: formData?.focus?.value,
                            budget: formData?.budget,
                            stage: formData?.stage,
                            beyond_funding: formData?.beyond_funding,
                            network_size: formData?.network_size,
                            experience: formData?.experience,
                            donors: formData?.donors,
                            yearly_earning: formData?.yearly_earning,
                            ein_number: formData?.ein_number,
                            password: formData?.password,
                            password_confirmation: formData?.password_confirmation,
                        }
                        const response = await apis.register(data);
                        navigate(`/email-verfication?type=${type}&email=${formData?.email}`)
                    } catch (error) {
                        setFormLoading(false);
                        Swal.fire({
                            icon: 'error',
                            text: error.response?.data?.message,
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
                <div className='form-non-section'>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <form onSubmit={register}>

                                    <div className="form-head-nonpro">
                                        <h1>Please fill this form</h1>
                                    </div>

                                    <div class="non-form-row">
                                        <div class="non-input-wrapper">
                                            <div className="input-sec-form">
                                                <label>Your First Name</label>
                                                <input
                                                    type="text"
                                                    name='first_name'
                                                    placeholder='Enter first name'
                                                    className='input-form-non-profit'
                                                    defaultValue={formData?.first_name}
                                                    onChange={handleChange} />
                                                {inputError && formData?.first_name === "" && <div className="error-input">First name is required</div>}
                                            </div>
                                        </div>
                                        <div class="non-input-wrapper">
                                            <div className="input-sec-form">
                                                <label>Your Last Name</label>
                                                <input
                                                    type="text"
                                                    name='last_name'
                                                    placeholder='Enter last name'
                                                    className='input-form-non-profit'
                                                    defaultValue={formData?.last_name}
                                                    onChange={handleChange}
                                                />
                                                {inputError && formData?.last_name === "" && <div className="error-input">Last name is required</div>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="input-sec-form">
                                        <label>Organization Name</label>
                                        <input
                                            type="text"
                                            name='name'
                                            placeholder='Funding Circle'
                                            className='input-form-non-profit'
                                            defaultValue={formData?.name}
                                            onChange={handleChange}
                                        />
                                        {inputError && formData?.name === "" && <div className="error-input">Name is required</div>}
                                    </div>
                                    <div className="input-sec-form">
                                        <label>Organization EIN Number</label>
                                        <input
                                            type="text"
                                            name='ein_number'
                                            placeholder='Funding Circle'
                                            className='input-form-non-profit'
                                            defaultValue={formData?.ein_number}
                                            onChange={handleChange}
                                        />
                                        {inputError && formData?.ein_number === "" && <div className="error-input">EIN number is required</div>}
                                    </div>

                                    <div className="input-sec-form">
                                        <label>Organization Email Address</label>
                                        {loginToken ?
                                            <input
                                                type="email"
                                                name='email'
                                                placeholder='email@gmail.com'
                                                className='input-form-non-profit'
                                                defaultValue={formData?.email}
                                                readOnly
                                            />
                                            :
                                            <>
                                                <input
                                                    type="email"
                                                    name='email'
                                                    placeholder='email@gmail.com'
                                                    className='input-form-non-profit'
                                                    defaultValue={formData?.email}
                                                    onChange={handleChange}
                                                />
                                                {inputError && formData?.email === "" && <div className="error-input">Email is required</div>}
                                            </>
                                        }
                                    </div>

                                    <div className="input-sec-form">
                                        <label>Organization Link</label>
                                        <input
                                            type="text"
                                            name='link'
                                            placeholder='Please share the link to your primary web presence https://'
                                            className='input-form-non-profit'
                                            defaultValue={formData?.link}
                                            onChange={handleChange}
                                        />
                                        {inputError && formData?.link === "" && <div className="error-input">Link is required</div>}
                                    </div>

                                    <div className="input-sec-form">
                                        <label>Organization Visibility And Credibility</label>
                                        <input
                                            type="text"
                                            name='describe'
                                            placeholder={`How would you describe your organization's visibility and credibility at this time?`}
                                            className='input-form-non-profit'
                                            defaultValue={formData?.describe}
                                            onChange={handleChange}
                                        />
                                        {inputError && formData?.describe === "" && <div className="error-input">Description is required</div>}
                                    </div>

                                    <div className="input-sec-form">
                                        <label>Organization Phone </label>
                                        <PhoneInput
                                            placeholder="+1 84992 1215481"
                                            value={formData?.phone_number ? `+${formData?.phone_code}${formData?.phone_number}` : ""}
                                            onChange={handlePhoneChange}
                                        />
                                        {inputError && formData?.phone_number === "" && <div className="error-input">Organization phone is required</div>}
                                    </div>

                                    <div className="input-sec-form">
                                        <label>Organization Address</label>
                                        {isLoaded && (
                                            <StandaloneSearchBox
                                                onLoad={ref => inputRef.current = ref}
                                                onPlacesChanged={handlePlaceChanged}
                                            >
                                                <input
                                                    type="text"
                                                    className="input-form-non-profit"
                                                    placeholder={"Enter address"}
                                                    defaultValue={formData.address}
                                                    name='address'
                                                    onChange={handleChange}
                                                />
                                            </StandaloneSearchBox>
                                        )}
                                        {inputError && formData?.address === "" && <div className="error-input">Address is required</div>}
                                    </div>

                                    <div class="non-form-row">
                                        <div class="non-input-wrapper">
                                            <div className="input-sec-form">
                                                <label>Organization  Country</label>
                                                <input
                                                    type="text"
                                                    placeholder='Enter organization country'
                                                    className='input-form-non-profit'
                                                    name='country'
                                                    defaultValue={formData?.country}
                                                    onChange={handleChange}
                                                />
                                                {inputError && formData?.country === "" && <div className="error-input">Country is required</div>}
                                            </div>
                                        </div>
                                        <div class="non-input-wrapper">
                                            <div className="input-sec-form">
                                                <label>Organization City</label>
                                                <input
                                                    type="text"
                                                    placeholder='Enter organization country'
                                                    className='input-form-non-profit'
                                                    name='city'
                                                    defaultValue={formData?.city}
                                                    onChange={handleChange}
                                                />
                                                {inputError && formData?.city === "" && <div className="error-input">City is required</div>}
                                            </div>
                                        </div>
                                        <div class="non-input-wrapper">
                                            <div className="input-sec-form">
                                                <label>Organization Zip Code</label>
                                                <input
                                                    type="text"
                                                    placeholder='Enter organization zip code'
                                                    className='input-form-non-profit'
                                                    name='zip_code'
                                                    defaultValue={formData?.zip_code}
                                                    onChange={handleChange}
                                                />
                                                {inputError && formData?.zip_code === "" && <div className="error-input">Zip code is required</div>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="input-sec-form">
                                        <label>Primary Organizational Focus</label>
                                        <Select
                                            options={organizationFocus}
                                            // defaultValue={productDetails?.brand_id}
                                            value={formData?.focus}
                                            onChange={(e) => { setFormData((prev) => ({ ...prev, focus: e })) }}
                                            placeholder="Select primary organizational focus"
                                            className="select-brand-organization"
                                        />
                                        {inputError && formData?.focus === "" && <div className="error-input">Primary organizational focus is required</div>}
                                    </div>

                                    <div className="input-sec-form">
                                        <label >Organization Annual Operating Budget (USD)</label>
                                        <input
                                            type="number"
                                            placeholder='Enter organization annual operating budget (USD)'
                                            className='input-form-non-profit'
                                            name='budget'
                                            defaultValue={formData?.budget}
                                            onChange={handleChange}
                                        />
                                        {inputError && formData?.budget === "" && <div className="error-input">Budget is required</div>}
                                    </div>

                                    <div className="input-sec-form">
                                        <label >What stage best describes your organization right now?</label>
                                        <input
                                            type="text"
                                            placeholder='Enter stage'
                                            className='input-form-non-profit'
                                            name='stage'
                                            defaultValue={formData?.stage}
                                            onChange={handleChange}
                                        />
                                        {inputError && formData?.stage === "" && <div className="error-input">Stage is required</div>}
                                    </div>

                                    <div className="input-sec-form">
                                        <label >Does your organization support other organizations in ways beyond funding, such as training, advocacy, or networking?</label>
                                        <div className="non-bothbtn">
                                            <button
                                                type='button'
                                                className={`non-yes-nobtn ${formData?.beyond_funding === 1 ? 'active' : ''}`}
                                                onClick={() => setFormData((prev) => ({ ...prev, beyond_funding: 1 }))}
                                            >Yes</button>
                                            <button
                                                type='button'
                                                className={`non-yes-nobtn ${formData?.beyond_funding === 0 ? 'active' : ''}`}
                                                onClick={() => setFormData((prev) => ({ ...prev, beyond_funding: 0 }))}
                                            >No</button>
                                        </div>
                                        {inputError && formData?.beyond_funding === "" && <div className="error-input">Support is required</div>}
                                    </div>

                                    <div className="input-sec-form">
                                        <label>What is the size of your network?</label>
                                        <input
                                            type="number"
                                            placeholder='Enter no of organization workers'
                                            className='input-form-non-profit'
                                            name='network_size'
                                            defaultValue={formData?.network_size}
                                            onChange={handleChange}
                                        />
                                        {inputError && formData?.network_size === "" && <div className="error-input">Size is required</div>}
                                    </div>

                                    <div className="input-sec-form">
                                        <label >How many years of fundraising experience do you have?</label>
                                        <input
                                            type="number"
                                            placeholder='Enter fundraising experience'
                                            className='input-form-non-profit'
                                            name='experience'
                                            defaultValue={formData?.experience}
                                            onChange={handleChange}
                                        />
                                        {inputError && formData?.experience === "" && <div className="error-input">Experience is required</div>}
                                    </div>

                                    <div className="input-sec-form">
                                        <label>How many online donors do you already have?</label>
                                        <input
                                            type="number"
                                            placeholder='Enter online donors'
                                            className='input-form-non-profit'
                                            name='donors'
                                            defaultValue={formData?.donors}
                                            onChange={handleChange}
                                        />
                                        {inputError && formData?.donors === "" && <div className="error-input">Donors is required</div>}
                                    </div>

                                    <div className="input-sec-form">
                                        <label>how much do you hope to raise on GlobalGiving in your first year?</label>
                                        <input
                                            type="number"
                                            placeholder='Enter how much do you hope to raise'
                                            className='input-form-non-profit'
                                            name='yearly_earning'
                                            defaultValue={formData?.yearly_earning}
                                            onChange={handleChange}
                                        />
                                        {inputError && formData?.yearly_earning === "" && <div className="error-input">Earning is required</div>}
                                    </div>

                                    {loginToken ?
                                        null
                                        :
                                        <>
                                            <div className="input-sec-form">
                                                <label>Password</label>
                                                <input
                                                    type="password"
                                                    className='input-form-non-profit'
                                                    name='password'
                                                    defaultValue={formData?.password}
                                                    onChange={handleChange}
                                                />
                                                {inputError && formData?.password === "" && <div className="error-input">Password is required</div>}
                                                {inputError && formData?.password != "" && formData?.password_confirmation != "" && formData?.password_confirmation != formData?.password &&
                                                    <div className="error-input">Password must match</div>}
                                            </div>

                                            <div className="input-sec-form">
                                                <label>Confirm Password</label>
                                                <input
                                                    type="password"
                                                    className='input-form-non-profit'
                                                    name='password_confirmation'
                                                    defaultValue={formData?.password_confirmation}
                                                    onChange={handleChange}
                                                />
                                                {inputError && formData?.password_confirmation === "" && <div className="error-input">Confirm password is required</div>}

                                            </div>
                                        </>
                                    }
                                    {approveStatus == 1 || approveStatus == 2 ?
                                        null :
                                        <div className="save-and-changesbtn">
                                            <button type='submit' className='btn-submit-non-profit' disabled={formLoading}>{formLoading ? " Loading..." : "Submit"}</button>
                                        </div>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                    {approveStatus == 1 ?
                        <Modal isVisible={isModalVisible}>
                            <div className='modal-content-here'>
                                <div className="modal-success-image">
                                    <img src={right} />
                                </div>
                                <div className="modal-content-title">
                                    <h2>Thank You!</h2>
                                    <p>Your appkication is under review.</p>

                                </div>
                                <div className="modal-content-buttons">
                                    <div class="modal-content-button">
                                        <button onClick={() => { navigate('/') }}>Back To Home</button>
                                    </div>
                                </div>

                            </div>
                        </Modal>
                        : approveStatus == 2 ?
                            <Modal isVisible={isModalVisible2} onClose={handleCloseModal}>
                                <div className='modal-content-here'>
                                    <div className="modal-success-image">
                                        <img src={right} />
                                    </div>
                                    <div className="modal-content-title">
                                        <h2>Congratulations</h2>
                                        <p>Admin has approved your request</p>
                                    </div>
                                    <div className="modal-content-buttons">
                                        <div class="modal-content-button">
                                            <Link to={`/packages?type=${type}`}>
                                                <button>Buy Subscription</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                            :
                            null
                    }

                </div>
            }

        </>
    )
}

export default FormNonPro
