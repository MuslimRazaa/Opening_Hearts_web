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
import doc from '../../../../media/images/Tem_Images/ion_documents-outline.png'

const libraries = ['places'];

function OrganizationProfileSetting() {
    const user_data = localStorage.getItem('user_data');
    const [inputError, setInputError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isFromLoading, setIsFromLoading] = useState(false);
    const userData = JSON.parse(user_data);
    const inputRef = useRef();
    const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES, libraries });
    const [category, setCategory] = useState([]);
    const organizationType = [{ value: 1, label: 'Donation' }]
    const [imageIds, setImageIds] = useState([]);

    const [showFormData, setShopFormData] = useState({
        organization_name: "",
        description: "",
        street_address: "",
        city: "",
        country: "",
        zip_code: "",
        phone_code: "",
        phone: "",
        phone_country_code: "",
        cover_image: "",
        edit_cover_image: false,
        profile_image: "",
        edit_profile_image: false,
        other_images: [],
        video: "",
        edit_video: false,
        become_vendor: 0,
        event: 0,
        organization_type: "",
        website: "",
        documents: "",
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

    const getOrganizationData = async () => {
        try {
            const response = await apis.getOrganizationData();
            let tempCategory = [];
            for (let i = 0; i < response?.data?.data?.organization_store?.category?.length; i++) {
                tempCategory.push({ value: response?.data?.data?.organization_store?.category[i].id, label: response?.data?.data?.organization_store?.category[i].name })
            }
            console.log(response?.data?.data?.organization_store?.images.length > 0);

            setShopFormData(
                {
                    id: response?.data?.data?.organization_store?.id,
                    organization_name: response?.data?.data?.organization_store?.organization_name,
                    description: response?.data?.data?.organization_store?.description,
                    street_address: response?.data?.data?.organization_store?.street_address,
                    city: response?.data?.data?.organization_store?.city,
                    country: response?.data?.data?.organization_store?.country,
                    zip_code: response?.data?.data?.organization_store?.zip_code,
                    sell: "Product",
                    phone_code: response?.data?.data?.organization_store?.phone_code,
                    phone: response?.data?.data?.organization_store?.phone,
                    phone_country_code: response?.data?.data?.organization_store?.phone_country_code,
                    cover_image: response?.data?.data?.organization_store?.cover_image ? response?.data?.data?.organization_store?.cover_image : "",
                    edit_cover_image: response?.data?.data?.organization_store?.cover_image ? true : false,
                    profile_image: response?.data?.data?.organization_store?.profile_image ? response?.data?.data?.organization_store?.profile_image : "",
                    edit_profile_image: response?.data?.data?.organization_store?.profile_image ? true : false,
                    other_images: response?.data?.data?.organization_store?.images?.length > 0 ? response?.data?.data?.organization_store?.images : [],
                    video: response?.data?.data?.organization_store?.video ? response?.data?.data?.organization_store?.video : "",
                    edit_video: response?.data?.data?.organization_store?.video ? true : false,
                    become_vendor: response?.data?.data?.organization_store?.become_vendor,
                    event: response?.data?.data?.organization_store?.event,
                    website: response?.data?.data?.organization_store?.website,
                    documents: response?.data?.data?.organization_store?.documents,
                    organization_type: { value: 1, label: 'Donation' },
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
        getOrganizationData();
    }, [])



    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setInputError(true)
        if (showFormData?.name != "" && showFormData?.profile_image != "" && showFormData?.cover_image != ""
            && showFormData?.address != "" && showFormData?.zip_code != "" && showFormData?.city != ""
            && showFormData?.country != "" && showFormData?.phone_number != ""
            && showFormData?.description != "" && showFormData?.organization_type != "" && showFormData?.website != ""
        ) {
            setIsFromLoading(true)
            const data = new FormData();
            data.append("organization_name", showFormData?.organization_name);
            data.append("description", showFormData?.description);
            data.append("street_address", showFormData?.street_address);
            data.append("email", userData?.email);
            data.append("city", showFormData?.city);
            data.append("state", showFormData?.state);
            data.append("country", showFormData?.country);
            data.append("zip_code", showFormData?.zip_code);
            data.append("phone", showFormData?.phone);
            data.append("phone_code", showFormData?.phone_code);
            data.append("phone_country_code", showFormData?.phone_country_code);
            data.append("cover_image", showFormData?.cover_image);
            data.append("profile_image", showFormData?.profile_image);
            data.append("become_vendor", showFormData?.become_vendor);
            data.append("event", showFormData?.event);
            data.append("website", showFormData?.website);
            data.append("organization_type", showFormData?.organization_type?.value);
            data.append('deleted_files', JSON.stringify(imageIds));
            // showFormData.other_images.forEach((other_image) => {
            //     data.append("other_images[]", other_image);
            // });
            if (showFormData.other_images.length > 0) {
                for (let i = 0; i < showFormData.other_images.length; i++) {
                    if (showFormData.other_images[i]?.id) { }
                    else {
                        data.append('other_images[]', showFormData.other_images[i])
                    }
                }
            }
            // showFormData.documents.forEach((document) => {
            //     data.append("documents[]", document);
            // });
            if (showFormData.documents.length > 0) {
                for (let i = 0; i < showFormData.documents.length; i++) {
                    if (showFormData?.documents[i]?.id) { }
                    else {
                        data.append('documents[]', showFormData.documents[i])
                    }
                }
            }
            if (showFormData.video != "") {
                data.append('video', showFormData.video)
            }

            try {
                const response = await apis.updateDonation(data);
                localStorage.setItem('user_data', JSON.stringify(response?.data?.data))
                window.location.reload();
            } catch (error) {
                setIsFromLoading(false)
                Swal.fire({
                    icon: 'error',
                    text: error.response?.data?.message
                });
            }
        }
    }

    const handleDocumentChange = (event) => {
        const files = Array.from(event.target.files);

        if (showFormData?.documents.length + files.length > 3) {
            Swal.fire({
                icon: 'error',
                text: "Can't upload more then 2 document."
            });
            return;
        }
        setShopFormData((prev) => ({ ...prev, documents: [...showFormData?.documents, ...files] }))
    };

    // const handleDeleteDocument = (index) => {
    //     const documents = showFormData?.documents.filter((_, i) => i !== index);
    //     setShopFormData((prev) => ({ ...prev, documents: documents }))
    // };

    const handleDeleteDocument = (index) => {
        const docToDelete = showFormData?.documents[index];
        const documents = showFormData?.documents.filter((_, i) => i !== index);
        setShopFormData((prev) => ({ ...prev, documents: documents }));
        if (docToDelete?.id) {
            setImageIds((prev) => [...prev, docToDelete?.id]);
        }
    };
    return (
        <>
            {loading ? <LoadingComponents />
                :
                <div className="row">
                    <div className="col-lg-12">
                        <form onSubmit={handleFormSubmit}>
                            <div className='step-one-main'>
                                <div className="step-one-heading">
                                    <h2>Setup Your Office</h2>
                                </div>
                                <div className="row">

                                    <div className="col-lg-6">
                                        {showFormData?.edit_profile_image ? (
                                            typeof showFormData?.profile_image === 'string' && !(showFormData?.profile_image instanceof File) ? (
                                                <div className="upload-cover-picture-wrapper-image" onClick={handleProfileImageUploadClick}>
                                                    <img src={showFormData?.profile_image} />
                                                </div>
                                            ) : showFormData?.profile_image instanceof File ? (
                                                <div className="upload-cover-picture-wrapper-image" onClick={handleProfileImageUploadClick}>
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
                                        {/* {showFormData?.edit_profile_image ?
                                            <div className="upload-cover-picture-wrapper-image" onClick={handleProfileImageUploadClick}>
                                                <img src={URL.createObjectURL(showFormData?.profile_image)} />
                                            </div>
                                            :
                                            <div className="upload-cover-picture-wrapper" onClick={handleProfileImageUploadClick}>
                                                <div className="upload-cover-pic-icon">
                                                    <img src={img} />
                                                    <p>Upload Profile Photo</p>
                                                </div>
                                            </div>
                                        } */}
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
                                            {/* {showFormData?.edit_cover_image ?
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
                                                        <p>Upload Profile Photo</p>
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
                                        </div>
                                        {inputError && showFormData.cover_image === '' && <div className="error-input-reg">Cover image is required</div>}
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="step-one-form-profile-picture">
                                            <div className="s-one-name-phone">
                                                <div className="s-one-name-phone-wrap">
                                                    <input
                                                        type='text'
                                                        placeholder='Organization Name'
                                                        name='organization_name'
                                                        value={showFormData?.organization_name}
                                                        onChange={handleChange}
                                                        className='input'
                                                    />
                                                    {inputError && showFormData.organization_name === '' && <div className="error-input">Name is required</div>}
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
                                                                defaultValue={showFormData.street_address}
                                                                name='address'
                                                                onChange={handleChange}
                                                                style={{ width: '100%' }}
                                                            />
                                                        </StandaloneSearchBox>
                                                    )}
                                                    {inputError && showFormData.street_address === '' && <div className="error-input">Address is required</div>}
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
                                                        value={showFormData?.phone ? `+${showFormData?.phone_code}${showFormData?.phone}` : ""}
                                                        onChange={handlePhoneChange}
                                                    />
                                                    {inputError && showFormData.phone === '' && <div className="error-input">Phone number is required</div>}
                                                </div>
                                                <div className="s-one-name-phone-wrap">
                                                    <input
                                                        type='url'
                                                        className='input'
                                                        name='website'
                                                        placeholder='Enter website link'
                                                        value={showFormData?.website}
                                                        onChange={handleChange}
                                                    />
                                                    {inputError && showFormData.website === '' && <div className="error-input">Website link is required</div>}
                                                </div>
                                            </div>

                                            <div className="s-one-address-code">
                                                <div className="s-one-name-phone-wrap">
                                                    <div className="organization-e" onClick={() => { setShopFormData((prev) => ({ ...prev, become_vendor: showFormData?.become_vendor === 0 ? 1 : 0 })) }}>
                                                        <span>Become A Volunteer</span>
                                                        <div className="toggle-price">
                                                            <div className={showFormData?.become_vendor ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"}>
                                                                <div className={`toggle-price-switch ${showFormData?.become_vendor ? "on" : "off"}`}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="s-one-name-phone-wrap">
                                                    <div className="organization-e" onClick={() => { setShopFormData((prev) => ({ ...prev, event: showFormData?.event === 0 ? 1 : 0 })) }}>
                                                        <span>Events</span>
                                                        <div className="toggle-price">
                                                            <div className={showFormData?.event ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"}>
                                                                <div className={`toggle-price-switch ${showFormData?.event ? "on" : "off"}`}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="s-one-address-code">
                                                <div className="s-one-name-phone-wrap">
                                                    <Select
                                                        defaultValue={showFormData?.organization_type}
                                                        value={showFormData?.organization_type}
                                                        onChange={(e) => { setShopFormData((prev) => ({ ...prev, organization_type: e })) }}
                                                        options={organizationType}
                                                    />
                                                    {inputError && showFormData.organization_type === "" && <div className="error-input">Organizaqtion type is required</div>}
                                                </div>

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
                                        // <div className="selected-videos-box">
                                        //     <video width="100%" controls>
                                        //         <source src={URL.createObjectURL(showFormData?.video)} />
                                        //         Your browser does not support the video tag.
                                        //     </video>
                                        //     <span onClick={() => { deleteSelectedVideo() }}><CiEdit /></span>
                                        // </div>
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
                            {showFormData?.documents?.length > 1 ? null :
                                <div className="step-one-other-images">
                                    <div className="step-one-other-images-heading">
                                        <h2>Add Documents</h2>
                                    </div>
                                    <div className="input-image-video-document">
                                        <div className="add-video-wrapper">
                                            <div className="add-video-icon-text">
                                                <img src={doc} />
                                                <p>Add Documents</p>
                                            </div>
                                            <input
                                                type="file"
                                                multiple
                                                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                onChange={handleDocumentChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            }
                            {showFormData?.documents?.length > 0 ?
                                <div className="s-d-u">
                                    <ul>
                                        {showFormData?.documents?.map((document, doc) => {
                                            return (
                                                <li key={doc}>
                                                    <span>{document?.name}</span>
                                                    <span className='delete-s-d' onClick={() => { handleDeleteDocument(doc) }}><MdDelete /></span></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                :
                                null}
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
                                {inputError && showFormData.description === "" && <div className="error-input">Description is required</div>}
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

export default OrganizationProfileSetting
