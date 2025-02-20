import React, { useEffect, useState } from 'react'
import apis from '../../../../service';
import Swal from 'sweetalert2';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';

function NotificationSetting() {
    const [isToggled0, setIsToggled0] = useState(false);
    const [isToggled2, setIsToggled2] = useState(false);
    const [isToggled4, setIsToggled4] = useState(false);
    const [notification, setNotification] = useState("");
    const [loading, setLoading] = useState(true);
    const [fullLoading, setFullLoading] = useState(false);

    const [formData, SetFormData] = useState(
        {
            important_notification: "",
            chats_notification: "",
            buying_notification: "",
            selling_notification: "",
            organization_notification: ""
        }
    )

    const handleToggle0 = () => {
        setIsToggled0(!isToggled0);
    };
    const handleToggle2 = () => {
        setIsToggled2(!isToggled2);
    };
    const handleToggle4 = () => {
        setIsToggled4(!isToggled4);
    };

    const getNotificationSetting = async () => {
        try {
            const response = await apis.getNotificationSetting();
            SetFormData({
                important_notification: response?.data?.data?.important_notification,
                chats_notification: response?.data?.data?.chats_notification,
                buying_notification: response?.data?.data?.buying_notification,
                selling_notification: response?.data?.data?.selling_notification,
                organization_notification: response?.data?.data?.organization_notification

            })
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    }

    const updateNotificationSetting = async (data) => {
        setFullLoading(true)
        try {
            const response = await apis.updateNotificationSetting(data);
            getNotificationSetting();
            setFullLoading(false);
        } catch (error) {
            setFullLoading(false);
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    }

    useEffect(() => {
        getNotificationSetting()
    }, [])
    return (
        <>
            {fullLoading &&
                <div className="full-screen-loader">
                    <LoadingComponents />
                </div>
            }
            {loading ?
                <LoadingComponents />
                :
                <div className="Notifications-setting-main-wrapper">
                    <div className='row'>
                        <div className="col-lg-12">
                            <div className="notifications-setting-heading">
                                <h2>Notification Setting</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-lg-11">
                            <div className="personalized-notifications">
                                <h2>Important</h2>
                            </div>
                        </div>
                        <div className="col-lg-1">
                            <div className="toggle-price"
                                onClick={() => {
                                    updateNotificationSetting({
                                        important_notification: formData?.important_notification === 1 ? 0 : 1,
                                        chats_notification: formData?.chats_notification,
                                        buying_notification: formData?.buying_notification,
                                        selling_notification: formData?.selling_notification,
                                        organization_notification: formData?.organization_notification
                                    })
                                }}
                            >
                                <div className={formData?.important_notification ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"} onClick={handleToggle0}>
                                    <div className={`toggle-price-switch ${formData?.important_notification ? "on" : "off"}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row align-items-center">
                        <div className="col-lg-11">
                            <div className="personalized-notifications">
                                <h2>Chat</h2>
                            </div>
                        </div>
                        <div className="col-lg-1">
                            <div className="toggle-price"
                                onClick={() => {
                                    updateNotificationSetting({
                                        important_notification: formData?.important_notification,
                                        chats_notification: formData?.chats_notification === 1 ? 0 : 1,
                                        buying_notification: formData?.buying_notification,
                                        selling_notification: formData?.selling_notification,
                                        organization_notification: formData?.organization_notification
                                    })
                                }}
                            >
                                <div className={formData?.chats_notification ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"} onClick={handleToggle2}>
                                    <div className={`toggle-price-switch ${formData?.chats_notification ? "on" : "off"}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row align-items-center">
                        <div className="col-lg-11">
                            <div className="personalized-notifications">
                                <h2>Selling</h2>
                            </div>
                        </div>
                        <div className="col-lg-1">
                            <div className="toggle-price"
                                onClick={() => {
                                    updateNotificationSetting({
                                        important_notification: formData?.important_notification,
                                        chats_notification: formData?.chats_notification,
                                        buying_notification: formData?.buying_notification,
                                        selling_notification: formData?.selling_notification === 1 ? 0 : 1,
                                        organization_notification: formData?.organization_notification
                                    })
                                }}
                            >
                                <div className={formData?.selling_notification ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"} onClick={handleToggle4}>
                                    <div className={`toggle-price-switch ${formData?.selling_notification ? "on" : "off"}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default NotificationSetting
