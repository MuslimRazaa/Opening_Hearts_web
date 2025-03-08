import React from 'react';
import tempImage from '../../media/images/don-card-img.png'
import { useNavigate } from 'react-router-dom';
import apis from '../../service';
import Swal from 'sweetalert2';

const CampaignCard = ({ setFullLoading, campaign, getOrganizationCampaigns, page_size, type }) => {
    const navigate = useNavigate()
    const deleteOrganizationCampaign = async (id) => {
        try {
            const response = await apis.deleteOrganizationCampaign(id);
            getOrganizationCampaigns(type , 1 , page_size)
            Swal.fire({
                icon: 'success',
                text: response?.data?.message
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    }
    return (
        <div className='campaign-card'>
            <div className="campaign-card-wrap">
                <img src={campaign?.cover_image} alt="" />
                <h4>{campaign?.name}</h4>
                {campaign?.desctiption?.length > 100 ?
                    <p className='desc'>{campaign?.desctiption.slice(0, 100)}...</p>
                    :
                    <p className='desc'>{campaign?.desctiption}</p>
                }
                <div className="progress-bar">
                    {campaign?.percentage > 5 && campaign?.percentage < 98 ?
                        <div className="bottom-bar" style={{ width: campaign?.percentage + 2 + '%' }}></div>
                        :
                        null
                    }
                    <div className="top-bar" style={{ width: campaign?.percentage + '%' }}></div>
                </div>
                <div className="a-r-r">
                    <div className="left">
                        <p className="amount">$ {campaign?.fund_required}</p>
                        <p className="text">Raised So far</p>
                    </div>
                    <div className="right">
                        <p className="amount">$ {campaign?.receive_amount}</p>
                        <p className="text">Amount Required</p>
                    </div>
                </div>
                <div className="button">
                    {type === 'active' ?
                        <button onClick={() => { navigate(`/dashboard/update-organization-campaign?id=${campaign?.id}`) }}>Edit Campaign</button>
                        :
                        <button onClick={() => {deleteOrganizationCampaign(campaign?.id)}}>Delete Campaign</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default CampaignCard