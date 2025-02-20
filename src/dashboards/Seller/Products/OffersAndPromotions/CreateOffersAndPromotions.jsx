import React, { useRef, useState } from 'react'
import vector from '../../../../media/images/Vector.png'
import upload from '../../../../media/images/Tem_Images/upload.png'
import cross from '../../../../media/images/Group 1000006644.png'
import apis from '../../../../service';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function CreateOffersAndPromotions() {

    const [inputError, setInputError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isFromLoading, setIsFromLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        image: "",
        start_date: "",
        end_date: "",
        url: "",
        banner_type:"seller"
    })

    const handleCrossImage = () => {
        setFormData((prev) => ({ ...prev, image: "" }))
    }

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;

        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setInputError(true)
        if (formData?.url != "" && formData?.image != "" && formData?.start_date != "" && formData?.end_date != "" ) {
            setIsFromLoading(true)
            const data = new FormData();
            data.append("url", formData?.url);
            data.append("image", formData?.image);
            data.append("start_date", formData?.start_date);
            data.append("end_date", formData?.end_date);
            data.append("banner_type", formData?.banner_type);
            try {
                const response = await apis.createAndUpdateOffer(data);
                navigate('/dashboard/product-promotions')
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
        <div className='promotionsandoffer-main'>
            <div className="offers-and-promotions">
                <h2>Create Offer</h2>
            </div>
            <div className="promotions-tab-2-wrapper">
                <form onSubmit={handleFormSubmit}>
                <div className="upload-cover-picture-wrapper" style={{ position: "relative" }}>
                    <div className="upload-cover-pic-icon">
                        <img
                            src={upload}
                            alt="Upload Icon"
                            className="upload-top-banner-promotions"
                        />
                        <input
                            type="file"
                            name='image'
                            accept="image/*"
                            onChange={handleChange}
                            style={{ position: "absolute", width: '100%', height: '100%', top: 0, left: 0, opacity: 0, zIndex: 1, cursor: 'pointer' }}
                        />
                        <p style={{ margin: 0 }}>
                            <p style={{ margin: 0 }}>Upload Top Banner</p>
                        </p>
                    </div>
                </div>
                {inputError && formData.image === '' && <div className="error-input-reg">Image is required</div>}
                {formData.image ?
                    <div className="top-banner-uploaded-image">
                        <img src={URL.createObjectURL(formData.image)} alt="Uploaded Banner" />
                        <div className='cross-image-top-banner'>
                            <img src={cross} onClick={handleCrossImage} />
                        </div>
                    </div>
                    :
                    null
                }
                <div className="copy-promotion-link">
                    <label>Enter url</label>
                    <input
                        type="text"
                        placeholder='Enter url'
                        name='url'
                        value={formData?.url}
                        onChange={handleChange}
                    />
                    {inputError && formData.url === '' && <div className="error-input">Url is required</div>}
                </div>
                <div className="copy-promotion-link">
                    <label>Enter Start Date</label>
                    <input
                        type="date"
                        name='start_date'
                        value={formData?.start_date}
                        onChange={handleChange}
                    />
                    {inputError && formData.start_date === '' && <div className="error-input">Start date is required</div>}
                </div>
                <div className="copy-promotion-link">
                    <label>Enter End Date</label>
                    <input
                        type="date"
                        name='end_date'
                        value={formData?.end_date}
                        onChange={handleChange}
                    />
                    {inputError && formData.end_date === '' && <div className="error-input">End date is required</div>}
                </div>
                <div className="promotion-purchase-button">
                    <button type='submit' disabled={isFromLoading}>{isFromLoading ? "Loading..." : "Submit"}</button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default CreateOffersAndPromotions
