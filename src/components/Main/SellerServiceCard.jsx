import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import apis from '../../service';
import { FaStar } from 'react-icons/fa';

function SellerServiceCard({ setFullLoading, service, getSellerService, page_size }) {
    const navigate = useNavigate();

    const updateSellerServiceStatus = async (id) => {
        setFullLoading(true)
        try {
            const response = await apis.updateSellerServiceStatus(id);
            getSellerService(1, page_size)
        } catch (error) {
            setFullLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };
    return (
        <>
            <div className="seller-service-card">
                <div className="seller-service-card-wrapper">
                    <div className="seller-service-card-image">
                        <img src={service?.media?.[0]?.original_url} />
                        <div
                            className={service.active === 1 ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"}
                            onClick={() => { updateSellerServiceStatus(service.id) }}>
                            <div className={`toggle-price-switch ${service.active === 1 ? "on" : "off"}`}></div>
                        </div>
                    </div>
                    <div className="seller-service-card-content">
                        <div className="t-d">
                            <h3>{service?.name}</h3>
                            <div className="ratingg"><FaStar />{service?.rating}</div>
                        </div>
                        <div className="cat">Category: {service?.category?.name}</div>
                        <div className="desc">{service?.description}</div>
                        <button onClick={() => { navigate(`/dashboard/update-service?id=${service.id}`) }}>Edit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SellerServiceCard
