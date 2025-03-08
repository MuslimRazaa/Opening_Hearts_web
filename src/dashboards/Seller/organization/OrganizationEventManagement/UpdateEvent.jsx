import React, { useEffect, useState } from 'react'
import uploadicon from '../../../../media/images/uploadicon.png';
import uploadgalleryicon from '../../../../media/images/uploadgalleryicon.png';
import arr from '../../../../media/images/Vector.png'
import cndr from '../../../../media/images/Calendar.png'
import right from '../../../../media/images/tic.png'
import CustomDatePicker from '../../../../components/Main/CalenderDpDown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../../../../components/Layout/Modal';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import apis from '../../../../service';
import { MdDelete } from 'react-icons/md';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    return `${year}-${month}-${day}`;
};

const UpdateEvent = () => {

    const [campaign, setCampaign] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [formLoading, setFromLoading] = useState(false);
    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const id = params.get('id');
    const [imageIds, setImageIds] = useState([]);

    const time = [
        { label: "00", value: "0" },
        { label: "01", value: "01" },
        { label: "02", value: "02" },
        { label: "03", value: "03" },
        { label: "04", value: "04" },
        { label: "05", value: "05" },
        { label: "06", value: "06" },
        { label: "07", value: "07" },
        { label: "08", value: "08" },
        { label: "09", value: "09" },
        { label: "10", value: "10" },
        { label: "11", value: "11" },
        { label: "12", value: "12" },
        { label: "13", value: "13" },
        { label: "14", value: "14" },
        { label: "15", value: "15" },
        { label: "16", value: "16" },
        { label: "17", value: "17" },
        { label: "18", value: "18" },
        { label: "19", value: "19" },
        { label: "20", value: "20" },
        { label: "21", value: "21" },
        { label: "22", value: "22" },
        { label: "23", value: "23" },
    ]

    const [formData, setFormData] = useState({
        name: "",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        program_overview: "",
        objectives: "",
        cover_image: "",
        images: "",
        campaign_id: "",
    });

    const getAllOrganizationCampaign = async () => {
        try {
            const response = await apis.getAllOrganizationCampaign();
            let tempCampaign = [];
            for (let i = 0; i < response.data.data.length; i++) {
                tempCampaign.push({
                    value: response.data.data[i]?.id,
                    label: response.data.data[i]?.name,
                });
            }
            setCampaign(tempCampaign);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };

    useEffect(() => {
        getAllOrganizationCampaign()
    }, [])

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
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
        const imageToDelete = formData?.images[index]
        const images = formData?.images.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, images: images }))
        if (imageToDelete?.id) {
            setImageIds((prev) => [...prev, imageToDelete?.id]);
        }
    };

    const updateEvent = async (e) => {

        e.preventDefault();
        setInputError(true);
        setFromLoading(true);
        if (formData.cover_image === "" && formData.name === "" && formData.start_date === "" &&
            formData.end_date === "" && formData.start_time === "" && formData.end_time === "" &&
            parseInt(formData.end_time.value) <= parseInt(formData.start_time.value) &&
            formData.campaign_id === "" && formData.program_overview === "" && formData.objectives === "") {
            setFromLoading(false);
            return false
        }

        const data = new FormData();
        data.append('cover_image', formData.cover_image);
        data.append('name', formData.name);
        data.append('start_date', formatDate(formData.start_date));
        data.append('end_date', formatDate(formData.end_date));
        data.append('start_time', formData.start_time?.value + ":00:00");
        data.append('end_time', formData.end_time?.value + ":00:00");
        data.append('campaign_id', formData.campaign_id?.value);
        data.append('program_overview', formData.program_overview);
        data.append('objectives', formData.objectives);
        if (formData.images.length > 0) {
            for (let i = 0; i < formData.images.length; i++) {
                if (formData.images[i]?.id) { }
                else {
                    data.append('images[]', formData.images[i])
                }
            }
        }
        data.append('deleted_files', JSON.stringify(imageIds));
        try {
            const response = await apis.updateOrganizationEvent(id, data);
            navigate(`/dashboard/organization-events-management`);
            setFromLoading(false)
        } catch (error) {
            setFromLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };

    const getOrganizationEventById = async (id) => {
        try {
            const response = await apis.getOrganizationEventById(id);
            setFormData({
                name: response?.data?.data?.name,
                start_date: response?.data?.data?.start_date,
                end_date: response?.data?.data?.end_date,
                start_time: { label: response?.data?.data?.time?.slice(0, 2), value: response?.data?.data?.time?.slice(0, 2) },
                end_time: { label: response?.data?.data?.end_time?.slice(0, 2), value: response?.data?.data?.end_time?.slice(0, 2) },
                program_overview: response?.data?.data?.program_overview,
                objectives: response?.data?.data?.objectives,
                cover_image: response?.data?.data?.cover_image,
                images: "",
                campaign_id: { label: response?.data?.data?.campaign?.name, value: response?.data?.data?.campaign?.id },
            })
            if (response?.data?.data?.images?.length > 0) {
                let tempImages = [];
                for (let i = 0; i < response?.data?.data?.images.length; i++) {
                    tempImages.push({ id: response?.data?.data?.images?.[i].id, image: response?.data?.data?.images?.[i].image })
                }
                setFormData((prev) => ({ ...prev, images: tempImages }))
            } else {
                setFormData((prev) => ({ ...prev, other_images: "" }))
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };

    useEffect(() => {
        getOrganizationEventById(id)
    }, [id])

    return (
        <>
            <div className="donation-dash-add-event">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Create Event</h2>
                    </div>
                </div>

                <form className="donation-add-event-form" onSubmit={updateEvent}>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="upload-add-event">
                                {!formData?.cover_image ?
                                    <>
                                        <img src={uploadicon} alt="" />
                                        <input
                                            type="file"
                                            name='cover_image'
                                            accept="image/*"
                                            onChange={handleChange}
                                        />
                                        <p>Upload Event Cover Image</p>
                                    </>
                                    :
                                    <>
                                        {typeof formData?.cover_image === 'string' && formData?.cover_image.includes('http') ?
                                            <img src={formData?.cover_image} className='cover-i' />
                                            :
                                            <img src={URL.createObjectURL(formData?.cover_image)} className='cover-i' />
                                        }
                                        <input
                                            type="file"
                                            name='cover_image'
                                            accept="image/*"
                                            onChange={handleChange}
                                        />
                                    </>
                                }
                            </div>
                        </div>
                        {formData.cover_image === '' && inputError && (<p className="error-input">Cover image is required</p>)}
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="event-input-group">
                                <label>Display Name</label>
                                <input
                                    type="text"
                                    name='name'
                                    className='event-input-flied'
                                    placeholder='Enter event name'
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {formData.name === '' && inputError && (<p className="error-input">Name is required</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <div className="event-input-group">
                                <label>Start Date</label>
                                <div className="clander-js">
                                    <div className="calender-dpdown-event">
                                        <img src={cndr} className="calender-icon" />
                                        <img src={arr} className="arrow-down" />
                                        <DatePicker
                                            selected={formData.start_date}
                                            onChange={(date) => { setFormData((prev) => ({ ...prev, start_date: date })) }}
                                            dateFormat="dd-MM-yyyy"
                                            placeholderText="Enter start date"
                                            minDate={formData.start_date}
                                        />
                                    </div>
                                </div>
                                {formData.start_date === '' && inputError && (<p className="error-input">Start date is required</p>)}
                            </div>
                        </div>
                        {formData.start_date ?
                            <div className="col-md-6">
                                <div className="event-input-group">
                                    <label>End Date</label>
                                    <div className="clander-js">
                                        <div className="calender-dpdown-event">
                                            <img src={cndr} className="calender-icon" />
                                            <img src={arr} className="arrow-down" />
                                            <DatePicker
                                                selected={formData.end_date}
                                                onChange={(date) => { setFormData((prev) => ({ ...prev, end_date: date })) }}
                                                dateFormat="dd-MM-yyyy"
                                                placeholderText="Enter end date"
                                                minDate={formData.start_date}
                                            />
                                        </div>
                                    </div>
                                    {formData.end_date === '' && inputError && (<p className="error-input">End date is required</p>)}
                                </div>
                            </div>
                            :
                            null
                        }
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <div className="event-input-group">
                                <label>Start Time</label>
                                <Select
                                    options={time}
                                    value={formData?.start_time}
                                    onChange={(e) => { setFormData((prev) => ({ ...prev, start_time: e })) }}
                                    placeholder="Select start time"
                                    className="select-event"
                                />
                                {formData.start_time === '' && inputError && (<p className="error-input">Start time is required</p>)}
                                {parseInt(formData.end_time.value) <= parseInt(formData.start_time.value) && inputError && (
                                    <p className="error-input">End time must be greater than start time.</p>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="event-input-group">
                                <label>End Time</label>
                                <Select
                                    options={time}
                                    value={formData?.end_time}
                                    onChange={(e) => { setFormData((prev) => ({ ...prev, end_time: e })) }}
                                    placeholder="Select end time"
                                    className="select-event"
                                />
                                {formData.end_time === '' && inputError && (<p className="error-input">End time is required</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="event-input-group">
                                <label>Select Campaign</label>
                                <Select
                                    options={campaign}
                                    value={formData?.campaign_id}
                                    onChange={(e) => { setFormData((prev) => ({ ...prev, campaign_id: e })) }}
                                    placeholder="Select campaign"
                                    className="select-event"
                                />
                                {formData.campaign_id === '' && inputError && (<p className="error-input">Campaign is required</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="event-input-group">
                                <label>Program Overview</label>
                                <textarea
                                    name="program_overview"
                                    rows={8}
                                    cols={20}
                                    className='meal-input-flied'
                                    value={formData.program_overview}
                                    onChange={handleChange}
                                    placeholder='Enter program overview'
                                />
                                {formData.program_overview === '' && inputError && (<p className="error-input">Program Overview is required</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="event-input-group">
                                <label>Objectives</label>
                                <input
                                    type="text"
                                    name='objectives'
                                    placeholder='To engage the community in environmental conservation efforts.'
                                    className='event-input-flied'
                                    value={formData.objectives}
                                    onChange={handleChange}
                                />
                                {formData.objectives === '' && inputError && (<p className="error-input">Objectives is required</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <div className="event-input-group">
                                <label>Add Gallery Photos</label>
                                <div className="add-gallery-meal" style={{ position: 'relative' }}>
                                    <img src={uploadgalleryicon} alt="" srcset="" />
                                    <p>Add Images</p>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleOtherImageChange}
                                        style={{ position: 'absolute', opacity: 0, left: 0, top: 0, width: '100%', height: '100%', zIndex: 1 }}
                                    />
                                </div>
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
                                                {image?.id ? <img src={image.image} /> : <img src={URL.createObjectURL(image)} />}
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
                            <div className="meal-input-group">
                                <button type='submit' className='meal-btn-form'>{formLoading ? "Loading..." : "Submit"}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdateEvent
