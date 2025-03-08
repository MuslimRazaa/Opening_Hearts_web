import React, { useEffect, useState } from 'react'
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';
import Swal from 'sweetalert2';
import apis from '../../../../service';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const OrganizationBlastEmail = () => {

    const [loader, setLoader] = useState(true);
    const [campaigns, setCampaigns] = useState([]);
    const [users, setUsers] = useState([]);
    const [campaignValidation, setCampaignValidation] = useState("");
    const [formData, setFormDate] = useState({
        user_id: "",
        campaign_id: "",
        message: "",
        subject: ""
    });
    const [inputError, setInputError] = useState(false);
    const [isFromLoading, setIsFromLoading] = useState(false);
    const getOrganizationAddonsCampaigns = async () => {
        try {
            const response = await apis.getOrganizationAddonsCampaigns();
            let tampCampaign = []
            for (let i = 0; i < response?.data?.data.length; i++) {
                tampCampaign.push({ label: response?.data?.data[i].name, value: response?.data?.data[i].id })
            }
            setCampaigns(tampCampaign)
            setLoader(false)
        } catch (error) {
            setLoader(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message,
            });
        }
    }

    const getOrganizationUsers = async () => {
        try {
            const response = await apis.getOrganizationUsers();
            let tampUsers = []
            for (let i = 0; i < response?.data?.data.length; i++) {
                tampUsers.push({ label: response?.data?.data[i].email, value: response?.data?.data[i].id })
            }
            setUsers(tampUsers)
            setLoader(false)
        } catch (error) {
            setLoader(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message,
            });
        }
    }

    useEffect(() => {
        getOrganizationUsers();
        getOrganizationAddonsCampaigns();
    }, [])

    const getOrganizationCampaignValidate = async (id) => {
        setLoader(true);
        try {
            const response = await apis.getOrganizationCampaignValidate(id);
            setCampaignValidation(response?.data?.data);
            setLoader(false);
        } catch (error) {
            setLoader(false);
            Swal.fire({
                icon: 'error',
                text: error.response.data.message
            });
        }
    }

    const oncampaignChange = (data) => {
        setFormDate((prev) => ({ ...prev, campaign_id: data }));
        getOrganizationCampaignValidate(data?.value)
    }

    const sendOrganizationBlastMail = async (e) => {
        e.preventDefault()
        setInputError(true);
        setIsFromLoading(true);

        if (formData.user_id === "" || formData.subject === "" || formData.message === "") {
            setIsFromLoading(false);
            return false
        }

        const data = new FormData();
        const userId = formData.user_id.map(user => user.value);
        data.append('campaign_id', formData.campaign_id.value);
        data.append('user_id', JSON.stringify(userId));
        data.append('subject', formData.subject);
        data.append('message', formData.message);

        try {
            const response = await apis.sendOrganizationBlastMail(data);
            setFormDate((prev) => ({ ...prev, user_id: "", subject: "", message: "" }));
            getOrganizationCampaignValidate(formData.campaign_id.value)
            setInputError(false)
            setIsFromLoading(false);
            Swal.fire({
                icon: 'success',
                text: response?.data?.message
            });
        } catch (error) {
            setIsFromLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDate({
            ...formData,
            [name]: value,
        });
    };
    return (
        <>
            {loader ?
                <LoadingComponents />
                :
                <div className="meal-form">
                    <div className="row">
                        {formData.campaign_id ?
                            <>
                                <form onSubmit={sendOrganizationBlastMail}>
                                    <div className="create-campaing-top-sec">
                                        <div className="one">
                                            <div className="l">Blast Emails</div>
                                            <div className="r">{campaignValidation?.num_email_use}/{campaignValidation?.num_email}</div>
                                        </div>
                                        <div className="two">
                                            <div className="l">Note:* With the basic plan your can send upto {campaignValidation?.num_email} blast emails</div>
                                            <div className="r">
                                                <Link to={'/dashboard/organization-subscription'}>Upgrade Plan</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blast-email-campaign">
                                        <label>Campaign</label>
                                        <Select
                                            options={campaigns}
                                            value={formData?.campaign_id}
                                            onChange={(e) => { oncampaignChange(e) }}
                                            placeholder="Select campaign"
                                            className="select-addon-campaign"
                                        />
                                        {inputError && formData.campaign_id === '' && <div className="error-input">Campaign is required</div>}
                                    </div>
                                    <div className="blast-email-campaign">
                                        <label>Recipients</label>
                                        <Select
                                            options={users}
                                            value={formData?.user_id}
                                            onChange={(e) => { setFormDate((prev) => ({ ...prev, user_id: e })) }}
                                            placeholder="Select user"
                                            className="select-addon-campaign"
                                            isMulti
                                            isOptionDisabled={() => formData.user_id.length >= (campaignValidation?.num_email - campaignValidation?.num_email_use)} // Disable adding new selections
                                        />
                                        {inputError && formData.user_id === '' && <div className="error-input">User is required</div>}
                                    </div>
                                    <div className="blast-email-campaign-input">
                                        <label>Subject</label>
                                        <input
                                            type="text"
                                            name='subject'
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                        {inputError && formData.subject === '' && <div className="error-input">Subject is required</div>}
                                    </div>
                                    <div className="blast-email-campaign-input">
                                        <label>Message</label>
                                        <ReactQuill
                                            theme="snow"
                                            value={formData.message}
                                            onChange={(e) => { setFormDate((prev) => ({ ...prev, message: e })) }} />
                                        {inputError && formData.message === '' && <div className="error-input">Message is required</div>}
                                    </div>
                                    <div className="button-email">
                                        <button disabled={campaignValidation?.num_email === campaignValidation?.num_email_use}>{isFromLoading ? "Loading..." : 'Submit'}</button>
                                    </div>
                                </form>
                            </>
                            :
                            <>
                                <div className="create-campaing-top-sec">
                                    <div className="one">
                                        <div className="l">Blast Emails</div>
                                    </div>
                                </div>
                                <div className="blast-email-campaign">
                                    <label>Campaign</label>
                                    <Select
                                        options={campaigns}
                                        value={formData?.campaign_id}
                                        onChange={(e) => { oncampaignChange(e) }}
                                        placeholder="Select campaign"
                                        className="select-addon-campaign"
                                    />
                                </div>
                            </>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default OrganizationBlastEmail