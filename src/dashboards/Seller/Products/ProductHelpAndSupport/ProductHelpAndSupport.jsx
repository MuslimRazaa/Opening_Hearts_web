import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import apis from '../../../../service';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';

function ProductHelpAndSupport() {
    const [loading, setLoading] = useState(true);
    const [isFromLoading, setIsFromLoading] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [formData, setFormData] = useState({
        user_id: "",
        name: "",
        phone: "",
        message: "",
        email: "",
        type: "seller", //user / seller / provider / organization / guest_user
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const getSellerData = async () => {
        try {
            const response = await apis.getSellerData();

            setFormData(
                {
                    user_id: response?.data?.data?.user?.id,
                    name: response?.data?.data?.seller_data?.shop_name,
                    phone: response?.data?.data?.seller_data?.phone_code + response?.data?.data?.seller_data?.phone_number,
                    email: response?.data?.data?.user?.email,
                    message: "",
                    type: "seller"
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

    useEffect(() => {
        getSellerData();
    }, [])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setInputError(true)
        if (formData?.name != "" && formData?.email != "" && formData?.phone != "" && formData?.message != "") {
            setIsFromLoading(true)
            const data = new FormData();
            data.append("user_id", formData?.user_id);
            data.append("name", formData?.name);
            data.append("phone", formData?.phone);
            data.append("email", formData?.email);
            data.append("message", formData?.message);
            data.append("type", formData?.type);
            try {
                const response = await apis.helpAndSupport(data);
                Swal.fire({
                    icon: 'success',
                    text: response?.data?.message
                });
                setIsFromLoading(false);
                setFormData((prev) => ({ ...prev, message: "" }));
                setInputError(false)
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
                <div className='help-support'>
                    <div className="help-support-heading">
                        <h2>Help and Support</h2>
                    </div>
                    <div className="selp-support-form">
                        <form onSubmit={handleFormSubmit}>
                            <input
                                type='text'
                                placeholder='Your Name'
                                name='name'
                                value={formData?.name}
                                onChange={handleChange}
                                readOnly
                            />
                            {inputError && formData.name === '' && <div className="error-input-reg">Name is required</div>}
                            <input
                                type='text'
                                placeholder='Your Phone'
                                name='phone'
                                value={formData?.phone}
                                onChange={handleChange}
                                readOnly
                            />
                            {inputError && formData.phone === '' && <div className="error-input-reg">Phome is required</div>}
                            <input
                                type='text'
                                placeholder='Your Email'
                                name='email'
                                value={formData?.email}
                                onChange={handleChange}
                                readOnly
                            />
                            {inputError && formData.email === '' && <div className="error-input-reg">Emial is required</div>}
                            <textarea
                                placeholder='Send Message.....'
                                name='message'
                                value={formData?.message}
                                onChange={handleChange}
                            />
                            {inputError && formData.message === '' && <div className="error-input-reg">Message is required</div>}
                            <button type='submit' disabled={isFromLoading}>{isFromLoading ? "Loading..." : "Send"}</button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default ProductHelpAndSupport
