import React, { useEffect, useRef, useState } from 'react'
import { StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import parsePhoneNumberFromString from 'libphonenumber-js';
import apis from '../../../../service';
import Swal from 'sweetalert2';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import vid from '../../../../media/images/Tem_Images/basil_video-outline.png'
import img from '../../../../media/images/Tem_Images/mdi_images-outline.png'
import Select from 'react-select';
import PhoneInput from 'react-phone-number-input';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';

const libraries = ['places'];

function ProductProfileSetting() {
    const user_data = localStorage.getItem('user_data');
    const [inputError, setInputError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isFromLoading, setIsFromLoading] = useState(false);
    const userData = JSON.parse(user_data);
    const inputRef = useRef();
    const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES, libraries });
    const [category, setCategory] = useState([]);

    const [showFormData, setShopFormData] = useState({
        id: "",
        name: "",
        description: "",
        address: "",
        city: "",
        country: "",
        zip_code: "",
        sell: "Product",
        phone_code: "",
        phone_number: "",
        phone_country_code: "",
        cover_image: "",
        edit_cover_image: false,
        profile_image: "",
        edit_profile_image: false,
        other_images: [],
        video: "",
        edit_video: false,
        categories: [],
        deleted_files: []
    })

    const coverImageRef = useRef(null);
    const profileImageRef = useRef(null);

    const handleCoverImageUploadClick = () => { coverImageRef.current.click(); };

    const handleProfileImageUploadClick = () => { profileImageRef.current.click(); };

    const handleCoverImageChange = (e) => {
        return setShopFormData(prev => ({ ...prev, cover_image: e.target.files[0], edit_cover_image: true }));
    };

    const handleProfileImageChange = (e) => {
        return setShopFormData(prev => ({ ...prev, profile_image: e.target.files[0], edit_profile_image: true }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShopFormData({
            ...showFormData,
            [name]: value,
        });
    };

    const handlePhoneChange = (value) => {
        if (value) {
            const phoneNumberObject = parsePhoneNumberFromString(value);
            if (phoneNumberObject) {
                setShopFormData((prev) => ({
                    ...prev,
                    phone_code: phoneNumberObject.countryCallingCode,
                    phone_number: phoneNumberObject.nationalNumber,
                    phone_country_code: phoneNumberObject?.country,
                }))
            }
        } else {
            setShopFormData((prev) => ({ ...prev, phone_code: "", phone_number: "", phone_country_code: "" }))
        }
    };

    const handlePlaceChanged = () => {
        const [place] = inputRef.current.getPlaces();
        if (place) {
            setShopFormData(prev => ({
                ...prev,
                address: place.formatted_address,
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
            setShopFormData(prev => ({
                ...prev,
                country: political,
                zip_code: postalCode,
            }));

        }
    };

    const videoInputRef = useRef(null);

    const handleVideoUploadClick = () => { videoInputRef.current.click() };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 5 * 1024 * 1024) {
            Swal.fire({
                icon: 'error',
                text: "File size must be less than 5MB"
            });
            e.target.value = null;
            return;
        }

        setShopFormData({ ...showFormData, video: file, edit_video: true });
        e.target.value = null;
    };

    const deleteSelectedVideo = () => {
        setShopFormData({ ...showFormData, video: "", edit_video: false });
    }

    const otherImageInputRef = useRef(null);

    const handleOtherImageClick = () => { otherImageInputRef.current.click() };

    const handleOtherImageFileChange = (e) => {
        const maxAllowedFiles = 3;
        const selectedFiles = Array.from(e.target.files);

        setShopFormData(prev => {
            const totalFiles = prev.other_images.length + selectedFiles.length;

            if (totalFiles > maxAllowedFiles) {
                Swal.fire({
                    icon: 'error',
                    text: "You can only upload more then 3 images."
                });
                return prev; // Do not update state if limit is exceeded
            }

            return { ...prev, other_images: [...prev.other_images, ...selectedFiles] };
        });
    };

    const handleDeleteImage = (index, image) => {
        if (image.id) {
            const updatedFiles = [...showFormData.other_images];
            const deleted_files = [...showFormData.deleted_files, image?.id];
            updatedFiles.splice(index, 1);
            setShopFormData(prev => ({ ...prev, other_images: updatedFiles, deleted_files: deleted_files }));
        } else {
            const updatedFiles = [...showFormData.other_images];
            updatedFiles.splice(index, 1);
            setShopFormData(prev => ({ ...prev, other_images: updatedFiles }));
        }
    };

    const getSellerData = async () => {
        try {
            const response = await apis.getSellerData();
            let tempCategory = [];
            for (let i = 0; i < response?.data?.data?.seller_data?.category?.length; i++) {
                tempCategory.push({ value: response?.data?.data?.seller_data?.category[i].id, label: response?.data?.data?.seller_data?.category[i].name })
            }
            console.log(response?.data?.data?.seller_data?.images.length > 0);

            setShopFormData(
                {
                    id: response?.data?.data?.seller_data?.id,
                    name: response?.data?.data?.seller_data?.shop_name,
                    description: response?.data?.data?.seller_data?.shop_description,
                    address: response?.data?.data?.seller_data?.address,
                    city: response?.data?.data?.seller_data?.city,
                    country: response?.data?.data?.seller_data?.country,
                    zip_code: response?.data?.data?.seller_data?.zip_code,
                    sell: "Product",
                    phone_code: response?.data?.data?.seller_data?.phone_code,
                    phone_number: response?.data?.data?.seller_data?.phone_number,
                    phone_country_code: response?.data?.data?.seller_data?.phone_country_code,
                    cover_image: response?.data?.data?.seller_data?.cover_image ? response?.data?.data?.seller_data?.cover_image : "",
                    edit_cover_image: response?.data?.data?.seller_data?.cover_image ? true : false,
                    profile_image: response?.data?.data?.seller_data?.profile_image ? response?.data?.data?.seller_data?.profile_image : "",
                    edit_profile_image: response?.data?.data?.seller_data?.profile_image ? true : false,
                    other_images: response?.data?.data?.seller_data?.images?.length > 0 ? response?.data?.data?.seller_data?.images : [],
                    video: response?.data?.data?.seller_data?.video ? response?.data?.data?.seller_data?.video : "",
                    edit_video: response?.data?.data?.seller_data?.video ? true : false,
                    categories: tempCategory,
                    deleted_files: []
                }
            )
            setLoading(false)
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    }
    const getAllCategories = async () => {
        try {
            const response = await apis.getAllCategories();
            let temp = [];
            for (let i = 0; i < response?.data?.data.length; i++) {
                temp.push({ label: response?.data?.data[i].name, value: response?.data?.data[i].id })
            }
            setCategory(temp)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    }

    useEffect(() => {
        getAllCategories();
        getSellerData();
    }, [])



    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setInputError(true)
        if (showFormData?.name != "" && showFormData?.profile_image != "" && showFormData?.cover_image != ""
            && showFormData?.address != "" && showFormData?.zip_code != "" && showFormData?.city != ""
            && showFormData?.country != "" && showFormData?.phone_number != "" && showFormData?.categories.length > 0
        ) {
            setIsFromLoading(true)
            const data = new FormData();
            data.append("id", showFormData?.id);
            data.append("name", showFormData?.name);
            data.append("description", showFormData?.description);
            data.append("address", showFormData?.address);
            data.append("city", showFormData?.city);
            data.append("state", showFormData?.state);
            data.append("country", showFormData?.country);
            data.append("zip_code", showFormData?.zip_code);
            data.append("phone_code", showFormData?.phone_code);
            data.append("phone_number", showFormData?.phone_number);
            data.append("sell", showFormData?.sell);
            data.append("phone_country_code", showFormData?.phone_country_code);
            data.append("cover_image", showFormData?.cover_image);
            data.append("profile_image", showFormData?.profile_image);
            if (showFormData.deleted_files.length > 0) {
                data.append("deleted_files", JSON.stringify(showFormData.deleted_files));
            } else {
                data.append("deleted_files", JSON.stringify([]));
            }
            showFormData.other_images.forEach((other_image) => {
                if (typeof other_image.image === 'string') {
                    // data.append("other_images[]", other_image);
                } else {
                    data.append("other_images[]", other_image);
                }
            });
            data.append("video", showFormData?.video);
            const tempCate = [];
            for (let i = 0; i < showFormData.categories.length; i++) {
                tempCate.push(showFormData.categories[i].value)
            }

            data.append("categories", JSON.stringify(tempCate));
            try {
                const response = await apis.createAndUpdateStore(data);
                getSellerData();
                console.log('user_data' , response?.data);
                console.log('user_data' , response?.data?.data);
                console.log('user_data');
                
                localStorage.setItem('user_data', JSON.stringify(response?.data?.data))
                Swal.fire({
                    icon: 'success',
                    text: response?.data?.message
                });
                setIsFromLoading(false)
            } catch (error) {
                setIsFromLoading(false)
                Swal.fire({
                    icon: 'error',
                    text: error.response?.data?.message
                });
            }
        }
    }
    return (
        <>
            {loading ? <LoadingComponents />
                :
                <div className="row">
                    <div className="col-lg-12">
                        <form onSubmit={handleFormSubmit}>
                            <div className='step-one-main'>
                                <div className="step-one-heading">
                                    <h2>Update Store</h2>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        {showFormData?.edit_profile_image ? (
                                            typeof showFormData?.profile_image === 'string' && !(showFormData?.profile_image instanceof File) ? (
                                                <div className="upload-cover-picture-wrapper-image one" onClick={handleProfileImageUploadClick}>
                                                    <img src={showFormData?.profile_image} />
                                                </div>
                                            ) : showFormData?.profile_image instanceof File ? (
                                                <div className="upload-cover-picture-wrapper-image two" onClick={handleProfileImageUploadClick}>
                                                    <img src={URL.createObjectURL(showFormData?.profile_image)} />
                                                </div>
                                            ) : null
                                        ) : (
                                            <div className="upload-cover-picture-wrapper" onClick={handleProfileImageUploadClick}>
                                                <div className="upload-cover-pic-icon">
                                                    <img src={img} />
                                                    <p>Upload Profile Photo</p>
                                                </div>
                                            </div>
                                        )}

                                        <input
                                            type="file"
                                            ref={profileImageRef}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleProfileImageChange}
                                        />
                                        {inputError && showFormData.profile_image === '' && <div className="error-input-reg">Profile image is required</div>}
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="step-one-cover-pic" onClick={handleCoverImageUploadClick}>
                                            {showFormData?.edit_cover_image ? (
                                                typeof showFormData?.cover_image === 'string' && !(showFormData?.cover_image instanceof File) ? (
                                                    <div className="upload-cover-picture-wrapper-image">
                                                        <img src={showFormData?.cover_image} />
                                                    </div>
                                                ) : showFormData?.cover_image instanceof File ? (
                                                    <div className="upload-cover-picture-wrapper-image">
                                                        <img src={URL.createObjectURL(showFormData?.cover_image)} />
                                                    </div>
                                                ) : null
                                            ) : (
                                                <div className="upload-cover-picture-wrapper">
                                                    <div className="upload-cover-pic-icon">
                                                        <img src={img} />
                                                        <p>Upload Cover Photo</p>
                                                    </div>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                ref={coverImageRef}
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                onChange={handleCoverImageChange}
                                            />
                                            {/* {showFormData?.edit_cover_image ?
                                            typeof showFormData?.profile_image === 'string' ?
                                                <div className="upload-cover-picture-wrapper-image">
                                                    <img src={showFormData?.cover_image} />
                                                </div>
                                                :
                                                <div className="upload-cover-picture-wrapper-image">
                                                    <img src={URL.createObjectURL(showFormData?.cover_image)} />
                                                </div>
                                            :
                                            <div className="upload-cover-picture-wrapper">
                                                <div className="upload-cover-pic-icon">
                                                    <img src={img} />
                                                    <p>Upload Cover Photo</p>
                                                </div>
                                            </div>
                                        } */}

                                        </div>
                                        {inputError && showFormData.cover_image === '' && <div className="error-input-reg">Cover image is required</div>}
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="step-one-form-profile-picture">
                                            <div className="s-one-name-phone">
                                                <div className="s-one-name-phone-wrap">
                                                    <input
                                                        type='text'
                                                        placeholder='Store Name'
                                                        name='name'
                                                        value={showFormData?.name}
                                                        onChange={handleChange}
                                                        className='input'
                                                    />
                                                    {inputError && showFormData.name === '' && <div className="error-input">Name is required</div>}
                                                </div>
                                                <div className="s-one-name-phone-wrap">
                                                    <input
                                                        type='email'
                                                        placeholder='Email Address'
                                                        className='input'
                                                        value={userData?.email}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="s-one-name-phone">
                                                <div className="s-one-name-phone-wrap">
                                                    {isLoaded && (
                                                        <StandaloneSearchBox
                                                            onLoad={ref => inputRef.current = ref}
                                                            onPlacesChanged={handlePlaceChanged}
                                                        >
                                                            <input
                                                                type="text"
                                                                className="input"
                                                                placeholder={"Enter address"}
                                                                defaultValue={showFormData.address}
                                                                name='address'
                                                                onChange={handleChange}
                                                                style={{ width: '100%' }}
                                                            />
                                                        </StandaloneSearchBox>
                                                    )}
                                                    {inputError && showFormData.address === '' && <div className="error-input">Address is required</div>}
                                                </div>
                                                <div className="s-one-name-phone-wrap">
                                                    <input
                                                        type='text'
                                                        placeholder='Zip Code'
                                                        className='input'
                                                        name='zip_code'
                                                        value={showFormData?.zip_code}
                                                        onChange={handleChange} />
                                                    {inputError && showFormData.zip_code === '' && <div className="error-input">Zip code is required</div>}
                                                </div>
                                            </div>
                                            <div className="s-one-address-code">
                                                <div className="s-one-name-phone-wrap">
                                                    <input
                                                        type='text'
                                                        placeholder='City'
                                                        className='input'
                                                        name='city'
                                                        value={showFormData?.city}
                                                        onChange={handleChange}
                                                    />
                                                    {inputError && showFormData.city === '' && <div className="error-input">City is required</div>}
                                                </div>
                                                <div className="s-one-name-phone-wrap">
                                                    <input
                                                        type='text'
                                                        placeholder='Country'
                                                        className='input'
                                                        name='country'
                                                        value={showFormData?.country}
                                                        onChange={handleChange}
                                                    />
                                                    {inputError && showFormData.country === '' && <div className="error-input">Country is required</div>}
                                                </div>
                                            </div>
                                            <div className="s-one-address-code">
                                                <div className="s-one-name-phone-wrap">
                                                    <PhoneInput
                                                        placeholder="Enter phone number"
                                                        className='create-shop-number-field'
                                                        value={showFormData?.phone_number ? `+${showFormData?.phone_code}${showFormData?.phone_number}` : ""}
                                                        onChange={handlePhoneChange}
                                                    />
                                                    {inputError && showFormData.phone_number === '' && <div className="error-input">Phone number is required</div>}
                                                </div>
                                                <div className="s-one-name-phone-wrap">
                                                    <input
                                                        type='text'
                                                        className='input'
                                                        value={`Sell ${showFormData?.sell}`}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="c-s-s-c">
                                                <Select
                                                    defaultValue={showFormData?.categories}
                                                    value={showFormData?.categories}
                                                    onChange={(e) => { setShopFormData((prev) => ({ ...prev, categories: e })) }}
                                                    options={category}
                                                    isMulti
                                                />
                                                {inputError && showFormData.categories.length === 0 && <div className="error-input">Category is required</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="step-one-other-images">
                                <div className="step-one-other-images-heading">
                                    <h2>Add Video</h2>
                                </div>
                                <div className="input-image-video-document">
                                    {!showFormData?.edit_video ?
                                        <>
                                            <div className="add-video-wrapper">
                                                <div className="add-video-icon-text" onClick={handleVideoUploadClick}>
                                                    <img src={vid} />
                                                    <p>Add Video</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    ref={videoInputRef}
                                                    accept="video/*"
                                                    style={{ display: 'none' }}
                                                    onChange={handleVideoChange}
                                                />
                                            </div>
                                        </>
                                        :
                                        <div className="selected-videos-box">
                                            {typeof showFormData?.video === 'string' ?
                                                <video width="100%" controls>
                                                    <source src={showFormData?.video} />
                                                    Your browser does not support the video tag.
                                                </video>
                                                :
                                                <video width="100%" controls>
                                                    <source src={URL.createObjectURL(showFormData?.video)} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            }
                                            <span onClick={() => { deleteSelectedVideo() }}><CiEdit /></span>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="step-one-other-images">
                                <div className="step-one-other-images-heading">
                                    <h2>Add Other Images</h2>
                                </div>
                                <div className="input-image-video-document" onClick={handleOtherImageClick}>
                                    <div className="add-video-wrapper">
                                        <div className="add-video-icon-text">
                                            <img src={img} />
                                            <p>Add Image</p>
                                            <input
                                                type="file"
                                                ref={otherImageInputRef}
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                onChange={handleOtherImageFileChange}
                                                multiple
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {showFormData?.other_images?.length > 0 ?
                                <div className="selected-images">
                                    <div className="row">
                                        {showFormData?.other_images.map((image, index) => {
                                            return (
                                                <div className="col-lg-2" key={index}>
                                                    <div className="selected-images-box">
                                                        {typeof image?.image === 'string' ?
                                                            <img src={image?.image} alt="" />
                                                            :
                                                            <img src={URL.createObjectURL(image)} alt="" />
                                                        }
                                                        <span onClick={() => { handleDeleteImage(index, image) }}><MdDelete /></span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                : null}
                            <div className="step-one-description">
                                <div className="add-description">
                                    <h2>Add Description about your Profile</h2>
                                </div>
                                <div className="add-description-input">
                                    <textarea
                                        placeholder="Write description..."
                                        rows="4"
                                        cols="50"
                                        name='description'
                                        value={showFormData?.description}
                                        onChange={handleChange} />
                                </div>
                            </div>
                            <div className="step-one-button">
                                <div className="seller-service-dashboard-main-right-button">
                                    <button type='submit' style={{ width: "100%" }} disabled={isFromLoading}>{isFromLoading ? "Loading..." : "Submit"}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>

    )
}

export default ProductProfileSetting
