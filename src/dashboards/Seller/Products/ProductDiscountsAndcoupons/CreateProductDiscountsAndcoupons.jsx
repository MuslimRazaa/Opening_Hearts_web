import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import apis from '../../../../service';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';

function CreateProductDiscountsAndcoupons() {
    const [inputError, setInputError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFromLoading, setIsFromLoading] = useState(false);
    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const id = params.get('id');

    const [formData, setFormData] = useState({
        title: "",
        code: "",
        start_date: "",
        end_date: "",
        discount: "",
        min_order: "",
        quantity_limit: ""
    })

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
        if (formData?.title != "" && formData?.code != "" && formData?.start_date != "" && formData?.end_date != ""
            && formData?.discount != "" && formData?.min_order != "" && formData?.quantity_limit != ""
        ) {
            setIsFromLoading(true)
            const data = new FormData();
            data.append("title", formData?.title);
            data.append("code", formData?.code);
            data.append("start_date", formData?.start_date);
            data.append("end_date", formData?.end_date);
            data.append("discount", formData?.discount);
            data.append("min_order", formData?.min_order);
            data.append("quantity_limit", formData?.quantity_limit);
            try {
                if (id) {
                    const response = await apis.updateCoupon(id, data);
                } else {
                    const response = await apis.createCoupon(data);
                }
                navigate('/dashboard/product-coupons')
            } catch (error) {
                setIsFromLoading(false)
                Swal.fire({
                    icon: 'error',
                    text: error.response?.data?.message
                });
            }
        }
    }
    const getCouponById = async (id) => {
        setLoading(true)
        try {
            const response = await apis.getCouponById(id);
            setFormData({
                title: response?.data?.data?.title,
                code: response?.data?.data?.code,
                start_date: response?.data?.data?.start_date,
                end_date: response?.data?.data?.end_date,
                discount: response?.data?.data?.discount,
                min_order: response?.data?.data?.min_order,
                quantity_limit: response?.data?.data?.quantity_limit
            })
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
        if (id) {
            getCouponById(id)
        }
    }, [id])

    return (
        <>
            {loading ?
                <LoadingComponents />
                :
                <div className='promotionsandoffer-main'>
                    <div className="offers-and-promotions">
                        <h2>Create Coupon</h2>
                    </div>
                    <div className="promotions-form-wrapper">
                        <form onSubmit={handleFormSubmit}>
                            <div className="add-promotion-input-wrapper">
                                <input
                                    type='text'
                                    placeholder="Coupon Name"
                                    name='title'
                                    value={formData?.title}
                                    onChange={handleChange}
                                />
                                {inputError && formData.title === '' && <div className="error-input-reg">Name is required</div>}
                            </div>
                            <div className="add-promotion-input-wrapper">
                                <input
                                    type='text'
                                    placeholder="Coupon Code"
                                    name='code'
                                    value={formData?.code}
                                    onChange={handleChange}
                                />
                                {inputError && formData.code === '' && <div className="error-input-reg">Code is required</div>}
                            </div>
                            <div className="add-promotion-input-wrapper">
                                <input
                                    type='date'
                                    placeholder="Start date"
                                    name='start_date'
                                    value={formData?.start_date}
                                    onChange={handleChange}
                                />
                                {inputError && formData.start_date === '' && <div className="error-input-reg">Start date is required</div>}
                            </div>
                            <div className="add-promotion-input-wrapper">
                                <input
                                    type='date'
                                    placeholder="End date"
                                    name='end_date'
                                    value={formData?.end_date}
                                    onChange={handleChange}
                                />
                                {inputError && formData.end_date === '' && <div className="error-input-reg">End date is required</div>}
                            </div>
                            <div className="add-promotion-set-price-input">
                                <p>Min Order</p>
                                <input
                                    type='number'
                                    name='min_order'
                                    value={formData?.min_order}
                                    onChange={handleChange}
                                    style={{ padding: '0px', border: 'none', margin: "0px" }}
                                />
                            </div>
                            {inputError && formData.min_order === '' && <div className="error-input-reg">Min order is required</div>}
                            <div className="add-promotion-set-price-input">
                                <p>Max Discount</p>
                                <input
                                    type='number'
                                    name='discount'
                                    value={formData?.discount}
                                    onChange={handleChange}
                                    style={{ padding: '0px', border: 'none', margin: "0px" }}
                                />
                            </div>
                            {inputError && formData.discount === '' && <div className="error-input-reg">Discount is required</div>}
                            <div className="add-promotion-set-price-input">
                                <p>Coupon Quantity Limit</p>
                                <input
                                    type='number'
                                    name='quantity_limit'
                                    value={formData?.quantity_limit}
                                    onChange={handleChange}
                                    style={{ padding: '0px', border: 'none', margin: "0px" }}
                                />
                            </div>
                            {inputError && formData.discount === '' && <div className="error-input-reg">Quamtity is required</div>}
                            <button type='submit' disabled={isFromLoading}>{isFromLoading ? "Loading..." : "Submit"}</button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default CreateProductDiscountsAndcoupons
