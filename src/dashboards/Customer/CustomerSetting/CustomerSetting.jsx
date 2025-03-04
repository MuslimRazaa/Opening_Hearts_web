import React, { useEffect, useState } from 'react'
import editproflie from '../../../media/images/uploadicon.png'
import blankUser from '../../../media/images/blankuser.jpg'
import mastercard from '../../../media/images/setting-master-card.png'
import visacard from '../../../media/images/setting-visa.png'
import paypalcard from '../../../media/images/setting-paypal.png'
import house from '../../../media/images/house-address.png'
import * as Yup from 'yup';
import mapCustomer from '../../../media/images/mapCustomer.png'
import { addOrupdateAddress, changeInAppPassword, deleteAddress, getAddress, getDefaultAddress, getProfileDetails, setDefaultAddress, updateProfile } from '../../../utils/api'
import { Autocomplete, useLoadScript } from '@react-google-maps/api'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Swal from 'sweetalert2'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate, useOutletContext } from 'react-router-dom'
import LoadingComponents from '../../../components/shared/loaders/LoadingComponents'


const CustomerSetting = () => {
    const [active, setActive] = useState("profile")   // hook useState
    const [refetch, setRefetch] = useState(false)   // hook useState
    const [button, setButton] = useState(false)
    const [address, setAddress] = useState(false)
    const [addressValue, setAddressValue] = useState([])
    const [isChecked, setIsChecked] = useState(false);
    const [selected, setSelected] = useState("mastercard");
    const [autocomplete, setAutocomplete] = useState(null);
    const [isChecked1, setIsChecked1] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(""); // Store selected label
    const [labelError, setLabelError] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [getProfile, setGetProfile] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);
    const [imageShow, setImageShow] = useState(null);
    const [editProfile, setEditProfile] = useState({
        first_name: "",
        last_name: "",
        address: "",
        image: ""
    });
    const navigate = useNavigate()


    const { updateUserData } = useOutletContext();

    console.log(updateUserData(), "--------------update User Data")

    const FetchGetProfileDetails = async () => {
        setProfileLoading(true)
        try {
            const response = await getProfileDetails();
            setGetProfile(response?.data?.data)
            setProfileLoading(false)
        }
        catch (err) {
            console.error(err)
            setProfileLoading(false)
        }
    }

    const handleUpdateProfile = async () => {
        console.log(editProfile, "helo edits")

        const formData = new FormData();
        formData.append("first_name", editProfile.first_name);
        formData.append("last_name", editProfile.last_name);
        formData.append("address", editProfile.address);
        formData.append("image", editProfile.image); // Binary format mein bhejna

        try {
            const response = await updateProfile(formData);
            await Swal.fire({
                icon: 'success',
                text: 'Your Profile has been updated successfully.',
                confirmButtonText: 'OK',
            });
            localStorage.setItem("user_data", JSON.stringify(response?.data?.data))  
            FetchGetProfileDetails();
        }
        catch (err) {
            console.error(err)
            await Swal.fire({
                icon: 'error',
                text: 'Something went wrong',
            });
        }
    }


    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Pehli file le rahe hain
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Preview ke liye temporary URL
            setEditProfile({ ...editProfile, image: file }); // File object ko state mein store kar rahe hain
            setImageShow(imageUrl); // State update kar rahe hain
        }
    };




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

    // Validation schema using Yup
    const validationSchema1 = Yup.object({
        old_password: Yup.string().required('Current password is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('New password is required'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    // Initial form values
    const initialValues1 = {
        old_password: '',
        password: '',
        password_confirmation: '',
    };

    // Handle form submission
    const handleChangePassword = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await changeInAppPassword(values); // API call
            console.log(response);

            Swal.fire({
                icon: 'success',
                text: 'Password changed successfully!',
                timer: 1500,
            });

            resetForm(); // Reset the form after successful update
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message || 'Something went wrong!',
            });
        } finally {
            setSubmitting(false);
        }
    }

    // Validation schema using Yup
    const validationSchema = Yup.object({
        // label: Yup.string().required('Please select a label'),
        address: Yup.string().required('Address is required'),
    });

    // Initial form values
    const initialValues = {
        label: '',
        address: '',
        city: '',
        state: '',
        latitude: '',
        longitude: '',
        zip_code: '',
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log("Form Values: ", values); // Debugging
        if (!selectedLabel) {
            setLabelError(true);
            setSubmitting(false);
            return;
        }
        try {
            setLabelError(false);
            await addOrupdateAddress({ ...values, label: selectedLabel });
            Swal.fire({ icon: 'success', text: 'Address added successfully!', timer: 1000 });
            resetForm();
            setSelectedLabel("");
            fetchAddress();
            setAddress(false)
        } catch (err) {
            console.log(err)
            Swal.fire({ icon: 'error', text: err?.response?.data?.data || 'Something went wrong!' });
        } finally {
            setSubmitting(false);
        }
    };

    const handlePlaceChanged = (setFieldValue) => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place) {
                const address = place.formatted_address || '';
                const lat = place.geometry?.location?.lat();
                const lng = place.geometry?.location?.lng();
                const addressComponents = place.address_components || [];
                let country = '', city = '', zip_code = '';

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

                setFieldValue('address', address);
                setFieldValue('latitude', lat || '');
                setFieldValue('longitude', lng || '');
                setFieldValue('city', city || '');
                setFieldValue('zip_code', zip_code || '');
            }
        }
    };

    const handleSelectAddressAsDefault = async (id) => {
        try {
            const response = await setDefaultAddress(id);
            // toast.success('Address set as Default, Successfully!');
            fetchGetDefaultAddress()
        } catch (error) {
            console.error(error);
            toast.error('Failed to set address as default.');
        }
    };
    const fetchGetDefaultAddress = async (id) => {
        try {
            const response = await getDefaultAddress();
            setSelectedAddressId(response?.data?.data?.id)
        } catch (error) {
            console.error(error);
            toast.error('Failed to set address as default.');
        }
    };

    const handleAddressSelection = async (id) => {
        setSelectedAddressId(id); // Update the selected address ID
        await handleSelectAddressAsDefault(id); // Call the API to set the address as default
    };
    const handleTabClick = (tab) => {
        setActive(tab)
    }

    const handleCardForm = () => {
        setButton(!button);
    }

    const handleAddressForm = () => {
        setAddress(!address);
    }

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    const handleToggle1 = () => {
        setIsChecked1(!isChecked1);
    };
    const handleLableChange = (e) => {
        setSelectedLabel(e);
    };
    const handleAddressDelete = async (e) => {
        try {
            await deleteAddress(e);
            Swal.fire({ icon: 'success', text: 'Address deleted successfully!', timer: 1000 });
            fetchAddress();
        } catch (err) {
            console.log(err)
            Swal.fire({ icon: 'error', text: err?.response?.data?.data || 'Something went wrong!' });
        }
    };

    const fetchAddress = async () => {
        try {
            const response = await getAddress();
            setAddressValue(response?.data?.data?.address)
        }
        catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        fetchAddress();
        fetchGetDefaultAddress();
        FetchGetProfileDetails();
    }, [])

    return (
        <>
            <ToastContainer />
            <div className="customer-setting-buttons-class">
                <button className={active === "profile" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button' onClick={() => handleTabClick("profile")}>Edit your Profile</button>
                <button className={active === "Security" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button' onClick={() => handleTabClick("Security")}>Security</button>
                {/* <button className={active === "Payment" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button' onClick={() => handleTabClick("Payment")}>Payment Method</button> */}
                <button className={active === "Addresses" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button' onClick={() => handleTabClick("Addresses")}>Addresses</button>
            </div>

            {/* // profile  */}
            {active === "profile" ? <div className="di">
                <div className="customer-setting-edit-profile-form">


                    {profileLoading ? <LoadingComponents />  :
                    (<form action="">
                        <div className="customer-setting-edit-pro-img-and-name">
                            <img src={imageShow || getProfile?.media[0]?.original_url || blankUser} alt="Profile" className="profile-image" style={{ height: "100px", width: "100px", objectFit:"cover" }} />
                            <div className="image-upload-input-plus" >
                                <img src={editproflie} alt="edit" style={{ width: "30px" }} />
                                <span>Upload Image</span>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="image-upload-input"
                            />
                            <div className="text-setting-edit-pro">
                                <h2>{getProfile?.first_name} {getProfile?.last_name}</h2>
                                <p>{getProfile?.email}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-group-setting-profile">
                                    <label htmlFor="">First Name</label>
                                    <input
                                        type="text"
                                        defaultValue={getProfile?.first_name}
                                        placeholder='First Name'
                                        onChange={(e) => setEditProfile({ ...editProfile, first_name: e.target.value })}
                                        className='input-flied-setting-profile' />
                                </div>
                            </div>
                            <div className="col-md-6">

                                <div className="input-group-setting-profile">
                                    <label htmlFor="">Last Name</label>
                                    <input
                                        type="text"
                                        defaultValue={getProfile?.last_name}
                                        placeholder='Last Name'
                                        onChange={(e) => setEditProfile({ ...editProfile, last_name: e.target.value })}
                                        className='input-flied-setting-profile' />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-6">
                                <div className="input-group-setting-profile">
                                    <label htmlFor="">Email</label>
                                    <input
                                        type="text"
                                        value={getProfile?.email}
                                        disabled={true}
                                        className='input-flied-setting-profile' />
                                </div>
                            </div>
                            <div className="col-md-6">

                                <div className="input-group-setting-profile">
                                    <label htmlFor="">Address</label>
                                    <input
                                        type="text"
                                        defaultValue={getProfile?.address}
                                        onChange={(e) => setEditProfile({ ...editProfile, address: e.target.value })}
                                        placeholder='Address'
                                        className='input-flied-setting-profile' />
                                </div>

                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="input-button-setting-profile">
                                <button type="button" className='btn-cancle-profile'>Cancel</button>
                                <button type="button" className='btn-profile-edit-button' onClick={handleUpdateProfile}>Save Changes</button>
                            </div>
                        </div>
                    </form>)}

                </div>
            </div> :
                // profile end
                active === "Security" ? <div className="di">
                    <div className="security-tabs-class">
                        <div className="text-security-tabs">
                            <h3>Change Password</h3>
                            <p>Create a new password or modify an existing one</p>
                        </div>
                        <Formik
                            initialValues={initialValues1}
                            validationSchema={validationSchema1}
                            onSubmit={handleChangePassword}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="input-group-security-tabs">
                                        <div className="row">
                                            <div className="offset-md-2 col-md-8">
                                                <Field
                                                    type="password"
                                                    name="old_password"
                                                    placeholder="Current Password"
                                                    className="input-flied-security-tabs"
                                                />
                                                <ErrorMessage name="old_password" component="div" className="error-message-change-pass" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="offset-md-2 col-md-8">
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    placeholder="New Password"
                                                    className="input-flied-security-tabs"
                                                />
                                                <ErrorMessage name="password" component="div" className="error-message-change-pass" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="offset-md-2 col-md-8">
                                                <Field
                                                    type="password"
                                                    name="password_confirmation"
                                                    placeholder="Confirm Password"
                                                    className="input-flied-security-tabs"
                                                />
                                                <ErrorMessage name="password_confirmation" component="div" className="error-message-change-pass" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="offset-md-2 col-md-8">
                                                <div className="input-button-setting-security">
                                                    <button type="button" className="btn-cancle-security">Cancel</button>
                                                    <button type="submit" className="btn-security-edit-button" disabled={isSubmitting}>
                                                        {isSubmitting ? 'Saving...' : 'Save'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>

                    {/* <div className="row mt-5">
                        <div className="setting-security-toggle-group">
                            <div className="security-toggle-setting">

                                <p>2 step verification</p>
                                <label className="switch">
                                    <input type="checkbox" checked={isChecked} onChange={handleToggle} />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="security-toggle-setting">

                                <p>Third-party app access</p>
                                <label className="switch">
                                    <input type="checkbox" checked={isChecked1} onChange={handleToggle1} />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>


                    </div> */}
                </div> :
                    active === "Payment" && !button ? <div className="di">
                        <div className="payment-setting-main">
                            <h2>Choose payment method</h2>
                            <p className="description">Choose the card you want to use for this payment</p>

                            <div className="payment-method">
                                <label
                                    className={`payment-option ${selected === "mastercard" ? "selected" : ""
                                        }`}
                                >
                                    <div className="card-details">
                                        <img
                                            src={mastercard}
                                            alt="Mastercard"
                                        />
                                        <div>
                                            <p className="card-name">Mastercard ending in 8930</p>
                                            <p className="card-expiry">Exp date 06/24</p>
                                        </div>
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="mastercard"
                                        checked={selected === "mastercard"}
                                        onChange={() => setSelected("mastercard")}
                                    />
                                    <span className="radio-check"></span>
                                </label>

                                <label
                                    className={`payment-option ${selected === "visa" ? "selected" : ""
                                        }`}
                                >
                                    <div className="card-details">
                                        <img
                                            src={visacard}
                                            alt="Visa"
                                        />
                                        <div>
                                            <p className="card-name">Visa ending in 8930</p>
                                            <p className="card-expiry">Exp date 06/24</p>
                                        </div>
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="visa"
                                        checked={selected === "visa"}
                                        onChange={() => setSelected("visa")}
                                    />
                                    <span className="radio-check"></span>
                                </label>

                                <label
                                    className={`payment-option ${selected === "paypal" ? "selected" : ""
                                        }`}
                                >
                                    <div className="card-details">
                                        <img
                                            src={paypalcard}
                                            alt="PayPal"
                                        />
                                        <div>
                                            <p className="card-name">Paypal ending in 8930</p>
                                            <p className="card-expiry">Exp date 06/24</p>
                                        </div>
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="paypal"
                                        checked={selected === "paypal"}
                                        onChange={() => setSelected("paypal")}
                                    />
                                    <span className="radio-check"></span>
                                </label>
                            </div>

                            <p className="add-new-card" onClick={handleCardForm} >+ Add new card</p>

                        </div>

                    </div> :
                        active === "Payment" && button ? <div>
                            <div className="new-card-setting">
                                <h2>Add new card</h2>
                                <form action="" className='card-form-setting'>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input type="text" placeholder='Card Number' className='card-form-input' />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <input type="text" placeholder='Expiration Date ' className='card-form-input' />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" placeholder='CVV ' className='card-form-input' />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12 mb-2">
                                            <input type="text" placeholder='Card Holder Name' className='card-form-input' />

                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input "
                                                    type="checkbox"
                                                    id="saveDraft"
                                                />
                                                <label className="form-check-label checkbox-label" htmlFor="saveDraft">
                                                    Saved as account draft
                                                </label>
                                            </div>

                                            <div className="input-button-setting-security">
                                                <button type="button" className='btn-cancle-security'>Cancel</button>
                                                <button type="button" className='btn-security-edit-button'>Add</button>
                                            </div>

                                        </div>
                                    </div>


                                </form>
                            </div>
                        </div>
                            :
                            active === "Addresses" && !address ? <div className="di">

                                <div className="Addresses-setting-main">
                                    {addressValue?.length > 0 && <h2>Choose Address</h2>}
                                    <p className="description"></p>
                                    {addressValue?.map((address) => (
                                        <div className="Addresses-method" key={address.id}>
                                            <label
                                                className={`Addresses-option ${selectedAddressId === address.id ? "selected" : ""}`}
                                            >
                                                <div className="Addresses-details">
                                                    <img src={house} alt="Address" />
                                                    <div className='name-and-adress'>
                                                        <h4>{address?.label}</h4>
                                                        <p className='address'>{address?.address}, {address?.state}</p>
                                                    </div>
                                                </div>
                                                <div className='edit-address'>

                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        value={address.id}
                                                        checked={selectedAddressId === address.id}
                                                        onChange={() => handleAddressSelection(address.id)}
                                                    />
                                                    <span className="radio-check"></span>
                                                </div>
                                            </label>
                                            <p onClick={() => handleAddressDelete(address?.id)}>Delete Address</p>
                                        </div>
                                    ))}
                                    <p className="add-new-card" onClick={handleAddressForm} >+ Add new Address</p>

                                </div>

                            </div> :
                                active === "Addresses" && address ? <div>
                                    <div className="new-card-setting">
                                        <h2>Add new Address</h2>
                                        <div className="map-address-setting">
                                            <img src={mapCustomer} alt="" />
                                        </div>

                                        <div className="form-address-setting">
                                            <Formik
                                                initialValues={initialValues}
                                                validationSchema={validationSchema}
                                                onSubmit={handleSubmit} // Ensure this is set
                                            >
                                                {({ isSubmitting, setFieldValue }) => (
                                                    <Form>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className='address-tabs'>
                                                                    <Field
                                                                        type="radio"
                                                                        name="label"
                                                                        placeholder="Search your address"
                                                                        className="add-address-userdashboard"
                                                                        style={{ display: "none" }}
                                                                    />
                                                                    <span
                                                                        name="label"
                                                                        className={selectedLabel == "Home" ? "selected-user-address" : ""}
                                                                        onClick={() => handleLableChange("Home")}
                                                                    >
                                                                        Home
                                                                    </span>
                                                                    <span
                                                                        name="label"
                                                                        className={selectedLabel == "Office" ? "selected-user-address" : ""}
                                                                        onClick={() => handleLableChange("Office")}
                                                                    >
                                                                        Office
                                                                    </span>
                                                                </div>
                                                                {/* <ErrorMessage name="label" component="div" className="error-address-dashboard" /> */}
                                                                {labelError && (
                                                                    <div className="error-address-dashboard">
                                                                        Please select a label (Home or Office)
                                                                    </div>
                                                                )}

                                                                <div>
                                                                    <Autocomplete
                                                                        onLoad={handleAutocompleteLoad}
                                                                        onPlaceChanged={() => handlePlaceChanged(setFieldValue)}
                                                                    >
                                                                        <Field
                                                                            type="text"
                                                                            name="address"
                                                                            placeholder="Search your address"
                                                                            className="add-address-userdashboard"
                                                                        />
                                                                    </Autocomplete>
                                                                    <ErrorMessage name="address" component="div" className="error-address-dashboard" />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6">
                                                                <div className="input-button-setting-security">
                                                                    <button type="button" className='btn-cancel-security' onClick={() => setAddress(false)}>
                                                                        Cancel
                                                                    </button>
                                                                    <button type='submit' className='btn-security-edit-button' >
                                                                        {isSubmitting ? "Adding..." : "Add"}
                                                                    </button>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                                    :

                                    ""}





        </>
    )
}

export default CustomerSetting
