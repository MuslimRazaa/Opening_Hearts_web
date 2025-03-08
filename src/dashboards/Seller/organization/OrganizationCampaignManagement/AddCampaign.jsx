import React, { useEffect, useRef, useState } from 'react'
import uploadicon from '../../../../media/images/uploadicon.png';
import uploadgalleryicon from '../../../../media/images/uploadgalleryicon.png';
import uploadvideo from '../../../../media/images/Tem_Images/basil_video-outline.png';
import uploadDocument from '../../../../media/images/Tem_Images/ion_documents-outline.png';
import cndr from '../../../../media/images/Calendar.png'
import arr from '../../../../media/images/Vector.png'
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { CiEdit } from 'react-icons/ci';
import apis from '../../../../service';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    return `${year}-${month}-${day}`;
};

const AddCampaign = () => {
    const [inputError, setInputError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFromLoading, setIsFromLoading] = useState(false);
    const [campaignValidation, setCampaignValidation] = useState("");
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        fund_required: "",
        amount_description: [{ amount_description: "", help_us_description: "" }],
        start_date: "",
        desctiption: "",
        cover_image: "",
        edit_cover_image: "",
        images: "",
        document: "",
        video: "",
        edit_video: "",
    })
    const coverImageRef = useRef(null);

    const handleCoverImageUploadClick = () => {
        coverImageRef.current.click();
    };
    const handleCoverImageChange = (e) => {
        return setFormData(prev => ({ ...prev, cover_image: e.target.files[0], edit_cover_image: true }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddAmountDesc = () => {
        setFormData((prev) => ({ ...prev, amount_description: [...formData.amount_description, { amount_description: "", help_us_description: "" }] }))
    };

    const handleDeleteAmountDesc = (index) => {
        const updatedAmountDesc = formData.amount_description.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, amount_description: updatedAmountDesc }))
    };

    const handleAmountDescChange = (index, field, value) => {
        const updatedAmountDesc = [...formData.amount_description];
        updatedAmountDesc[index][field] = value;
        setFormData((prev) => ({ ...prev, amount_description: updatedAmountDesc }))
    };

    const handleDocumentChange = (event) => {
        const files = Array.from(event.target.files);

        if (formData?.document.length + files.length > 3) {
            Swal.fire({
                icon: 'error',
                text: "Can't upload more then 2 document."
            });
            return;
        }
        setFormData((prev) => ({ ...prev, document: [...formData?.document, ...files] }))
    };

    const handleDeleteDocument = (index) => {
        const document = formData?.document.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, document: document }))
    };

    const handleOtherImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (formData?.images.length + files.length > 3) {
            Swal.fire({
                icon: 'error',
                text: "Can't upload more then 3 images."
            });
            return;
        }
        setFormData((prev) => ({ ...prev, images: [...formData?.images, ...files] }))
    };

    const handleDeleteOtherImage = (index) => {
        const images = formData?.images.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, images: images }))
    };

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

        setFormData({ ...formData, video: file, edit_video: true });
        e.target.value = null;
    };

    const deleteSelectedVideo = () => {
        setFormData({ ...formData, video: "", edit_video: false });
    }

    const getOrganizationCampaignValidate = async (id) => {
        try {
            const response = await apis.getOrganizationCampaignValidate(id);
            setCampaignValidation(response?.data?.data)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response.data.message
            });
        }
    }

    useEffect(() => {
        getOrganizationCampaignValidate(null)
    }, [])

    const createOrganizationCampaign = async (e) => {
        e.preventDefault()
        setInputError(true);
        setIsFromLoading(true);

        if (formData.cover_image === "" && formData.name === "" && formData.fund_required === "" &&
            formData.start_date === "" && formData.desctiption === "" && formData.images === "" &&
            formData.document === "") {
            setIsFromLoading(false);
            return false
        }

        if (formData.amount_description.length > 0) {
            for (let i = 0; i < formData.amount_description.length; i++) {
                if (formData.amount_description[i].amount_description === "" || formData.amount_description[i].help_us_description === "") {
                    setIsFromLoading(false);
                    return false
                }
            }
        }

        const data = new FormData();
        data.append('cover_image', formData.cover_image);
        data.append('name', formData.name);
        data.append('fund_required', formData.fund_required);
        data.append('start_date', formatDate(formData.start_date));
        data.append('desctiption', formData.desctiption);
        for (let i = 0; i < formData.images.length; i++) {
            data.append('images[]', formData.images[i]);
        }
        for (let i = 0; i < formData.document.length; i++) {
            data.append('document[]', formData.document[i]);
        }
        data.append('amount_description', JSON.stringify(formData.amount_description));
        data.append('video', formData.video)

        try {
            const response = await apis.createOrganizationCampaign(data);
            navigate(`/dashboard/organization-campaign-management`);
            setIsFromLoading(false)
        } catch (error) {
            setIsFromLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };
    return (
        <>
            <div className="meal-form">
                <div className="row">
                    <div className="create-campaing-top-sec">
                        <div className="one">
                            <div className="l">Create Campaigns</div>
                            <div className="r">{campaignValidation?.campaign_count}/{campaignValidation?.num_campaign}</div>
                        </div>
                        <div className="two">
                            <div className="l">Note:* With the basic plan your campaign will be live for {campaignValidation?.campaign_day} days </div>
                            <div className="r">
                                <Link to={'/dashboard/organization-subscription'}>Upgrade Plan</Link>
                            </div>
                        </div>
                    </div>
                    <form className='form-sec-meal' onSubmit={createOrganizationCampaign}>
                        <div className="row mt-4">
                            <div className="col-md-12" onClick={handleCoverImageUploadClick}>
                                {formData?.edit_cover_image ?
                                    <div className="upload-meal-drive image">
                                        <img src={URL.createObjectURL(formData?.cover_image)} />
                                    </div>
                                    :
                                    <div className="upload-meal-drive">
                                        <img src={uploadicon} alt="" />
                                        <p>Upload Image</p>
                                    </div>
                                }

                                <input
                                    type="file"
                                    ref={coverImageRef}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleCoverImageChange}
                                />
                                {inputError && formData.cover_image === '' && <div className="error-input">Image is required</div>}
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-12">
                                <div className="meal-input-group">
                                    <label>Campaign Name</label>
                                    <input
                                        type="text"
                                        name='name'
                                        className='meal-input-flied'
                                        placeholder='Enter campaign name'
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {inputError && formData.name === '' && <div className="error-input">Name is required</div>}
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-12">
                                <div className="meal-input-group">
                                    <label>Fund Required</label>
                                    <input
                                        type="number"
                                        name='fund_required'
                                        placeholder='Enter fund required amount'
                                        className='meal-input-flied'
                                        value={formData.fund_required}
                                        onChange={handleChange}
                                    />
                                    {inputError && formData.fund_required === '' && <div className="error-input">Amount is required</div>}
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="meal-input-group">
                                <label>Amount Description</label>
                            </div>
                            <div className="a-a-d-l">
                                <ul>
                                    {formData?.amount_description.map((AmountDesc, index) => (
                                        <li>
                                            <div className="one">
                                                <div className="meal-input-group">
                                                    <input
                                                        type="text"
                                                        placeholder='Enter Amount ($5)'
                                                        className='meal-input-flied'
                                                        value={AmountDesc.amount_description}
                                                        onChange={(e) =>
                                                            handleAmountDescChange(index, "amount_description", e.target.value)
                                                        }
                                                    />
                                                    {AmountDesc.amount_description === '' && inputError && (<p className="error-input">Amount is required</p>)}
                                                </div>
                                            </div>
                                            <div className="two">
                                                <div className="meal-input-group">
                                                    <input
                                                        type="text"
                                                        placeholder='Will help (save child life)'
                                                        className='meal-input-flied'
                                                        value={AmountDesc.help_us_description}
                                                        onChange={(e) =>
                                                            handleAmountDescChange(index, "help_us_description", e.target.value)
                                                        }
                                                    />
                                                    {AmountDesc.help_us_description === '' && inputError && (<p className="error-input">Description is required</p>)}
                                                </div>
                                            </div>
                                            {formData?.amount_description?.length > 1 ?
                                                <div className="three" onClick={() => handleDeleteAmountDesc(index)}><MdDelete /></div>
                                                :
                                                null
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-lg-12">
                                <div className="a-m-d" onClick={handleAddAmountDesc}>Add Other +</div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-12">
                                <div className="clander-js">
                                    <label style={{
                                        fontSize: "16px",
                                        color: "#7E7E7E",
                                        fontWeight: "700",
                                        marginBottom: "5px",
                                        display: "block",
                                        fontFamily: "Robotobold",
                                    }}>
                                        Start Date
                                    </label>
                                    <div className="calender-dpdown">
                                        <img src={cndr} className="calender-icon" />
                                        <img src={arr} className="arrow-down" />
                                        <DatePicker
                                            selected={formData.start_date}
                                            onChange={(date) => setFormData((prev) => ({ ...prev, start_date: date }))}
                                            dateFormat="dd-MM-yyyy"
                                            placeholderText="Enter start date"
                                        />
                                    </div>
                                    {formData.start_date === '' && inputError && (<p className="error-input">Date is required</p>)}
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-12">
                                <div className="meal-input-group">
                                    <label>Description</label>
                                    <textarea
                                        className='meal-input-flied'
                                        rows={8}
                                        cols={20}
                                        name="desctiption"
                                        value={formData.desctiption}
                                        onChange={handleChange}
                                    />
                                    {formData.desctiption === '' && inputError && (<p className="error-input">Desctiption is required</p>)}
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-12">
                                <div className="meal-input-group">
                                    <label>Add Gallery Photos</label>
                                    <div className="add-gallery-meal">
                                        <img src={uploadgalleryicon} alt="" srcset="" />
                                        <p>Upload Images</p>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleOtherImageChange}
                                            style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, zIndex: 1, opacity: 0 }}
                                        />
                                    </div>
                                    {formData.images === '' && inputError && (<p className="error-input">Other image is required</p>)}
                                </div>
                            </div>
                        </div>

                        {formData?.images?.length > 0 ?
                            <div className="other-service-images mt-4">
                                <div className="row">
                                    {formData?.images?.map((image, img) => {
                                        return (
                                            <div className="col-lg-4">
                                                <div className="s-o-i" key={img}>
                                                    <button type="button" onClick={() => handleDeleteOtherImage(img)}> <MdDelete /></button>
                                                    <img src={URL.createObjectURL(image)} />
                                                </div>
                                            </div>

                                        )
                                    })}
                                </div>
                            </div>
                            :
                            null
                        }

                        <div className="row mt-4">
                            <div className="col-md-12">
                                {!formData?.edit_video ?
                                    <div className="meal-input-group">
                                        <label>Add Video</label>
                                        <div className="add-gallery-meal">
                                            <img src={uploadvideo} alt="" srcset="" />
                                            <p>Upload Video</p>
                                            <input
                                                type="file"
                                                accept="video/*"
                                                onChange={handleVideoChange}
                                                style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, zIndex: 1, opacity: 0 }}
                                            />
                                        </div>
                                        {/* {formData.video === '' && inputError && (<p className="error-input">Video is required</p>)} */}
                                    </div>
                                    :
                                    <div className="s-s-v-b">
                                        <video width="100%" controls>
                                            <source src={URL.createObjectURL(formData?.video)} />
                                            Your browser does not support the video tag.
                                        </video>
                                        <span onClick={() => { deleteSelectedVideo() }}><CiEdit /></span>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-12">
                                <div className="meal-input-group">
                                    <label>Add Documents</label>
                                    <div className="add-gallery-meal">
                                        <img src={uploadDocument} alt="" srcset="" />
                                        <p>Upload Document</p>
                                        <input
                                            type="file"
                                            multiple
                                            accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                            onChange={handleDocumentChange}
                                            style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, zIndex: 1, opacity: 0 }}
                                        />
                                    </div>
                                    {formData.document === '' && inputError && (<p className="error-input">Document is required</p>)}
                                </div>
                                {formData?.document?.length > 0 ?
                                    <div className="s-d-u mt-4">
                                        <ul>
                                            {formData?.document?.map((document, doc) => {
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
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-12">
                                <div className="meal-input-group">
                                        <button className='meal-btn-form'>{isFromLoading ? 'Loading...' : 'Submit'}</button>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </>
    )
}

export default AddCampaign
